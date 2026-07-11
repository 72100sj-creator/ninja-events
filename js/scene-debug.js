/* ============================================================
   NINJA EVENTS — scene-debug.js       (hors production)
   Héritier du scene-debug de Ninja Stones.
   Activation : ajouter ?debug=1 à l'URL (pose window.DEBUG_SCENE).
   Affiche : bordure de scène, coordonnées des cases au toucher,
   version, taille de la scène.
   ============================================================ */
"use strict";

window.DEBUG_SCENE = /[?&]debug=1/.test(location.search);

(() => {
  if (!window.DEBUG_SCENE) return;

  document.addEventListener("DOMContentLoaded", () => {
    const scene = document.getElementById("app");

    // Cadre de scène visible
    scene.style.outline = "2px dashed #F2D437";

    // Bandeau d'information
    const hud = document.createElement("div");
    hud.style.cssText =
      "position:absolute;top:2px;left:2px;z-index:99;font:11px monospace;" +
      "background:rgba(0,0,0,.6);color:#F2D437;padding:3px 7px;border-radius:6px;pointer-events:none;";
    scene.appendChild(hud);

    function refresh() {
      const r = scene.getBoundingClientRect();
      hud.textContent =
        `DEBUG · scène ${Math.round(r.width)}×${Math.round(r.height)} px · ` +
        `ratio ${(r.width / r.height).toFixed(3)} (cible 0.5625)`;
    }
    refresh();
    window.addEventListener("resize", refresh);

    // Coordonnées logiques au toucher de la grille
    scene.addEventListener("pointerdown", (ev) => {
      const grid = ev.target.closest(".puzzle-grid");
      if (!grid) return;
      const r = grid.getBoundingClientRect();
      const cols = Number(grid.dataset.cols || 1);
      const rows = Number(grid.dataset.rows || 1);
      const x = Math.floor((ev.clientX - r.left) / r.width * cols);
      const y = Math.floor((ev.clientY - r.top) / r.height * rows);
      console.info(`[Debug] case touchée : (${x}, ${y})`);
    });

    console.info("[Debug] scene-debug actif.");
  });
})();
