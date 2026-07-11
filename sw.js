/* ============================================================
   NINJA EVENTS — sw.js (service worker)
   Stratégie « cache d'abord » (GDD §14.7) :
   - tout le cœur du jeu est mis en cache à l'installation ;
   - le jeu fonctionne ensuite 100 % hors ligne ;
   - CACHE_VERSION est incrémenté à CHAQUE livraison, l'ancienne
     version est purgée automatiquement.
   ============================================================ */
"use strict";

const CACHE_VERSION = "ninja-events-v0.3.1";

/* Tous les fichiers du cœur du jeu. À maintenir à chaque livraison. */
const CORE_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/base.css",
  "./css/scene.css",
  "./css/ui.css",
  "./css/themes.css",
  "./css/animations.css",
  "./js/save.js",
  "./js/audio.js",
  "./js/scene-engine.js",
  "./js/scene-debug.js",
  "./js/levels-index.js",
  "./js/levels/act1.js",
  "./js/families/cases.js",
  "./js/progress.js",
  "./js/curtain.js",
  "./js/main.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png"
];

/* Installation : préchargement du cœur. */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(CORE_FILES))
      .then(() => self.skipWaiting())
  );
});

/* Activation : purge des anciennes versions. */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* Requêtes : cache d'abord, réseau en secours (puis mise en cache). */
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Ne mettre en cache que les réponses valides de même origine.
        if (response.ok && event.request.url.startsWith(self.location.origin)) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then(c => c.put(event.request, copy));
        }
        return response;
      });
    })
  );
});
