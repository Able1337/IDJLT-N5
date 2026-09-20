const CACHE_NAME = "idjlt-n5-v49";
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
  "./kana.html",
  "./kanji.html",
  "./lesson1.html",
  "./lesson2.html",
  "./lesson3.html",
  "./lesson4.html",
  "./lesson6.html",
  "./lesson7.html",
  "./lesson8.html",
  "./lesson9.html",
  "./lesson10.html",
  "./countries.html",
  "./family_other.html",
  "./family_own.html",
  "./fruits.html",
  "./numbers.html",
  "./practice.html",
  "./vocabulary.html",
  "./practice.js?v=67",
  "./study-core.js?v=67",
  "./exercise-data.js?v=67",
  "./vocabulary.js?v=67",
  "./study-navigation.js?v=67",
  "./study.css?v=67",
  "./lesson11.html",
  "./lesson14.html",
  "./adjectives-i.html",
  "./adjectives-na.html",
  "./grammar-demo.html",
  "./grammar-demo.css?v=67",
  "./grammar-demo.js?v=67",
  "./japanese-input.js?v=67",
  "./assets/wanakana/wanakana.min.js?v=67",
  "./supplemental-data.js?v=67",
  "./style.css?v=67",
  "./app.js?v=67",
  "./data.js?v=67",
  "./kanji-data.js?v=67",
  "./phrases.html",
  "./phrases-data.js?v=67",
  "./textbooks.html",
  "./interview.html",
  "./interview-data.js?v=67",
  "./interview.js?v=67",
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
        if (key !== CACHE_NAME && key !== TEXTBOOK_CACHE) return key.startsWith("idjlt-n5-") ? caches.delete(key) : undefined;
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
  if (new URL(event.request.url).origin !== new URL(self.location.href).origin) return;
  // Full saved media can serve browser range requests without caching partial data.
  if (event.request.headers?.has("range")) {
    event.respondWith((async () => {
      const cached = await caches.match(event.request.url);
      if (!cached || cached.status !== 200) return fetch(event.request);
      const bytes = await cached.arrayBuffer(), range = /^bytes=(\d*)-(\d*)$/.exec(event.request.headers.get("range"));
      if (!range || (!range[1] && !range[2])) return new Response(null,{status:416});
      const start = range[1] ? Number(range[1]) : Math.max(0,bytes.byteLength-Number(range[2]));
      const end = range[1] && range[2] ? Math.min(Number(range[2]),bytes.byteLength-1) : bytes.byteLength-1;
      if (start > end || start >= bytes.byteLength) return new Response(null,{status:416,headers:{"Content-Range":`bytes */${bytes.byteLength}`}});
      const headers = new Headers(cached.headers); headers.set("Content-Range",`bytes ${start}-${end}/${bytes.byteLength}`); headers.set("Content-Length",String(end-start+1)); headers.set("Accept-Ranges","bytes");
      return new Response(bytes.slice(start,end+1),{status:206,headers});
    })().catch(()=>new Response("Offline",{status:503})));
    return;
  }
  const remember = response => {
    if (response.status === 200) {
      const copy=response.clone();
      event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)).catch(()=>{}));
    }
    return response;
  };
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).then(remember).catch(() => caches.match(event.request, { ignoreSearch: true }).then(cached => cached || caches.match("./index.html")))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(remember).catch(() => new Response("Offline", {status:503,headers:{"Content-Type":"text/plain"}})))
  );
});
