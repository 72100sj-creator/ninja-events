/* ============================================================
   NINJA EVENTS — families/cases.js
   Famille A « Le Ballet des Caisses » (GDD §5.1).

   PHASE 2 — MOTEUR COMPLET (v0.5.0) :
   - reprise du plateau : l'état (positions, coups, historique) est
     émis à chaque changement via hooks.onState → sauvegarde continue,
     et restauré par init(…, savedState) (GDD §9.2) ;
   - le Chat de la Régie 🐱 : dort sur une case, bloque les caisses,
     frémit quand on le dérange — mais ne se lève JAMAIS ;
   - glisser une caisse au doigt : elle se déplace case par case ;
   - collisions : bords, murs, autres caisses ;
   - 1 coup = 1 case parcourue (cohérent avec les `par` des niveaux) ;
   - annulation illimitée (historique), recommencer ;
   - marques au gaffeur qui s'illuminent quand la bonne caisse
     est en place ; victoire quand toutes le sont.
   API : init(level, gridEl, hooks) / undo() / restart() / destroy().
   ============================================================ */
"use strict";

const FamilyCases = (() => {

  /** Dimensions logiques par type de pièce. */
  const SIZES = {
    "case-1x1": { w: 1, h: 1 },
    "case-1x2": { w: 1, h: 2 },
    "case-2x2": { w: 2, h: 2 }
  };

  /** Applique la rotation éventuelle (rot: 1 = horizontal). */
  function sizeOf(piece) {
    const s = SIZES[piece.type] || { w: 1, h: 1 };
    return piece.rot === 1 ? { w: s.h, h: s.w } : { ...s };
  }

  /* ---------- État du niveau en cours ---------- */
  let S = null;   // { level, gridEl, cols, rows, walls, pieces, targets,
                  //   moves, history, won, hooks }

  /* ---------- Collisions ---------- */

  /** Deux rectangles logiques se chevauchent-ils ? */
  function overlaps(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
  }

  /** Le chat occupe-t-il une des cases visées ? */
  function onCat(p, x, y) {
    return S.cat && overlaps(x, y, p.w, p.h, S.cat.x, S.cat.y, 1, 1);
  }

  /** La pièce `p` peut-elle occuper (x, y) ? */
  function isFree(p, x, y) {
    // Bords de la grille
    if (x < 0 || y < 0 || x + p.w > S.cols || y + p.h > S.rows) return false;
    // Murs (cases 1×1)
    for (const [wx, wy] of S.walls) {
      if (overlaps(x, y, p.w, p.h, wx, wy, 1, 1)) return false;
    }
    // Le Chat de la Régie : on ne pousse pas un chat qui dort.
    if (onCat(p, x, y)) return false;
    // Autres caisses
    for (const other of S.pieces) {
      if (other === p) continue;
      if (overlaps(x, y, p.w, p.h, other.x, other.y, other.w, other.h)) return false;
    }
    return true;
  }

  /* ---------- Mouvement ---------- */

  /** Tente UN pas ; retourne true si la caisse a bougé. */
  function tryStep(p, dx, dy) {
    const nx = p.x + dx, ny = p.y + dy;
    if (!isFree(p, nx, ny)) {
      // Si c'est le chat qui bloque : il frémit, sans jamais bouger.
      if (onCat(p, nx, ny)) nudgeCat();
      return false;
    }

    S.history.push({ p, x: p.x, y: p.y });   // pour l'annulation
    p.x = nx; p.y = ny;
    SceneEngine.moveEl(p.el, nx, ny);
    S.moves++;

    GameAudio.play("case-roll");
    GameAudio.haptic(6);
    updateTargets();
    notify();
    emitState();
    return true;
  }

  /** Frémissement du chat dérangé (au plus toutes les 600 ms). */
  let lastNudge = 0;
  function nudgeCat() {
    const now = performance.now();
    if (!S.cat || now - lastNudge < 600) return;
    lastNudge = now;
    S.cat.el.classList.remove("nudge");
    void S.cat.el.offsetWidth;
    S.cat.el.classList.add("nudge");
    GameAudio.haptic(4);
  }

  /** Photographie sérialisable du plateau (reprise après fermeture). */
  function serialize() {
    return {
      pieces: S.pieces.map(p => [p.x, p.y]),
      moves: S.moves,
      history: S.history.map(h => ({ i: S.pieces.indexOf(h.p), x: h.x, y: h.y }))
    };
  }

  function emitState() {
    if (S && S.hooks.onState && !S.won) S.hooks.onState(serialize());
  }

  /* ---------- Glisser au doigt ---------- */

  function attachDrag(p) {
    let drag = null;   // { cw, ch, px, py, ox, oy }

    p.el.addEventListener("pointerdown", (ev) => {
      if (S.won) return;
      ev.preventDefault();
      p.el.setPointerCapture(ev.pointerId);
      const r = S.gridEl.getBoundingClientRect();
      drag = {
        cw: r.width / S.cols,     // taille d'une case en pixels
        ch: r.height / S.rows,
        px: ev.clientX, py: ev.clientY,
        ox: p.x, oy: p.y
      };
      p.el.classList.add("dragging");
    });

    p.el.addEventListener("pointermove", (ev) => {
      if (!drag || S.won) return;
      // Case visée = position d'origine + déplacement du doigt en cases
      const tx = drag.ox + Math.round((ev.clientX - drag.px) / drag.cw);
      const ty = drag.oy + Math.round((ev.clientY - drag.py) / drag.ch);

      // On avance pas à pas vers la case visée (axe dominant d'abord,
      // l'autre axe en secours) — la caisse contourne naturellement.
      let guard = S.cols + S.rows;   // anti-boucle
      while ((p.x !== tx || p.y !== ty) && guard-- > 0) {
        const rx = tx - p.x, ry = ty - p.y;
        const firstX = Math.abs(rx) >= Math.abs(ry);
        const stepA = firstX ? [Math.sign(rx), 0] : [0, Math.sign(ry)];
        const stepB = firstX ? [0, Math.sign(ry)] : [Math.sign(rx), 0];
        if ((stepA[0] || stepA[1]) && tryStep(p, stepA[0], stepA[1])) continue;
        if ((stepB[0] || stepB[1]) && tryStep(p, stepB[0], stepB[1])) continue;
        break;   // bloquée dans les deux directions
      }
    });

    const end = (ev) => {
      if (!drag) return;
      drag = null;
      p.el.classList.remove("dragging");
      if (!S.won) checkWin();
    };
    p.el.addEventListener("pointerup", end);
    p.el.addEventListener("pointercancel", end);
  }

  /* ---------- Objectifs & victoire ---------- */

  /** Une cible est-elle satisfaite (bonne caisse, bonne position) ? */
  function satisfied(t) {
    return S.pieces.some(p => p.data.type === t.for && p.x === t.x && p.y === t.y);
  }

  /** Illumine les marques au gaffeur satisfaites (GDD §5.1). */
  function updateTargets() {
    let becameLit = false;
    for (const t of S.targets) {
      const ok = satisfied(t);
      if (ok && !t.el.classList.contains("lit")) becameLit = true;
      t.el.classList.toggle("lit", ok);
    }
    if (becameLit) GameAudio.play("case-lock");
  }

  function checkWin() {
    if (!S.targets.every(satisfied)) return;
    S.won = true;

    // Tout se verrouille avec une pulsation matcha (GDD §11.5, étape 1)
    S.pieces.forEach(p => p.el.classList.add("win-pulse"));
    GameAudio.play("level-complete");
    GameAudio.haptic(25);

    setTimeout(() => {
      if (S && S.hooks.onWin) S.hooks.onWin(S.moves);
    }, 750);
  }

  function notify() {
    if (S && S.hooks.onChange) {
      S.hooks.onChange({ canUndo: S.history.length > 0, moves: S.moves });
    }
  }

  /* ---------- API publique ---------- */

  /**
   * Charge et affiche un niveau, branche les interactions.
   * @param {object} level   données (format GDD §14.5)
   * @param {HTMLElement} gridEl
   * @param {object} hooks   { onWin(moves), onChange({canUndo, moves}) }
   */
  function init(level, gridEl, hooks = {}, savedState = null) {
    SceneEngine.setupGrid(gridEl, level.grid.cols, level.grid.rows);

    S = {
      level, gridEl, hooks,
      cols: level.grid.cols,
      rows: level.grid.rows,
      walls: (level.walls || []).slice(),
      cat: null,
      pieces: [],
      targets: [],
      moves: 0,
      history: [],
      won: false
    };

    // Murs
    for (const [x, y] of S.walls) {
      SceneEngine.place(gridEl, "grid-wall", x, y, 1, 1);
    }

    // Marques au gaffeur
    for (const t of level.targets || []) {
      const s = SIZES[t.for] || { w: 1, h: 1 };
      const el = SceneEngine.place(gridEl, "grid-target", t.at[0], t.at[1], s.w, s.h);
      S.targets.push({ el, for: t.for, x: t.at[0], y: t.at[1] });
    }

    // Flight cases (au-dessus des cibles dans l'ordre du DOM)
    for (const data of level.pieces || []) {
      const s = sizeOf(data);
      const el = SceneEngine.place(gridEl, "grid-piece", data.at[0], data.at[1], s.w, s.h);
      el.dataset.type = data.type;
      const p = { data, el, x: data.at[0], y: data.at[1], w: s.w, h: s.h };
      S.pieces.push(p);
      attachDrag(p);
    }

    // Le Chat de la Régie (modificateur « cat », GDD §5.1)
    if (level.cat) {
      const el = SceneEngine.place(gridEl, "grid-cat", level.cat[0], level.cat[1], 1, 1);
      el.textContent = "🐱";
      S.cat = { el, x: level.cat[0], y: level.cat[1] };
    }

    // Reprise d'un plateau en cours (GDD §9.2)
    if (savedState && Array.isArray(savedState.pieces) &&
        savedState.pieces.length === S.pieces.length) {
      savedState.pieces.forEach(([x, y], i) => {
        const p = S.pieces[i];
        if (x >= 0 && y >= 0 && x + p.w <= S.cols && y + p.h <= S.rows) {
          p.x = x; p.y = y;
          SceneEngine.moveEl(p.el, x, y);
        }
      });
      S.moves = savedState.moves || 0;
      S.history = (savedState.history || [])
        .filter(h => S.pieces[h.i])
        .map(h => ({ p: S.pieces[h.i], x: h.x, y: h.y }));
    }

    updateTargets();
    notify();
    emitState();
  }

  /** Annule le dernier pas (illimité). */
  function undo() {
    if (!S || S.won || S.history.length === 0) return;
    const step = S.history.pop();
    step.p.x = step.x; step.p.y = step.y;
    SceneEngine.moveEl(step.p.el, step.x, step.y);
    S.moves = Math.max(0, S.moves - 1);
    GameAudio.play("undo");
    updateTargets();
    notify();
    emitState();
  }

  /** Recommence le niveau (repart des positions initiales). */
  function restart() {
    if (!S) return;
    GameAudio.play("restart");
    init(S.level, S.gridEl, S.hooks);
  }

  /** Nettoyage à la sortie du niveau. */
  function destroy(gridEl) {
    S = null;
    if (gridEl) gridEl.innerHTML = "";
  }

  return { init, undo, restart, destroy };
})();
