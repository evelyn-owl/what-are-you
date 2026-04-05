const CACHE = 'htoty-v6';
const ASSETS = [
  './',
  './index.html',
  './icon.svg',
  './manifest.json',
  './data/animals.json',
  './data/hp.json',
  './data/peculiar.json',
  './data/food.json',
  './data/mythical.json',
  './data/hp_knowledge.json',
  './data/hp_harry.json',
  './data/hp_hermione.json',
  './data/hp_ron.json',
  './data/hp_ginny.json',
  './data/hp_snape.json',
  './data/hp_dumbledore.json',
  './data/hp_draco.json',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
