/* ============================================================
   NINJA EVENTS — curtain.js
   1) transition() : LE RIDEAU entre les écrans (GDD §10.4).
   2) playVictory() : LA SÉQUENCE RIDEAU de victoire (GDD §11.5),
      le moment signature du jeu :
      noir → trois coups → le rideau s'ouvre sur le plateau DU
      JOUEUR → projecteurs un à un → public + pétales → panneau.
      Skippable d'un toucher dès la deuxième victoire ; réduite à
      un simple fondu si « Réduire les animations » est activé.
   ============================================================ */
"use strict";

const Curtain = (() => {

  const DURATION = 440;   // transition entre écrans (≈ CSS)
  let busy = false;

  /** Le joueur a-t-il demandé des animations réduites ? */
  function reducedMotion() {
    const scene = document.getElementById("app");
    return scene.dataset.motion === "reduced" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function duration() { return reducedMotion() ? 20 : DURATION; }

  /* ----------------------------------------------------------
     1) Transition entre écrans (inchangée depuis la v0.1.0)
     ---------------------------------------------------------- */
  function transition(swap) {
    if (busy) return;
    busy = true;

    const curtain = document.getElementById("curtain");
    curtain.classList.add("blocking", "closed");
    GameAudio.play("curtain-close");

    setTimeout(() => {
      try { swap(); } catch (e) { console.error("[Curtain] swap :", e); }
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

  /* ----------------------------------------------------------
     2) Séquence Rideau de victoire (GDD §11.5)
     ---------------------------------------------------------- */

  /* Chronologie (ms depuis le début) → classe de phase ajoutée à #rideau.
     Les classes déclenchent les transitions/animations CSS. */
  const TIMELINE = [
    { at:    0, cls: "p-black",    sfx: null },             // noir de salle
    { at:  550, cls: "p-knocks",   sfx: "three-knocks" },   // toc, toc, toc
    { at: 2100, cls: "p-open",     sfx: "curtain-open" },   // le rideau s'ouvre
    { at: 2800, cls: "p-spots",    sfx: "spotlight" },      // projecteurs 1 à 1
    { at: 3700, cls: "p-audience", sfx: "applause" }        // public + pétales
  ];
  const TOTAL = 5800;   // fin de séquence → panneau de victoire

  let timers = [];
  let finishFn = null;
  let skipHandler = null;

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  /** Saute directement à l'état final de la séquence. */
  function skipToEnd(rideau) {
    clearTimers();
    TIMELINE.forEach(step => rideau.classList.add(step.cls));
    finish();
  }

  function finish() {
    if (!finishFn) return;
    const fn = finishFn;
    finishFn = null;
    fn();
  }

  /**
   * Joue la séquence Rideau de victoire.
   * @param {object} opts
   *   - skippable : true dès la deuxième victoire (GDD §11.5)
   *   - onDone    : appelé à la fin (affichage du panneau d'éventails)
   */
  function playVictory({ skippable = false, onDone = () => {} } = {}) {
    const rideau = document.getElementById("rideau");
    finishFn = onDone;
    GameAudio.duck(true);   // la musique laisse la place au spectacle

    // Animations réduites : simple fondu, pas de séquence.
    if (reducedMotion()) {
      rideau.classList.remove("hidden");
      rideau.className = "rideau p-black p-open";   // voile sombre léger
      setTimeout(finish, 250);
      return;
    }

    // État initial propre puis déroulé de la chronologie.
    rideau.className = "rideau";
    // Reflow pour garantir le départ des transitions CSS.
    void rideau.offsetWidth;

    TIMELINE.forEach(step => {
      timers.push(setTimeout(() => {
        rideau.classList.add(step.cls);
        if (step.sfx) GameAudio.play(step.sfx);
        if (step.cls === "p-knocks") GameAudio.haptic([25, 455, 25, 455, 25]);
      }, step.at));
    });
    timers.push(setTimeout(finish, TOTAL));

    // Skip d'un toucher (dès la deuxième victoire).
    if (skipHandler) rideau.removeEventListener("pointerdown", skipHandler);
    skipHandler = () => { if (skippable) skipToEnd(rideau); };
    rideau.addEventListener("pointerdown", skipHandler);
  }

  /** Cache la séquence (au chargement d'un niveau / retour au carnet). */
  function resetVictory() {
    clearTimers();
    finishFn = null;
    GameAudio.duck(false);   // la musique revient
    const rideau = document.getElementById("rideau");
    if (rideau) rideau.className = "rideau hidden";
  }

  return { transition, playVictory, resetVictory };
})();
