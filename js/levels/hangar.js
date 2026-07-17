/* ============================================================
   NINJA EVENTS — levels/hangar.js
   LE HANGAR 〇 — Le Chargement du Camion : 50 missions.
   T0-01..04 : les fondations · T1-01..46 : la grande vague É6
   (générée par paliers, chaque candidat filtré par le solveur).
   ⚠️ Chaque niveau est VÉRIFIÉ par solver_truck.py (couvrir-ou-
   condamner, contrainte des fragiles, optimum prouvé).
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
      { type: "amp", cells: [[0,0],[0,1]] },
      { type: "spot", cells: [[0,0]] },
      { type: "crate", cells: [[0,0]] }
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
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "flight", cells: [[0,0],[0,1]] },
      { type: "crate", cells: [[0,0]] },
      { type: "spot", cells: [[0,0]] }
    ],
    walls: [[3, 3], [0, 3]],
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
      { type: "truss", cells: [[0,0],[0,1],[0,2],[0,3]] },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "flight", cells: [[0,0],[0,1]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "crate", cells: [[0,0]] },
      { type: "spot", cells: [[0,0]] }
    ],
    walls: [[3, 4]],
    modifiers: [],
    par: { moves2fans: 12, moves3fans: 8 },   // optimum prouvé : 7
    reward: null
  },
  {
    id: "T0-04",
    family: "truck",
    name: { fr: "La guitare de la diva", en: "The Diva's Guitar" },
    difficulty: 3,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "guitar", cells: [[0,0],[0,1]], fragile: true },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "crate", cells: [[0,0]] },
      { type: "crate", cells: [[0,0]] },
      { type: "spot", cells: [[0,0]] }
    ],
    walls: [[1, 1], [2, 2]],
    modifiers: ["fragile"],
    par: { moves2fans: 9, moves3fans: 6 },   // optimum prouvé : 6
    reward: null
  },
  {
    id: "T1-01",
    family: "truck",
    name: { fr: "Le quai tranquille", en: "Le quai tranquille" },
    difficulty: 1,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "crate", cells: [[0,0]] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 8, moves3fans: 5 },   // optimum prouvé : 5
    reward: null
  },
  {
    id: "T1-02",
    family: "truck",
    name: { fr: "Deux caisses et un café", en: "Deux caisses et un café" },
    difficulty: 1,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "spot", cells: [[0,0]] },
      { type: "crate", cells: [[0,0]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "crate", cells: [[0,0]] },
      { type: "spot", cells: [[0,0]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] }
    ],
    walls: [[2, 3]],
    modifiers: [],
    par: { moves2fans: 9, moves3fans: 6 },   // optimum prouvé : 6
    reward: null
  },
  {
    id: "T1-03",
    family: "truck",
    name: { fr: "La palette sage", en: "La palette sage" },
    difficulty: 1,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "crate", cells: [[0,0]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "spot", cells: [[0,0]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] }
    ],
    walls: [[0, 2]],
    modifiers: [],
    par: { moves2fans: 8, moves3fans: 5 },   // optimum prouvé : 5
    reward: null
  },
  {
    id: "T1-04",
    family: "truck",
    name: { fr: "Premier convoi", en: "Premier convoi" },
    difficulty: 1,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "spot", cells: [[0,0]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "crate", cells: [[0,0]] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 9, moves3fans: 6 },   // optimum prouvé : 6
    reward: null
  },
  {
    id: "T1-05",
    family: "truck",
    name: { fr: "Les petites mains", en: "Les petites mains" },
    difficulty: 1,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "crate", cells: [[0,0]] }
    ],
    walls: [[1, 1]],
    modifiers: [],
    par: { moves2fans: 6, moves3fans: 4 },   // optimum prouvé : 4
    reward: null
  },
  {
    id: "T1-06",
    family: "truck",
    name: { fr: "Le fourgon du matin", en: "Le fourgon du matin" },
    difficulty: 1,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "spot", cells: [[0,0]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "crate", cells: [[0,0]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 9, moves3fans: 6 },   // optimum prouvé : 6
    reward: null
  },
  {
    id: "T1-07",
    family: "truck",
    name: { fr: "Une échelle et trois riens", en: "Une échelle et trois riens" },
    difficulty: 2,
    grid: { cols: 3, rows: 4 },
    items: [
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 5, moves3fans: 3 },   // optimum prouvé : 3
    reward: null
  },
  {
    id: "T1-08",
    family: "truck",
    name: { fr: "Le coin des accessoires", en: "Le coin des accessoires" },
    difficulty: 2,
    grid: { cols: 3, rows: 4 },
    items: [
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "spot", cells: [[0,0]] },
      { type: "crate", cells: [[0,0]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] }
    ],
    walls: [[1, 2]],
    modifiers: [],
    par: { moves2fans: 6, moves3fans: 4 },   // optimum prouvé : 4
    reward: null
  },
  {
    id: "T1-09",
    family: "truck",
    name: { fr: "La tournée s'annonce", en: "La tournée s'annonce" },
    difficulty: 2,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "crate", cells: [[0,0]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "crate", cells: [[0,0]] },
      { type: "spot", cells: [[0,0]] }
    ],
    walls: [[3, 3]],
    modifiers: [],
    par: { moves2fans: 9, moves3fans: 6 },   // optimum prouvé : 6
    reward: null
  },
  {
    id: "T1-10",
    family: "truck",
    name: { fr: "Chargement en douceur", en: "Chargement en douceur" },
    difficulty: 2,
    grid: { cols: 3, rows: 4 },
    items: [
      { type: "spot", cells: [[0,0]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true }
    ],
    walls: [[0, 1]],
    modifiers: [],
    par: { moves2fans: 5, moves3fans: 3 },   // optimum prouvé : 3
    reward: null
  },
  {
    id: "T1-11",
    family: "truck",
    name: { fr: "Les caisses jumelles", en: "Les caisses jumelles" },
    difficulty: 2,
    grid: { cols: 3, rows: 4 },
    items: [
      { type: "crate", cells: [[0,0]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "crate", cells: [[0,0]] },
      { type: "crate", cells: [[0,0]] },
      { type: "spot", cells: [[0,0]] }
    ],
    walls: [],
    modifiers: [],
    par: { moves2fans: 8, moves3fans: 5 },   // optimum prouvé : 5
    reward: null
  },
  {
    id: "T1-12",
    family: "truck",
    name: { fr: "Le clavier du dimanche", en: "Le clavier du dimanche" },
    difficulty: 2,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "spot", cells: [[0,0]] }
    ],
    walls: [[0, 1]],
    modifiers: [],
    par: { moves2fans: 6, moves3fans: 4 },   // optimum prouvé : 4
    reward: null
  },
  {
    id: "T1-13",
    family: "truck",
    name: { fr: "Sangles et méthode", en: "Sangles et méthode" },
    difficulty: 3,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "crate", cells: [[0,0]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] }
    ],
    walls: [[1, 1]],
    modifiers: [],
    par: { moves2fans: 6, moves3fans: 4 },   // optimum prouvé : 4
    reward: null
  },
  {
    id: "T1-14",
    family: "truck",
    name: { fr: "Le Tetris du régisseur", en: "Le Tetris du régisseur" },
    difficulty: 3,
    grid: { cols: 4, rows: 5 },
    items: [
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "crate", cells: [[0,0]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "spot", cells: [[0,0]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "spot", cells: [[0,0]] }
    ],
    walls: [[2, 4], [2, 2]],
    modifiers: [],
    par: { moves2fans: 9, moves3fans: 6 },   // optimum prouvé : 6
    reward: null
  },
  {
    id: "T1-15",
    family: "truck",
    name: { fr: "La remorque à malices", en: "La remorque à malices" },
    difficulty: 3,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "crate", cells: [[0,0]] },
      { type: "spot", cells: [[0,0]] },
      { type: "spot", cells: [[0,0]] },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "spot", cells: [[0,0]] }
    ],
    walls: [[0, 1]],
    modifiers: [],
    par: { moves2fans: 9, moves3fans: 6 },   // optimum prouvé : 6
    reward: null
  },
  {
    id: "T1-16",
    family: "truck",
    name: { fr: "Trois formes têtues", en: "Trois formes têtues" },
    difficulty: 3,
    grid: { cols: 4, rows: 5 },
    items: [
      { type: "spot", cells: [[0,0]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "spot", cells: [[0,0]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "crate", cells: [[0,0]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "crate", cells: [[0,0]] }
    ],
    walls: [[1, 2], [0, 4]],
    modifiers: [],
    par: { moves2fans: 14, moves3fans: 9 },   // optimum prouvé : 8
    reward: null
  },
  {
    id: "T1-17",
    family: "truck",
    name: { fr: "Le passage de roue", en: "Le passage de roue" },
    difficulty: 3,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "spot", cells: [[0,0]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] }
    ],
    walls: [[3, 1], [0, 2]],
    modifiers: [],
    par: { moves2fans: 6, moves3fans: 4 },   // optimum prouvé : 4
    reward: null
  },
  {
    id: "T1-18",
    family: "truck",
    name: { fr: "Les pendrillons roulés", en: "Les pendrillons roulés" },
    difficulty: 3,
    grid: { cols: 4, rows: 5 },
    items: [
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "spot", cells: [[0,0]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "micstand", cells: [[0,0],[0,1]] }
    ],
    walls: [[3, 4], [3, 0]],
    modifiers: [],
    par: { moves2fans: 14, moves3fans: 9 },   // optimum prouvé : 8
    reward: null
  },
  {
    id: "T1-19",
    family: "truck",
    name: { fr: "La structure démontée", en: "La structure démontée" },
    difficulty: 3,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "spot", cells: [[0,0]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "crate", cells: [[0,0]] }
    ],
    walls: [[1, 2]],
    modifiers: [],
    par: { moves2fans: 8, moves3fans: 5 },   // optimum prouvé : 5
    reward: null
  },
  {
    id: "T1-20",
    family: "truck",
    name: { fr: "Un quai bien rempli", en: "Un quai bien rempli" },
    difficulty: 3,
    grid: { cols: 4, rows: 5 },
    items: [
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "spot", cells: [[0,0]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] }
    ],
    walls: [[2, 3], [0, 1]],
    modifiers: [],
    par: { moves2fans: 9, moves3fans: 6 },   // optimum prouvé : 6
    reward: null
  },
  {
    id: "T1-21",
    family: "truck",
    name: { fr: "Le violoncelle voyage", en: "Le violoncelle voyage" },
    difficulty: 3,
    grid: { cols: 4, rows: 5 },
    items: [
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "guitar", cells: [[0,0],[0,1]], fragile: true },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "micstand", cells: [[0,0],[0,1]] }
    ],
    walls: [[1, 0], [3, 0]],
    modifiers: ["fragile"],
    par: { moves2fans: 9, moves3fans: 6 },   // optimum prouvé : 6
    reward: null
  },
  {
    id: "T1-22",
    family: "truck",
    name: { fr: "La guitare entre amis", en: "La guitare entre amis" },
    difficulty: 3,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "crate", cells: [[0,0]] },
      { type: "guitar", cells: [[0,0],[0,1]], fragile: true },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "spot", cells: [[0,0]] }
    ],
    walls: [[3, 2], [2, 0]],
    modifiers: ["fragile"],
    par: { moves2fans: 8, moves3fans: 5 },   // optimum prouvé : 5
    reward: null
  },
  {
    id: "T1-23",
    family: "truck",
    name: { fr: "Le pied dans la porte", en: "Le pied dans la porte" },
    difficulty: 3,
    grid: { cols: 4, rows: 5 },
    items: [
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "spot", cells: [[0,0]] },
      { type: "crate", cells: [[0,0]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "spot", cells: [[0,0]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "spot", cells: [[0,0]] }
    ],
    walls: [[3, 0], [1, 2]],
    modifiers: [],
    par: { moves2fans: 14, moves3fans: 9 },   // optimum prouvé : 8
    reward: null
  },
  {
    id: "T1-24",
    family: "truck",
    name: { fr: "Les caisses de nuit", en: "Les caisses de nuit" },
    difficulty: 3,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "micstand", cells: [[0,0],[0,1]] }
    ],
    walls: [[3, 1]],
    modifiers: [],
    par: { moves2fans: 6, moves3fans: 4 },   // optimum prouvé : 4
    reward: null
  },
  {
    id: "T1-25",
    family: "truck",
    name: { fr: "L'ampli grognon", en: "L'ampli grognon" },
    difficulty: 3,
    grid: { cols: 4, rows: 5 },
    items: [
      { type: "crate", cells: [[0,0]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "spot", cells: [[0,0]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "spot", cells: [[0,0]] },
      { type: "spot", cells: [[0,0]] },
      { type: "spot", cells: [[0,0]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] }
    ],
    walls: [[1, 3]],
    modifiers: [],
    par: { moves2fans: 14, moves3fans: 9 },   // optimum prouvé : 8
    reward: null
  },
  {
    id: "T1-26",
    family: "truck",
    name: { fr: "La géométrie du quai", en: "La géométrie du quai" },
    difficulty: 3,
    grid: { cols: 4, rows: 4 },
    items: [
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "crate", cells: [[0,0]] }
    ],
    walls: [[1, 2]],
    modifiers: [],
    par: { moves2fans: 8, moves3fans: 5 },   // optimum prouvé : 5
    reward: null
  },
  {
    id: "T1-27",
    family: "truck",
    name: { fr: "Le fourgon comble", en: "Le fourgon comble" },
    difficulty: 3,
    grid: { cols: 4, rows: 5 },
    items: [
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "micstand", cells: [[0,0],[0,1]] }
    ],
    walls: [[3, 0], [1, 3]],
    modifiers: [],
    par: { moves2fans: 8, moves3fans: 5 },   // optimum prouvé : 5
    reward: null
  },
  {
    id: "T1-28",
    family: "truck",
    name: { fr: "Douane à l'aube", en: "Douane à l'aube" },
    difficulty: 3,
    grid: { cols: 4, rows: 5 },
    items: [
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true }
    ],
    walls: [[3, 3], [1, 0]],
    modifiers: [],
    par: { moves2fans: 9, moves3fans: 6 },   // optimum prouvé : 6
    reward: null
  },
  {
    id: "T1-29",
    family: "truck",
    name: { fr: "Le casse-tête du chef", en: "Le casse-tête du chef" },
    difficulty: 4,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "spot", cells: [[0,0]] },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "spot", cells: [[0,0]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] }
    ],
    walls: [[0, 4], [1, 0]],
    modifiers: [],
    par: { moves2fans: 15, moves3fans: 10 },   // optimum prouvé : 9
    reward: null
  },
  {
    id: "T1-30",
    family: "truck",
    name: { fr: "La tournée des cinq salles", en: "La tournée des cinq salles" },
    difficulty: 4,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "crate", cells: [[0,0]] },
      { type: "spot", cells: [[0,0]] },
      { type: "truss", cells: [[0,0],[0,1],[0,2],[0,3]] },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] }
    ],
    walls: [[2, 0], [1, 3]],
    modifiers: [],
    par: { moves2fans: 12, moves3fans: 8 },   // optimum prouvé : 7
    reward: null
  },
  {
    id: "T1-31",
    family: "truck",
    name: { fr: "Presque plein", en: "Presque plein" },
    difficulty: 4,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "truss", cells: [[0,0],[0,1],[0,2],[0,3]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] }
    ],
    walls: [[0, 1], [4, 0]],
    modifiers: [],
    par: { moves2fans: 12, moves3fans: 8 },   // optimum prouvé : 7
    reward: null
  },
  {
    id: "T1-32",
    family: "truck",
    name: { fr: "Millimétré", en: "Millimétré" },
    difficulty: 4,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "truss", cells: [[0,0],[0,1],[0,2],[0,3]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "crate", cells: [[0,0]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "truss", cells: [[0,0],[0,1],[0,2],[0,3]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true }
    ],
    walls: [[3, 4], [3, 3]],
    modifiers: [],
    par: { moves2fans: 12, moves3fans: 8 },   // optimum prouvé : 7
    reward: null
  },
  {
    id: "T1-33",
    family: "truck",
    name: { fr: "Le violoncelle précieux", en: "Le violoncelle précieux" },
    difficulty: 4,
    grid: { cols: 4, rows: 5 },
    items: [
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "crate", cells: [[0,0]] },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "crate", cells: [[0,0]] },
      { type: "guitar", cells: [[0,0],[0,1]], fragile: true },
      { type: "crate", cells: [[0,0]] }
    ],
    walls: [[3, 0]],
    modifiers: ["fragile"],
    par: { moves2fans: 12, moves3fans: 8 },   // optimum prouvé : 7
    reward: null
  },
  {
    id: "T1-34",
    family: "truck",
    name: { fr: "La batterie en soute", en: "La batterie en soute" },
    difficulty: 4,
    grid: { cols: 4, rows: 5 },
    items: [
      { type: "crate", cells: [[0,0]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "crate", cells: [[0,0]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true }
    ],
    walls: [[3, 4], [3, 2]],
    modifiers: [],
    par: { moves2fans: 12, moves3fans: 8 },   // optimum prouvé : 7
    reward: null
  },
  {
    id: "T1-35",
    family: "truck",
    name: { fr: "Le mur de caisses", en: "Le mur de caisses" },
    difficulty: 4,
    grid: { cols: 4, rows: 5 },
    items: [
      { type: "spot", cells: [[0,0]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "crate", cells: [[0,0]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "crate", cells: [[0,0]] },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true }
    ],
    walls: [[2, 4], [1, 4]],
    modifiers: [],
    par: { moves2fans: 14, moves3fans: 9 },   // optimum prouvé : 8
    reward: null
  },
  {
    id: "T1-36",
    family: "truck",
    name: { fr: "La règle du dernier centimètre", en: "La règle du dernier centimètre" },
    difficulty: 4,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true }
    ],
    walls: [[4, 3]],
    modifiers: [],
    par: { moves2fans: 12, moves3fans: 8 },   // optimum prouvé : 7
    reward: null
  },
  {
    id: "T1-37",
    family: "truck",
    name: { fr: "Fragile, disait l'étiquette", en: "Fragile, disait l'étiquette" },
    difficulty: 4,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "spot", cells: [[0,0]] },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "truss", cells: [[0,0],[0,1],[0,2],[0,3]] },
      { type: "guitar", cells: [[0,0],[0,1]], fragile: true },
      { type: "spot", cells: [[0,0]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true }
    ],
    walls: [[2, 2], [1, 4]],
    modifiers: ["fragile"],
    par: { moves2fans: 15, moves3fans: 10 },   // optimum prouvé : 9
    reward: null
  },
  {
    id: "T1-38",
    family: "truck",
    name: { fr: "Le grand jeu de patience", en: "Le grand jeu de patience" },
    difficulty: 4,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "truss", cells: [[0,0],[0,1],[0,2],[0,3]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "micstand", cells: [[0,0],[0,1]] }
    ],
    walls: [[1, 3]],
    modifiers: [],
    par: { moves2fans: 14, moves3fans: 9 },   // optimum prouvé : 8
    reward: null
  },
  {
    id: "T1-39",
    family: "truck",
    name: { fr: "Vingt-huit cellules", en: "Vingt-huit cellules" },
    difficulty: 4,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "crate", cells: [[0,0]] },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "spot", cells: [[0,0]] },
      { type: "truss", cells: [[0,0],[0,1],[0,2],[0,3]] }
    ],
    walls: [[0, 2], [0, 1]],
    modifiers: [],
    par: { moves2fans: 12, moves3fans: 8 },   // optimum prouvé : 7
    reward: null
  },
  {
    id: "T1-40",
    family: "truck",
    name: { fr: "La remorque savante", en: "La remorque savante" },
    difficulty: 4,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "crate", cells: [[0,0]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "truss", cells: [[0,0],[0,1],[0,2],[0,3]] }
    ],
    walls: [[3, 0], [2, 2]],
    modifiers: [],
    par: { moves2fans: 14, moves3fans: 9 },   // optimum prouvé : 8
    reward: null
  },
  {
    id: "T1-41",
    family: "truck",
    name: { fr: "Le chargement parfait", en: "Le chargement parfait" },
    difficulty: 5,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "crate", cells: [[0,0]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "crate", cells: [[0,0]] },
      { type: "truss", cells: [[0,0],[0,1],[0,2],[0,3]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "spot", cells: [[0,0]] },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true }
    ],
    walls: [[2, 4], [0, 3]],
    modifiers: [],
    par: { moves2fans: 15, moves3fans: 10 },   // optimum prouvé : 9
    reward: null
  },
  {
    id: "T1-42",
    family: "truck",
    name: { fr: "Plus une seule case", en: "Plus une seule case" },
    difficulty: 5,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "crate", cells: [[0,0]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true }
    ],
    walls: [[3, 1], [3, 0]],
    modifiers: [],
    par: { moves2fans: 15, moves3fans: 10 },   // optimum prouvé : 9
    reward: null
  },
  {
    id: "T1-43",
    family: "truck",
    name: { fr: "L'expert du quai", en: "L'expert du quai" },
    difficulty: 5,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "spot", cells: [[0,0]] },
      { type: "crate", cells: [[0,0]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "amp", cells: [[0,0],[0,1]], heavy: true }
    ],
    walls: [[1, 4], [4, 3], [3, 2]],
    modifiers: [],
    par: { moves2fans: 15, moves3fans: 10 },   // optimum prouvé : 9
    reward: null
  },
  {
    id: "T1-44",
    family: "truck",
    name: { fr: "La nuit des sangles", en: "La nuit des sangles" },
    difficulty: 5,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "spot", cells: [[0,0]] },
      { type: "micstand", cells: [[0,0],[0,1]] },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "drapes", cells: [[0,0],[0,1],[0,2]] },
      { type: "guitar", cells: [[0,0],[0,1]], fragile: true },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "crate", cells: [[0,0]] }
    ],
    walls: [[2, 4], [1, 4], [1, 0]],
    modifiers: ["fragile"],
    par: { moves2fans: 15, moves3fans: 10 },   // optimum prouvé : 9
    reward: null
  },
  {
    id: "T1-45",
    family: "truck",
    name: { fr: "Le convoi presque impossible", en: "Le convoi presque impossible" },
    difficulty: 5,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "crate", cells: [[0,0]] },
      { type: "cello", cells: [[0,0],[0,1],[1,1]], fragile: true },
      { type: "spot", cells: [[0,0]] },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "truss", cells: [[0,0],[0,1],[0,2],[0,3]] },
      { type: "truss", cells: [[0,0],[0,1],[0,2],[0,3]] }
    ],
    walls: [[3, 2], [1, 0]],
    modifiers: ["fragile"],
    par: { moves2fans: 15, moves3fans: 10 },   // optimum prouvé : 9
    reward: null
  },
  {
    id: "T1-46",
    family: "truck",
    name: { fr: "Le maître du Hangar", en: "Le maître du Hangar" },
    difficulty: 5,
    grid: { cols: 5, rows: 5 },
    items: [
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "flight", cells: [[0,0],[0,1]], heavy: true },
      { type: "crate", cells: [[0,0]] },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "keyboard", cells: [[0,0],[1,0],[0,1]] },
      { type: "drum", cells: [[0,0],[1,0],[0,1],[1,1]], heavy: true },
      { type: "ladder", cells: [[0,0],[0,1],[0,2]] },
      { type: "crate", cells: [[0,0]] }
    ],
    walls: [[0, 1], [0, 4]],
    modifiers: [],
    par: { moves2fans: 15, moves3fans: 10 },   // optimum prouvé : 9
    reward: null
  }
]);
