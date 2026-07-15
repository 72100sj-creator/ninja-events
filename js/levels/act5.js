/* ============================================================
   NINJA EVENTS — levels/act5.js
   Acte V — LE CONCERT GÉANT 🎆 : 12 missions,
   les trois familles entrelacées (GDD §7.2).
   ⚠️ Chaque niveau est VÉRIFIÉ par son solveur (optimum prouvé).
   ============================================================ */
"use strict";

Levels.register("act5", [
  {
    id: "A5-01",
    family: "cases",
    name: { fr: "Montage à l'aube", en: "Dawn Load-In" },
    difficulty: 4,
    grid: { cols: 6, rows: 9 },
    pieces: [
      { type: "case-1x1", at: [0, 0] },
      { type: "case-1x1", at: [5, 0] },
      { type: "case-1x1", at: [0, 8] },
      { type: "case-1x2", at: [5, 6] }
    ],
    targets: [
      { for: "case-1x1", at: [3, 4] },
      { for: "case-1x1", at: [2, 4] },
      { for: "case-1x1", at: [3, 5] },
      { for: "case-1x2", at: [0, 2] }
    ],
    walls: [[0, 4], [5, 4]],
    modifiers: [],
    par: { moves2fans: 45, moves3fans: 30 },   // optimum prouvé : 27
    reward: null
  },
  {
    id: "A5-02",
    family: "cables",
    name: { fr: "La façade son", en: "The Front of House" },
    difficulty: 4,
    grid: { cols: 6, rows: 9 },
    pairs: [
      { color: 0, a: [0, 0], b: [1, 8] },
      { color: 1, a: [1, 0], b: [2, 8] },
      { color: 2, a: [2, 0], b: [3, 8] },
      { color: 3, a: [3, 0], b: [4, 8] },
      { color: 4, a: [4, 0], b: [5, 8] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 77, moves3fans: 55 },   // optimum prouvé : 50
    reward: null
  },
  {
    id: "A5-03",
    family: "lights",
    name: { fr: "La balance des lumières", en: "The Light Check" },
    difficulty: 4,
    grid: { cols: 6, rows: 9 },
    projectors: [
      { at: [0, 0], dir: 2 },
      { at: [5, 2], dir: 3 },
      { at: [0, 8], dir: 2 },
      { at: [3, 4], dir: 1 },
      { at: [0, 4], dir: 2 }
    ],
    targets: [[3, 0], [5, 6], [2, 8], [3, 1], [2, 4]],
    forbidden: [[1, 2], [4, 7]],
    walls: [],
    modifiers: [],
    par: { moves2fans: 16, moves3fans: 10 },   // optimum prouvé : 8
    reward: null
  },
  {
    id: "A5-04",
    family: "cases",
    name: { fr: "Le piano de la diva", en: "The Diva's Piano" },
    difficulty: 4,
    grid: { cols: 6, rows: 9 },
    pieces: [
      { type: "case-2x2", at: [2, 4] },
      { type: "case-1x1", at: [0, 1] },
      { type: "case-1x1", at: [5, 7] }
    ],
    targets: [
      { for: "case-2x2", at: [0, 0] },
      { for: "case-1x1", at: [5, 8] },
      { for: "case-1x1", at: [4, 0] }
    ],
    walls: [[4, 4], [0, 6]],
    modifiers: ["cat"],
    cat: [1, 2],
    par: { moves2fans: 21, moves3fans: 14 },   // optimum prouvé : 12
    reward: null
  },
  {
    id: "A5-05",
    family: "cables",
    name: { fr: "Pupitres et retours", en: "Desks and Monitors" },
    difficulty: 5,
    grid: { cols: 6, rows: 9 },
    pairs: [
      { color: 0, a: [0, 0], b: [2, 3] },
      { color: 1, a: [5, 0], b: [3, 3] },
      { color: 2, a: [0, 8], b: [2, 5] },
      { color: 3, a: [5, 8], b: [3, 5] },
      { color: 4, a: [0, 4], b: [5, 4] }
    ],
    walls: [[2, 1], [3, 7]],
    modifiers: [],
    par: { moves2fans: 47, moves3fans: 33 },   // optimum prouvé : 30
    reward: null
  },
  {
    id: "A5-06",
    family: "lights",
    name: { fr: "L'entracte", en: "The Intermission" },
    difficulty: 3,
    grid: { cols: 5, rows: 8 },
    projectors: [
      { at: [2, 1], dir: 0 },
      { at: [2, 6], dir: 2 }
    ],
    targets: [[0, 1], [4, 6]],
    forbidden: [[2, 4]],
    walls: [[2, 3]],
    modifiers: [],
    par: { moves2fans: 7, moves3fans: 4 },   // optimum prouvé : 4
    reward: null
  },
  {
    id: "A5-07",
    family: "cases",
    name: { fr: "La fosse", en: "The Pit" },
    difficulty: 5,
    grid: { cols: 6, rows: 9 },
    pieces: [
      { type: "case-2x2", at: [2, 0] },
      { type: "case-1x2", at: [0, 3] },
      { type: "case-1x2", at: [5, 0] },
      { type: "case-1x1", at: [3, 5] }
    ],
    targets: [
      { for: "case-2x2", at: [2, 7] },
      { for: "case-1x2", at: [5, 3] },
      { for: "case-1x2", at: [0, 0] },
      { for: "case-1x1", at: [0, 8] }
    ],
    walls: [[1, 6], [4, 2]],
    modifiers: [],
    par: { moves2fans: 32, moves3fans: 21 },   // optimum prouvé : 19
    reward: null
  },
  {
    id: "A5-08",
    family: "cables",
    name: { fr: "L'artère principale", en: "The Main Feed" },
    difficulty: 5,
    grid: { cols: 6, rows: 9 },
    pairs: [
      { color: 0, a: [0, 0], b: [5, 8] },
      { color: 1, a: [2, 0], b: [5, 2] },
      { color: 2, a: [0, 3], b: [1, 5] },
      { color: 3, a: [4, 4], b: [5, 6] },
      { color: 4, a: [0, 6], b: [2, 7] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 51, moves3fans: 36 },   // optimum prouvé : 32
    reward: null
  },
  {
    id: "A5-09",
    family: "lights",
    name: { fr: "La poursuite sur la star", en: "Spotlight on the Star" },
    difficulty: 5,
    grid: { cols: 6, rows: 9 },
    projectors: [
      { at: [2, 0], dir: 3 },
      { at: [0, 4], dir: 1 },
      { at: [5, 4], dir: 1 },
      { at: [2, 8], dir: 0 },
      { at: [4, 2], dir: 2 }
    ],
    targets: [[2, 4], [1, 4], [5, 7], [2, 6], [4, 0]],
    forbidden: [[0, 2], [4, 7], [3, 8]],
    walls: [[3, 4], [2, 5]],
    modifiers: [],
    par: { moves2fans: 15, moves3fans: 9 },   // optimum prouvé : 7
    reward: null
  },
  {
    id: "A5-10",
    family: "cases",
    name: { fr: "Tout doit partir", en: "Everything Must Go" },
    difficulty: 5,
    grid: { cols: 6, rows: 9 },
    pieces: [
      { type: "case-2x2", at: [4, 7] },
      { type: "case-1x2", at: [0, 0] },
      { type: "case-1x2", at: [1, 7] },
      { type: "case-1x1", at: [3, 4] }
    ],
    targets: [
      { for: "case-2x2", at: [0, 0] },
      { for: "case-1x2", at: [5, 6] },
      { for: "case-1x2", at: [4, 0] },
      { for: "case-1x1", at: [2, 8] }
    ],
    walls: [[2, 3], [5, 4]],
    modifiers: [],
    par: { moves2fans: 42, moves3fans: 28 },   // optimum prouvé : 25
    reward: null
  },
  {
    id: "A5-11",
    family: "cables",
    name: { fr: "Le final électrique", en: "The Electric Finale" },
    difficulty: 5,
    grid: { cols: 6, rows: 9 },
    pairs: [
      { color: 0, a: [0, 0], b: [5, 3] },
      { color: 1, a: [0, 1], b: [5, 4] },
      { color: 2, a: [0, 2], b: [5, 5] },
      { color: 3, a: [0, 3], b: [5, 6] },
      { color: 4, a: [0, 4], b: [5, 7] }
    ],
    walls: [[2, 8]],
    modifiers: [],
    par: { moves2fans: 70, moves3fans: 50 },   // optimum prouvé : 45
    reward: null
  },
  {
    id: "A5-12",
    family: "lights",
    name: { fr: "La Première", en: "Opening Night" },
    difficulty: 5,
    grid: { cols: 6, rows: 9 },
    projectors: [
      { at: [1, 1], dir: 0 },
      { at: [4, 0], dir: 3 },
      { at: [1, 8], dir: 1 },
      { at: [4, 8], dir: 2 },
      { at: [2, 2], dir: 3 },
      { at: [3, 6], dir: 1 },
      { at: [0, 6], dir: 1 }
    ],
    targets: [[0, 1], [4, 3], [1, 5], [5, 8], [2, 6], [3, 2], [0, 3]],
    forbidden: [[5, 1], [2, 8], [4, 6]],
    walls: [[4, 4], [1, 4], [2, 7]],
    modifiers: [],
    par: { moves2fans: 21, moves3fans: 13 },   // optimum prouvé : 11
    reward: null
  }
]);
