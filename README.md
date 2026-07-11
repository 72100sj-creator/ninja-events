# 🥷🎭 Ninja Events

> Prépare le spectacle. Ouvre le rideau. Savoure les applaudissements.

PWA de puzzle zen — HTML / CSS / JavaScript vanilla, sans framework, sans build.
Document de référence : `GDD-Ninja-Events.md` (v1.1).

---

## Version actuelle : v0.4.0 (Phase 2 — Effets sonores)

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

- 🕹 **Gameplay Flight Cases** : glisser les caisses au doigt, collisions, victoire
- 🪭 **Éventails gagnés** (1 à 3 selon le nombre de coups), enregistrés dans la sauvegarde
- ↩ **Annulation illimitée** et ⟳ recommencer

- 🎬 **La Séquence Rideau** (GDD §11.5) : noir de salle, trois coups,
  ouverture du rideau sur le plateau du joueur, projecteurs un à un,
  public en contre-jour, pétales — skippable dès la deuxième victoire

- 🔊 **11 effets sonores** synthétisés sur mesure (~78 KB) : trois coups,
  rideau, roulements, carillon du gaffeur, applaudissements…

### Ce qui arrive dans les prochaines livraisons
La musique zen et les ambiances (curseurs déjà en place), la reprise du
plateau en cours après fermeture de l'app, le Chat de la Régie (A1-03).

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

### v0.4.0 — Phase 2, livraison 3 : les effets sonores (juillet 2026)
- 11 sons **synthétisés sur mesure** (numpy → AAC/m4a, 78 KB au total,
  libres de droits) : trois coups du brigadier, tissu du rideau (×2),
  roulement de caisse, carillon du gaffeur, arpège de victoire, annuler,
  recommencer, projecteurs, applaudissements (110 claps), tap d'interface.
- `audio.js` réécrit en Web Audio API : déblocage au premier toucher
  (contrainte iOS), bus « Effets » branché sur le curseur des Réglages,
  variation de hauteur ±3 % (GDD §12.4), anti-répétition sous 70 ms.
- Les trois coups et les projecteurs sont **calés sur les animations CSS**
  (0/480/960 ms et 0/320/640 ms) : le son et l'image tombent ensemble.
- Son « tap » discret sur tous les boutons.
- Service worker : les sons entrent dans le cache hors ligne.
- `CACHE_VERSION` → v0.4.0. Moteur, sauvegarde et niveaux non touchés.

### v0.3.3 — Le public se lève vraiment (juillet 2026)
- 🐛 Les silhouettes du public étaient enterrées sous le bord bas de la
  scène (ancrage à -6 % + translation finale trop basse) : seules les
  têtes dépassaient. Remontées : têtes et épaules se lèvent devant la scène.
- ✨ Faisceaux légèrement adoucis (moins « triangle », plus « lumière »).
- `CACHE_VERSION` → v0.3.3.

### v0.3.2 — Correctif pétales (juillet 2026)
- 🐛 Le raccourci CSS `animation:` des pétales écrasait leurs durées et
  délais individuels (durée 0 s → pétales invisibles). Remplacé par les
  propriétés longues (`animation-name` / `timing-function` / `iteration-count`)
  qui laissent vivre les réglages pétale par pétale.
- `CACHE_VERSION` → v0.3.2. Aucun autre fichier touché.

### v0.3.1 — Correctif + embellissement de la Séquence Rideau (juillet 2026)
- 🐛 **Bug corrigé** : le sélecteur des trois coups (`.rideau.p-knocks i`)
  touchait TOUS les éléments `<i>` du rideau et figeait faisceaux et
  silhouettes à opacité 0. Il est désormais scellé sur `.r-knocks i`.
- ✨ Faisceaux : plus lumineux, fondu additif (`mix-blend-mode: screen`),
  flaque de lumière au pied de chaque projecteur.
- ✨ Public : vraies silhouettes tête + épaules, tailles variées, léger
  balancement une fois levé.
- ✨ Pétales : deux couleurs (or et rose), 8 tailles/durées différentes,
  dérives gauche/droite qui tournoient — fini la ligne trop régulière.
- Chronologie : public à 3,7 s, fin de séquence à 5,8 s.
- `CACHE_VERSION` → v0.3.1.

### v0.3.0 — Phase 2, livraison 2 : la Séquence Rideau (juillet 2026)
- `curtain.js` : nouvelle fonction `playVictory()` — chronologie de 5,4 s
  (noir 0,5 s → trois coups → ouverture du rideau 1,4 s → 3 projecteurs
  en cascade → public + pétales), puis panneau d'éventails.
- Skippable d'un toucher dès la deuxième victoire (jamais la première).
- « Réduire les animations » : la séquence devient un simple fondu de 0,25 s.
- Nouvelles couches CSS (#rideau) : uniquement transform/opacity, 60 fps.
- Voile du panneau de victoire allégé : la scène éclairée reste visible.
- `CACHE_VERSION` → v0.3.0. Moteur de jeu et sauvegarde non touchés.

### v0.2.0 — Phase 2, livraison 1 : Moteur de poussée (juillet 2026)
- `families/cases.js` réécrit : glisser tactile case par case (axe dominant,
  contournement naturel), collisions bords/murs/caisses, 1 coup = 1 case.
- Marques au gaffeur qui s'illuminent en matcha quand la bonne caisse est posée.
- Victoire : pulsation des caisses, panneau « Le rideau s'ouvre ! » avec
  éventails animés, nombre de coups, « Spectacle suivant ».
- Boutons Annuler (illimité) et Recommencer actifs dans le HUD.
- `progress.js` : calcul des éventails selon les seuils `par` des niveaux.
- Micro-retours des captures : damier du sol renforcé, « 🪭 0 » masqué sur la carte.
- `touch-action: none` sur la grille (le glisser ne fait plus défiler la page).
- `CACHE_VERSION` → v0.2.0.

### v0.1.0 — Phase 1 : Fondations (juillet 2026)
- Création du projet complet : 21 fichiers.
- Scene Engine 2.0 (ratio 9:16, positionnement en cases logiques).
- Navigation à 6 écrans avec transition rideau signature.
- Sauvegarde locale versionnée avec écriture continue et migrations.
- Réglages complets appliqués en direct (sombre/daltonisme/animations via variables CSS).
- 3 niveaux de démonstration au format déclaratif du GDD.
- Moteur d'affichage de la famille A (interactions en Phase 2).
- PWA installable et 100 % hors ligne après la première visite.
