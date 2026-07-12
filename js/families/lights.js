/* ============================================================
   NINJA EVENTS — families/lights.js
   Famille C « Projecteurs » (GDD §5.3) — v0.11.0. « Le focus ».

   Règles :
   - un toucher sur un projecteur = un quart de tour horaire ;
   - son faisceau file en ligne droite jusqu'à un mur, un autre
     projecteur ou le bord de la scène ;
   - victoire : toutes les marques de scène éclairées, et AUCUN
     couloir de kuroko (machiniste) éclairé — dans l'ombre, toujours.
   Score : nombre de touchers (moins = mieux), seuils dérivés de
   l'optimum prouvé par le solveur.
   API identique aux autres familles.
   ============================================================ */
"use strict";

const FamilyLights = (() => {

  /** dir : 0 = → , 1 = ↓ , 2 = ← , 3 = ↑ (rotation horaire). */
  const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];

  let S = null;
  const key = (x, y) => x + "," + y;

  /* ---------- Calcul de la lumière ---------- */

  /** Cases éclairées par le projecteur i dans sa direction actuelle. */
  function beamOf(i) {
    const p = S.projs[i];
    const [dx, dy] = DIRS[p.dir];
    const cells = [];
    let x = p.x + dx, y = p.y + dy;
    while (x >= 0 && y >= 0 && x < S.cols && y < S.rows &&
           !S.blocked.has(key(x, y))) {
      cells.push([x, y]);
      x += dx; y += dy;
    }
    return cells;
  }

  /** Recalcule et redessine toute la lumière de la scène. */
  function relight() {
    S.beamEls.forEach(el => el.remove());
    S.beamEls = [];
    const lit = new Set();

    for (let i = 0; i < S.projs.length; i++) {
      for (const [x, y] of beamOf(i)) {
        lit.add(key(x, y));
        S.beamEls.push(SceneEngine.place(S.gridEl, "light-beam", x, y, 1, 1));
      }
    }

    let newlyLit = false;
    for (const t of S.targets) {
      const on = lit.has(key(t.x, t.y));
      if (on && !t.el.classList.contains("lit")) newlyLit = true;
      t.el.classList.toggle("lit", on);
    }
    for (const f of S.forbidden) {
      f.el.classList.toggle("alert", lit.has(key(f.x, f.y)));
    }
    if (newlyLit) GameAudio.play("case-lock");
    S.lit = lit;
  }

  function isWinning() {
    return S.targets.every(t => S.lit.has(key(t.x, t.y))) &&
           S.forbidden.every(f => !S.lit.has(key(f.x, f.y)));
  }

  /* ---------- Interaction : un toucher = un quart de tour ---------- */

  function rotate(i) {
    if (!S || S.won) return;
    const p = S.projs[i];
    S.history.push({ i, dir: p.dir });
    p.dir = (p.dir + 1) % 4;
    p.el.dataset.dir = p.dir;
    S.moves++;
    GameAudio.play("spot-turn");
    GameAudio.haptic(6);
    relight();
    emitState();
    notify();
    checkWin();
  }

  function checkWin() {
    if (S.won || !isWinning()) return;
    S.won = true;
    S.projs.forEach(p => p.el.classList.add("win-pulse"));
    S.targets.forEach(t => t.el.classList.add("win-pulse"));
    GameAudio.play("level-complete");
    GameAudio.haptic(25);
    const moves = S.moves;
    setTimeout(() => {
      if (S && S.hooks.onWin) S.hooks.onWin(moves, S.undos);
    }, 750);
  }

  /* ---------- Sauvegarde / notifications ---------- */

  function serialize() {
    return {
      dirs: S.projs.map(p => p.dir),
      moves: S.moves,
      undos: S.undos,
      history: S.history.map(h => ({ i: h.i, dir: h.dir }))
    };
  }

  function emitState() {
    if (S && S.hooks.onState && !S.won) S.hooks.onState(serialize());
  }

  function notify() {
    if (S && S.hooks.onChange) {
      S.hooks.onChange({ canUndo: S.history.length > 0, moves: S.moves });
    }
  }

  /* ---------- API publique ---------- */

  function init(level, gridEl, hooks = {}, savedState = null) {
    SceneEngine.setupGrid(gridEl, level.grid.cols, level.grid.rows);

    S = {
      level, gridEl, hooks,
      cols: level.grid.cols,
      rows: level.grid.rows,
      blocked: new Set(),
      projs: [],
      targets: [],
      forbidden: [],
      beamEls: [],
      lit: new Set(),
      moves: 0,
      undos: 0,
      history: [],
      won: false
    };

    for (const [x, y] of level.walls || []) {
      S.blocked.add(key(x, y));
      SceneEngine.place(gridEl, "grid-wall", x, y, 1, 1);
    }

    // Marques de scène à éclairer
    for (const [x, y] of level.targets || []) {
      const el = SceneEngine.place(gridEl, "light-target", x, y, 1, 1);
      S.targets.push({ x, y, el });
    }

    // Couloirs des kuroko : à laisser dans l'ombre (☾)
    for (const [x, y] of level.forbidden || []) {
      const el = SceneEngine.place(gridEl, "light-forbid", x, y, 1, 1);
      el.textContent = "☾";
      S.forbidden.push({ x, y, el });
    }

    // Les projecteurs (les corps bloquent la lumière des autres)
    (level.projectors || []).forEach((pr, i) => {
      S.blocked.add(key(pr.at[0], pr.at[1]));
      const el = SceneEngine.place(gridEl, "light-spot", pr.at[0], pr.at[1], 1, 1);
      el.dataset.dir = pr.dir;
      el.innerHTML = '<span class="lens" aria-hidden="true"></span>';
      el.addEventListener("pointerdown", (ev) => { ev.preventDefault(); rotate(i); });
      S.projs.push({ x: pr.at[0], y: pr.at[1], dir: pr.dir, el });
    });

    // Reprise d'un plateau en cours (GDD §9.2)
    if (savedState && Array.isArray(savedState.dirs) &&
        savedState.dirs.length === S.projs.length) {
      savedState.dirs.forEach((d, i) => {
        S.projs[i].dir = ((d % 4) + 4) % 4;
        S.projs[i].el.dataset.dir = S.projs[i].dir;
      });
      S.moves = savedState.moves || 0;
      S.undos = savedState.undos || 0;
      S.history = (savedState.history || [])
        .filter(h => S.projs[h.i])
        .map(h => ({ i: h.i, dir: h.dir }));
    }

    relight();
    emitState();
    notify();
  }

  /** Annule le dernier quart de tour. */
  function undo() {
    if (!S || S.won || S.history.length === 0) return;
    const step = S.history.pop();
    S.projs[step.i].dir = step.dir;
    S.projs[step.i].el.dataset.dir = step.dir;
    S.moves = Math.max(0, S.moves - 1);
    S.undos++;
    GameAudio.play("undo");
    relight();
    emitState();
    notify();
  }

  function restart() {
    if (!S) return;
    GameAudio.play("restart");
    init(S.level, S.gridEl, S.hooks);
  }

  function destroy(gridEl) {
    if (gridEl) gridEl.innerHTML = "";
    S = null;
  }

  return { init, undo, restart, destroy };
})();
