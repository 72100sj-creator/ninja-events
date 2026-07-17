/* ============================================================
   NINJA EVENTS — levels/hangar.js
   LE HANGAR 〇 — Le Chargement du Camion (famille "truck").
   ⚠️ Chaque niveau est VÉRIFIÉ par le solveur de chargement
   (solver_truck.py — couvrir-ou-condamner, optimum prouvé).
   La vague complète de 50 niveaux arrivera en É6.
   ============================================================ */
"use strict";

Levels.register("hangar", [
  {
    id: "T0-01",
    family: "truck",
    name: { fr: "Premier chargement", en: "First Load" },
    difficulty: 1,
    grid: { cols: 3, rows: 4 },
    items: [
      { type: "flight", cells: [[0,0],[0,1]] },
      { type: "amp",    cells: [[0,0],[0,1]] },
      { type: "spot",   cells: [[0,0]] },
      { type: "crate",  cells: [[0,0]] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 6, moves3fans: 4 },   // optimum prouvé : 4
    reward: null
  },
  {
    id: "T0-02",
    family: "truck",
    name: { fr: "Le clavier fait des manières", en: "The Fussy Keyboard" },
    difficulty: 2,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "ladder",   cells: [[0,0],[0,1],[0,2]] },
      { type: "flight",   cells: [[0,0],[0,1]] },
      { type: "crate",    cells: [[0,0]] },
      { type: "spot",     cells: [[0,0]] }
    ],
    walls: [[3,3],[0,3]],
    modifiers: [],
    par: { moves2fans: 8, moves3fans: 5 },   // optimum prouvé : 5
    reward: null
  },
  {
    id: "T0-03",
    family: "truck",
    name: { fr: "La remorque comble", en: "The Packed Trailer" },
    difficulty: 2,
    grid: { cols: 4, rows: 5 },
    items: [
      { type: "truss",    cells: [[0,0],[0,1],[0,2],[0,3]] },
      { type: "drum",     cells: [[0,0],[1,0],[0,1],[1,1]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "flight",   cells: [[0,0],[0,1]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "crate",    cells: [[0,0]] },
      { type: "spot",     cells: [[0,0]] }
    ],
    walls: [[3,4]],
    modifiers: [],
    par: { moves2fans: 12, moves3fans: 8 },   // optimum prouvé : 7
    reward: null
  }
]);
