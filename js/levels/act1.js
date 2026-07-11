/* ============================================================
   NINJA EVENTS — levels/act1.js
   Niveaux de l'Acte I (Salle Municipale).
   Format déclaratif du GDD §14.5 — AUCUN code ici, uniquement
   des données. Trois niveaux de démonstration pour la Phase 1 ;
   le calibrage réel se fera avec le moteur (Phase 2).
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
    par: { moves2fans: 5, moves3fans: 3 },
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
      { type: "case-1x2", at: [2, 5], rot: 0, wheels: "braked" }
    ],
    targets: [
      { for: "case-1x1", at: [1, 6] },
      { for: "case-1x1", at: [4, 6] },
      { for: "case-1x2", at: [2, 1] }
    ],
    walls: [[0, 4], [5, 4]],
    modifiers: [],
    par: { moves2fans: 14, moves3fans: 9 },
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
    par: { moves2fans: 18, moves3fans: 12 },
    reward: null
  }
]);
