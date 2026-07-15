/* ============================================================
   NINJA EVENTS — sw.js (service worker)
   Stratégie « cache d'abord » (GDD §14.7) :
   - tout le cœur du jeu est mis en cache à l'installation ;
   - le jeu fonctionne ensuite 100 % hors ligne ;
   - CACHE_VERSION est incrémenté à CHAQUE livraison, l'ancienne
     version est purgée automatiquement.
   ============================================================ */
"use strict";

const CACHE_VERSION = "ninja-events-v1.4.0";

/* Tous les fichiers du cœur du jeu. À maintenir à chaque livraison.
   NB : les musiques/ambiances des actes II-III ne sont PAS préchargées —
   elles entrent dans le cache à la première visite en ligne de l'acte
   (stratégie « réseau puis cache » du gestionnaire fetch ci-dessous). */
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
  "./js/levels/act2.js",
  "./js/levels/act2-lights.js",
  "./js/levels/act3.js",
  "./js/levels/act4.js",
  "./js/levels/act5.js",
  "./js/families/cases.js",
  "./js/families/cables.js",
  "./js/families/lights.js",
  "./js/progress.js",
  "./js/achievements.js",
  "./js/curtain.js",
  "./js/main.js",
  "./assets/audio/music-act1.m4a",
  "./assets/audio/ambient-backstage.m4a",
  "./assets/audio/tap.m4a",
  "./assets/audio/curtain-close.m4a",
  "./assets/audio/curtain-open.m4a",
  "./assets/audio/case-roll.m4a",
  "./assets/audio/case-lock.m4a",
  "./assets/audio/level-complete.m4a",
  "./assets/audio/undo.m4a",
  "./assets/audio/restart.m4a",
  "./assets/audio/three-knocks.m4a",
  "./assets/audio/spotlight.m4a",
  "./assets/audio/applause.m4a",
  "./assets/audio/cable-step.m4a",
  "./assets/audio/cable-plug.m4a",
  "./assets/audio/spot-turn.m4a",
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
  // Navigation (même avec ?debug=1) : toujours servir la coquille.
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match("./index.html").then(c => c || fetch(event.request))
    );
    return;
  }
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
