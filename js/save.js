/* ============================================================
   NINJA EVENTS — save.js            ⚠️ FICHIER CRITIQUE (GDD §14.3)
   Sauvegarde locale (localStorage) : format GDD §14.6.
   - écriture après chaque changement (debounce 300 ms) ;
   - champ `version` + migrations automatiques ;
   - API simple : Save.get() / Save.update(fn) / Save.reset().
   Ne jamais modifier ce fichier sans justification explicite.
   [v0.9.0] Ajout justifié : exportCode()/importCode() — parade au
   risque n°1 du GDD §18 (iOS peut effacer le localStorage). Aucune
   ligne de la logique existante n'est modifiée.
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

  /* ---------- Export / import par code (v0.9.0) ----------
     Format : NINJA-<base64 du JSON>-<somme de contrôle>
     La somme de contrôle détecte les codes tronqués ou altérés. */

  function checksum(str) {
    let h = 7;
    for (let i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }
    return h.toString(36);
  }

  function exportCode() {
    flush();
    const json = JSON.stringify(data);
    const b64 = btoa(unescape(encodeURIComponent(json)));
    return "NINJA-" + b64 + "-" + checksum(b64);
  }

  function importCode(code) {
    const m = String(code).trim().replace(/\s+/g, "")
      .match(/^NINJA-([A-Za-z0-9+/=]+)-([a-z0-9]+)$/);
    if (!m) throw new Error("format");
    if (checksum(m[1]) !== m[2]) throw new Error("checksum");
    const parsed = JSON.parse(decodeURIComponent(escape(atob(m[1]))));
    if (!parsed || typeof parsed !== "object" || !parsed.settings || !parsed.stats) {
      throw new Error("contenu");
    }
    data = migrate(parsed);
    flush();
    return data;
  }

  return {
    /** Accès en lecture à l'état courant. */
    get() { return data; },

    /** Code de sauvegarde à copier/conserver (v0.9.0). */
    exportCode,

    /** Restaure une sauvegarde depuis un code ; lève une erreur si invalide. */
    importCode,

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
