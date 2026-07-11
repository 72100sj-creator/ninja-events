# 🥷🎭 Ninja Events

> Prépare le spectacle. Ouvre le rideau. Savoure les applaudissements.

PWA de puzzle zen — HTML / CSS / JavaScript vanilla, sans framework, sans build.
Document de référence : `GDD-Ninja-Events.md` (v1.1).

---

## Version actuelle : v0.1.0 (Phase 1 — Fondations)

### Ce qui fonctionne
- 🎭 **Écran titre** (rideau fermé, poussière dorée, « toucher pour entrer »)
- 🏮 **Le Dojo** (accueil avec Yuki animé)
- 🗺 **La Feuille de Route** (les 5 actes — seul l'Acte I est ouvert)
- 📓 **Le Carnet de Régie** (liste des missions, éventails, fenêtre de liberté)
- 🧩 **Écran Mission** avec moteur d'affichage (grille, murs, gaffeur, flight cases)
- 🎬 **Transitions rideau** entre tous les écrans
- ⚙️ **Réglages complets** (volumes, vibrations, mode sombre, daltonisme, animations réduites)
- 💾 **Sauvegarde locale** continue (localStorage, versionnée, migrations prévues)
- 📱 **PWA hors ligne** (service worker cache-first, installable iOS/Android/Desktop)

### Ce qui arrive en Phase 2
Le gameplay (poussée des caisses, règles, victoire), la séquence Rideau complète,
les sons, les éventails gagnés en jouant.

---

## Structure du projet

La structure suit le **GDD §14.3** (référence absolue du projet) plutôt que le
découpage `core/ui/game` : un fichier = une responsabilité, les données de
niveaux ne contiennent jamais de code, les moteurs de familles ne connaissent
pas la navigation.

```
index.html            coquille de l'application (tous les écrans)
manifest.json         manifeste PWA (portrait, standalone, icônes)
sw.js                 service worker — hors ligne (CACHE_VERSION à incrémenter à chaque livraison)
css/
  base.css            palette (GDD §11.2), reset, typographie
  scene.css           Scene Engine 9:16 + grille logique
  ui.css              boutons galets, panneaux, listes, HUD
  themes.css          ambiances d'actes, mode sombre, daltonisme
  animations.css      animations ambiantes + LE RIDEAU
js/
  save.js             ⚠️ CRITIQUE — sauvegarde locale
  audio.js            squelette audio (sons en Phase 2)
  scene-engine.js     cases logiques → pourcentages
  scene-debug.js      outil de debug (?debug=1)
  levels-index.js     catalogue des actes + registre des niveaux
  levels/act1.js      niveaux de l'Acte I (données pures, format GDD §14.5)
  families/cases.js   famille A « Flight Cases » (Phase 1 : affichage seul)
  progress.js         déblocages, éventails, statistiques
  curtain.js          transition rideau entre écrans
  main.js             navigation, rendu des menus, réglages, démarrage
assets/icons/         icônes PWA (192, 512, maskable)
```

---

## Tester en local

Un simple serveur statique suffit (le service worker exige http://, pas file://) :

```
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000` — idéalement dans un navigateur en mode
mobile (F12 → mode appareil, iPhone en portrait).

**Mode debug** : `http://localhost:8000/?debug=1` (cadre de scène, coordonnées
des cases au toucher, traces audio).

## Publier (GitHub Pages)

1. Déposer tous les fichiers à la racine du dépôt (glisser-déposer dans l'interface web GitHub).
2. Settings → Pages → Source : branche `main`, dossier `/ (root)`.
3. L'URL fournie par GitHub est en HTTPS : la PWA est installable immédiatement
   (iPhone : Safari → Partager → « Sur l'écran d'accueil »).

## Règles de maintenance

- `js/save.js` et les moteurs de familles validés ne se modifient qu'avec
  justification écrite + indicateur de risque (🟢🟡🔴).
- À **chaque** livraison : incrémenter `CACHE_VERSION` dans `sw.js` et
  `APP_VERSION` dans `js/main.js`, et ajouter les nouveaux fichiers à
  `CORE_FILES` dans `sw.js`.
- Livraisons de fichiers complets uniquement, une fonctionnalité à la fois.

---

## Changelog

### v0.1.0 — Phase 1 : Fondations (juillet 2026)
- Création du projet complet : 21 fichiers.
- Scene Engine 2.0 (ratio 9:16, positionnement en cases logiques).
- Navigation à 6 écrans avec transition rideau signature.
- Sauvegarde locale versionnée avec écriture continue et migrations.
- Réglages complets appliqués en direct (sombre/daltonisme/animations via variables CSS).
- 3 niveaux de démonstration au format déclaratif du GDD.
- Moteur d'affichage de la famille A (interactions en Phase 2).
- PWA installable et 100 % hors ligne après la première visite.
