/* ============================================================
   NINJA EVENTS — scene-debug.js       (hors production)
   MODE QA (Phase E) — activation : ?debug=1 dans l'URL.
   Invisible en utilisation normale.
   - cadre de scène + coordonnées des cases au toucher ;
   - panneau de diagnostic 🔧 : version, cache, stockage, taille
     de la sauvegarde, FPS, cohérence des données de niveaux ;
   - bouton « copier le rapport » pour les remontées de bêta.
   ============================================================ */
"use strict";

window.DEBUG_SCENE = /[?&]debug=1/.test(location.search);

(() => {
  if (!window.DEBUG_SCENE) return;

  document.addEventListener("DOMContentLoaded", () => {
    const scene = document.getElementById("app");
    scene.style.outline = "2px dashed #F2D437";

    /* --- Bandeau de scène (taille/ratio) --- */
    const hud = document.createElement("div");
    hud.style.cssText =
      "position:absolute;top:2px;left:2px;z-index:99;font:11px monospace;" +
      "background:rgba(0,0,0,.6);color:#F2D437;padding:3px 7px;border-radius:6px;pointer-events:none;";
    scene.appendChild(hud);
    const refreshHud = () => {
      const r = scene.getBoundingClientRect();
      hud.textContent = `DEBUG · ${Math.round(r.width)}×${Math.round(r.height)} px · ` +
        `ratio ${(r.width / r.height).toFixed(3)}`;
    };
    refreshHud();
    window.addEventListener("resize", refreshHud);

    /* --- Coordonnées logiques au toucher --- */
    scene.addEventListener("pointerdown", (ev) => {
      const grid = ev.target.closest(".puzzle-grid");
      if (!grid) return;
      const r = grid.getBoundingClientRect();
      const x = Math.floor((ev.clientX - r.left) / r.width * Number(grid.dataset.cols || 1));
      const y = Math.floor((ev.clientY - r.top) / r.height * Number(grid.dataset.rows || 1));
      console.info(`[QA] case touchée : (${x}, ${y})`);
    });

    /* --- Vérification de cohérence des données --- */
    function checkData() {
      const issues = [];
      const ids = new Set();
      let count = 0;
      for (const act of Levels.ACTS) {
        for (const l of Levels.ofAct(act.id)) {
          count++;
          if (ids.has(l.id)) issues.push("doublon " + l.id);
          ids.add(l.id);
          if (!["cases", "cables", "lights"].includes(l.family)) issues.push("famille inconnue " + l.id);
          if (!l.par || l.par.moves2fans < l.par.moves3fans) issues.push("par incohérent " + l.id);
        }
      }
      for (const pid of Object.keys(Save.get().progress)) {
        if (!Levels.byId(pid)) issues.push("progression orpheline " + pid);
        const f = Save.get().progress[pid].fans;
        if (!(f >= 1 && f <= 3)) issues.push("éventails invalides " + pid);
      }
      return { count, issues };
    }

    /* --- Compteur de FPS (actif seulement panneau ouvert) --- */
    let fps = 0, frames = 0, last = performance.now(), rafId = null;
    function fpsLoop(t) {
      frames++;
      if (t - last >= 1000) { fps = frames; frames = 0; last = t; }
      rafId = requestAnimationFrame(fpsLoop);
    }

    /* --- Panneau QA --- */
    const btn = document.createElement("button");
    btn.textContent = "🔧";
    btn.setAttribute("aria-label", "Panneau QA");
    btn.style.cssText =
      "position:absolute;bottom:6px;left:6px;z-index:99;width:38px;height:38px;" +
      "border-radius:50%;background:rgba(0,0,0,.65);color:#F2D437;font-size:17px;";
    scene.appendChild(btn);

    const panel = document.createElement("div");
    panel.style.cssText =
      "position:absolute;inset:8% 6%;z-index:98;display:none;overflow:auto;" +
      "background:rgba(10,14,22,.96);color:#F7F1E3;border:1px solid #F2D437;" +
      "border-radius:14px;padding:14px;font:12px/1.7 monospace;white-space:pre-wrap;";
    scene.appendChild(panel);

    async function report() {
      const lines = [];
      lines.push("NINJA EVENTS — RAPPORT QA");
      lines.push("Version app     : " + (window.APP_VERSION || APP_VERSION));
      lines.push("Navigateur      : " + navigator.userAgent.split(") ").pop());
      lines.push("Affichage       : " + innerWidth + "×" + innerHeight +
                 " @" + (devicePixelRatio || 1) + "x");
      try {
        const keys = await caches.keys();
        const active = keys.filter(k => k.startsWith("ninja-events"));
        let entries = "?";
        if (active.length) {
          entries = (await (await caches.open(active[active.length - 1])).keys()).length;
        }
        lines.push("Cache SW        : " + (active.join(", ") || "aucun") + " (" + entries + " entrées)");
      } catch (e) { lines.push("Cache SW        : inaccessible"); }
      try {
        const est = await navigator.storage.estimate();
        lines.push("Stockage        : " + (est.usage / 1048576).toFixed(2) + " / " +
                   (est.quota / 1048576).toFixed(0) + " MB");
      } catch (e) { lines.push("Stockage        : inaccessible"); }
      lines.push("Sauvegarde      : " + JSON.stringify(Save.get()).length + " octets");
      const d = checkData();
      lines.push("Niveaux         : " + d.count +
                 (d.issues.length ? "  ⚠ " + d.issues.join(" · ") : "  cohérence OK ✔"));
      lines.push("FPS             : " + fps);
      lines.push("Hors ligne      : " + (navigator.onLine ? "non (en ligne)" : "OUI"));
      return lines.join("\n");
    }

    let timer = null;
    btn.addEventListener("click", async () => {
      const open = panel.style.display !== "block";
      panel.style.display = open ? "block" : "none";
      if (open) {
        rafId = requestAnimationFrame(fpsLoop);
        const render = async () => {
          panel.textContent = await report();
          const copy = document.createElement("button");
          copy.textContent = "📋 Copier le rapport";
          copy.style.cssText =
            "display:block;margin-top:10px;padding:8px 14px;border-radius:999px;" +
            "background:#F2D437;color:#22252B;font-weight:bold;";
          copy.addEventListener("click", async () => {
            try { await navigator.clipboard.writeText(await report());
                  copy.textContent = "✔ Copié"; } catch (e) {}
          });
          panel.appendChild(copy);
        };
        render();
        timer = setInterval(render, 2000);
      } else {
        cancelAnimationFrame(rafId);
        clearInterval(timer);
      }
    });

    console.info("[QA] mode diagnostic actif (?debug=1).");
  });
})();
