/* ============================================================
   NINJA EVENTS — families/truck.js
   4e FAMILLE : LE CHARGEMENT DU CAMION 🚚 (packing puzzle)

   Le plateau (gridEl) est L'INTÉRIEUR DU CAMION (vu du dessus).
   Sous lui, le moteur crée LE QUAI (.truck-dock) où attend le
   matériel. On glisse un objet du quai vers le camion ; on TAPE
   dessus (au quai ou dans le camion) pour le faire PIVOTER de 90°.
   Glisser un objet hors du camion le repose sur le quai.
   Victoire : tout le matériel est chargé.

   Contrat d'API commun aux familles (voir cases.js) :
     init(level, gridEl, hooks, savedState) / undo() / restart()
     destroy(gridEl) — hooks.onWin(moves, undos), hooks.onChange(),
     hooks.onState(state) pour la sauvegarde continue.

   Format de niveau :
     grid:  { cols, rows }          — dimensions du camion
     items: [{ type, cells:[[dx,dy],…] }]  — formes en offsets (0,0 min)
     walls: [[x,y],…]               — passages de roues (cases neutralisées)

   ⚠️ MOTEUR GELÉ depuis la v1.16.0 (famille complète É1→É5) — comme
   cases.js, cables.js et lights.js : ne plus modifier sans nécessité
   absolue documentée. Les niveaux (É6) sont des données, pas du moteur.
   ============================================================ */
"use strict";

const FamilyTruck = (() => {

  let S = null;   // état de la partie en cours

  /* ---------- Géométrie des formes ---------- */

  /** Cellules d'un objet pour une rotation donnée (offsets normalisés). */
  function cellsFor(baseCells, rot) {
    let pts = baseCells.map(([x, y]) => [x, y]);
    for (let r = 0; r < (rot % 4 + 4) % 4; r++) {
      pts = pts.map(([x, y]) => [-y, x]);
    }
    const minX = Math.min(...pts.map(p => p[0]));
    const minY = Math.min(...pts.map(p => p[1]));
    return pts.map(([x, y]) => [x - minX, y - minY]);
  }

  /** Boîte englobante { w, h } d'une liste de cellules. */
  function bboxOf(cells) {
    return {
      w: Math.max(...cells.map(c => c[0])) + 1,
      h: Math.max(...cells.map(c => c[1])) + 1
    };
  }

  /** L'objet (cellules absolues) tient-il là, sans collision ? */
  function fits(item, x, y, rot, ignoreSelf = true) {
    const cells = cellsFor(item.base, rot);
    for (const [dx, dy] of cells) {
      const cx = x + dx, cy = y + dy;
      if (cx < 0 || cy < 0 || cx >= S.cols || cy >= S.rows) return false;
      if (S.wallSet.has(cx + "," + cy)) return false;
      for (const other of S.items) {
        if (other === item && ignoreSelf) continue;
        if (!other.placed) continue;
        const oc = cellsFor(other.base, other.rot);
        for (const [ox, oy] of oc) {
          if (other.x + ox === cx && other.y + oy === cy) return false;
        }
      }
    }
    return true;
  }

  /* ---------- Sérialisation (sauvegarde continue) ---------- */

  function serialize() {
    return {
      moves: S.moves,
      undos: S.undos,
      items: S.items.map(it => ({
        placed: it.placed, x: it.x, y: it.y, rot: it.rot
      }))
    };
  }

  function snapshot() {
    S.history.push(S.items.map(it => ({
      placed: it.placed, x: it.x, y: it.y, rot: it.rot
    })));
    if (S.history.length > 200) S.history.shift();
  }

  function emitChange() {
    if (S && S.hooks.onChange) {
      S.hooks.onChange({ canUndo: S.history.length > 0, moves: S.moves });
    }
    if (S && S.hooks.onState && !S.won) S.hooks.onState(serialize());
  }

  /* ---------- Rendu ---------- */

  function cellPx() {
    const r = S.gridEl.getBoundingClientRect();
    return { cw: r.width / S.cols, ch: r.height / S.rows, rect: r };
  }

  /** (Re)dessine un objet, dans le camion ou sur le quai. */
  function render(item) {
    const cells = cellsFor(item.base, item.rot);
    const bb = bboxOf(cells);
    const el = item.el;
    el.className = "truck-item it-" + item.type +
      (item.placed ? " in-truck" : " on-dock") + " rot-" + (item.rot % 4) +
      (item.fragile ? " is-fragile" : "") + (item.heavy ? " is-heavy" : "");
    el.style.setProperty("--w", bb.w);
    el.style.setProperty("--h", bb.h);
    // silhouette exacte de la forme (les L se dessinent cellule à cellule)
    el.innerHTML = cells.map(([x, y]) =>
      `<i style="--cx:${x};--cy:${y}"></i>`).join("") +
      `<span class="it-badge">${ICONS[item.type] || "📦"}</span>`;
    if (item.placed) {
      el.style.left   = (item.x / S.cols * 100) + "%";
      el.style.top    = (item.y / S.rows * 100) + "%";
      el.style.width  = (bb.w / S.cols * 100) + "%";
      el.style.height = (bb.h / S.rows * 100) + "%";
      if (el.parentNode !== S.gridEl) S.gridEl.appendChild(el);
    } else {
      el.style.left = el.style.top = "";
      el.style.width  = "calc(var(--w) * var(--dockcell))";
      el.style.height = "calc(var(--h) * var(--dockcell))";
      if (el.parentNode !== S.dockEl) S.dockEl.appendChild(el);
    }
  }

  const ICONS = {
    flight: "🎛", spot: "💡", micstand: "🎤", drum: "🥁", amp: "🔊",
    keyboard: "🎹", ladder: "🪜", crate: "📦", decor: "🎪",
    drapes: "🎭", truss: "🔩", guitar: "🎸", cello: "🎻"
  };

  /* ---------- La règle des fragiles (É4) ----------
     Un objet fragile placé ADJACENT (orthogonal) à un objet lourd
     tremble en alerte ; la victoire exige un chargement sûr. */
  function updateDanger() {
    const heavy = new Set();
    S.items.forEach(it => {
      if (it.placed && it.heavy) {
        cellsFor(it.base, it.rot).forEach(([dx, dy]) =>
          heavy.add((it.x + dx) + "," + (it.y + dy)));
      }
    });
    let any = false;
    S.items.forEach(it => {
      let danger = false;
      if (it.placed && it.fragile) {
        outer: for (const [dx, dy] of cellsFor(it.base, it.rot)) {
          for (const [ax, ay] of [[1,0],[-1,0],[0,1],[0,-1]]) {
            if (heavy.has((it.x + dx + ax) + "," + (it.y + dy + ay))) {
              danger = true;
              break outer;
            }
          }
        }
      }
      it.el.classList.toggle("in-danger", danger);
      if (danger) any = true;
    });
    return any;
  }

  /* ---------- Actions de jeu ---------- */

  function tryRotate(item) {
    const nextRot = (item.rot + 1) % 4;
    if (item.placed && !fits(item, item.x, item.y, nextRot)) {
      item.el.classList.remove("nudge");
      void item.el.offsetWidth;               // relance l'animation
      item.el.classList.add("nudge");
      GameAudio.play("tap");
      return;
    }
    snapshot();
    item.rot = nextRot;
    S.moves++;
    GameAudio.play("case-roll");
    GameAudio.haptic(6);
    render(item);
    updateDanger();
    emitChange();
    checkWin();
  }

  function tryPlace(item, x, y) {
    if (!fits(item, x, y, item.rot)) return false;
    snapshot();
    item.placed = true;
    item.x = x; item.y = y;
    S.moves++;
    GameAudio.play("case-lock");
    GameAudio.haptic(8);
    render(item);
    item.el.classList.add("landed");          // petit rebond de pose
    setTimeout(() => item.el.classList.remove("landed"), 260);
    if (updateDanger()) GameAudio.haptic(14);  // avertissement tactile
    emitChange();
    checkWin();
    return true;
  }

  function sendToDock(item) {
    if (!item.placed) return;
    snapshot();
    item.placed = false;
    S.moves++;
    GameAudio.play("case-roll");
    render(item);
    updateDanger();
    emitChange();
  }

  function checkWin() {
    if (S.won) return;
    if (!S.items.every(it => it.placed)) return;
    if (updateDanger()) return;               // chargement dangereux : pas de départ
    S.won = true;
    S.gridEl.classList.add("truck-full");
    const fire = () => { if (S && S.hooks.onWin) S.hooks.onWin(S.moves, S.undos); };
    const scene = document.querySelector(".game-scene");
    if (scene && scene.dataset.motion === "reduced") {
      GameAudio.play("level-complete");
      setTimeout(fire, 350);
      return;
    }
    // ---- LE GRAND DÉPART (≈3,6 s) ----
    // 1. les portes coulissent et se ferment
    const g = S.gridEl;
    ["bay-door bay-door-l", "bay-door bay-door-r"].forEach(cls => {
      const d = document.createElement("div");
      d.className = cls;
      g.appendChild(d);
    });
    requestAnimationFrame(() => requestAnimationFrame(() =>
      g.classList.add("doors-closing")));
    setTimeout(() => GameAudio.play("truck-door"), 120);
    // 2. les verrous claquent
    setTimeout(() => {
      GameAudio.play("truck-latch");
      GameAudio.haptic([12, 90, 12]);
      g.classList.add("bay-locked");
    }, 1050);
    // 3. le moteur démarre, la caisse vibre
    setTimeout(() => {
      GameAudio.play("truck-engine");
      g.classList.add("bay-engine");
    }, 1500);
    // 4. le camion s'en va dans un nuage de poussière
    setTimeout(() => {
      g.classList.remove("bay-engine");
      g.classList.add("bay-departing");
      if (S.dockEl) S.dockEl.classList.add("dock-dust");
      GameAudio.play("level-complete");
    }, 2350);
    setTimeout(fire, 3650);
  }

  /* ---------- Glisser (pointeurs tactiles et souris) ---------- */

  function onPointerDown(item, ev) {
    if (S.won) return;
    ev.preventDefault();
    const start = { x: ev.clientX, y: ev.clientY, t: Date.now() };
    let ghost = null;
    let moved = false;

    const onMove = (e) => {
      if (!moved &&
          Math.hypot(e.clientX - start.x, e.clientY - start.y) < 8) return;
      moved = true;
      if (!ghost) {
        ghost = item.el.cloneNode(true);
        ghost.classList.add("dragging-ghost");
        document.body.appendChild(ghost);
        item.el.classList.add("drag-source");
        const bb = bboxOf(cellsFor(item.base, item.rot));
        const { cw, ch } = cellPx();
        ghost.style.width  = bb.w * cw + "px";
        ghost.style.height = bb.h * ch + "px";
        ghost.dataset.w = bb.w; ghost.dataset.h = bb.h;
      }
      ghost.style.left = e.clientX - ghost.offsetWidth / 2 + "px";
      ghost.style.top  = e.clientY - ghost.offsetHeight / 2 + "px";
      // aperçu de dépose : la cellule visée s'illumine si ça tient
      const drop = dropCell(e, ghost);
      S.gridEl.classList.toggle("drop-ok",
        !!drop && fits(item, drop.x, drop.y, item.rot, true));
    };

    const onUp = (e) => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      S.gridEl.classList.remove("drop-ok");
      item.el.classList.remove("drag-source");
      if (!moved) {                           // simple toucher → rotation
        if (Date.now() - start.t < 400) tryRotate(item);
        if (ghost) ghost.remove();
        return;
      }
      let done = false;
      const drop = dropCell(e, ghost);
      if (drop) {
        const wasPlaced = item.placed, ox = item.x, oy = item.y;
        item.placed = false;                  // se libérer soi-même
        if (fits(item, drop.x, drop.y, item.rot)) {
          item.placed = wasPlaced; item.x = ox; item.y = oy;
          done = tryPlace(item, drop.x, drop.y);
        } else {
          item.placed = wasPlaced; item.x = ox; item.y = oy;
        }
      } else if (item.placed) {               // lâché hors du camion → quai
        sendToDock(item);
        done = true;
      }
      if (!done) {
        item.el.classList.remove("nudge");
        void item.el.offsetWidth;
        item.el.classList.add("nudge");
      }
      if (ghost) ghost.remove();
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  /** Cellule de dépose visée (coin haut-gauche de la forme), ou null. */
  function dropCell(ev, ghost) {
    const { cw, ch, rect } = cellPx();
    const gx = ev.clientX - (ghost ? ghost.offsetWidth / 2 : 0);
    const gy = ev.clientY - (ghost ? ghost.offsetHeight / 2 : 0);
    const x = Math.round((gx - rect.left) / cw);
    const y = Math.round((gy - rect.top) / ch);
    const bb = ghost
      ? { w: +ghost.dataset.w, h: +ghost.dataset.h }
      : { w: 1, h: 1 };
    if (x + bb.w <= 0 || y + bb.h <= 0 || x >= S.cols || y >= S.rows) {
      return null;                            // clairement hors du camion
    }
    return {
      x: Math.max(0, Math.min(S.cols - bb.w, x)),
      y: Math.max(0, Math.min(S.rows - bb.h, y))
    };
  }

  /* ---------- Contrat d'API ---------- */

  function init(level, gridEl, hooks = {}, savedState = null) {
    destroy(gridEl);
    S = {
      level, gridEl, hooks,
      cols: level.grid.cols, rows: level.grid.rows,
      wallSet: new Set((level.walls || []).map(w => w[0] + "," + w[1])),
      items: [], history: [], moves: 0, undos: 0, won: false,
      dockEl: null
    };

    gridEl.classList.add("truck-bay");        // habillage camion (É3)

    // Les passages de roues (cases condamnées du plancher)
    (level.walls || []).forEach(([x, y]) => {
      SceneEngine.place(gridEl, "truck-wheel", x, y, 1, 1);
    });

    // Le quai, sous le camion
    const dock = document.createElement("div");
    dock.className = "truck-dock";
    dock.setAttribute("aria-label", "Le quai : matériel à charger");
    gridEl.insertAdjacentElement("afterend", dock);
    S.dockEl = dock;

    // Le matériel
    level.items.forEach((data, i) => {
      const item = {
        id: i, type: data.type,
        fragile: !!data.fragile, heavy: !!data.heavy,
        base: data.cells.map(c => [c[0], c[1]]),
        placed: false, x: 0, y: 0, rot: 0,
        el: document.createElement("div")
      };
      item.el.addEventListener("pointerdown", e => onPointerDown(item, e));
      S.items.push(item);
    });

    // Reprise de partie
    if (savedState && Array.isArray(savedState.items) &&
        savedState.items.length === S.items.length) {
      S.moves = savedState.moves || 0;
      S.undos = savedState.undos || 0;
      savedState.items.forEach((st, i) => {
        Object.assign(S.items[i],
          { placed: !!st.placed, x: st.x | 0, y: st.y | 0, rot: st.rot | 0 });
      });
    }

    S.items.forEach(render);
    updateDanger();
    emitChange();
    if (S.items.every(it => it.placed)) checkWin();
  }

  function undo() {
    if (!S || S.won || S.history.length === 0) return;
    const prev = S.history.pop();
    prev.forEach((st, i) => Object.assign(S.items[i], st));
    S.moves++;
    S.undos++;
    GameAudio.play("undo");
    S.items.forEach(render);
    updateDanger();
    emitChange();
  }

  function restart() {
    if (!S) return;
    snapshot();
    S.items.forEach(it => { it.placed = false; it.rot = 0; });
    S.moves++;
    GameAudio.play("restart");
    S.items.forEach(render);
    updateDanger();
    emitChange();
  }

  function destroy(gridEl) {
    if (S && S.dockEl) S.dockEl.remove();
    S = null;
    if (gridEl) {
      gridEl.innerHTML = "";
      gridEl.classList.remove("truck-full", "drop-ok", "truck-bay",
        "doors-closing", "bay-locked", "bay-engine", "bay-departing");
      gridEl.style.transform = "";
    }
  }

  return { init, undo, restart, destroy };
})();
