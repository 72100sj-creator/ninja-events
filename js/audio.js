/* ============================================================
   NINJA EVENTS — audio.js
   Squelette du système audio. Les fichiers sonores arrivent en
   Phase 2 ; l'API est déjà en place pour que le reste du code
   n'ait jamais à changer (GDD §12).
   Contrainte iOS : l'audio doit être « débloqué » par un premier
   geste utilisateur → Audio.unlock() est appelé sur l'écran titre.
   ============================================================ */
"use strict";

const GameAudio = (() => {

  let unlocked = false;
  const volumes = { music: 0.8, sfx: 1, ambient: 0.6 };

  return {
    /** À appeler au premier toucher (écran titre) — contrainte Safari iOS. */
    unlock() {
      if (unlocked) return;
      unlocked = true;
      // Phase 2 : création du AudioContext / préchargement des sons ici.
      console.info("[Audio] débloqué (prêt pour la Phase 2).");
    },

    /** Applique les volumes depuis les réglages. */
    setVolumes(v) {
      Object.assign(volumes, v);
      // Phase 2 : appliquer aux pistes en cours.
    },

    /**
     * Joue un effet sonore par nom logique.
     * Phase 1 : silencieux (trace console en debug uniquement).
     */
    play(name) {
      if (window.DEBUG_SCENE) console.info("[Audio] ♪", name, volumes);
    },

    /** Micro-vibration (si activée dans les réglages et supportée). */
    haptic(ms = 10) {
      const s = Save.get().settings;
      if (s.haptics && navigator.vibrate) navigator.vibrate(ms);
    }
  };
})();
