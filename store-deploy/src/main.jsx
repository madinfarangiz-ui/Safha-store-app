import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/*
  TEMPORARY storage layer.
  The admin panel and storefront call window.storage.get/set/delete/list —
  this was originally a sandbox-only API. This file makes those same calls
  work in a real deployed site by saving to the browser's local storage
  instead.

  IMPORTANT LIMITATION: this only saves data on the device/browser that
  added it — it does NOT sync between different phones or browsers yet.
  That real syncing comes from swapping this file for a Supabase connection,
  which is the next step after this deploy is confirmed working.
*/
function makeLocalStorageBackend() {
  const k = (key, shared) => `store:${shared ? "shared" : "local"}:${key}`;

  return {
    async get(key, shared = false) {
      const raw = localStorage.getItem(k(key, shared));
      if (raw === null) throw new Error("not found");
      return { key, value: raw, shared };
    },
    async set(key, value, shared = false) {
      localStorage.setItem(k(key, shared), value);
      return { key, value, shared };
    },
    async delete(key, shared = false) {
      localStorage.removeItem(k(key, shared));
      return { key, deleted: true, shared };
    },
    async list(prefix = "", shared = false) {
      const fullPrefix = k(prefix, shared);
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const storageKey = localStorage.key(i);
        if (storageKey && storageKey.startsWith(fullPrefix)) {
          keys.push(storageKey.replace(`store:${shared ? "shared" : "local"}:`, ""));
        }
      }
      return { keys, prefix, shared };
    },
  };
}

window.storage = makeLocalStorageBackend();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
