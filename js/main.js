/* ============================================================
   NINJA EVENTS — main.js
   Orchestration : navigation entre écrans, rendu des menus à
   partir des données, réglages, victoire, démarrage, PWA.
   Aucune logique de puzzle ici (elle vit dans js/families/).
   ============================================================ */
"use strict";

const APP_VERSION = "v0.3.0";

const App = (() => {

  // ----------------------------------------------------------
  // État de navigation
  // ----------------------------------------------------------
  let currentScreen = "title";
  let currentAct = "act1";
  let currentLevel = null;      // niveau en cours de jeu
  let currentFamily = null;     // moteur de la famille en cours

  function screenEl(name) { return document.getElementById("screen-" + name); }

  /** Change d'écran derrière le rideau. */
  function goto(name, prepare) {
    Curtain.transition(() => {
      screenEl(currentScreen).classList.remove("is-active");
      if (typeof prepare === "function") prepare();
      screenEl(name).classList.add("is-active");
      currentScreen = name;
    });
  }

  // ----------------------------------------------------------
  // Rendu : Feuille de Route (actes)
  // ----------------------------------------------------------
  function renderMap() {
    const list = document.getElementById("map-list");
    list.innerHTML = "";

    for (const act of Levels.ACTS) {
      const unlocked = Progress.isActUnlocked(act.id);
      const fans = unlocked ? Progress.fansOfAct(act.id) : 0;
      const card = document.createElement("button");
      card.className = "act-card" + (unlocked ? "" : " locked");
      card.innerHTML =
        `<span class="act-emoji">${act.emoji}</span>` +
        `<span><span class="act-name">Acte ${act.num} — ${act.name}</span><br>` +
        `<span class="act-sub">${unlocked ? act.sub : "Le rideau est encore baissé…"}</span></span>` +
        (fans > 0 ? `<span class="act-fans">🪭 ${fans}</span>` : "");
      if (unlocked) {
        card.addEventListener("click", () => {
          currentAct = act.id;
          goto("notebook", renderNotebook);
        });
      }
      list.appendChild(card);
    }
  }

  // ----------------------------------------------------------
  // Rendu : Carnet de Régie (missions d'un acte)
  // ----------------------------------------------------------
  function renderNotebook() {
    const act = Levels.ACTS.find(a => a.id === currentAct);
    document.getElementById("notebook-title").textContent =
      `${act.emoji} ${act.name}`;

    const list = document.getElementById("notebook-list");
    list.innerHTML = "";

    Levels.ofAct(currentAct).forEach((lvl, i) => {
      const unlocked = Progress.isUnlocked(currentAct, i);
      const fans = Progress.fansOf(lvl.id);
      const card = document.createElement("button");
      card.className = "mission-card" +
        (unlocked ? "" : " locked") + (fans > 0 ? " done" : "");
      card.innerHTML =
        `<span class="m-num">${i + 1}</span>` +
        `<span class="m-name">${lvl.name.fr}</span>` +
        `<span class="m-fans">${"🪭".repeat(fans)}</span>`;
      if (unlocked) {
        card.addEventListener("click", () => openMission(lvl));
      }
      list.appendChild(card);
    });
  }

  // ----------------------------------------------------------
  // Mission : chargement d'un niveau dans son moteur
  // ----------------------------------------------------------
  const FAMILIES = { cases: () => FamilyCases };   // extensible (Phase 2+)

  function openMission(level) {
    goto("mission", () => loadLevel(level));
  }

  /** Prépare l'écran mission pour un niveau (sans transition). */
  function loadLevel(level) {
    currentLevel = level;
    hideVictory();
    Curtain.resetVictory();

    const grid = document.getElementById("puzzle-grid");
    currentFamily = (FAMILIES[level.family] || FAMILIES.cases)();
    currentFamily.init(level, grid, {
      onWin: (moves) => onVictory(level, moves),
      onChange: (st) => {
        document.getElementById("btn-undo").disabled = !st.canUndo;
        document.getElementById("btn-restart").disabled = !st.canUndo;
      }
    });

    // Titre poétique : visible 3 s, puis fondu (GDD §10.2)
    const title = document.getElementById("mission-title");
    title.textContent = level.name.fr;
    title.classList.remove("faded");
    clearTimeout(title._t);
    title._t = setTimeout(() => title.classList.add("faded"), 3000);

    // Mémoriser la mission en cours (reprise après fermeture)
    Save.update(s => { s.current.levelId = level.id; });
  }

  // ----------------------------------------------------------
  // Victoire : éventails, enregistrement, panneau de fin
  // ----------------------------------------------------------
  function onVictory(level, moves) {
    // « Skippable dès la deuxième victoire » (GDD §11.5) : on regarde
    // AVANT d'enregistrer si le joueur a déjà vu la séquence.
    const alreadySeen = Progress.isDone(level.id) ||
                        Save.get().stats.totalLevels > 0;

    const fans = Progress.fansFor(level, moves);
    Progress.completeLevel(level.id, fans, moves);
    Save.update(s => { s.current.levelId = null; });

    // Remplissage du panneau (affiché à la FIN de la séquence Rideau)
    document.getElementById("victory-name").textContent = level.name.fr;
    document.getElementById("victory-moves").textContent =
      moves + (moves > 1 ? " coups" : " coup");
    document.querySelectorAll("#victory .v-fans span").forEach((el, i) => {
      el.classList.toggle("earned", i < fans);
    });
    document.getElementById("btn-next").classList.toggle("hidden", !nextLevel(level));

    // La séquence signature : noir → trois coups → rideau → lumières
    Curtain.playVictory({
      skippable: alreadySeen,
      onDone: () => document.getElementById("victory").classList.remove("hidden")
    });
  }

  function hideVictory() {
    document.getElementById("victory").classList.add("hidden");
  }

  /** Niveau suivant dans l'acte courant (ou null si c'était le dernier). */
  function nextLevel(level) {
    const list = Levels.ofAct(currentAct);
    const i = list.findIndex(l => l.id === level.id);
    return (i >= 0 && i + 1 < list.length) ? list[i + 1] : null;
  }

  // ----------------------------------------------------------
  // Réglages : liaison bidirectionnelle avec la sauvegarde
  // ----------------------------------------------------------
  function applySettings() {
    const s = Save.get().settings;
    const scene = document.getElementById("app");

    const dark = s.darkMode === "dark" ||
      (s.darkMode === "auto" &&
       window.matchMedia("(prefers-color-scheme: dark)").matches);
    scene.dataset.dark = dark ? "on" : "off";

    scene.dataset.motion = s.reducedMotion ? "reduced" : "full";
    scene.dataset.colorblind = s.colorblind;

    GameAudio.setVolumes({ music: s.music, sfx: s.sfx, ambient: s.ambient });
  }

  function bindSettings() {
    const s = Save.get().settings;
    const $ = id => document.getElementById(id);

    $("set-music").value = s.music;
    $("set-sfx").value = s.sfx;
    $("set-ambient").value = s.ambient;
    $("set-haptics").checked = s.haptics;
    $("set-darkmode").value = s.darkMode;
    $("set-reducedmotion").checked = s.reducedMotion;
    $("set-colorblind").value = s.colorblind;

    const bindings = {
      "set-music":        ["music",        el => Number(el.value)],
      "set-sfx":          ["sfx",          el => Number(el.value)],
      "set-ambient":      ["ambient",      el => Number(el.value)],
      "set-haptics":      ["haptics",      el => el.checked],
      "set-darkmode":     ["darkMode",     el => el.value],
      "set-reducedmotion":["reducedMotion",el => el.checked],
      "set-colorblind":   ["colorblind",   el => el.value]
    };
    for (const [id, [key, read]] of Object.entries(bindings)) {
      $(id).addEventListener("change", (ev) => {
        Save.update(st => { st.settings[key] = read(ev.target); });
        applySettings();
        GameAudio.haptic(6);
      });
    }

    $("btn-reset-save").addEventListener("click", () => {
      if (confirm("Effacer toute la progression ?\nLe rideau retombera sur tout ce que tu as construit.")) {
        Save.reset();
        applySettings();
        bindSettings();
        renderDojoStats();
      }
    });

    window.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", applySettings);
  }

  // ----------------------------------------------------------
  // Dojo : petite ligne de statistiques
  // ----------------------------------------------------------
  function renderDojoStats() {
    const st = Save.get().stats;
    document.getElementById("dojo-stats").textContent =
      st.totalLevels > 0
        ? `${st.totalLevels} spectacle${st.totalLevels > 1 ? "s" : ""} · 🪭 ${st.totalFans}`
        : "Ton premier spectacle t'attend.";
  }

  // ----------------------------------------------------------
  // Démarrage
  // ----------------------------------------------------------
  function boot() {
    document.getElementById("app-version").textContent = APP_VERSION;
    applySettings();
    bindSettings();
    renderDojoStats();

    // Boutons de navigation génériques (attribut data-goto)
    document.querySelectorAll("[data-goto]").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.goto;
        const prepare = { map: renderMap, notebook: renderNotebook, dojo: renderDojoStats }[target];
        goto(target, prepare);
      });
    });

    // HUD de mission
    document.getElementById("btn-undo")
      .addEventListener("click", () => currentFamily && currentFamily.undo());
    document.getElementById("btn-restart")
      .addEventListener("click", () => currentFamily && currentFamily.restart());

    // Panneau de victoire
    document.getElementById("btn-next").addEventListener("click", () => {
      const next = nextLevel(currentLevel);
      if (next) openMission(next);
    });
    document.getElementById("btn-back-notebook")
      .addEventListener("click", () => {
        Curtain.resetVictory();
        goto("notebook", renderNotebook);
      });

    // Écran titre : premier toucher = déblocage audio + entrée au Dojo
    screenEl("title").addEventListener("pointerdown", () => {
      GameAudio.unlock();
      goto("dojo", renderDojoStats);
    }, { once: true });

    // Service worker (hors ligne)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(e =>
        console.warn("[PWA] service worker non enregistré :", e));
    }
  }

  document.addEventListener("DOMContentLoaded", boot);

  return { goto };
})();
