// Network first so parents always see fresh results; the cache only answers when there is no signal.
const CACHE = "ttc-v7";
const SHELL = ["./", "index.html", "app.js", "manifest.json", "icon-192.png", "icon-512.png", "data.json", "posts.json"];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const key = new URL(req.url); key.search = "";
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(key.href, copy)); }
      return res;
    }).catch(() => caches.match(key.href).then(m => m || caches.match("index.html")))
  );
});
