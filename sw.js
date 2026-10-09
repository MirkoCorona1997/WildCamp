const CACHE = "wildcamp-tiles-v1";
const SHELL = "wildcamp-shell-v6";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./maplibre-gl.js",
  "./maplibre-gl.css",
  "./icon-180.png",
  "./icon-512.png",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL).then((cache) => cache.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

function isTile(url) {
  return /basemaps\.cartocdn\.com|arcgisonline\.com|tile\.opentopomap\.org|tile-cyclosm|openstreetmap\.fr|waymarkedtrails\.org/.test(url);
}

self.addEventListener("fetch", (event) => {
  const url = event.request.url;
  if (isTile(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(event.request, { ignoreSearch: true });
      if (hit) return hit;
      try {
        const res = await fetch(event.request);
        if (res && res.ok) cache.put(event.request, res.clone());
        return res;
      } catch (err) {
        return hit || Response.error();
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(SHELL);
    try {
      const res = await fetch(event.request);
      if (res && res.ok && new URL(url).origin === self.location.origin) cache.put(event.request, res.clone());
      return res;
    } catch (err) {
      return (await cache.match(event.request)) || (await cache.match("./index.html")) || Response.error();
    }
  })());
});
