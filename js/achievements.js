/* ============================================================
   NINJA EVENTS — achievements.js
   « Les Éventails d'Or » (GDD §17.4) : succès bienveillants,
   souvent drôles, jamais de grind. Se débloquent en jouant,
   annoncés par un petit bandeau washi (toast), consultables
   dans Le Grand Album.
   Stockage : Save → unlocks.achievements { id: timestamp }
   (champ créé paresseusement : save.js n'est pas modifié).
   ============================================================ */
"use strict";

const Achievements = (() => {

  /* ---------- Définitions ----------
     trigger "victory" : vérifié après chaque niveau terminé,
       avec ctx = { level, moves, fans, undos, wasReplay }
     trigger "event"   : vérifié sur un événement nommé (ex. "resume"). */
  const DEFS = [
    { id: "premiere",   emoji: "🏮", trigger: "victory",
      name: "Les trois coups",
      desc: "Terminer ton premier spectacle.",
      check: () => Save.get().stats.totalLevels >= 1 },

    { id: "convoi",     emoji: "🚚", trigger: "victory",
      name: "Le premier convoi",
      desc: "Charger ton premier camion au Hangar.",
      check: (ctx) => ctx.level.family === "truck" },

    { id: "maitre-hangar", emoji: "🔑", trigger: "victory",
      name: "Le maître du Hangar",
      desc: "Réussir « Le maître du Hangar », le chargement ultime.",
      check: (ctx) => ctx.level.id === "T1-46" },

    { id: "triomphe",   emoji: "🪭", trigger: "victory",
      name: "Premier triomphe",
      desc: "Obtenir trois éventails sur un spectacle.",
      check: (ctx) => ctx.fans === 3 },

    { id: "au-coup-pres", emoji: "🎯", trigger: "victory",
      name: "Pas un coup de plus",
      desc: "Réussir exactement au nombre de coups parfait.",
      check: (ctx) => ctx.level.par && ctx.moves === ctx.level.par.moves3fans },

    { id: "chat",       emoji: "🐱", trigger: "victory",
      name: "Le Chat a dormi sur ta solution",
      desc: "Terminer « Le sommeil du Chat » sans le réveiller. (Il ne se réveille jamais.)",
      check: (ctx) => ctx.level.id === "A1-03" },

    { id: "zen",        emoji: "🧘", trigger: "victory",
      name: "Zéro annulation",
      desc: "Terminer un spectacle sans jamais revenir en arrière.",
      check: (ctx) => ctx.undos === 0 && ctx.moves > 0 },

    { id: "acte1",      emoji: "🎭", trigger: "victory",
      name: "La Salle Municipale rayonne",
      desc: "Terminer tous les spectacles de l'Acte I.",
      check: () => {
        const list = Levels.ofAct("act1");
        return list.length > 0 && list.every(l => Progress.isDone(l.id));
      } },

    { id: "salle-comble", emoji: "🌸", trigger: "victory",
      name: "Salle comble",
      desc: "Trois éventails sur chaque spectacle de l'Acte I.",
      check: () => {
        const list = Levels.ofAct("act1");
        return list.length > 0 && list.every(l => Progress.fansOf(l.id) === 3);
      } },

    { id: "minuit",     emoji: "🌙", trigger: "victory",
      name: "Le spectacle de minuit",
      desc: "Terminer un spectacle entre minuit et 5 h.",
      check: () => { const h = new Date().getHours(); return h >= 0 && h < 5; } },

    { id: "rappel",     emoji: "🔁", trigger: "victory",
      name: "Le rappel",
      desc: "Rejouer un spectacle déjà terminé. Le public en redemande.",
      check: (ctx) => ctx.wasReplay },

    { id: "reprise",    emoji: "💾", trigger: "event", event: "resume",
      name: "Cinq minutes de plus",
      desc: "Reprendre une mission là où tu l'avais laissée.",
      check: () => true }
  ];

  /* ---------- État ---------- */

  function unlockedMap() {
    return Save.get().unlocks.achievements || {};
  }

  function isUnlocked(id) { return Boolean(unlockedMap()[id]); }

  function unlock(def) {
    if (isUnlocked(def.id)) return false;
    Save.update(s => {
      if (!s.unlocks.achievements) s.unlocks.achievements = {};
      s.unlocks.achievements[def.id] = Date.now();
    });
    toast(def);
    return true;
  }

  /* ---------- Déclencheurs ---------- */

  /** Après chaque victoire (appelé par main.js). */
  function onVictory(ctx) {
    DEFS.filter(d => d.trigger === "victory")
        .forEach(d => { try { if (d.check(ctx)) unlock(d); } catch (e) {} });
  }

  /** Événements nommés (ex. Achievements.onEvent("resume")). */
  function onEvent(name) {
    DEFS.filter(d => d.trigger === "event" && d.event === name)
        .forEach(d => { try { if (d.check()) unlock(d); } catch (e) {} });
  }

  /** Liste complète pour Le Grand Album. */
  function all() {
    const map = unlockedMap();
    return DEFS.map(d => ({
      id: d.id, emoji: d.emoji, name: d.name, desc: d.desc,
      unlockedAt: map[d.id] || null
    }));
  }

  /* ---------- Toast (bandeau washi, file d'attente) ---------- */

  const queue = [];
  let showing = false;

  function toast(def) {
    queue.push(def);
    if (!showing) nextToast();
  }

  function nextToast() {
    const def = queue.shift();
    if (!def) { showing = false; return; }
    showing = true;

    const el = document.getElementById("toast");
    document.getElementById("toast-emoji").textContent = def.emoji;
    document.getElementById("toast-text").innerHTML =
      `<b>Éventail d'Or</b> — ${def.name}`;
    el.classList.remove("hidden");
    void el.offsetWidth;
    el.classList.add("show");
    GameAudio.play("case-lock");
    GameAudio.haptic(15);

    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => { el.classList.add("hidden"); nextToast(); }, 450);
    }, 2600);
  }

  return { onVictory, onEvent, all, isUnlocked };
})();
