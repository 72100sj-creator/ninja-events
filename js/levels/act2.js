/* ============================================================
   NINJA EVENTS — levels/act2.js
   Les 8 premières missions de l'Acte II (Théâtre Suzume) —
   famille B « Câbles » (GDD §5.2). Format déclaratif, AUCUN code.
   ⚠️ Chaque niveau est VÉRIFIÉ par le solveur Câbles : solvabilité
   prouvée, seuils dérivés du total minimal de cases de câble.
   ============================================================ */
"use strict";

Levels.register("act2", [
  {
    id: "A2-01",
    family: "cables",
    name: { fr: "Le premier branchement", en: "The First Plug" },
    difficulty: 1,
    grid: { cols: 4, rows: 5 },
    pairs: [
      { color: 0, a: [1, 0], b: [1, 4] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 7, moves3fans: 5 },   // minimum prouvé : 5 cases
    reward: null
  },
  {
    id: "A2-02",
    family: "cables",
    name: { fr: "Deux couleurs", en: "Two Colours" },
    difficulty: 1,
    grid: { cols: 5, rows: 5 },
    pairs: [
      { color: 0, a: [0, 0], b: [0, 4] },
      { color: 1, a: [4, 0], b: [4, 4] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 16, moves3fans: 11 },   // minimum prouvé : 10 cases
    reward: null
  },
  {
    id: "A2-03",
    family: "cables",
    name: { fr: "Le détour", en: "The Detour" },
    difficulty: 1,
    grid: { cols: 5, rows: 5 },
    pairs: [
      { color: 0, a: [0, 0], b: [4, 0] },
      { color: 1, a: [0, 2], b: [4, 2] }
    ],
    walls: [[2, 0], [2, 1]],
    modifiers: [],
    par: { moves2fans: 26, moves3fans: 18 },   // minimum prouvé : 16 cases
    reward: null
  },
  {
    id: "A2-04",
    family: "cables",
    name: { fr: "Le nœud simple", en: "The Simple Knot" },
    difficulty: 2,
    grid: { cols: 5, rows: 6 },
    pairs: [
      { color: 0, a: [0, 0], b: [3, 4] },
      { color: 1, a: [4, 0], b: [1, 4] },
      { color: 2, a: [2, 1], b: [2, 4] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 35, moves3fans: 25 },   // minimum prouvé : 22 cases
    reward: null
  },
  {
    id: "A2-05",
    family: "cables",
    name: { fr: "La console lumière", en: "The Lighting Desk" },
    difficulty: 2,
    grid: { cols: 6, rows: 6 },
    pairs: [
      { color: 0, a: [0, 0], b: [5, 2] },
      { color: 1, a: [0, 1], b: [5, 3] },
      { color: 2, a: [0, 2], b: [5, 4] },
      { color: 3, a: [0, 3], b: [5, 5] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 51, moves3fans: 36 },   // minimum prouvé : 32 cases
    reward: null
  },
  {
    id: "A2-06",
    family: "cables",
    name: { fr: "Sous le praticable", en: "Under the Riser" },
    difficulty: 3,
    grid: { cols: 5, rows: 6 },
    pairs: [
      { color: 0, a: [0, 0], b: [4, 5] },
      { color: 1, a: [3, 1], b: [4, 3] },
      { color: 2, a: [1, 1], b: [1, 4] }
    ],
    walls: [[2, 2], [2, 3]],
    modifiers: [],
    par: { moves2fans: 28, moves3fans: 20 },   // minimum prouvé : 18 cases
    reward: null
  },
  {
    id: "A2-07",
    family: "cables",
    name: { fr: "Côté cour, côté jardin", en: "Stage Left, Stage Right" },
    difficulty: 3,
    grid: { cols: 6, rows: 7 },
    pairs: [
      { color: 0, a: [0, 2], b: [0, 4] },
      { color: 1, a: [5, 1], b: [5, 3] },
      { color: 2, a: [3, 0], b: [5, 4] },
      { color: 3, a: [0, 0], b: [4, 6] }
    ],
    walls: [[0, 3], [5, 2]],
    modifiers: [],
    par: { moves2fans: 44, moves3fans: 31 },   // minimum prouvé : 28 cases
    reward: null
  },
  {
    id: "A2-08",
    family: "cables",
    name: { fr: "La générale électrique", en: "The Electric Rehearsal" },
    difficulty: 4,
    grid: { cols: 6, rows: 7 },
    pairs: [
      { color: 0, a: [0, 0], b: [2, 2] },
      { color: 1, a: [5, 0], b: [3, 2] },
      { color: 2, a: [0, 6], b: [2, 4] },
      { color: 3, a: [5, 6], b: [3, 4] },
      { color: 4, a: [0, 3], b: [5, 3] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 41, moves3fans: 29 },   // minimum prouvé : 26 cases
    reward: null
  }
]);
