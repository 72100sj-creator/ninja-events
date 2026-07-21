/* ============================================================
   NINJA EVENTS — main.js
   Orchestration : navigation entre écrans, rendu des menus à
   partir des données, réglages, victoire, démarrage, PWA.
   Aucune logique de puzzle ici (elle vit dans js/families/).
   ============================================================ */
"use strict";

const APP_VERSION = "v1.19.0";

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

    let hintGiven = false;
    for (const act of Levels.ACTS) {
      const unlocked = Progress.isActUnlocked(act.id);
      const fans = unlocked ? Progress.fansOfAct(act.id) : 0;
      // Le PREMIER acte verrouillé explique comment lever son rideau.
      let sub = act.sub;
      if (!unlocked) {
        sub = hintGiven ? "Le rideau est encore baissé…"
                        : "Termine la Générale de l'acte précédent pour lever le rideau";
        hintGiven = true;
      }
      const card = document.createElement("button");
      card.className = "act-card" + (unlocked ? "" : " locked");
      card.setAttribute("aria-label",
        `Acte ${act.num}, ${act.name}` + (unlocked ? "" : ", verrouillé"));
      card.innerHTML =
        `<span class="act-emblem" data-act="${act.id}" aria-hidden="true"></span>` +
        `<span><span class="act-name">Acte ${act.num} — ${act.name}</span><br>` +
        `<span class="act-sub">${sub}</span></span>` +
        (fans > 0 ? `<span class="act-fans"><i class="fan-i fan-s"></i> ${fans}</span>` : "");
      if (unlocked) {
        card.addEventListener("click", () => {
          currentAct = act.id;
          goto("notebook", renderNotebook);
        });
      }
      card.style.animationDelay = (list.children.length * 45) + "ms";
      card.classList.add("card-in");
      list.appendChild(card);
    }
  }

  // ----------------------------------------------------------
  // Rendu : Carnet de Régie (missions d'un acte)
  // ----------------------------------------------------------
  function renderNotebook() {
    document.getElementById("app").dataset.theme = currentAct;
    GameAudio.setScene(currentAct);

    // La salle reprend vie : chaleur proportionnelle à la progression (§7.4)
    const listAll = Levels.ofAct(currentAct);
    const done = listAll.filter(l => Progress.isDone(l.id)).length;
    document.getElementById("screen-notebook").style
      .setProperty("--warmth", listAll.length ? done / listAll.length : 0);
    const act = Levels.ACTS.find(a => a.id === currentAct);
    document.getElementById("notebook-title").innerHTML =
      `<span class="act-emblem act-emblem-s" data-act="${act.id}" aria-hidden="true"></span> ${act.name}`;

    const list = document.getElementById("notebook-list");
    list.innerHTML = "";

    Levels.ofAct(currentAct).forEach((lvl, i) => {
      const unlocked = Progress.isUnlocked(currentAct, i);
      const fans = Progress.fansOf(lvl.id);
      const card = document.createElement("button");
      card.className = "mission-card" +
        (unlocked ? "" : " locked") + (fans > 0 ? " done" : "");
      card.setAttribute("aria-label",
        `Mission ${i + 1}, ${lvl.name.fr}, ${fans} éventail${fans > 1 ? "s" : ""} sur 3` +
        (unlocked ? "" : ", verrouillée"));
      card.innerHTML =
        `<span class="m-num">${i + 1}</span>` +
        `<span class="m-name">${lvl.name.fr}</span>` +
        `<span class="m-fans">${'<i class="fan-i fan-s"></i>'.repeat(fans)}</span>`;
      if (unlocked) {
        card.addEventListener("click", () => openMission(lvl));
      }
      card.style.animationDelay = (Math.min(i, 12) * 40) + "ms";
      card.classList.add("card-in");
      list.appendChild(card);
    });
  }

  // ----------------------------------------------------------
  // Mission : chargement d'un niveau dans son moteur
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  // Mini-Yuki : humeurs de la mascotte (think · surprise · sweat · party)
  // ----------------------------------------------------------
  let moodTimer = null;
  let moodPar = Infinity;   // seuil 3 éventails du niveau en cours
  let moodMoves = 0;

  function baseMood() { return moodMoves > moodPar ? "sweat" : "think"; }

  function setMood(mood, transientMs) {
    const y = document.getElementById("yuki-mini");
    if (!y) return;
    clearTimeout(moodTimer);
    moodTimer = null;
    y.dataset.mood = mood;
    if (transientMs) {
      moodTimer = setTimeout(() => {
        moodTimer = null;
        y.dataset.mood = baseMood();
      }, transientMs);
    }
  }

  const FAMILIES = {
    cases:  () => FamilyCases,
    cables: () => FamilyCables,
    lights: () => FamilyLights,
    truck:  () => FamilyTruck
  };

  function openMission(level) {
    goto("mission", () => loadLevel(level));
  }

  /** Prépare l'écran mission pour un niveau (sans transition).
      Si ce niveau est la mission en cours sauvegardée, le plateau
      reprend exactement où il en était (GDD §9.2). */
  function loadLevel(level) {
    currentLevel = level;
    hideVictory();
    Curtain.resetVictory();

    const cur = Save.get().current;
    const savedState = (cur.levelId === level.id && cur.state) ? cur.state : null;

    // Ambiance visuelle ET sonore de l'acte
    const actId = Levels.actOf(level.id) || currentAct;
    document.getElementById("app").dataset.theme = actId;
    GameAudio.setScene(actId);

    const grid = document.getElementById("puzzle-grid");
    // Cycle de vie propre : l'ancien moteur rend la grille (écouteurs
    // compris) avant que le nouveau ne s'installe (correctif audit F).
    if (currentFamily && currentFamily.destroy) currentFamily.destroy(grid);
    moodPar = (level.par && level.par.moves3fans) || Infinity;
    moodMoves = 0;
    setMood("think");
    grid.classList.remove("enter");
    void grid.offsetWidth;
    grid.classList.add("enter");
    currentFamily = (FAMILIES[level.family] || FAMILIES.cases)();
    currentFamily.init(level, grid, {
      onWin: (moves, undos) => onVictory(level, moves, undos),
      onChange: (st) => {
        document.getElementById("btn-undo").disabled = !st.canUndo;
        document.getElementById("btn-restart").disabled = !st.canUndo;
        moodMoves = st.moves || 0;
        const y = document.getElementById("yuki-mini");
        if (y && y.dataset.mood !== "party" && !moodTimer) setMood(baseMood());
      },
      // Sauvegarde continue du plateau, coup après coup.
      onState: (state) => Save.update(s => {
        s.current.levelId = level.id;
        s.current.state = state;
      })
    }, savedState);

    // Titre poétique : visible 3 s, puis fondu (GDD §10.2)
    const title = document.getElementById("mission-title");
    title.textContent = level.name.fr;
    title.classList.remove("faded");
    clearTimeout(title._t);
    title._t = setTimeout(() => title.classList.add("faded"), 3000);


  }

  // ----------------------------------------------------------
  // Victoire : éventails, enregistrement, panneau de fin
  // ----------------------------------------------------------
  function onVictory(level, moves, undos = 0) {
    // « Skippable dès la deuxième victoire » (GDD §11.5) : on regarde
    // AVANT d'enregistrer si le joueur a déjà vu la séquence.
    const wasReplay = Progress.isDone(level.id);
    const alreadySeen = wasReplay || Save.get().stats.totalLevels > 0;

    const fans = Progress.fansFor(level, moves);
    Progress.completeLevel(level.id, fans, moves);
    Save.update(s => {
      s.current.levelId = null;
      s.current.state = null;
      s.stats.totalMoves = (s.stats.totalMoves || 0) + moves;   // pour l'Album
    });

    // Yuki exulte pendant toute la séquence, le décor de l'acte s'installe,
    // et si le Chat est du spectacle, il se redresse pour saluer aussi
    setMood("party");
    document.querySelectorAll("#puzzle-grid .grid-cat")
      .forEach(c => c.classList.add("cat-celebrate"));
    document.getElementById("stage-set").dataset.act =
      Levels.actOf(level.id) || "act1";
    // Confettis : réservés aux Générales (dernier spectacle de l'acte)
    const GALAS = ["A1-12", "A2-16", "A3-12", "A4-12", "A5-12"];
    document.getElementById("rideau").classList.toggle("gala", GALAS.includes(level.id));
    // Mise en scène : 3 variantes par acte, choisies par le niveau (stable)
    const vSum = level.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    document.getElementById("rideau").dataset.variant = "v" + (vSum % 3 + 1);

    // Les Éventails d'Or (les toasts s'affichent par-dessus la séquence)
    Achievements.onVictory({ level, moves, fans, undos, wasReplay });

    // Remplissage du panneau (affiché à la FIN de la séquence Rideau)
    document.getElementById("victory-name").textContent = level.name.fr;
    document.getElementById("victory-moves").textContent =
      moves + (moves > 1 ? " coups" : " coup");
    document.querySelectorAll("#victory .v-fans span").forEach((el, i) => {
      el.classList.toggle("earned", i < fans);
    });
    document.getElementById("btn-next").classList.toggle("hidden", !nextLevel(level));

    // La séquence signature — SAUF au Hangar : le camion a déjà joué
    // son grand départ (portes, verrous, moteur) dans le moteur truck.
    if (level.family === "truck") {
      document.querySelector("#victory .v-eyebrow").textContent =
        "Direction le prochain spectacle !";
      setTimeout(() =>
        document.getElementById("victory").classList.remove("hidden"), 450);
    } else {
      document.querySelector("#victory .v-eyebrow").textContent =
        "Le rideau s'ouvre !";
      Curtain.playVictory({
        skippable: alreadySeen,
        onDone: () => document.getElementById("victory").classList.remove("hidden")
      });
    }
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
  // Le Grand Album : statistiques + Éventails d'Or
  // ----------------------------------------------------------
  function renderAlbum() {
    const s = Save.get();
    const perfect = Object.values(s.progress).filter(p => p.fans === 3).length;

    const rows = [
      ["🎭", "Spectacles terminés", s.stats.totalLevels],
      ['<i class="fan-i fan-s"></i>', "Éventails gagnés", s.stats.totalFans],
      ["🌸", 'Spectacles parfaits (3 <i class="fan-i fan-s"></i>)', perfect],
      ["👣", "Coups joués", s.stats.totalMoves || 0]
    ];
    document.getElementById("album-stats").innerHTML = rows.map(
      ([e, label, val]) =>
        `<div class="stat-row"><span>${e} ${label}</span><b>${val}</b></div>`
    ).join("");

    // --- La Troupe : chaque artiste rencontré s'installe dans l'Album.
    // « Rencontré » = au moins un spectacle joué dans son lieu.
    // Les portraits sont CLONÉS depuis la troupe du rideau (zéro doublon SVG).
    const TROUPE = [
      ["p-chauffeur",   "Le Chauffeur",        "Le Hangar",              "hangar"],
      ["p-benevole",    "La Bénévole",         "Salle Municipale",       "act1"],
      ["p-gardien",     "Le Gardien",          "Salle Municipale",       "act1"],
      ["p-comedienne",  "La Comédienne",       "Théâtre Suzume",         "act2"],
      ["p-metteur",     "Le Metteur en scène", "Théâtre Suzume",         "act2"],
      ["p-habilleuse",  "L'Habilleuse",        "Théâtre Suzume",         "act2"],
      ["p-jongleuse",   "La Jongleuse",        "Festival des Lanternes", "act3"],
      ["p-danseuse",    "La Danseuse étoile",  "Festival des Lanternes", "act3"],
      ["p-machiniste1", "Le Machiniste",       "La Grande Tournée",      "act4"],
      ["p-machiniste2", "La Machiniste",       "La Grande Tournée",      "act4"],
      ["p-chanteuse",   "La Chanteuse",        "Le Concert Géant",       "act5"],
      ["p-guitariste",  "Le Guitariste",       "Le Concert Géant",       "act5"],
      ["p-batteur",     "Le Batteur",          "Le Concert Géant",       "act5"]
    ];
    const actMet = {};
    ["hangar", "act1", "act2", "act3", "act4", "act5"].forEach(a => {
      actMet[a] = Levels.ofAct(a).some(l => Progress.isDone(l.id));
    });
    const wrap = document.getElementById("album-troupe");
    wrap.innerHTML = "";
    let metCount = 0;
    TROUPE.forEach(([cls, nom, lieu, act]) => {
      const known = actMet[act];
      if (known) metCount++;
      const card = document.createElement("div");
      card.className = "t-card" + (known ? "" : " locked");
      const src = document.querySelector(".troupe ." + cls);
      if (src) {
        const svg = src.cloneNode(true);
        svg.setAttribute("class", "t-portrait");
        card.appendChild(svg);
      }
      const cap = document.createElement("div");
      cap.className = "t-cap";
      cap.innerHTML = `<b>${known ? nom : "? ? ?"}</b><span>${lieu}</span>`;
      card.appendChild(cap);
      wrap.appendChild(card);
    });
    document.querySelectorAll(".troupe-count").forEach(n => n.remove());
    wrap.insertAdjacentHTML("beforebegin",
      `<p class="muted troupe-count">${metCount} / ${TROUPE.length} rencontrés</p>`);

    const list = Achievements.all();
    const got = list.filter(a => a.unlockedAt).length;
    document.getElementById("album-achievements").innerHTML =
      `<p class="muted ach-count">${got} / ${list.length} débloqués</p>` +
      list.map(a => {
        const date = a.unlockedAt
          ? new Date(a.unlockedAt).toLocaleDateString("fr-FR")
          : "";
        return `<div class="ach-card${a.unlockedAt ? "" : " locked"}">
          <span class="ach-emoji">${a.emoji}</span>
          <span class="ach-body"><b>${a.name}</b><br><span class="ach-desc">${a.desc}</span></span>
          <span class="ach-date">${date}</span>
        </div>`;
      }).join("");
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
    scene.dataset.bigui = s.bigUI ? "on" : "off";   // clé optionnelle (anciens joueurs : off)

    GameAudio.setVolumes({ music: s.music, sfx: s.sfx, ambient: s.ambient });
  }

  /** Remplit les champs des Réglages depuis la sauvegarde (rejouable). */
  function syncSettingsInputs() {
    const s = Save.get().settings;
    const $ = id => document.getElementById(id);
    $("set-music").value = s.music;
    $("set-sfx").value = s.sfx;
    $("set-ambient").value = s.ambient;
    $("set-haptics").checked = s.haptics;
    $("set-darkmode").value = s.darkMode;
    $("set-reducedmotion").checked = s.reducedMotion;
    $("set-bigui").checked = Boolean(s.bigUI);
    $("set-colorblind").value = s.colorblind;
  }

  /** Lie les écouteurs des Réglages (à appeler UNE seule fois). */
  function bindSettings() {
    const $ = id => document.getElementById(id);
    syncSettingsInputs();

    const bindings = {
      "set-music":        ["music",        el => Number(el.value)],
      "set-sfx":          ["sfx",          el => Number(el.value)],
      "set-ambient":      ["ambient",      el => Number(el.value)],
      "set-haptics":      ["haptics",      el => el.checked],
      "set-darkmode":     ["darkMode",     el => el.value],
      "set-reducedmotion":["reducedMotion",el => el.checked],
      "set-bigui":        ["bigUI",        el => el.checked],
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
        syncSettingsInputs();
        renderDojoStats();
      }
    });

    // ---- Export / import de sauvegarde (parade au risque iOS) ----
    const panel = $("save-panel");
    function openPanel(mode) {
      panel.classList.remove("hidden");
      $("save-msg").textContent = "";
      const code = $("save-code");
      if (mode === "export") {
        $("save-panel-title").textContent =
          "Ton code de sauvegarde — copie-le et garde-le précieusement :";
        code.value = Save.exportCode();
        code.readOnly = true;
        $("btn-save-copy").classList.remove("hidden");
        $("btn-save-apply").classList.add("hidden");
      } else {
        $("save-panel-title").textContent =
          "Colle ici un code de sauvegarde :";
        code.value = "";
        code.readOnly = false;
        $("btn-save-copy").classList.add("hidden");
        $("btn-save-apply").classList.remove("hidden");
        code.focus();
      }
    }
    $("btn-export").addEventListener("click", () => openPanel("export"));
    $("btn-import").addEventListener("click", () => openPanel("import"));
    $("btn-save-close").addEventListener("click", () => panel.classList.add("hidden"));

    $("btn-save-copy").addEventListener("click", () => {
      const code = $("save-code");
      const done = () => { $("save-msg").textContent = "Copié ! Range-le dans tes notes. 🏮"; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code.value).then(done).catch(() => {
          code.select(); document.execCommand("copy"); done();
        });
      } else {
        code.select(); document.execCommand("copy"); done();
      }
    });

    $("btn-save-apply").addEventListener("click", () => {
      const raw = $("save-code").value;
      if (!raw.trim()) return;
      if (!confirm("Restaurer cette sauvegarde ?\nElle remplacera la progression actuelle.")) return;
      try {
        Save.importCode(raw);
        applySettings();
        syncSettingsInputs();
        renderDojoStats();
        $("save-msg").textContent = "Sauvegarde restaurée ! Bon retour en coulisses. 🥷";
        $("btn-save-apply").classList.add("hidden");
      } catch (e) {
        const why = { format: "le format du code n'est pas reconnu",
                      checksum: "le code semble incomplet ou altéré",
                      contenu: "le contenu du code n'est pas une sauvegarde" }[e.message]
                    || "le code n'a pas pu être lu";
        $("save-msg").textContent = "Impossible de restaurer : " + why + ".";
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
        ? `${st.totalLevels} spectacle${st.totalLevels > 1 ? "s" : ""} · <i class="fan-i fan-s"></i> ${st.totalFans}`
        : "Ton premier spectacle t'attend.";

    // « Reprendre » : visible seulement si une mission est en cours
    const cur = Save.get().current;
    const resumable = cur.levelId && cur.state && Levels.byId(cur.levelId);
    document.getElementById("btn-resume").classList.toggle("hidden", !resumable);
  }

  // ----------------------------------------------------------
  // Démarrage
  // ----------------------------------------------------------
  function boot() {
    document.getElementById("app-version").textContent = APP_VERSION;
    document.getElementById("about-version").textContent = APP_VERSION;
    applySettings();
    bindSettings();
    renderDojoStats();

    // Un « tap » discret sur chaque bouton (délégation globale)
    document.addEventListener("click", (ev) => {
      if (ev.target.closest(".btn")) GameAudio.play("tap");
    });

    // Boutons de navigation génériques (attribut data-goto)
    document.querySelectorAll("[data-goto]").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.goto;
        const prepare = { map: renderMap, notebook: renderNotebook,
                          dojo: renderDojoStats, album: renderAlbum }[target];
        if (target === "dojo" || target === "map") GameAudio.setScene("act1");
        goto(target, prepare);
      });
    });

    // « Reprendre » la mission en cours depuis le Dojo
    document.getElementById("btn-resume").addEventListener("click", () => {
      const cur = Save.get().current;
      const level = cur.levelId && Levels.byId(cur.levelId);
      if (!level) return;
      currentAct = Levels.actOf(level.id) || currentAct;
      Achievements.onEvent("resume");
      openMission(level);
    });

    // HUD de mission
    document.getElementById("btn-undo")
      .addEventListener("click", () => {
        if (currentFamily) { currentFamily.undo(); setMood("surprise", 900); }
      });
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
