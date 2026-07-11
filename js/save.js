/* ============================================================
   NINJA EVENTS — save.js            ⚠️ FICHIER CRITIQUE (GDD §14.3)
   Sauvegarde locale (localStorage) : format GDD §14.6.
   - écriture après chaque changement (debounce 300 ms) ;
   - champ `version` + migrations automatiques ;
   - API simple : Save.get() / Save.update(fn) / Save.reset().
   Ne jamais modifier ce fichier sans justification explicite.
   ============================================================ */
"use strict";

const Save = (() => {

  const KEY = "ninja-events-save";
  const SAVE_VERSION = 1;

  /** Sauvegarde par défaut (nouveau joueur). */
  function defaults() {
    return {
      version: SAVE_VERSION,
      settings: {
        music: 0.8,
        sfx: 1,
        ambient: 0.6,
        haptics: true,
        colorblind: "none",       // none | deutan | protan | tritan
        darkMode: "auto",         // auto | light | dark
        reducedMotion: false
      },
      progress: {},               // { "A1-01": { fans, bestMoves, completedAt } }
      current: { levelId: null, state: null },
      unlocks: { costumes: ["default"], activeCostume: "default" },
      stats: { totalLevels: 0, totalFans: 0, playSeconds: 0 }
    };
  }

  /** Migrations : de version en version, sans jamais perdre le joueur. */
  function migrate(data) {
    if (!data || typeof data !== "object") return defaults();
    // Exemple pour l'avenir :
    // if (data.version === 1) { data.nouveauChamp = ...; data.version = 2; }
    if (data.version !== SAVE_VERSION) {
      // Version inconnue (plus récente ?) : on repart des défauts
      // en conservant ce qui est compatible.
      const d = defaults();
      return Object.assign(d, {
        settings: Object.assign(d.settings, data.settings || {}),
        progress: data.progress || {},
        unlocks:  Object.assign(d.unlocks, data.unlocks || {}),
        stats:    Object.assign(d.stats, data.stats || {})
      });
    }
    return data;
  }

  /** Lecture protégée : une sauvegarde corrompue ne casse jamais le jeu. */
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? migrate(JSON.parse(raw)) : defaults();
    } catch (e) {
      console.warn("[Save] sauvegarde illisible, réinitialisation.", e);
      return defaults();
    }
  }

  // --- État en mémoire + écriture différée (debounce 300 ms) ---
  let data = load();
  let writeTimer = null;

  function write() {
    clearTimeout(writeTimer);
    writeTimer = setTimeout(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify(data));
      } catch (e) {
        console.warn("[Save] écriture impossible (stockage plein ?)", e);
      }
    }, 300);
  }

  /** Écriture immédiate (avant fermeture de page). */
  function flush() {
    clearTimeout(writeTimer);
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  }
  window.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });

  return {
    /** Accès en lecture à l'état courant. */
    get() { return data; },

    /**
     * Modifier la sauvegarde : Save.update(s => { s.settings.music = 0.5; })
     * L'écriture disque est automatique et différée.
     */
    update(fn) { fn(data); write(); return data; },

    /** Réinitialisation complète (bouton « Effacer la progression »). */
    reset() { data = defaults(); flush(); return data; },

    flush
  };
})();
