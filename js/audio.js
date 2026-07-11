/* ============================================================
   NINJA EVENTS — audio.js
   Système audio complet (GDD §12) — Web Audio API.
   - Sons synthétisés sur mesure (assets/audio/*.m4a, ~78 KB) ;
   - déblocage au premier geste (contrainte Safari iOS) ;
   - volume « Effets » appliqué en direct depuis les Réglages ;
   - variation de hauteur ±3 % : jamais deux sons identiques
     à l'oreille (GDD §12.4) ;
   - anti-mitraillette : un même son ne rejoue pas sous 70 ms.
   La musique et les ambiances arriveront dans une livraison dédiée.
   ============================================================ */
"use strict";

const GameAudio = (() => {

  /* Nom logique → fichier + gain de base (équilibrage doux). */
  const SOUNDS = {
    "tap":            { file: "tap.m4a",            gain: 0.5  },
    "curtain-close":  { file: "curtain-close.m4a",  gain: 0.7  },
    "curtain-open":   { file: "curtain-open.m4a",   gain: 0.7  },
    "case-roll":      { file: "case-roll.m4a",      gain: 0.55 },
    "case-lock":      { file: "case-lock.m4a",      gain: 0.8  },
    "level-complete": { file: "level-complete.m4a", gain: 0.9  },
    "undo":           { file: "undo.m4a",           gain: 0.6  },
    "restart":        { file: "restart.m4a",        gain: 0.6  },
    "three-knocks":   { file: "three-knocks.m4a",   gain: 1.0  },
    "spotlight":      { file: "spotlight.m4a",      gain: 0.8  },
    "applause":       { file: "applause.m4a",       gain: 0.95 }
  };
  const MIN_REPLAY_MS = 70;   // anti-mitraillette (roulements rapides)

  let ctx = null;             // AudioContext (créé au premier geste)
  let sfxGain = null;         // bus « Effets »
  const buffers = {};         // nom → AudioBuffer décodé
  const lastPlay = {};        // nom → timestamp du dernier départ
  const volumes = { music: 0.8, sfx: 1, ambient: 0.6 };

  /** Charge et décode un fichier son (silencieux en cas d'échec). */
  function loadSound(name) {
    return fetch("assets/audio/" + SOUNDS[name].file)
      .then(r => r.arrayBuffer())
      .then(data => ctx.decodeAudioData(data))
      .then(buf => { buffers[name] = buf; })
      .catch(e => console.warn("[Audio] chargement raté :", name, e));
  }

  return {
    /** À appeler au premier toucher (écran titre) — contrainte iOS. */
    unlock() {
      if (ctx) { ctx.resume(); return; }
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        ctx = new AC();
        sfxGain = ctx.createGain();
        sfxGain.gain.value = volumes.sfx;
        sfxGain.connect(ctx.destination);
        Object.keys(SOUNDS).forEach(loadSound);

        // iOS peut suspendre le contexte quand l'app passe en fond.
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible" && ctx) ctx.resume();
        });
        console.info("[Audio] prêt —", Object.keys(SOUNDS).length, "sons.");
      } catch (e) {
        console.warn("[Audio] Web Audio indisponible :", e);
      }
    },

    /** Applique les volumes depuis les réglages (en direct). */
    setVolumes(v) {
      Object.assign(volumes, v);
      if (sfxGain) sfxGain.gain.value = volumes.sfx;
    },

    /** Joue un effet par nom logique, avec ±3 % de hauteur. */
    play(name) {
      if (!ctx || !buffers[name] || volumes.sfx <= 0) return;
      const now = performance.now();
      if (lastPlay[name] && now - lastPlay[name] < MIN_REPLAY_MS) return;
      lastPlay[name] = now;

      const src = ctx.createBufferSource();
      src.buffer = buffers[name];
      src.playbackRate.value = 1 + (Math.random() - 0.5) * 0.06;   // ±3 %

      const g = ctx.createGain();
      g.gain.value = SOUNDS[name].gain;
      src.connect(g); g.connect(sfxGain);
      src.start();
    },

    /** Micro-vibration (si activée dans les réglages et supportée). */
    haptic(ms = 10) {
      const s = Save.get().settings;
      if (s.haptics && navigator.vibrate) navigator.vibrate(ms);
    }
  };
})();
