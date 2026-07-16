/* ============================================================
   NINJA EVENTS — levels/rappels.js
   Les RAPPELS : 4 missions bonus par acte, placées APRÈS la
   Générale (déblocage séquentiel existant → elles s'ouvrent
   naturellement après elle, aucune logique nouvelle).
   ⚠️ Chaque niveau est VÉRIFIÉ par son solveur (optimum prouvé).
   ============================================================ */
"use strict";

Levels.register("act1", [
  {
    id: "A1-R1",
    family: "cases",
    name: { fr: "Rappel : la caisse timide", en: "Encore: The Shy Case" },
    difficulty: 2,
    grid: { cols: 5, rows: 7 },
    pieces: [
      { type: "case-1x2", at: [0, 0] },
      { type: "case-1x1", at: [4, 0] }
    ],
    targets: [
      { for: "case-1x2", at: [4, 5] },
      { for: "case-1x1", at: [0, 6] }
    ],
    walls: [[2, 3]],
    modifiers: [],
    par: { moves2fans: 32, moves3fans: 21 },   // optimum prouvé : 19
    reward: null
  },
  {
    id: "A1-R2",
    family: "cases",
    name: { fr: "Rappel : le ballet des caisses", en: "Encore: Case Ballet" },
    difficulty: 3,
    grid: { cols: 5, rows: 8 },
    pieces: [
      { type: "case-1x1", at: [0, 0] },
      { type: "case-1x1", at: [4, 0] },
      { type: "case-1x1", at: [2, 4] }
    ],
    targets: [
      { for: "case-1x1", at: [4, 7] },
      { for: "case-1x1", at: [0, 7] },
      { for: "case-1x1", at: [2, 0] }
    ],
    walls: [[2, 2], [2, 5]],
    modifiers: [],
    par: { moves2fans: 24, moves3fans: 16 },   // optimum prouvé : 14
    reward: null
  },
  {
    id: "A1-R3",
    family: "cases",
    name: { fr: "Rappel : le chat insiste", en: "Encore: The Cat Insists" },
    difficulty: 4,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-2x2", at: [0, 0] },
      { type: "case-1x1", at: [5, 0] }
    ],
    targets: [
      { for: "case-2x2", at: [4, 6] },
      { for: "case-1x1", at: [0, 7] }
    ],
    walls: [[3, 3], [1, 5]],
    modifiers: ["cat"],
    cat: [2, 4],
    par: { moves2fans: 38, moves3fans: 25 },   // optimum prouvé : 22
    reward: null
  },
  {
    id: "A1-R4",
    family: "cases",
    name: { fr: "Rappel : l'encombrement", en: "Encore: The Squeeze" },
    difficulty: 5,
    grid: { cols: 6, rows: 9 },
    pieces: [
      { type: "case-2x2", at: [2, 0] },
      { type: "case-1x2", at: [0, 0] },
      { type: "case-1x2", at: [5, 0] },
      { type: "case-1x1", at: [3, 4] }
    ],
    targets: [
      { for: "case-2x2", at: [2, 7] },
      { for: "case-1x2", at: [5, 7] },
      { for: "case-1x2", at: [0, 7] },
      { for: "case-1x1", at: [0, 0] }
    ],
    walls: [[1, 4], [4, 4]],
    modifiers: [],
    par: { moves2fans: 47, moves3fans: 31 },   // optimum prouvé : 28
    reward: null
  }
]);

Levels.register("act2", [
  {
    id: "A2-R1",
    family: "cables",
    name: { fr: "Rappel : deux guirlandes", en: "Encore: Two Garlands" },
    difficulty: 2,
    grid: { cols: 5, rows: 6 },
    pairs: [
      { color: 0, a: [0, 0], b: [4, 1] },
      { color: 1, a: [0, 3], b: [4, 4] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 20, moves3fans: 14 },   // optimum prouvé : 12
    reward: null
  },
  {
    id: "A2-R2",
    family: "lights",
    name: { fr: "Rappel : trois lueurs", en: "Encore: Three Glows" },
    difficulty: 3,
    grid: { cols: 5, rows: 7 },
    projectors: [
      { at: [2, 0], dir: 2 },
      { at: [0, 4], dir: 2 },
      { at: [2, 6], dir: 1 }
    ],
    targets: [[4, 0], [2, 4], [2, 3]],
    forbidden: [[4, 3]],
    walls: [],
    modifiers: [],
    par: { moves2fans: 7, moves3fans: 4 },   // optimum prouvé : 4
    reward: null
  },
  {
    id: "A2-R3",
    family: "cables",
    name: { fr: "Rappel : les quatre coins", en: "Encore: Four Corners" },
    difficulty: 4,
    grid: { cols: 6, rows: 7 },
    pairs: [
      { color: 0, a: [0, 0], b: [2, 2] },
      { color: 1, a: [5, 0], b: [3, 2] },
      { color: 2, a: [0, 6], b: [2, 4] },
      { color: 3, a: [5, 6], b: [3, 4] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 31, moves3fans: 22 },   // optimum prouvé : 20
    reward: null
  },
  {
    id: "A2-R4",
    family: "lights",
    name: { fr: "Rappel : la répétition nocturne", en: "Encore: Night Rehearsal" },
    difficulty: 5,
    grid: { cols: 6, rows: 8 },
    projectors: [
      { at: [1, 0], dir: 0 },
      { at: [4, 0], dir: 3 },
      { at: [1, 7], dir: 1 },
      { at: [4, 7], dir: 2 },
      { at: [2, 3], dir: 3 }
    ],
    targets: [[0, 0], [4, 4], [1, 3], [5, 7], [2, 6]],
    forbidden: [[5, 2], [0, 6]],
    walls: [[4, 5], [1, 2]],
    modifiers: [],
    par: { moves2fans: 20, moves3fans: 12 },   // optimum prouvé : 10
    reward: null
  }
]);

Levels.register("act3", [
  {
    id: "A3-R1",
    family: "cases",
    name: { fr: "Rappel : le chat voyage", en: "Encore: The Cat Travels" },
    difficulty: 3,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-1x2", at: [0, 0] },
      { type: "case-1x1", at: [5, 0] }
    ],
    targets: [
      { for: "case-1x2", at: [5, 6] },
      { for: "case-1x1", at: [0, 7] }
    ],
    walls: [[3, 2]],
    modifiers: ["cat"],
    cat: [2, 4],
    par: { moves2fans: 39, moves3fans: 26 },   // optimum prouvé : 23
    reward: null
  },
  {
    id: "A3-R2",
    family: "cables",
    name: { fr: "Rappel : trois rubans", en: "Encore: Three Ribbons" },
    difficulty: 3,
    grid: { cols: 6, rows: 7 },
    pairs: [
      { color: 0, a: [0, 0], b: [5, 1] },
      { color: 1, a: [0, 2], b: [5, 3] },
      { color: 2, a: [0, 4], b: [5, 5] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 34, moves3fans: 24 },   // optimum prouvé : 21
    reward: null
  },
  {
    id: "A3-R3",
    family: "lights",
    name: { fr: "Rappel : la croisée des feux", en: "Encore: Crossfire" },
    difficulty: 4,
    grid: { cols: 6, rows: 8 },
    projectors: [
      { at: [0, 2], dir: 2 },
      { at: [4, 2], dir: 3 },
      { at: [2, 7], dir: 3 },
      { at: [2, 5], dir: 1 }
    ],
    targets: [[3, 2], [4, 6], [5, 7], [2, 1]],
    forbidden: [[5, 0], [0, 6]],
    walls: [],
    modifiers: [],
    par: { moves2fans: 15, moves3fans: 9 },   // optimum prouvé : 7
    reward: null
  },
  {
    id: "A3-R4",
    family: "cables",
    name: { fr: "Rappel : le bouquet final", en: "Encore: The Final Bouquet" },
    difficulty: 5,
    grid: { cols: 6, rows: 8 },
    pairs: [
      { color: 0, a: [0, 0], b: [2, 2] },
      { color: 1, a: [5, 0], b: [3, 2] },
      { color: 2, a: [0, 7], b: [2, 5] },
      { color: 3, a: [5, 7], b: [3, 5] },
      { color: 4, a: [1, 3], b: [4, 4] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 40, moves3fans: 28 },   // optimum prouvé : 25
    reward: null
  }
]);

Levels.register("act4", [
  {
    id: "A4-R1",
    family: "lights",
    name: { fr: "Rappel : la pause du soir", en: "Encore: Evening Break" },
    difficulty: 3,
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
    id: "A4-R2",
    family: "cases",
    name: { fr: "Rappel : le croisement", en: "Encore: The Crossing" },
    difficulty: 4,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-1x2", at: [0, 0] },
      { type: "case-1x2", at: [5, 0] },
      { type: "case-1x1", at: [2, 3] }
    ],
    targets: [
      { for: "case-1x2", at: [5, 6] },
      { for: "case-1x2", at: [0, 6] },
      { for: "case-1x1", at: [3, 4] }
    ],
    walls: [[1, 4], [4, 3]],
    modifiers: [],
    par: { moves2fans: 24, moves3fans: 16 },   // optimum prouvé : 14
    reward: null
  },
  {
    id: "A4-R3",
    family: "cables",
    name: { fr: "Rappel : la grande traverse", en: "Encore: The Long Haul" },
    difficulty: 4,
    grid: { cols: 6, rows: 8 },
    pairs: [
      { color: 0, a: [1, 0], b: [4, 7] },
      { color: 1, a: [0, 2], b: [1, 4] },
      { color: 2, a: [5, 2], b: [4, 4] },
      { color: 3, a: [2, 6], b: [3, 6] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 34, moves3fans: 24 },   // optimum prouvé : 21
    reward: null
  },
  {
    id: "A4-R4",
    family: "cases",
    name: { fr: "Rappel : la nuit de charge", en: "Encore: Load-Out Night" },
    difficulty: 5,
    grid: { cols: 6, rows: 9 },
    pieces: [
      { type: "case-2x2", at: [4, 0] },
      { type: "case-1x2", at: [0, 0] },
      { type: "case-1x2", at: [1, 7] },
      { type: "case-1x1", at: [3, 4] }
    ],
    targets: [
      { for: "case-2x2", at: [0, 7] },
      { for: "case-1x2", at: [5, 7] },
      { for: "case-1x2", at: [4, 0] },
      { for: "case-1x1", at: [2, 0] }
    ],
    walls: [[2, 4], [3, 6]],
    modifiers: [],
    par: { moves2fans: 41, moves3fans: 27 },   // optimum prouvé : 24
    reward: null
  }
]);

Levels.register("act5", [
  {
    id: "A5-R1",
    family: "cases",
    name: { fr: "Rappel : trois notes", en: "Encore: Three Notes" },
    difficulty: 3,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-1x1", at: [0, 0] },
      { type: "case-1x1", at: [5, 0] },
      { type: "case-1x1", at: [2, 4] }
    ],
    targets: [
      { for: "case-1x1", at: [5, 7] },
      { for: "case-1x1", at: [0, 7] },
      { for: "case-1x1", at: [2, 0] }
    ],
    walls: [[2, 2], [3, 5]],
    modifiers: [],
    par: { moves2fans: 24, moves3fans: 16 },   // optimum prouvé : 14
    reward: null
  },
  {
    id: "A5-R2",
    family: "lights",
    name: { fr: "Rappel : la balance de nuit", en: "Encore: Night Soundcheck" },
    difficulty: 4,
    grid: { cols: 6, rows: 8 },
    projectors: [
      { at: [0, 0], dir: 2 },
      { at: [5, 3], dir: 3 },
      { at: [0, 5], dir: 1 },
      { at: [3, 2], dir: 3 },
      { at: [2, 7], dir: 0 }
    ],
    targets: [[2, 0], [5, 6], [0, 2], [3, 6], [0, 7]],
    forbidden: [[4, 4], [1, 1]],
    walls: [],
    modifiers: [],
    par: { moves2fans: 20, moves3fans: 12 },   // optimum prouvé : 10
    reward: null
  },
  {
    id: "A5-R3",
    family: "cables",
    name: { fr: "Rappel : l'éventail inversé", en: "Encore: The Reverse Fan" },
    difficulty: 5,
    grid: { cols: 6, rows: 9 },
    pairs: [
      { color: 0, a: [1, 0], b: [0, 8] },
      { color: 1, a: [2, 0], b: [1, 8] },
      { color: 2, a: [3, 0], b: [2, 8] },
      { color: 3, a: [4, 0], b: [3, 8] },
      { color: 4, a: [5, 0], b: [4, 8] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 77, moves3fans: 55 },   // optimum prouvé : 50
    reward: null
  },
  {
    id: "A5-R4",
    family: "lights",
    name: { fr: "Rappel : le rappel du public", en: "Encore: The Audience Calls Back" },
    difficulty: 5,
    grid: { cols: 6, rows: 9 },
    projectors: [
      { at: [1, 0], dir: 3 },
      { at: [4, 0], dir: 3 },
      { at: [0, 8], dir: 2 },
      { at: [5, 8], dir: 1 },
      { at: [2, 5], dir: 2 },
      { at: [3, 2], dir: 0 },
      { at: [0, 5], dir: 1 }
    ],
    targets: [[1, 3], [4, 4], [2, 8], [5, 5], [3, 5], [0, 2], [0, 3]],
    forbidden: [[2, 0], [0, 7], [3, 7]],
    walls: [[1, 4], [4, 5]],
    modifiers: [],
    par: { moves2fans: 23, moves3fans: 14 },   // optimum prouvé : 12
    reward: null
  }
]);

