import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const SUPABASE_URL = "https://rfsgpqmddgtuxhkqaeau.supabase.co";
const SUPABASE_KEY = "sb_publishable_Z2hMA2ZiwUD3NgVMfLBOPQ_Mqx-vCOC";

const REST_URL = ${SUPABASE_URL}/rest/v1/products;
const HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: Bearer ${SUPABASE_KEY},
  "Content-Type": "application/json",
};

function toRow(p) {
  return {
    id: p.id,
    category: p.category,
    season: p.season,
    name: p.name,
    price: String(p.price ?? ""),
    fabric: p.fabric,
    free_size: !!p.freeSize,
    custom_sizes: p.customSizes || "",
    has_fit: !!p.hasFit,
    min_height: p.minHeight ?? null,
    max_height: p.maxHeight ?? null,
    max_weight: p.maxWeight ?? null,
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
    async list(prefix = "", shared = true) {
      const res = await fetch(`${REST_URL}?select=id`, { headers: HEADERS });
      if (!res.ok) throw new Error(`list failed: ${res.status}`);
      const rows = await res.json();
      return { keys: rows.map((r) => `product:${r.id}`), prefix, shared };
    },
    async get(key, shared = true) {
      const id = key.replace(/^product:/, "");
      const res = await fetch(`${REST_URL}?id=eq.${encodeURIComponent(id)}&select=*`, { headers: HEADERS });
      if (!res.ok) throw new Error(`get failed: ${res.status}`);
      const rows = await res.json();
      if (!rows.length) throw new Error("not found");
      return { key, value: JSON.stringify(fromRow(rows[0])), shared };
    },
    async set(key, value, shared = true) {
      const product = JSON.parse(value);
      const row = toRow(product);
      const res = await fetch(`${REST_URL}?on_conflict=id`, {
        method: "POST",
        headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify([row]),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`set failed: ${res.status} ${text}`);
      }
      return { key, value, shared };
    },
    async delete(key, shared = true) {
      const id = key.replace(/^product:/, "");
      const res = await fetch(`${REST_URL}?id=eq.${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: HEADERS,
      });
      if (!res.ok) throw new Error(`delete failed: ${res.status}`);
      return { key, deleted: true, shared };
    },
  };
}

window.storage = makeSupabaseBackend();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);    
