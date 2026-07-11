/* ============================================================
   NINJA EVENTS — families/cases.js
   Famille A « Le Ballet des Caisses » (GDD §5.1).

   PHASE 1 : MOTEUR VIDE.
   Ce module sait uniquement AFFICHER un niveau (sol, murs,
   marques au gaffeur, flight cases) via le Scene Engine.
   Les règles, la poussée, l'annulation et la victoire arrivent
   en Phase 2 — l'API (init/destroy) ne changera pas.
   ============================================================ */
"use strict";

const FamilyCases = (() => {

  /** Dimensions logiques par type de pièce. */
  const SIZES = {
    "case-1x1": { w: 1, h: 1 },
    "case-1x2": { w: 1, h: 2 },
    "case-2x2": { w: 2, h: 2 }
  };

  /** Applique la rotation éventuelle (rot: 0 = vertical, 1 = horizontal). */
  function sizeOf(piece) {
    const s = SIZES[piece.type] || { w: 1, h: 1 };
    return piece.rot === 1 ? { w: s.h, h: s.w } : { ...s };
  }

  /**
   * Affiche un niveau dans la grille.
   * @param {object} level   données du niveau (format GDD §14.5)
   * @param {HTMLElement} gridEl  l'élément .puzzle-grid
   */
  function init(level, gridEl) {
    SceneEngine.setupGrid(gridEl, level.grid.cols, level.grid.rows);

    // Murs / piliers
    for (const [x, y] of level.walls || []) {
      SceneEngine.place(gridEl, "grid-wall", x, y, 1, 1);
    }

    // Marques au gaffeur (destinations)
    for (const t of level.targets || []) {
      const s = SIZES[t.for] || { w: 1, h: 1 };
      SceneEngine.place(gridEl, "grid-target", t.at[0], t.at[1], s.w, s.h);
    }

    // Flight cases
    for (const p of level.pieces || []) {
      const s = sizeOf(p);
      const el = SceneEngine.place(gridEl, "grid-piece", p.at[0], p.at[1], s.w, s.h);
      el.dataset.type = p.type;

      // Phase 1 : un simple retour tactile pour montrer que tout est vivant.
      el.addEventListener("pointerdown", () => {
        GameAudio.haptic(8);
        el.style.transform = "scale(1.04)";
        setTimeout(() => { el.style.transform = ""; }, 140);
      });
    }
  }

  /** Nettoyage à la sortie du niveau. */
  function destroy(gridEl) { gridEl.innerHTML = ""; }

  return { init, destroy };
})();
