/* ============================================================
   NINJA EVENTS — levels/act2-lights.js
   Missions 9 à 16 de l'Acte II — famille C « Projecteurs »
   (GDD §5.3, « le focus »). Un toucher = un quart de tour.
   Éclairer toutes les marques, jamais les couloirs des kuroko.
   ⚠️ Niveaux VÉRIFIÉS par le solveur Projecteurs (optimum prouvé).
   dir : 0 = → , 1 = ↓ , 2 = ← , 3 = ↑ (rotation horaire)
   ============================================================ */
"use strict";

Levels.register("act2", [
  {
    id: "A2-09",
    family: "lights",
    name: { fr: "Premier focus", en: "First Focus" },
    difficulty: 1,
    grid: { cols: 5, rows: 7 },
    projectors: [
      { at: [2, 1], dir: 3 }
    ],
    targets: [[2, 5]],
    forbidden: [],
    walls: [],
    modifiers: [],
    par: { moves2fans: 4, moves3fans: 2 },   // optimum prouvé : 2 touchers
    reward: null
  },
  {
    id: "A2-10",
    family: "lights",
    name: { fr: "Deux faisceaux", en: "Two Beams" },
    difficulty: 1,
    grid: { cols: 5, rows: 7 },
    projectors: [
      { at: [1, 1], dir: 2 },
      { at: [3, 1], dir: 3 }
    ],
    targets: [[1, 5], [3, 5]],
    forbidden: [],
    walls: [],
    modifiers: [],
    par: { moves2fans: 8, moves3fans: 5 },   // optimum prouvé : 5 touchers
    reward: null
  },
  {
    id: "A2-11",
    family: "lights",
    name: { fr: "Le pilier dans la lumière", en: "The Pillar in the Light" },
    difficulty: 2,
    grid: { cols: 5, rows: 7 },
    projectors: [
      { at: [2, 0], dir: 3 },
      { at: [0, 5], dir: 1 }
    ],
    targets: [[2, 2], [4, 5]],
    forbidden: [[2, 4]],
    walls: [[2, 3]],
    modifiers: [],
    par: { moves2fans: 8, moves3fans: 5 },   // optimum prouvé : 5 touchers
    reward: null
  },
  {
    id: "A2-12",
    family: "lights",
    name: { fr: "La part d'ombre", en: "The Share of Shadow" },
    difficulty: 2,
    grid: { cols: 5, rows: 7 },
    projectors: [
      { at: [2, 1], dir: 3 },
      { at: [2, 5], dir: 1 }
    ],
    targets: [[0, 1], [4, 5]],
    forbidden: [[2, 3]],
    walls: [],
    modifiers: [],
    par: { moves2fans: 10, moves3fans: 6 },   // optimum prouvé : 6 touchers
    reward: null
  },
  {
    id: "A2-13",
    family: "lights",
    name: { fr: "La croisée des feux", en: "Crossfire" },
    difficulty: 3,
    grid: { cols: 6, rows: 7 },
    projectors: [
      { at: [0, 0], dir: 3 },
      { at: [5, 0], dir: 0 },
      { at: [0, 6], dir: 2 }
    ],
    targets: [[3, 0], [0, 3], [3, 6]],
    forbidden: [[5, 5]],
    walls: [[3, 3]],
    modifiers: [],
    par: { moves2fans: 10, moves3fans: 6 },   // optimum prouvé : 6 touchers
    reward: null
  },
  {
    id: "A2-14",
    family: "lights",
    name: { fr: "Le couloir des kuroko", en: "The Kuroko Corridor" },
    difficulty: 3,
    grid: { cols: 6, rows: 7 },
    projectors: [
      { at: [1, 0], dir: 0 },
      { at: [4, 0], dir: 2 },
      { at: [1, 6], dir: 1 },
      { at: [4, 6], dir: 1 }
    ],
    targets: [[1, 2], [4, 2], [1, 4], [4, 4]],
    forbidden: [[2, 3], [3, 3]],
    walls: [[1, 3], [4, 3]],
    modifiers: [],
    par: { moves2fans: 16, moves3fans: 10 },   // optimum prouvé : 8 touchers
    reward: null
  },
  {
    id: "A2-15",
    family: "lights",
    name: { fr: "Quatre coins", en: "Four Corners" },
    difficulty: 4,
    grid: { cols: 6, rows: 7 },
    projectors: [
      { at: [0, 0], dir: 1 },
      { at: [5, 0], dir: 3 },
      { at: [0, 6], dir: 0 },
      { at: [5, 6], dir: 1 },
      { at: [2, 3], dir: 2 }
    ],
    targets: [[3, 0], [0, 4], [5, 2], [2, 6], [4, 3]],
    forbidden: [[3, 4]],
    walls: [[3, 2]],
    modifiers: [],
    par: { moves2fans: 15, moves3fans: 9 },   // optimum prouvé : 7 touchers
    reward: null
  },
  {
    id: "A2-16",
    family: "lights",
    name: { fr: "Le grand focus", en: "The Great Focus" },
    difficulty: 4,
    grid: { cols: 6, rows: 8 },
    projectors: [
      { at: [1, 1], dir: 0 },
      { at: [4, 1], dir: 3 },
      { at: [1, 6], dir: 1 },
      { at: [4, 6], dir: 2 },
      { at: [2, 3], dir: 3 },
      { at: [3, 4], dir: 1 }
    ],
    targets: [[0, 1], [4, 4], [1, 3], [5, 6], [2, 7], [3, 0]],
    forbidden: [[0, 4], [5, 3]],
    walls: [[2, 2]],
    modifiers: [],
    par: { moves2fans: 23, moves3fans: 14 },   // optimum prouvé : 12 touchers
    reward: null
  }
]);
