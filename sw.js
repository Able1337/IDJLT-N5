const CACHE_NAME = "idjlt-n5-v38";
const TEXTBOOK_CACHE = "idjlt-textbooks-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css?v=56",
  "./app.js?v=56",
  "./data.js?v=56",
  "./kanji-data.js?v=56",
  "./phrases.html",
  "./phrases-data.js?v=56",
  "./textbooks.html",
  "./interview.html",
  "./interview-data.js?v=56",
  "./interview.js?v=56",
  "./assets/pdfjs/pdf.mjs",
  "./assets/pdfjs/pdf.worker.mjs",
  "./manifest.webmanifest",
  "./app-icon.svg",
  "./app-icon-192.png",
  "./app-icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME && key !== TEXTBOOK_CACHE).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html")))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match("./index.html")))
  );
});
