/* ============================================================
   NINJA EVENTS — families/cables.js
   Famille B « Câbles » (GDD §5.2) — v0.10.0.

   Règles :
   - relier chaque paire de prises de même couleur en traçant un
     câble de case en case (glisser au doigt) ;
   - les câbles ne se croisent jamais, ne traversent ni murs ni
     autres prises ; revenir sur son propre câble l'efface ;
   - reprendre un câble en cours de route le retaille à cet endroit.
   Score : total de cases de câble utilisées (moins = mieux) —
   les seuils `par` des niveaux dérivent du minimum prouvé.
   Accessibilité (GDD §13) : chaque couleur porte AUSSI une forme
   (● ■ ▲ ◆ ✚) sur ses prises.
   API identique aux autres familles :
   init(level, gridEl, hooks, savedState) / undo / restart / destroy.
   ============================================================ */
"use strict";

const FamilyCables = (() => {

  /** Pictogrammes d'embouts : redondance couleur + forme. */
  const SHAPES = ["●", "■", "▲", "◆", "✚"];

  /* ---------- État du niveau en cours ---------- */
  let S = null;

  const key = (x, y) => x + "," + y;

  /* ---------- Requêtes sur le plateau ---------- */

  function inBounds(x, y) {
    return x >= 0 && y >= 0 && x < S.cols && y < S.rows;
  }

  /** Prise à cette case ? → { color, isA } ou null. */
  function socketAt(x, y) {
    for (const p of S.pairs) {
      if (p.a[0] === x && p.a[1] === y) return { color: p.color, isA: true };
      if (p.b[0] === x && p.b[1] === y) return { color: p.color, isA: false };
    }
    return null;
  }

  /** Case occupée par un câble ? → { color, idx } ou null. */
  function cableAt(x, y) {
    for (const p of S.pairs) {
      const path = S.paths[p.color];
      const idx = path.findIndex(c => c[0] === x && c[1] === y);
      if (idx >= 0) return { color: p.color, idx };
    }
    return null;
  }

  function pairOf(color) { return S.pairs.find(p => p.color === color); }

  /** Un câble est complet s'il relie ses deux prises. */
  function isComplete(color) {
    const path = S.paths[color];
    if (path.length < 2) return false;
    const p = pairOf(color);
    const ends = [path[0], path[path.length - 1]];
    const has = (cell) => ends.some(e => e[0] === cell[0] && e[1] === cell[1]);
    return has(p.a) && has(p.b);
  }

  function totalCells() {
    return S.pairs.reduce((sum, p) => sum + S.paths[p.color].length, 0);
  }

  /* ---------- Rendu ---------- */

  /** (Re)dessine le câble d'une couleur : une case = un maillon. */
  function renderPath(color) {
    (S.pathEls[color] || []).forEach(el => el.remove());
    S.pathEls[color] = [];
    const path = S.paths[color];
    path.forEach(([x, y], i) => {
      let cls = "cable-cell c" + color;
      const prev = path[i - 1], next = path[i + 1];
      for (const n of [prev, next]) {
        if (!n) continue;
        if (n[1] < y) cls += " lk-u";
        if (n[1] > y) cls += " lk-d";
        if (n[0] < x) cls += " lk-l";
        if (n[0] > x) cls += " lk-r";
      }
      S.pathEls[color].push(SceneEngine.place(S.gridEl, cls, x, y, 1, 1));
    });
    // Prises satisfaites : allumées
    const p = pairOf(color);
    const lit = isComplete(color);
    p.elA.classList.toggle("lit", lit);
    p.elB.classList.toggle("lit", lit);
  }

  /* ---------- Édition du tracé ---------- */

  function snapshot(color) {
    S.history.push({ color, path: S.paths[color].map(c => [c[0], c[1]]) });
    if (S.history.length > 200) S.history.shift();
  }

  /** Tente d'avancer le tracé courant vers une case adjacente. */
  function extendTo(x, y) {
    const color = S.drawing;
    const path = S.paths[color];
    const last = path[path.length - 1];
    if (Math.abs(x - last[0]) + Math.abs(y - last[1]) !== 1) return false;
    if (!inBounds(x, y)) return false;
    if (S.walls.has(key(x, y))) return false;

    // Retour sur ses pas : on efface le dernier maillon.
    const before = path[path.length - 2];
    if (before && before[0] === x && before[1] === y) {
      path.pop();
      renderPath(color);
      GameAudio.play("undo");
      return true;
    }

    const sock = socketAt(x, y);
    if (sock) {
      if (sock.color !== color) return false;              // prise étrangère
      const start = path[0];
      if (start[0] === x && start[1] === y) return false;  // sa prise de départ
      path.push([x, y]);                                   // branchement !
      S.drawing = null;
      renderPath(color);
      GameAudio.play("cable-plug");
      GameAudio.haptic(10);
      return true;
    }

    if (cableAt(x, y)) return false;                       // jamais de croisement
    path.push([x, y]);
    renderPath(color);
    GameAudio.play("cable-step");
    return true;
  }

  /* ---------- Interactions tactiles (déléguées sur la grille) ---------- */

  function cellFromEvent(ev) {
    const r = S.gridEl.getBoundingClientRect();
    const x = Math.floor((ev.clientX - r.left) / r.width * S.cols);
    const y = Math.floor((ev.clientY - r.top) / r.height * S.rows);
    return inBounds(x, y) ? [x, y] : null;
  }

  function onDown(ev) {
    if (!S || S.won) return;
    const cell = cellFromEvent(ev);
    if (!cell) return;
    const [x, y] = cell;

    const sock = socketAt(x, y);
    if (sock) {                          // repartir de la prise : câble neuf
      ev.preventDefault();
      S.gridEl.setPointerCapture(ev.pointerId);
      snapshot(sock.color);
      S.paths[sock.color] = [[x, y]];
      S.drawing = sock.color;
      renderPath(sock.color);
      GameAudio.play("tap");
      return;
    }
    const cab = cableAt(x, y);
    if (cab) {                           // reprendre un câble : on le retaille
      ev.preventDefault();
      S.gridEl.setPointerCapture(ev.pointerId);
      snapshot(cab.color);
      S.paths[cab.color] = S.paths[cab.color].slice(0, cab.idx + 1);
      S.drawing = cab.color;
      renderPath(cab.color);
      return;
    }
  }

  function onMove(ev) {
    if (!S || S.drawing === null || S.drawing === undefined || S.won) return;
    const cell = cellFromEvent(ev);
    if (!cell) return;
    // On chemine pas à pas vers la case visée (axe dominant d'abord).
    let guard = S.cols + S.rows;
    while (S.drawing !== null && guard-- > 0) {
      const path = S.paths[S.drawing];
      const [lx, ly] = path[path.length - 1];
      const rx = cell[0] - lx, ry = cell[1] - ly;
      if (rx === 0 && ry === 0) break;
      const firstX = Math.abs(rx) >= Math.abs(ry);
      const a = firstX ? [lx + Math.sign(rx), ly] : [lx, ly + Math.sign(ry)];
      const b = firstX ? [lx, ly + Math.sign(ry)] : [lx + Math.sign(rx), ly];
      if ((rx || !firstX) && extendTo(a[0], a[1])) continue;
      if ((ry || firstX) && extendTo(b[0], b[1])) continue;
      break;
    }
  }

  function onUp() {
    if (!S) return;
    S.drawing = null;
    emitState();
    notify();
    checkWin();
  }

  /* ---------- Victoire, sauvegarde, notifications ---------- */

  function checkWin() {
    if (S.won || !S.pairs.every(p => isComplete(p.color))) return;
    S.won = true;
    S.pairs.forEach(p => {
      p.elA.classList.add("win-pulse");
      p.elB.classList.add("win-pulse");
      (S.pathEls[p.color] || []).forEach(el => el.classList.add("glow"));
    });
    GameAudio.play("level-complete");
    GameAudio.haptic(25);
    const cells = totalCells();
    setTimeout(() => {
      if (S && S.hooks.onWin) S.hooks.onWin(cells, S.undos);
    }, 750);
  }

  function serialize() {
    const paths = {};
    S.pairs.forEach(p => { paths[p.color] = S.paths[p.color].map(c => [c[0], c[1]]); });
    const history = S.history.map(h =>
      ({ color: h.color, path: h.path.map(c => [c[0], c[1]]) }));
    return { paths, undos: S.undos, history };
  }

  function emitState() {
    if (S && S.hooks.onState && !S.won) S.hooks.onState(serialize());
  }

  function notify() {
    if (S && S.hooks.onChange) {
      S.hooks.onChange({ canUndo: S.history.length > 0, moves: totalCells() });
    }
  }

  /* ---------- API publique ---------- */

  function init(level, gridEl, hooks = {}, savedState = null) {
    SceneEngine.setupGrid(gridEl, level.grid.cols, level.grid.rows);

    S = {
      level, gridEl, hooks,
      cols: level.grid.cols,
      rows: level.grid.rows,
      walls: new Set((level.walls || []).map(w => key(w[0], w[1]))),
      pairs: [],
      paths: {},
      pathEls: {},
      history: [],
      undos: 0,
      drawing: null,
      won: false
    };

    for (const [x, y] of level.walls || []) {
      SceneEngine.place(gridEl, "grid-wall", x, y, 1, 1);
    }

    for (const pr of level.pairs || []) {
      const mk = (at) => {
        const el = SceneEngine.place(gridEl, "cable-socket c" + pr.color, at[0], at[1], 1, 1);
        el.textContent = SHAPES[pr.color] || "●";
        return el;
      };
      S.pairs.push({ color: pr.color, a: pr.a.slice(), b: pr.b.slice(),
                     elA: mk(pr.a), elB: mk(pr.b) });
      S.paths[pr.color] = [];
    }

    // Reprise d'un plateau en cours (GDD §9.2)
    if (savedState && savedState.paths) {
      for (const p of S.pairs) {
        const saved = savedState.paths[p.color];
        if (Array.isArray(saved) &&
            saved.every(c => inBounds(c[0], c[1]) && !S.walls.has(key(c[0], c[1])))) {
          S.paths[p.color] = saved.map(c => [c[0], c[1]]);
        }
      }
      S.undos = savedState.undos || 0;
      S.history = (savedState.history || [])
        .filter(h => S.paths[h.color] !== undefined)
        .map(h => ({ color: h.color, path: h.path.map(c => [c[0], c[1]]) }));
    }
    S.pairs.forEach(p => renderPath(p.color));

    // Un seul jeu d'écouteurs, délégué sur la grille (GDD §15.3)
    gridEl.onpointerdown = onDown;
    gridEl.onpointermove = onMove;
    gridEl.onpointerup = onUp;
    gridEl.onpointercancel = onUp;

    emitState();
    notify();
  }

  /** Annule la dernière manipulation de câble (un tracé = un cran). */
  function undo() {
    if (!S || S.won || S.history.length === 0) return;
    const step = S.history.pop();
    S.paths[step.color] = step.path;
    S.undos++;
    GameAudio.play("undo");
    renderPath(step.color);
    notify();
    emitState();
  }

  function restart() {
    if (!S) return;
    GameAudio.play("restart");
    init(S.level, S.gridEl, S.hooks);
  }

  function destroy(gridEl) {
    if (gridEl) {
      gridEl.onpointerdown = gridEl.onpointermove =
      gridEl.onpointerup = gridEl.onpointercancel = null;
      gridEl.innerHTML = "";
    }
    S = null;
  }

  return { init, undo, restart, destroy };
})();
