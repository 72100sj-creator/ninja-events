/* ============================================================
   NINJA EVENTS — main.js
   Orchestration : navigation entre écrans, rendu des menus à
   partir des données, liaison des réglages, démarrage, PWA.
   Aucune logique de puzzle ici (elle vit dans js/families/).
   ============================================================ */
"use strict";

const APP_VERSION = "v0.1.0";

const App = (() => {

  // ----------------------------------------------------------
  // Navigation
  // ----------------------------------------------------------
  let currentScreen = "title";
  let currentAct = "act1";

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
      const card = document.createElement("button");
      card.className = "act-card" + (unlocked ? "" : " locked");
      card.innerHTML =
        `<span class="act-emoji">${act.emoji}</span>` +
        `<span><span class="act-name">Acte ${act.num} — ${act.name}</span><br>` +
        `<span class="act-sub">${unlocked ? act.sub : "Le rideau est encore baissé…"}</span></span>` +
        (unlocked ? `<span class="act-fans">🪭 ${Progress.fansOfAct(act.id)}</span>` : "");
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
  // Mission : chargement d'un niveau dans le moteur
  // ----------------------------------------------------------
  const FAMILIES = { cases: () => FamilyCases };   // extensible en Phase 2+

  function openMission(level) {
    goto("mission", () => {
      const grid = document.getElementById("puzzle-grid");
      const family = (FAMILIES[level.family] || FAMILIES.cases)();
      family.init(level, grid);

      // Titre poétique : visible 3 s, puis fondu (GDD §10.2)
      const title = document.getElementById("mission-title");
      title.textContent = level.name.fr;
      title.classList.remove("faded");
      clearTimeout(title._t);
      title._t = setTimeout(() => title.classList.add("faded"), 3000);

      // Mémoriser la mission en cours (reprise après fermeture)
      Save.update(s => { s.current.levelId = level.id; });
    });
  }

  // ----------------------------------------------------------
  // Réglages : liaison bidirectionnelle avec la sauvegarde
  // ----------------------------------------------------------
  function applySettings() {
    const s = Save.get().settings;
    const scene = document.getElementById("app");

    // Mode sombre : auto = suit le système
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

    // Valeurs initiales
    $("set-music").value = s.music;
    $("set-sfx").value = s.sfx;
    $("set-ambient").value = s.ambient;
    $("set-haptics").checked = s.haptics;
    $("set-darkmode").value = s.darkMode;
    $("set-reducedmotion").checked = s.reducedMotion;
    $("set-colorblind").value = s.colorblind;

    // Un seul schéma de liaison : { idHTML : [cléSauvegarde, lecture] }
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

    // Effacer la progression (double confirmation douce)
    $("btn-reset-save").addEventListener("click", () => {
      if (confirm("Effacer toute la progression ?\nLe rideau retombera sur tout ce que tu as construit.")) {
        Save.reset();
        applySettings();
        bindSettings();   // recharge les valeurs par défaut dans les champs
        renderDojoStats();
      }
    });

    // Le mode auto suit les changements du système en direct
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
