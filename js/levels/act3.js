/* ============================================================
   NINJA EVENTS — levels/act3.js
   Les 12 missions de l'Acte III (Festival des Lanternes) —
   LES TROIS FAMILLES ENTRELACÉES (GDD §7.2 : jamais plus de
   quelques niveaux d'affilée de la même famille).
   ⚠️ Chaque niveau est VÉRIFIÉ par son solveur (optimum prouvé).
   ============================================================ */
"use strict";

Levels.register("act3", [
  {
    id: "A3-01",
    family: "cases",
    name: { fr: "Les lanternes du champ", en: "Field Lanterns" },
    difficulty: 3,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-1x1", at: [0, 0] },
      { type: "case-1x1", at: [5, 0] },
      { type: "case-1x1", at: [0, 7] },
      { type: "case-1x1", at: [5, 7] }
    ],
    targets: [
      { for: "case-1x1", at: [3, 3] },
      { for: "case-1x1", at: [2, 3] },
      { for: "case-1x1", at: [3, 4] },
      { for: "case-1x1", at: [2, 4] }
    ],
    walls: [[0, 3], [5, 4]],
    modifiers: [],
    par: { moves2fans: 33, moves3fans: 22 },   // optimum prouvé : 20
    reward: null
  },
  {
    id: "A3-02",
    family: "cables",
    name: { fr: "Guirlandes", en: "Garlands" },
    difficulty: 3,
    grid: { cols: 6, rows: 7 },
    pairs: [
      { color: 0, a: [0, 0], b: [5, 0] },
      { color: 1, a: [1, 1], b: [4, 1] },
      { color: 2, a: [2, 2], b: [3, 2] },
      { color: 3, a: [0, 6], b: [5, 6] }
    ],
    walls: [[2, 4], [3, 4]],
    modifiers: [],
    par: { moves2fans: 28, moves3fans: 20 },   // optimum prouvé : 18
    reward: null
  },
  {
    id: "A3-03",
    family: "lights",
    name: { fr: "Lucioles", en: "Fireflies" },
    difficulty: 3,
    grid: { cols: 6, rows: 8 },
    projectors: [
      { at: [1, 1], dir: 3 },
      { at: [4, 3], dir: 0 },
      { at: [2, 6], dir: 2 }
    ],
    targets: [[1, 5], [0, 3], [5, 6]],
    forbidden: [[3, 1]],
    walls: [[1, 6]],
    modifiers: [],
    par: { moves2fans: 10, moves3fans: 6 },   // optimum prouvé : 6
    reward: null
  },
  {
    id: "A3-04",
    family: "cases",
    name: { fr: "Le convoi de nuit", en: "The Night Convoy" },
    difficulty: 3,
    grid: { cols: 6, rows: 9 },
    pieces: [
      { type: "case-1x2", at: [0, 0] },
      { type: "case-1x2", at: [5, 0] },
      { type: "case-2x2", at: [2, 4] }
    ],
    targets: [
      { for: "case-1x2", at: [5, 7] },
      { for: "case-1x2", at: [0, 7] },
      { for: "case-2x2", at: [2, 0] }
    ],
    walls: [[2, 2], [3, 7]],
    modifiers: ["cat"],
    cat: [0, 4],
    par: { moves2fans: 38, moves3fans: 25 },   // optimum prouvé : 22
    reward: null
  },
  {
    id: "A3-05",
    family: "cables",
    name: { fr: "Le générateur", en: "The Generator" },
    difficulty: 3,
    grid: { cols: 6, rows: 7 },
    pairs: [
      { color: 0, a: [0, 0], b: [5, 1] },
      { color: 1, a: [0, 1], b: [5, 2] },
      { color: 2, a: [0, 2], b: [5, 3] },
      { color: 3, a: [0, 4], b: [5, 5] },
      { color: 4, a: [0, 5], b: [5, 6] }
    ],
    walls: [[3, 0]],
    modifiers: [],
    par: { moves2fans: 55, moves3fans: 39 },   // optimum prouvé : 35
    reward: null
  },
  {
    id: "A3-06",
    family: "lights",
    name: { fr: "Les allées sombres", en: "The Dark Alleys" },
    difficulty: 4,
    grid: { cols: 6, rows: 8 },
    projectors: [
      { at: [0, 0], dir: 3 },
      { at: [5, 0], dir: 1 },
      { at: [0, 7], dir: 2 },
      { at: [5, 7], dir: 0 }
    ],
    targets: [[3, 0], [5, 4], [2, 7], [0, 3]],
    forbidden: [[2, 3], [3, 4]],
    walls: [],
    modifiers: [],
    par: { moves2fans: 7, moves3fans: 4 },   // optimum prouvé : 4
    reward: null
  },
  {
    id: "A3-07",
    family: "cases",
    name: { fr: "La scène sous les étoiles", en: "The Stage Beneath the Stars" },
    difficulty: 4,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-2x2", at: [4, 0] },
      { type: "case-1x1", at: [1, 2] },
      { type: "case-1x1", at: [4, 4] },
      { type: "case-1x1", at: [1, 6] }
    ],
    targets: [
      { for: "case-2x2", at: [0, 6] },
      { for: "case-1x1", at: [5, 7] },
      { for: "case-1x1", at: [0, 0] },
      { for: "case-1x1", at: [5, 0] }
    ],
    walls: [[3, 3], [2, 5]],
    modifiers: [],
    par: { moves2fans: 39, moves3fans: 26 },   // optimum prouvé : 23
    reward: null
  },
  {
    id: "A3-08",
    family: "cables",
    name: { fr: "La régie du festival", en: "The Festival Booth" },
    difficulty: 4,
    grid: { cols: 6, rows: 7 },
    pairs: [
      { color: 0, a: [0, 0], b: [2, 3] },
      { color: 1, a: [5, 0], b: [3, 3] },
      { color: 2, a: [0, 6], b: [2, 5] },
      { color: 3, a: [5, 6], b: [3, 5] }
    ],
    walls: [[2, 1], [3, 1]],
    modifiers: [],
    par: { moves2fans: 31, moves3fans: 22 },   // optimum prouvé : 20
    reward: null
  },
  {
    id: "A3-09",
    family: "lights",
    name: { fr: "Feux de la rampe", en: "Limelight" },
    difficulty: 4,
    grid: { cols: 6, rows: 8 },
    projectors: [
      { at: [1, 0], dir: 3 },
      { at: [4, 0], dir: 0 },
      { at: [0, 4], dir: 1 },
      { at: [5, 4], dir: 3 },
      { at: [2, 6], dir: 2 }
    ],
    targets: [[1, 3], [4, 5], [3, 4], [5, 6], [0, 1]],
    forbidden: [[3, 2]],
    walls: [[2, 4]],
    modifiers: [],
    par: { moves2fans: 20, moves3fans: 12 },   // optimum prouvé : 10
    reward: null
  },
  {
    id: "A3-10",
    family: "cases",
    name: { fr: "Le grand déchargement", en: "The Great Unloading" },
    difficulty: 4,
    grid: { cols: 6, rows: 9 },
    pieces: [
      { type: "case-2x2", at: [0, 0] },
      { type: "case-1x2", at: [3, 0] },
      { type: "case-1x1", at: [5, 2] },
      { type: "case-1x1", at: [0, 5] }
    ],
    targets: [
      { for: "case-2x2", at: [4, 7] },
      { for: "case-1x2", at: [0, 6] },
      { for: "case-1x1", at: [3, 4] },
      { for: "case-1x1", at: [2, 4] }
    ],
    walls: [[2, 2], [5, 6], [0, 3]],
    modifiers: [],
    par: { moves2fans: 45, moves3fans: 30 },   // optimum prouvé : 27
    reward: null
  },
  {
    id: "A3-11",
    family: "cables",
    name: { fr: "Nuit électrique", en: "Electric Night" },
    difficulty: 5,
    grid: { cols: 6, rows: 8 },
    pairs: [
      { color: 0, a: [0, 0], b: [2, 3] },
      { color: 1, a: [5, 0], b: [4, 4] },
      { color: 2, a: [0, 7], b: [1, 4] },
      { color: 3, a: [5, 7], b: [3, 6] },
      { color: 4, a: [2, 1], b: [3, 2] }
    ],
    walls: [[0, 4], [5, 3]],
    modifiers: [],
    par: { moves2fans: 38, moves3fans: 27 },   // optimum prouvé : 24
    reward: null
  },
  {
    id: "A3-12",
    family: "lights",
    name: { fr: "La générale des Lanternes", en: "The Lantern Dress Rehearsal" },
    difficulty: 5,
    grid: { cols: 6, rows: 8 },
    projectors: [
      { at: [0, 0], dir: 0 },
      { at: [5, 0], dir: 1 },
      { at: [0, 7], dir: 3 },
      { at: [5, 7], dir: 2 },
      { at: [2, 3], dir: 2 },
      { at: [3, 4], dir: 0 }
    ],
    targets: [[3, 0], [5, 4], [2, 7], [0, 2], [2, 5], [3, 2]],
    forbidden: [[1, 3], [4, 5], [2, 2]],
    walls: [],
    modifiers: [],
    par: { moves2fans: 10, moves3fans: 6 },   // optimum prouvé : 6
    reward: null
  }
]);
