/* ============================================================
   NINJA EVENTS — audio.js
   Système audio complet (GDD §12) — Web Audio API.
   - Sons synthétisés sur mesure (assets/audio/*.m4a, ~78 KB) ;
   - déblocage au premier geste (contrainte Safari iOS) ;
   - volume « Effets » appliqué en direct depuis les Réglages ;
   - variation de hauteur ±3 % : jamais deux sons identiques
     à l'oreille (GDD §12.4) ;
   - anti-mitraillette : un même son ne rejoue pas sous 70 ms.
   - musique et ambiance en boucle sans couture (queue de réverb
     repliée au début du fichier), fondus d'entrée/sortie, curseurs
     « Musique » et « Ambiances » appliqués en direct (GDD §12.2).
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

  /* Boucles longues : une musique par acte, une ambiance par décor. */
  const LOOPS = {
    "music-act1":        { file: "music-act1.m4a",        gain: 0.9 },
    "ambient-backstage": { file: "ambient-backstage.m4a", gain: 0.9 }
  };

  let ctx = null;             // AudioContext (créé au premier geste)
  let sfxGain = null;         // bus « Effets »
  let musicGain = null;       // bus « Musique »
  let ambientGain = null;     // bus « Ambiances »
  const buffers = {};         // nom → AudioBuffer décodé
  const lastPlay = {};        // nom → timestamp du dernier départ
  const playing = {};         // boucles en cours : nom → {src, g}
  const volumes = { music: 0.8, sfx: 1, ambient: 0.6 };

  /** Démarre une boucle (musique ou ambiance) avec un fondu d'entrée. */
  function startLoop(name, bus, fade = 2.5) {
    if (!ctx || !buffers[name] || playing[name]) return;
    const src = ctx.createBufferSource();
    src.buffer = buffers[name];
    src.loop = true;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.linearRampToValueAtTime(LOOPS[name].gain, ctx.currentTime + fade);
    src.connect(g); g.connect(bus);
    src.start();
    playing[name] = { src, g };
  }

  /** Arrête une boucle en fondu (pour les futurs changements d'acte). */
  function stopLoop(name, fade = 1.2) {
    const p = playing[name];
    if (!p || !ctx) return;
    p.g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + fade);
    p.src.stop(ctx.currentTime + fade + 0.1);
    delete playing[name];
  }

  /** Charge et décode un fichier son (silencieux en cas d'échec). */
  function loadSound(name, table) {
    return fetch("assets/audio/" + table[name].file)
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
        musicGain = ctx.createGain();
        musicGain.gain.value = volumes.music;
        musicGain.connect(ctx.destination);
        ambientGain = ctx.createGain();
        ambientGain.gain.value = volumes.ambient;
        ambientGain.connect(ctx.destination);

        // Effets d'abord (légers), puis les boucles qui démarrent en fondu.
        Object.keys(SOUNDS).forEach(n => loadSound(n, SOUNDS));
        loadSound("music-act1", LOOPS)
          .then(() => startLoop("music-act1", musicGain, 3.5));
        loadSound("ambient-backstage", LOOPS)
          .then(() => startLoop("ambient-backstage", ambientGain, 4.5));

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
      if (sfxGain)     sfxGain.gain.value     = volumes.sfx;
      if (musicGain)   musicGain.gain.value   = volumes.music;
      if (ambientGain) ambientGain.gain.value = volumes.ambient;
    },

    /** Pour les prochains actes : changer de musique/ambiance en fondu. */
    startLoop, stopLoop,

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
