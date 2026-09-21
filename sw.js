const CACHE_NAME = "idjlt-n5-v55";
const TEXTBOOK_CACHE = "idjlt-textbooks-v1";
// Retired private documents: also remove copies saved by earlier app versions.
const RETIRED_DOCUMENTS = ["lesson11-vocabulary.pdf", "lesson14.pdf", "adjective-forms.pdf"];
const isRetiredDocument = url => RETIRED_DOCUMENTS.some(name => new URL(url).pathname === new URL(`./assets/textbooks/${name}`, self.location.href).pathname);
const APP_SHELL = [
  "./",
  "./index.html",
  "./words.html",
  "./lesson.html",
  "./custom.html",
  "./lesson11.html",
  "./lesson14.html",
  "./verb-dictionary.html",
  "./adjectives-i.html",
  "./adjectives-na.html",
  "./grammar-demo.html",
  "./grammar-demo.css?v=73",
  "./grammar-demo.js?v=73",
  "./forms-library.js?v=73",
  "./assets/wanakana/wanakana.min.js?v=73",
  "./supplemental-data.js?v=73",
  "./style.css?v=73",
  "./app.js?v=73",
  "./data.js?v=73",
  "./kanji-data.js?v=73",
  "./phrases.html",
  "./phrases-data.js?v=73",
  "./textbooks.html",
  "./interview.html",
  "./interview-data.js?v=73",
  "./interview.js?v=73",
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
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map(async key => {
        if (key !== CACHE_NAME && key !== TEXTBOOK_CACHE) return caches.delete(key);
        const cache = await caches.open(key);
        const requests = await cache.keys();
        await Promise.all(requests.filter(request => isRetiredDocument(request.url)).map(request => cache.delete(request)));
      }));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  if (isRetiredDocument(event.request.url)) {
    event.respondWith(Promise.resolve(new Response("Not found", { status: 404 })));
    return;
  }
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request, { ignoreSearch: true }).then(cached => cached || caches.match("./index.html")))
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
