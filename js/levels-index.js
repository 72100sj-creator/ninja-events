/* ============================================================
   NINJA EVENTS — levels-index.js
   Catalogue des actes (GDD §7.1) + registre central des niveaux.
   Les fichiers js/levels/actN.js s'enregistrent ici : on peut
   ajouter 100 niveaux sans toucher aucun fichier critique.
   ============================================================ */
"use strict";

const Levels = (() => {

  /** Les cinq actes de la carrière (GDD §7.1). */
  const ACTS = [
    { id: "act1", num: "I",   emoji: "🏮", name: "La Salle Municipale",
      sub: "Hanabi-chō — là où tout commence" },
    { id: "act2", num: "II",  emoji: "🎭", name: "Le Théâtre Suzume",
      sub: "Dorures douces et kabuki" },
    { id: "act3", num: "III", emoji: "🌸", name: "Le Festival des Lanternes",
      sub: "Herbe, guirlandes et étoiles" },
    { id: "act4", num: "IV",  emoji: "🚚", name: "La Grande Tournée",
      sub: "Les routes et les quais" },
    { id: "act5", num: "V",   emoji: "🎆", name: "Le Concert Géant",
      sub: "Au pied du Mont Hanabi" }
  ];

  /** Registre : actId → tableau ordonné de niveaux (format GDD §14.5). */
  const registry = { act1: [], act2: [], act3: [], act4: [], act5: [] };

  return {
    ACTS,

    /** Appelé par chaque fichier levels/actN.js pour déclarer ses niveaux. */
    register(actId, levelArray) {
      if (!registry[actId]) { console.warn("[Levels] acte inconnu :", actId); return; }
      registry[actId].push(...levelArray);
    },

    /** Tous les niveaux d'un acte, dans l'ordre. */
    ofAct(actId) { return registry[actId] || []; },

    /** Acte auquel appartient un niveau (ex. "A1-02" → "act1"). */
    actOf(levelId) {
      for (const actId of Object.keys(registry)) {
        if (registry[actId].some(l => l.id === levelId)) return actId;
      }
      return null;
    },

    /** Retrouve un niveau par son id (ex. "A1-02"). */
    byId(levelId) {
      for (const actId of Object.keys(registry)) {
        const found = registry[actId].find(l => l.id === levelId);
        if (found) return found;
      }
      return null;
    }
  };
})();
