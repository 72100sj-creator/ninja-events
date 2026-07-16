/* ============================================================
   NINJA EVENTS — levels/hangar.js
   LE HANGAR 〇 — Le Chargement du Camion (famille "truck").
   ⚠️ É1 : 3 missions PROTOTYPES aux seuils provisoires ;
   le solveur de chargement (É2) les prouvera et recalculera
   les seuils, puis la vague complète arrivera (É6).
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
    par: { moves2fans: 8, moves3fans: 5 },    // provisoire (É2 recalculera)
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
    par: { moves2fans: 12, moves3fans: 7 },   // provisoire (É2 recalculera)
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
    par: { moves2fans: 16, moves3fans: 9 },   // provisoire (É2 recalculera)
    reward: null
  }
]);
