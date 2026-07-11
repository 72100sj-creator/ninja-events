/* ============================================================
   NINJA EVENTS — curtain.js
   LE RIDEAU : la transition signature entre tous les écrans
   (GDD §10.4). Séquence : fermeture complète → changement
   d'écran → ouverture (principe fade-out AVANT fade-in validé
   sur Ninja Stones, en version théâtrale).
   La séquence Rideau de victoire (GDD §11.5) arrive en Phase 2
   et vivra aussi dans ce module.
   ============================================================ */
"use strict";

const Curtain = (() => {

  const el = () => document.getElementById("curtain");
  const DURATION = 440;   // légèrement > au transition-duration CSS
  let busy = false;

  /** Durée réelle (1 ms si animations réduites). */
  function duration() {
    const scene = document.getElementById("app");
    const reduced =
      scene.dataset.motion === "reduced" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return reduced ? 20 : DURATION;
  }

  /**
   * Transition rideau : ferme, exécute `swap()` (changement
   * d'écran), puis rouvre. Ignore les demandes pendant une
   * transition en cours (anti double-tap).
   */
  function transition(swap) {
    if (busy) return;
    busy = true;

    const curtain = el();
    curtain.classList.add("blocking", "closed");
    GameAudio.play("curtain-close");

    setTimeout(() => {
      try { swap(); } catch (e) { console.error("[Curtain] swap :", e); }

      // Petit temps « noir » au centre, comme entre deux scènes.
      setTimeout(() => {
        curtain.classList.remove("closed");
        GameAudio.play("curtain-open");
        setTimeout(() => {
          curtain.classList.remove("blocking");
          busy = false;
        }, duration());
      }, 80);
    }, duration());
  }

  return { transition };
})();
