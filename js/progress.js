/* ============================================================
   NINJA EVENTS — progress.js
   Progression du joueur : déblocage des niveaux (« fenêtre de
   liberté » de 3 niveaux, GDD §7.3), éventails, statistiques.
   ============================================================ */
"use strict";

const Progress = (() => {

  const FREEDOM_WINDOW = 3;   // niveaux ouverts en avance (GDD §7.3)

  /** Éventails gagnés sur un niveau (0 si jamais terminé). */
  function fansOf(levelId) {
    const p = Save.get().progress[levelId];
    return p ? p.fans : 0;
  }

  /** Un niveau est-il terminé ? */
  function isDone(levelId) { return fansOf(levelId) > 0; }

  /**
   * Un niveau est jouable si son index est dans la fenêtre de
   * liberté après le dernier niveau terminé de l'acte.
   */
  function isUnlocked(actId, index) {
    const list = Levels.ofAct(actId);
    let lastDone = -1;
    list.forEach((lvl, i) => { if (isDone(lvl.id)) lastDone = i; });
    return index <= lastDone + FREEDOM_WINDOW;
  }

  /** L'acte est-il accessible ? Règle GDD §7.3 : la Générale de
      l'acte précédent doit être terminée (1 éventail suffit). */
  function isActUnlocked(actId) {
    if (actId === "act1") return true;
    if (actId === "act2") return isDone("A1-12");
    return false;   // actes III+ : à venir
  }

  /**
   * Enregistre une victoire (appelé par le moteur en Phase 2).
   * Conserve toujours le meilleur résultat.
   */
  function completeLevel(levelId, fans, moves) {
    Save.update(s => {
      const prev = s.progress[levelId];
      if (!prev) {
        s.stats.totalLevels += 1;
        s.stats.totalFans += fans;
        s.progress[levelId] = { fans, bestMoves: moves, completedAt: Date.now() };
      } else {
        s.stats.totalFans += Math.max(0, fans - prev.fans);
        prev.fans = Math.max(prev.fans, fans);
        prev.bestMoves = Math.min(prev.bestMoves, moves);
      }
    });
  }

  /** Total d'éventails d'un acte (affiché sur la Feuille de Route). */
  function fansOfAct(actId) {
    return Levels.ofAct(actId).reduce((sum, lvl) => sum + fansOf(lvl.id), 0);
  }

  /**
   * Éventails gagnés selon le nombre de coups (GDD §5.9).
   * 1 éventail = toujours acquis ; les seuils viennent du niveau.
   */
  function fansFor(level, moves) {
    const par = level.par || {};
    if (par.moves3fans && moves <= par.moves3fans) return 3;
    if (par.moves2fans && moves <= par.moves2fans) return 2;
    return 1;
  }

  return { fansOf, isDone, isUnlocked, isActUnlocked, completeLevel, fansOfAct, fansFor };
})();
