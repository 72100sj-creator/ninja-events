/* ============================================================
   NINJA EVENTS — levels/act1.js
   Les 12 missions de l'Acte I (Salle Municipale).
   Format déclaratif du GDD §14.5 — AUCUN code ici.
   ⚠️ Chaque niveau est VÉRIFIÉ par le solveur (outil interne) :
   solvabilité prouvée, et les seuils d'éventails dérivent du
   nombre de coups optimal calculé (noté en commentaire).
   Courbe en vagues (GDD §8.2) : leçon → défi → respiration.
   ============================================================ */
"use strict";

Levels.register("act1", [
  {
    id: "A1-01",
    family: "cases",
    name: { fr: "La première lanterne", en: "The First Lantern" },
    difficulty: 1,
    grid: { cols: 5, rows: 7 },
    pieces: [
      { type: "case-1x1", at: [2, 2] }
    ],
    targets: [
      { for: "case-1x1", at: [2, 5] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 5, moves3fans: 3 },   // optimal prouvé : 3
    reward: null
  },
  {
    id: "A1-02",
    family: "cases",
    name: { fr: "Trois caisses et un rêve", en: "Three Cases and a Dream" },
    difficulty: 1,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-1x1", at: [1, 2] },
      { type: "case-1x1", at: [4, 3] },
      { type: "case-1x2", at: [2, 5] }
    ],
    targets: [
      { for: "case-1x1", at: [1, 6] },
      { for: "case-1x1", at: [4, 6] },
      { for: "case-1x2", at: [2, 1] }
    ],
    walls: [[0, 4], [5, 4]],
    modifiers: [],
    par: { moves2fans: 20, moves3fans: 13 },   // optimal prouvé : 11
    reward: null
  },
  {
    id: "A1-03",
    family: "cases",
    name: { fr: "Le sommeil du Chat", en: "The Sleeping Cat" },
    difficulty: 2,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-1x1", at: [1, 1] },
      { type: "case-2x2", at: [3, 3] }
    ],
    targets: [
      { for: "case-1x1", at: [4, 6] },
      { for: "case-2x2", at: [0, 5] }
    ],
    walls: [[2, 2], [3, 6]],
    modifiers: ["cat"],
    cat: [4, 2],
    par: { moves2fans: 23, moves3fans: 15 },   // optimal prouvé : 13
    reward: null
  },
  {
    id: "A1-04",
    family: "cases",
    name: { fr: "Poussière d'or", en: "Golden Dust" },
    difficulty: 2,
    grid: { cols: 5, rows: 7 },
    pieces: [
      { type: "case-1x1", at: [0, 0] },
      { type: "case-1x1", at: [2, 0] },
      { type: "case-1x1", at: [4, 0] }
    ],
    targets: [
      { for: "case-1x1", at: [4, 6] },
      { for: "case-1x1", at: [0, 6] },
      { for: "case-1x1", at: [2, 6] }
    ],
    walls: [[2, 3]],
    modifiers: [],
    par: { moves2fans: 33, moves3fans: 22 },   // optimal prouvé : 20
    reward: null
  },
  {
    id: "A1-05",
    family: "cases",
    name: { fr: "Les coulisses étroites", en: "The Narrow Wings" },
    difficulty: 2,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-1x2", at: [0, 0] },
      { type: "case-1x1", at: [3, 4] }
    ],
    targets: [
      { for: "case-1x2", at: [5, 6] },
      { for: "case-1x1", at: [0, 7] }
    ],
    walls: [[2, 1], [3, 1], [4, 3], [5, 3], [0, 5], [1, 5]],
    modifiers: [],
    par: { moves2fans: 29, moves3fans: 19 },   // optimal prouvé : 17
    reward: null
  },
  {
    id: "A1-06",
    family: "cases",
    name: { fr: "Les Frères Ampli font la paix", en: "The Amp Brothers Make Peace" },
    difficulty: 1,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-1x2", at: [1, 2] },
      { type: "case-1x2", at: [4, 2] }
    ],
    targets: [
      { for: "case-1x2", at: [4, 5] },
      { for: "case-1x2", at: [1, 5] }
    ],
    walls: [[2, 4], [3, 4], [0, 0], [5, 0]],
    modifiers: [],
    par: { moves2fans: 9, moves3fans: 6 },   // optimal prouvé : 6
    reward: null
  },
  {
    id: "A1-07",
    family: "cases",
    name: { fr: "Le pilier têtu", en: "The Stubborn Pillar" },
    difficulty: 3,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-2x2", at: [2, 0] },
      { type: "case-1x1", at: [2, 4] },
      { type: "case-1x1", at: [3, 5] }
    ],
    targets: [
      { for: "case-2x2", at: [2, 6] },
      { for: "case-1x1", at: [0, 0] },
      { for: "case-1x1", at: [5, 0] }
    ],
    walls: [[0, 3], [5, 3]],
    modifiers: [],
    par: { moves2fans: 32, moves3fans: 21 },   // optimal prouvé : 19
    reward: null
  },
  {
    id: "A1-08",
    family: "cases",
    name: { fr: "La ronde des lanternes", en: "The Lantern Round" },
    difficulty: 2,
    grid: { cols: 5, rows: 7 },
    pieces: [
      { type: "case-1x1", at: [0, 0] },
      { type: "case-1x1", at: [4, 0] },
      { type: "case-1x1", at: [0, 6] },
      { type: "case-1x1", at: [4, 6] }
    ],
    targets: [
      { for: "case-1x1", at: [2, 1] },
      { for: "case-1x1", at: [0, 3] },
      { for: "case-1x1", at: [4, 3] },
      { for: "case-1x1", at: [2, 5] }
    ],
    walls: [[2, 3]],
    modifiers: [],
    par: { moves2fans: 21, moves3fans: 14 },   // optimal prouvé : 12
    reward: null
  },
  {
    id: "A1-09",
    family: "cases",
    name: { fr: "Tanuki est encore en retard", en: "Tanuki Is Late Again" },
    difficulty: 3,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-1x1", at: [0, 7] },
      { type: "case-2x2", at: [4, 5] }
    ],
    targets: [
      { for: "case-1x1", at: [5, 0] },
      { for: "case-2x2", at: [0, 3] }
    ],
    walls: [[1, 2], [4, 2]],
    modifiers: ["cat"],
    cat: [2, 4],
    par: { moves2fans: 30, moves3fans: 20 },   // optimal prouvé : 18
    reward: null
  },
  {
    id: "A1-10",
    family: "cases",
    name: { fr: "L'entrée du magicien", en: "The Magician's Entrance" },
    difficulty: 4,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-1x1", at: [0, 1] },
      { type: "case-1x1", at: [5, 1] },
      { type: "case-1x2", at: [2, 0] }
    ],
    targets: [
      { for: "case-1x1", at: [0, 7] },
      { for: "case-1x1", at: [5, 7] },
      { for: "case-1x2", at: [2, 6] }
    ],
    walls: [[0, 4], [1, 4], [3, 4], [4, 4], [5, 4]],
    modifiers: [],
    par: { moves2fans: 47, moves3fans: 31 },   // optimal prouvé : 28
    reward: null
  },
  {
    id: "A1-11",
    family: "cases",
    name: { fr: "Le nœud du régisseur", en: "The Stage Manager's Knot" },
    difficulty: 4,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-2x2", at: [0, 0] },
      { type: "case-1x2", at: [2, 0] },
      { type: "case-1x2", at: [3, 2] },
      { type: "case-1x1", at: [0, 2] }
    ],
    targets: [
      { for: "case-2x2", at: [4, 6] },
      { for: "case-1x2", at: [0, 6] },
      { for: "case-1x2", at: [5, 0] },
      { for: "case-1x1", at: [0, 0] }
    ],
    walls: [[3, 4], [2, 5]],
    modifiers: [],
    par: { moves2fans: 38, moves3fans: 25 },   // optimal prouvé : 22
    reward: null
  },
  {
    id: "A1-12",
    family: "cases",
    name: { fr: "La générale du parquet", en: "The Parquet Dress Rehearsal" },
    difficulty: 5,
    grid: { cols: 6, rows: 8 },
    pieces: [
      { type: "case-2x2", at: [2, 3] },
      { type: "case-1x2", at: [0, 0] },
      { type: "case-1x1", at: [5, 7] },
      { type: "case-1x1", at: [0, 7] }
    ],
    targets: [
      { for: "case-2x2", at: [0, 0] },
      { for: "case-1x2", at: [5, 5] },
      { for: "case-1x1", at: [5, 0] },
      { for: "case-1x1", at: [2, 7] }
    ],
    walls: [[0, 4], [5, 3]],
    modifiers: ["cat"],
    cat: [3, 6],
    par: { moves2fans: 44, moves3fans: 29 },   // optimal prouvé : 26
    reward: null
  }
]);
