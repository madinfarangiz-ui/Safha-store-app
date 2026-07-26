
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

var SUPABASE_URL = "https://rfsgpqmddgtuxhkqaeau.supabase.co";
var SUPABASE_KEY = "sb_publishable_Z2hMA2ZiwUD3NgVMfLBOPQ_Mqx-vCOC";

var REST_URL = SUPABASE_URL + "/rest/v1/products";
var KV_URL = SUPABASE_URL + "/rest/v1/kv_store";
var HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: "Bearer " + SUPABASE_KEY,
  "Content-Type": "application/json",
};

function isProductKey(key) {
  return key.indexOf("product:") === 0;
}

function toRow(p) {
  return {
    id: p.id,
    category: p.category,
    season: p.season,
    name: p.name,
    price: String(p.price != null ? p.price : ""),
    fabric: p.fabric,
    fabric_details: p.fabricDetails || "",
    free_size: !!p.freeSize,
    custom_sizes: p.customSizes || "",
    has_fit: !!p.hasFit,
    min_height: p.minHeight != null ? p.minHeight : null,
    max_height: p.maxHeight != null ? p.maxHeight : null,
    max_weight: p.maxWeight != null ? p.maxWeight : null,
    in_stock: p.inStock !== false,
    colors: p.colors || [],
  };
}

function fromRow(r) {
  return {
    id: r.id,
    category: r.category,
    season: r.season,
    name: r.name,
    price: r.price,
    fabric: r.fabric,
    fabricDetails: r.fabric_details || "",
    freeSize: r.free_size,
    customSizes: r.custom_sizes,
    hasFit: r.has_fit,
    minHeight: r.min_height,
    maxHeight: r.max_height,
    maxWeight: r.max_weight,
    inStock: r.in_stock,
    colors: r.colors || [],
  };
}

function makeSupabaseBackend() {
  return {
    list: function (prefix, shared) {
      if (prefix === undefined) prefix = "";
      if (shared === undefined) shared = true;
      if (prefix.indexOf("product:") === 0 || prefix === "") {
        return fetch(REST_URL + "?select=id", { headers: HEADERS }).then(function (res) {
          if (!res.ok) throw new Error("list failed: " + res.status);
          return res.json();
        }).then(function (rows) {
          return { keys: rows.map(function (r) { return "product:" + r.id; }), prefix: prefix, shared: shared };
        });
      }
      // Generic prefix listing against kv_store (e.g. "order:123:" for order history)
      return fetch(KV_URL + "?key=like." + encodeURIComponent(prefix + "*") + "&select=key", { headers: HEADERS })
        .then(function (res) {
          if (!res.ok) throw new Error("list failed: " + res.status);
          return res.json();
        })
        .then(function (rows) {
          return { keys: rows.map(function (r) { return r.key; }), prefix: prefix, shared: shared };
        });
    },

    get: function (key, shared) {
      if (shared === undefined) shared = true;
      if (!isProductKey(key)) {
        return fetch(KV_URL + "?key=eq." + encodeURIComponent(key) + "&select=value", { headers: HEADERS })
          .then(function (res) {
            if (!res.ok) throw new Error("get failed: " + res.status);
            return res.json();
          })
          .then(function (rows) {
            if (!rows.length) throw new Error("not found");
            return { key: key, value: rows[0].value, shared: shared };
          });
      }
      var id = key.replace(/^product:/, "");
      return fetch(REST_URL + "?id=eq." + encodeURIComponent(id) + "&select=*", { headers: HEADERS })
        .then(function (res) {
          if (!res.ok) throw new Error("get failed: " + res.status);
          return res.json();
        })
        .then(function (rows) {
          if (!rows.length) throw new Error("not found");
          return { key: key, value: JSON.stringify(fromRow(rows[0])), shared: shared };
        });
    },

    set: function (key, value, shared) {
      if (shared === undefined) shared = true;
      if (!isProductKey(key)) {
        return fetch(KV_URL + "?on_conflict=key", {
          method: "POST",
          headers: Object.assign({}, HEADERS, { Prefer: "resolution=merge-duplicates,return=representation" }),
          body: JSON.stringify([{ key: key, value: value }]),
        }).then(function (res) {
          if (!res.ok) {
            return res.text().then(function (text) {
              throw new Error("set failed: " + res.status + " " + text);
            });
          }
          return { key: key, value: value, shared: shared };
        });
      }
      var product = JSON.parse(value);
      var row = toRow(product);
      return fetch(REST_URL + "?on_conflict=id", {
        method: "POST",
        headers: Object.assign({}, HEADERS, { Prefer: "resolution=merge-duplicates,return=representation" }),
        body: JSON.stringify([row]),
      }).then(function (res) {
        if (!res.ok) {
          return res.text().then(function (text) {
            throw new Error("set failed: " + res.status + " " + text);
          });
        }
        return { key: key, value: value, shared: shared };
      });
    },

    delete: function (key, shared) {
      if (shared === undefined) shared = true;
      var id = key.replace(/^product:/, "");
      return fetch(REST_URL + "?id=eq." + encodeURIComponent(id), {
        method: "DELETE",
        headers: HEADERS,
      }).then(function (res) {
        if (!res.ok) throw new Error("delete failed: " + res.status);
        return { key: key, deleted: true, shared: shared };
      });
    },
  };
}

window.storage = makeSupabaseBackend();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
