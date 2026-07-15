/* ============================================================
   NINJA EVENTS — levels/act4.js
   Acte IV — LA GRANDE TOURNÉE 🚚 : 12 missions,
   les trois familles entrelacées (GDD §7.2).
   ⚠️ Chaque niveau est VÉRIFIÉ par son solveur (optimum prouvé).
   ============================================================ */
"use strict";

Levels.register("act4", [
  {
    id: "A4-01",
    family: "cases",
    name: { fr: "Le quai de chargement", en: "The Loading Dock" },
    difficulty: 3,
    grid: { cols: 6, rows: 9 },
    pieces: [
      { type: "case-1x2", at: [0, 0] },
      { type: "case-1x2", at: [5, 0] },
      { type: "case-2x2", at: [2, 0] }
    ],
    targets: [
      { for: "case-1x2", at: [5, 7] },
      { for: "case-1x2", at: [0, 7] },
      { for: "case-2x2", at: [2, 7] }
    ],
    walls: [[2, 4], [3, 4]],
    modifiers: [],
    par: { moves2fans: 42, moves3fans: 28 },   // optimum prouvé : 25
    reward: null
  },
  {
    id: "A4-02",
    family: "cables",
    name: { fr: "Le multipaire", en: "The Multicore" },
    difficulty: 3,
    grid: { cols: 6, rows: 8 },
    pairs: [
      { color: 0, a: [0, 0], b: [5, 2] },
      { color: 1, a: [0, 1], b: [5, 3] },
      { color: 2, a: [0, 2], b: [5, 4] },
      { color: 3, a: [0, 3], b: [5, 5] },
      { color: 4, a: [0, 4], b: [5, 6] }
    ],
    walls: [[2, 7]],
    modifiers: [],
    par: { moves2fans: 62, moves3fans: 44 },   // optimum prouvé : 40
    reward: null
  },
  {
    id: "A4-03",
    family: "lights",
    name: { fr: "Les phares du camion", en: "The Truck Headlights" },
    difficulty: 3,
    grid: { cols: 6, rows: 8 },
    projectors: [
      { at: [1, 0], dir: 0 },
      { at: [4, 0], dir: 2 },
      { at: [0, 5], dir: 3 },
      { at: [5, 5], dir: 1 }
    ],
    targets: [[1, 3], [4, 3], [2, 5], [5, 2]],
    forbidden: [[3, 1]],
    walls: [[1, 4]],
    modifiers: [],
    par: { moves2fans: 15, moves3fans: 9 },   // optimum prouvé : 7
    reward: null
  },
  {
    id: "A4-04",
    family: "cases",
    name: { fr: "La remorque pleine", en: "The Full Trailer" },
    difficulty: 4,
    grid: { cols: 6, rows: 9 },
    pieces: [
      { type: "case-2x2", at: [4, 0] },
      { type: "case-1x1", at: [1, 1] },
      { type: "case-1x1", at: [1, 3] }
    ],
    targets: [
      { for: "case-2x2", at: [0, 7] },
      { for: "case-1x1", at: [5, 8] },
      { for: "case-1x1", at: [5, 0] }
    ],
    walls: [[3, 3], [1, 6]],
    modifiers: ["cat"],
    cat: [2, 5],
    par: { moves2fans: 42, moves3fans: 28 },   // optimum prouvé : 25
    reward: null
  },
  {
    id: "A4-05",
    family: "cables",
    name: { fr: "Sous la scène mobile", en: "Under the Mobile Stage" },
    difficulty: 4,
    grid: { cols: 6, rows: 8 },
    pairs: [
      { color: 0, a: [0, 0], b: [2, 2] },
      { color: 1, a: [5, 0], b: [3, 2] },
      { color: 2, a: [0, 7], b: [2, 5] },
      { color: 3, a: [5, 7], b: [3, 5] },
      { color: 4, a: [0, 3], b: [5, 4] }
    ],
    walls: [[2, 3], [3, 3]],
    modifiers: [],
    par: { moves2fans: 42, moves3fans: 30 },   // optimum prouvé : 27
    reward: null
  },
  {
    id: "A4-06",
    family: "lights",
    name: { fr: "L'aire de repos", en: "The Rest Stop" },
    difficulty: 2,
    grid: { cols: 5, rows: 7 },
    projectors: [
      { at: [2, 1], dir: 1 },
      { at: [2, 5], dir: 3 }
    ],
    targets: [[0, 1], [4, 5]],
    forbidden: [[2, 3]],
    walls: [],
    modifiers: [],
    par: { moves2fans: 4, moves3fans: 2 },   // optimum prouvé : 2
    reward: null
  },
  {
    id: "A4-07",
    family: "cases",
    name: { fr: "Les caisses du soir", en: "The Evening Cases" },
    difficulty: 4,
    grid: { cols: 6, rows: 9 },
    pieces: [
      { type: "case-1x2", at: [0, 0] },
      { type: "case-1x2", at: [5, 0] },
      { type: "case-1x1", at: [2, 4] },
      { type: "case-1x1", at: [3, 4] }
    ],
    targets: [
      { for: "case-1x2", at: [5, 7] },
      { for: "case-1x2", at: [0, 7] },
      { for: "case-1x1", at: [3, 4] },
      { for: "case-1x1", at: [2, 4] }
    ],
    walls: [[0, 4], [5, 4]],
    modifiers: [],
    par: { moves2fans: 30, moves3fans: 20 },   // optimum prouvé : 18
    reward: null
  },
  {
    id: "A4-08",
    family: "cables",
    name: { fr: "Le nœud du convoi", en: "The Convoy Knot" },
    difficulty: 4,
    grid: { cols: 6, rows: 8 },
    pairs: [
      { color: 0, a: [1, 0], b: [4, 7] },
      { color: 1, a: [4, 0], b: [3, 2] },
      { color: 2, a: [0, 2], b: [0, 5] },
      { color: 3, a: [5, 2], b: [5, 5] },
      { color: 4, a: [2, 3], b: [3, 5] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 42, moves3fans: 30 },   // optimum prouvé : 27
    reward: null
  },
  {
    id: "A4-09",
    family: "lights",
    name: { fr: "Le tunnel de service", en: "The Service Tunnel" },
    difficulty: 4,
    grid: { cols: 6, rows: 9 },
    projectors: [
      { at: [2, 0], dir: 1 },
      { at: [3, 0], dir: 1 },
      { at: [0, 6], dir: 0 },
      { at: [5, 6], dir: 1 }
    ],
    targets: [[0, 0], [5, 0], [4, 6], [0, 8]],
    forbidden: [[2, 4], [3, 4]],
    walls: [[0, 4], [1, 4], [4, 4], [5, 4]],
    modifiers: [],
    par: { moves2fans: 10, moves3fans: 6 },   // optimum prouvé : 6
    reward: null
  },
  {
    id: "A4-10",
    family: "cases",
    name: { fr: "Le grand transfert", en: "The Great Transfer" },
    difficulty: 5,
    grid: { cols: 6, rows: 9 },
    pieces: [
      { type: "case-2x2", at: [0, 0] },
      { type: "case-1x2", at: [4, 0] },
      { type: "case-1x2", at: [5, 2] },
      { type: "case-1x1", at: [2, 4] }
    ],
    targets: [
      { for: "case-2x2", at: [4, 7] },
      { for: "case-1x2", at: [0, 6] },
      { for: "case-1x2", at: [1, 0] },
      { for: "case-1x1", at: [5, 0] }
    ],
    walls: [[2, 6], [3, 2]],
    modifiers: [],
    par: { moves2fans: 50, moves3fans: 33 },   // optimum prouvé : 30
    reward: null
  },
  {
    id: "A4-11",
    family: "cables",
    name: { fr: "Cinq villes", en: "Five Cities" },
    difficulty: 5,
    grid: { cols: 6, rows: 8 },
    pairs: [
      { color: 0, a: [0, 0], b: [2, 2] },
      { color: 1, a: [5, 0], b: [3, 2] },
      { color: 2, a: [0, 7], b: [2, 5] },
      { color: 3, a: [5, 7], b: [3, 5] },
      { color: 4, a: [0, 4], b: [5, 3] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 42, moves3fans: 30 },   // optimum prouvé : 27
    reward: null
  },
  {
    id: "A4-12",
    family: "lights",
    name: { fr: "La générale de tournée", en: "The Tour Dress Rehearsal" },
    difficulty: 5,
    grid: { cols: 6, rows: 9 },
    projectors: [
      { at: [1, 1], dir: 0 },
      { at: [4, 1], dir: 3 },
      { at: [1, 7], dir: 1 },
      { at: [4, 7], dir: 2 },
      { at: [2, 3], dir: 1 },
      { at: [3, 5], dir: 3 }
    ],
    targets: [[0, 1], [4, 4], [1, 4], [5, 7], [2, 0], [3, 8]],
    forbidden: [[0, 5], [5, 2], [2, 6]],
    walls: [[1, 3]],
    modifiers: [],
    par: { moves2fans: 23, moves3fans: 14 },   // optimum prouvé : 12
    reward: null
  }
]);
