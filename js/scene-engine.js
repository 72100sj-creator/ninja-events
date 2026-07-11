/* ============================================================
   NINJA EVENTS — scene-engine.js
   Scene Engine 2.0 (GDD §14.2).
   Les niveaux sont définis en CASES (colonne, ligne) — jamais en
   pixels. Ce module pose les variables CSS (--cols, --rows, --x,
   --y, --w, --h) que scene.css convertit en pourcentages :
   le rendu est ainsi identique sur tous les appareils.
   ============================================================ */
"use strict";

const SceneEngine = (() => {

  /**
   * Prépare une grille logique dans un conteneur.
   * @param {HTMLElement} gridEl  l'élément .puzzle-grid
   * @param {number} cols  colonnes logiques
   * @param {number} rows  lignes logiques
   */
  function setupGrid(gridEl, cols, rows) {
    gridEl.innerHTML = "";
    gridEl.style.setProperty("--cols", cols);
    gridEl.style.setProperty("--rows", rows);
    gridEl.dataset.cols = cols;
    gridEl.dataset.rows = rows;

    // Sol : une cellule décorative par case (damier discret).
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        gridEl.appendChild(makeEl("grid-cell", x, y, 1, 1));
      }
    }
    return gridEl;
  }

  /**
   * Crée un élément positionné en coordonnées logiques.
   * @param {string} className  grid-piece | grid-target | grid-wall | grid-cell
   * @param {number} x  colonne (0 = gauche)
   * @param {number} y  ligne  (0 = haut)
   * @param {number} w  largeur en cases
   * @param {number} h  hauteur en cases
   */
  function makeEl(className, x, y, w = 1, h = 1) {
    const el = document.createElement("div");
    el.className = className;
    moveEl(el, x, y);
    el.style.setProperty("--w", w);
    el.style.setProperty("--h", h);
    return el;
  }

  /** Déplace un élément vers une case logique (le CSS anime la transition). */
  function moveEl(el, x, y) {
    el.style.setProperty("--x", x);
    el.style.setProperty("--y", y);
    el.dataset.x = x;
    el.dataset.y = y;
  }

  /** Ajoute un élément logique à la grille et le retourne. */
  function place(gridEl, className, x, y, w, h) {
    const el = makeEl(className, x, y, w, h);
    gridEl.appendChild(el);
    return el;
  }

  return { setupGrid, place, moveEl, makeEl };
})();
