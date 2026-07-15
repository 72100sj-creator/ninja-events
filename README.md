# 🥷🎭 Ninja Events

> **Prépare le spectacle. Ouvre le rideau. Savoure les applaudissements.**

Un jeu de puzzles zen où un jeune ninja devenu régisseur technique prépare
des spectacles en coulisses. Poussez les flight cases, branchez les câbles,
réglez les projecteurs — et quand tout est prêt, le rideau s'ouvre, les
lumières s'allument une à une et le public applaudit.

**PWA 100 % hors ligne** · HTML/CSS/JavaScript vanilla · zéro framework,
zéro build, zéro dépendance, zéro publicité, zéro suivi.

---

## Version 1.0.0 🏁

- 🧩 **64 missions faites main** sur 5 actes (Salle Municipale, Théâtre
  Suzume, Festival des Lanternes, Grande Tournée, Concert Géant),
  **toutes prouvées solvables** par des solveurs dédiés, avec seuils
  d'éventails dérivés des optima calculés
- 🎮 **3 familles de puzzles** : Flight Cases (pousser), Câbles (relier),
  Projecteurs (orienter la lumière sans éclairer les kuroko)
- 🎬 **La Séquence Rideau** : noir de salle, trois coups, ouverture sur
  VOTRE plateau, projecteurs en cascade, public, pétales
- 🎼 **Une scène sonore par acte** (musiques et ambiances synthétisées
  sur mesure, fondu enchaîné, gamme unique de ré pentatonique)
- 💾 Sauvegarde continue (reprise exacte, annulations comprises) +
  **export/import par code** (parade à l'effacement iOS)
- 🪭 Grand Album : statistiques + 10 Éventails d'Or bienveillants
- ♿ Accessibilité : daltonisme (couleur **et** forme), mode sombre,
  gros éléments, animations réduites, focus clavier, jouable sans son
- 📦 Cœur installable : **< 1 MB** · projet complet : 2,4 MB

## Jouer

En ligne : ouvrir la page GitHub Pages du dépôt.
Sur iPhone : Safari → Partager → **« Sur l'écran d'accueil »**.
Sur Android : Chrome propose l'installation automatiquement.
Après la première visite, le jeu fonctionne **entièrement hors ligne**.

## Documents

- `docs/GDD-Ninja-Events.md` — le Game Design Document (référence absolue)
- `LICENSE.txt` — © 2026 Seb, tous droits réservés

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

### v1.2.0 — 🚚🎆 Les Actes IV et V : la fin du voyage (juillet 2026)
- 🚚 **Acte IV — La Grande Tournée** (12 missions) : quais de chargement,
  multipaires, tunnels de service… jusqu'à « La générale de tournée ».
- 🎆 **Acte V — Le Concert Géant** (12 missions) : montage à l'aube, façade
  son, la poursuite sur la star… et le final absolu : **« La Première »**
  (7 projecteurs, 3 kuroko, l'optimum prouvé à 11 touchers).
- 🧩 Le jeu passe à **64 niveaux**, trois familles entrelacées partout.
  Les solveurs ont rejeté 9 designs défectueux avant livraison (cible
  posée sur un mur, lune sur l'unique ligne de visée, goulots de câbles).
- 🔓 Déblocages : Acte IV après la Générale des Lanternes, Acte V après
  la Générale de tournée. 🎼 Le Concert reprend la scène sonore du
  théâtre ; la Tournée garde les coulisses (musiques dédiées : v1.3).
- Moteurs gelés : **intacts**. Fichiers : levels/act4.js + act5.js
  (nouveaux), progress.js (2 lignes), audio.js (1 ligne), index.html,
  sw.js → v1.2.0. Régressions : aucune détectée.

### v1.1.5 — Les plateaux Premium (juillet 2026)
100 % CSS (`scene.css`) — les trois moteurs gelés n'ont pas été ouverts.
- 📦 **Vraies flight cases** : caisse sombre à cornières alu, **coins
  boules aux quatre angles**, couvercle en creux avec poignée coquille ;
  en cours de glisser, la caisse se soulève (ombre longue) et sa
  cornière **s'allume en ambre**.
- 🟨 **Marques au gaffeur qui respirent** (pulsation 3 s) avec un léger
  halo ; satisfaites, elles s'embrasent en vert matcha.
- 🪵 **Murs → praticables** : planches de bois sombre avec relief.
- 🔌 **Prises de scène** : boîtier sombre autour de la couleur, reflet
  du dessus ; **câbles gainés caoutchouc** (reflet + liseré sombre).
- 🐱 Le Chat harmonisé : ombre portée plus douce, songe « z z » en
  ambre lumineux — par surcharges CSS uniquement (`cases.js` intact).
- La pulsation des marques respecte « Réduire les animations ».
- `CACHE_VERSION` → v1.1.5. Régressions : aucune (aucun JS touché).

### v1.1.4 — Retouche : Yuki sans oreilles (juillet 2026)
- 🥷 Les oreilles disparaissent (Dojo + icônes) : la capuche du kuroko
  couvre tout, silhouette plus pure. `CACHE_VERSION` → v1.1.4.

### v1.1.3 — La Méditation : Yuki v3 + icônes assorties (juillet 2026)
- 🧘 **Yuki v3 au Dojo**, inspiré d'une référence fournie : en position
  du lotus, yeux clos apaisés et sourcils sereins, masque de kuroko,
  kimono à col croisé, obi ambré noué, mains en mudra — et **un lotus
  d'or qui flotte au-dessus de lui** (halo qui respire, flottement de
  4,5 s), éclairé par **deux petits projecteurs de régie** dans les
  coins. Le pilier « Calme » du GDD, incarné.
- 🏮 **Icônes redessinées à l'identique** (192, 512, maskable) : la tête
  de Yuki en méditation sous le lotus d'or, rideau et galon en haut,
  filet ambré en cadre.
- Toutes les parties restent nommées ; animations coupées par
  « Réduire les animations ». `CACHE_VERSION` → v1.1.3.
- ⚠️ iOS : supprimer/réinstaller l'icône d'accueil pour voir la nouvelle.

### v1.1.2 — Yuki v2 sur l'écran du Dojo (juillet 2026)
- 🥷 Yuki redessiné dans le style flat du jeu : bandeau rouge aux pans
  flottants (animés), yeux vivants avec reflets et joues, ceinture obi
  ambrée nouée, bras articulés, et **une lanterne allumée à la main**
  (écho de l'icône) dont le halo respire doucement.
- Parties nommées (.yuki-tails, .yuki-glow, .yuki-obi…) pour évoluer
  facilement ; animations coupées par « Réduire les animations ».
- `CACHE_VERSION` → v1.1.2.

### v1.1.1 — Icônes officielles « La Régie » (juillet 2026)
- 🏮 Les trois icônes (192, 512, maskable 512) redessinées dans
  l'identité v1.1 : lanterne ambrée au cœur crème suspendue sous le
  rideau rouge à galon d'or, halo de lampe de pupitre, fond console
  en dégradé nuit, filet ambré en cadre. Motif centré dans la zone
  sûre pour la version maskable (Android).
- Mêmes noms de fichiers : manifest, index.html et service worker
  inchangés hors `CACHE_VERSION` → v1.1.1.
- ⚠️ iOS met l'icône d'accueil en cache : après mise à jour, supprimer
  puis réinstaller « Sur l'écran d'accueil » pour voir la nouvelle.

### v1.1.0 — 🎛 Premium Edition : « La Régie » (juillet 2026)
Refonte esthétique complète, 100 % CSS — **aucune ligne des trois
moteurs ni du JavaScript de jeu modifiée** (seul le numéro de version).
- 🎛 **Nouvelle identité « console lumière »** : panneaux anthracite
  biseautés, texte crème chaud, filets ambrés, halo de lampe de pupitre
  et vignette sur la scène, châssis autour du plateau de jeu.
- 💡 **LED de voies** : les numéros de mission s'affichent en LED ambrée
  (verte quand le spectacle est joué) ; boutons = touches de pupitre qui
  s'allument à l'appui ; codes de sauvegarde sur **afficheur console**
  (ambre sur noir) ; touche « Reprendre » qui respire.
- 🎭 Le rouge rideau est réservé aux moments de scène (Jouer, victoire,
  titre) — et le panneau de victoire reste en papier washi éclairé :
  le contraste régie sombre / scène en lumière devient la signature.
- 🌗 Thèmes d'actes réaccordés en profondeur (panneaux compris) :
  nuit chaude, pourpre et or, nuit bleue.
- ✨ Animations discrètes : entrée en fondu de chaque écran (260 ms),
  montée en scène du panneau de victoire + éclat d'or, pression des
  touches — toutes désactivées par « Réduire les animations ».
- 📜 Défilement re-vérifié systématiquement : aucun override de
  position sur les écrans, marges basses avec zone sûre iOS,
  barre de défilement discrète sur bureau.
- Lisibilité : hiérarchie renforcée (titres, filets, texte secondaire
  en crème atténué), nombres tabulaires façon afficheur.
- `CACHE_VERSION` → v1.1.0. Régressions : aucune détectée.

### v1.0.2 — Correctif : défilement du Carnet de Régie (juillet 2026)
- 🐛 Le Carnet de Régie (et lui seul) restait fixe : la lueur de chaleur
  ajoutée en v0.13.0 imposait `position: relative` à l'écran, lui faisant
  perdre sa hauteur pleine scène — il grandissait avec son contenu au
  lieu de défiler. La ligne fautive est supprimée (l'écran était déjà
  positionné, la lueur n'en avait pas besoin) et un commentaire
  d'avertissement est laissé dans le CSS.
- Vérifié : aucun autre écran ne subit d'override de position.
- `CACHE_VERSION` → v1.0.2.

### v1.0.1 — Correctif : défilement des listes sur iPhone (juillet 2026)
- 🐛 Impossible de faire défiler les listes (Carnet de Régie, Feuille de
  Route, Réglages, Album) quand elles dépassaient l'écran : les enfants
  flex `flex: 1` ont `min-height: auto` par défaut et grandissent au lieu
  de défiler. Correctif : `min-height: 0` + `touch-action: pan-y` sur
  `.scrollable` — les quatre listes du jeu sont couvertes d'un coup.
- `CACHE_VERSION` → v1.0.1. Aucun autre fichier touché.

### v1.0.0 — 🏁 Version 1.0 (juillet 2026)
**Phase G — Préparation 1.0**
- ℹ️ Écran **À propos & crédits** (depuis les Réglages) : crédits,
  citation du Maître, mentions légales, promesse « sans pub, sans suivi ».
- 📄 `LICENSE.txt` (© 2026 Seb, tous droits réservés — modifiable).
- 📘 README GitHub définitif (présentation, installation, documents).
- 📱 Manifest final : `id`, `categories` (games/puzzle).
- 🔢 Version unifiée v1.0.0 partout (app, cache, À propos, Réglages).

**Pass Directeur Technique** — trois finitions relevées et corrigées :
- 🗺 Le premier acte verrouillé explique désormais COMMENT lever son
  rideau (« Termine la Générale de l'acte précédent »).
- 🎼 **La musique s'incline** (–78 %) pendant la Séquence Rideau et
  revient ensuite — les applaudissements ont la scène pour eux (GDD §12.2).
- 🌐 Service worker : repli de navigation — toute URL du jeu (même avec
  `?debug=1`) sert la coquille en cache hors ligne.
- Moteurs gelés : **intacts depuis la v0.11.0**. Régressions : aucune.

### v0.15.0 — Route 1.0, Phases E+F : Mode QA & Audit qualité (juillet 2026)
**Mode QA (Phase E)** — invisible en usage normal, activé par `?debug=1` :
- 🔧 Panneau de diagnostic : version, cache du service worker (nom +
  nombre d'entrées), stockage utilisé/quota, taille de la sauvegarde,
  **FPS en direct** (mesuré uniquement panneau ouvert), état hors ligne,
  et **vérification de cohérence des données** (ids uniques, familles,
  seuils, progression orpheline, éventails valides).
- 📋 Bouton « Copier le rapport » pour les remontées de bêta-test.

**Audit qualité (Phase F)** — scans automatisés (CSS mort, exports
orphelins, doublons d'ids, cycle de vie) :
- 🐛 **Bug réel corrigé** : `destroy()` n'était jamais appelé au
  changement de niveau — les écouteurs tactiles des Câbles restaient
  branchés sur la grille en passant à un autre puzzle (écouteurs
  fantômes). `main.js` rend désormais proprement la grille à chaque
  chargement. Correctif prouvé par banc d'essai.
- 🧹 `SceneEngine.makeEl` redevient un outil interne (export orphelin).
- ✔ Faux positifs documentés : classes `c0-c4` (construites dynamiquement),
  `GameAudio.startLoop/stopLoop` et `Save.flush` (API publiques assumées).
- Aucun doublon d'identifiant HTML, aucune autre fonction morte.
- Fichiers modifiés : scene-debug.js (réécrit), main.js, scene-engine.js,
  sw.js. **Moteurs gelés : intacts** (le correctif vit dans main.js).
- Régressions : aucune détectée (bancs d'essai ✔).

### v0.14.0 — Route 1.0, Phases C+D : Accessibilité & Optimisation (juillet 2026)
**Accessibilité (Phase C)**
- 🔍 Nouveau réglage **« Gros éléments »** (GDD §13 basse vision) : textes
  +13 %, boutons 56 px, cartes plus hautes. Stocké sans toucher `save.js`
  (clé optionnelle, vérifiée persistante par banc d'essai).
- 🎨 Contrastes relevés : textes secondaires (.muted, sous-titres d'actes,
  descriptions et dates des succès) passés au-dessus du seuil AA.
- ⌨️ **Focus visible** sur tous les boutons/champs (navigation clavier).
- 🗣 Étiquettes `aria-label` sur les cartes d'actes et de missions
  (état verrouillé + éventails annoncés).
- ✔ Jeu 100 % jouable sans son et sans vibration (aucune info exclusive).

**Optimisation (Phase D)**
- 🎼 Les 6 boucles longues ré-encodées 64 → 48 kb/s (mono, contenu doux :
  différence inaudible) : audio 2,8 → **2,2 MB**.
- 📦 **Préchargement du service worker allégé** : les musiques/ambiances
  des actes II-III ne sont plus préchargées — elles entrent dans le cache
  à la première visite en ligne de l'acte. Cœur installable : **0,98 MB**
  (budget GDD : 2,5 MB). Limite assumée : visiter un acte pour la
  première fois hors ligne = jeu complet mais musique de l'acte absente.
- 🧹 CSS mort purgé (.phase1-note, vestige de la v0.2.0).
- Fichiers modifiés : base/ui/themes.css, index.html, main.js, sw.js.
  **Moteurs gelés : intacts.** Régressions : aucune détectée.

### v0.13.0 — Route 1.0, Phase B : Polish (juillet 2026)
- 🎼 **Chaque acte a désormais sa scène sonore** (GDD §12.2) :
  « Les dorures » (Acte II — koto grave, taiko feutré, tintements de
  lustre) et « Hanabi » (Acte III — marimba lumineux, grillons, brise).
  4 nouvelles boucles sans couture (~1,7 MB ; audio total 2,8/4 MB).
- 🔀 **Fondu enchaîné automatique** : entrer dans un acte fond la
  musique et l'ambiance vers les siennes (2,5 s) ; retour au Dojo =
  retour aux coulisses. Vérifié par banc d'essai (4 points).
- 📳 **Les trois coups vibrent dans la main** (motif toc…toc…toc calé
  sur la séquence), si les vibrations sont activées.
- ✨ Micro-animations : cartes de la Feuille de Route et du Carnet en
  cascade, entrée en scène du plateau (fondu + zoom léger).
- 🏮 **La salle reprend vie** (§7.4 allégé) : le Carnet de Régie se
  réchauffe d'une lueur dorée proportionnelle aux missions terminées.
- Toutes ces animations respectent « Réduire les animations ».
- Fichiers modifiés : audio.js, main.js, curtain.js (3 lignes),
  animations.css, themes.css, sw.js, +4 sons. **Moteurs gelés : intacts.**
- Régressions : aucune détectée (bancs d'essai audio + syntaxe + cache ✔).

### v0.12.0 — Route 1.0, Phase A : l'Acte III (juillet 2026)
- 🏮 **Le Festival des Lanternes s'ouvre** après la Générale de l'Acte II :
  12 missions où les trois familles s'entrelacent (4 Flight Cases,
  4 Câbles, 4 Projecteurs, jamais deux fois la même d'affilée — GDD §7.2).
- 🧩 Total du jeu : **40 niveaux**, tous prouvés par les trois solveurs.
  Le solveur a encore rejeté 2 designs (une cible murée, des projecteurs
  déjà gagnants à l'ouverture).
- 🎨 Thème nuit bleue du festival appliqué automatiquement (déjà défini
  dans themes.css depuis la v0.1.0 — zéro CSS ajouté).
- 🔒 **Gameplay gelé** : aucun des trois moteurs n'a été modifié, aucune
  ligne de code ajoutée hors données de niveaux + règle de déblocage.
- Fichiers modifiés : levels/act3.js (nouveau), progress.js (1 ligne),
  index.html, sw.js (cache v0.12.0), main.js (version), README.
- Régressions : aucune détectée (moteurs intacts, données pures).

### v0.11.0 — Phase 3, livraison 5 : la famille Projecteurs (juillet 2026)
- 💡 **Troisième moteur de puzzle** (`families/lights.js`) : un toucher =
  un quart de tour horaire ; le faisceau file jusqu'à un mur, un autre
  projecteur ou le bord. Éclairer toutes les marques de scène **sans
  jamais éclairer les couloirs des kuroko** (☾) — la règle de conception
  fondamentale du GDD §1.6 en mécanique pure : c'est le vrai « focus »
  d'un réglage lumière.
- 🧩 **8 missions** (A2-09 → A2-16) prouvées par le **solveur Projecteurs**
  (recherche exhaustive des 4ⁿ orientations) — il a rejeté 3 designs
  insolvables et 2 designs quasi résolus d'avance. Courbe : 2 → 12 touchers.
- 🎨 Projecteurs au corps métallique avec lentille dorée orientée,
  faisceaux en lumière additive, marques de scène qui s'embrasent,
  lune des kuroko qui rougit et tremble si on la dérange.
- 🔊 Son « spot-turn » : clic de relais + petit servo (0,16 s).
- Reprise, annulation, éventails, séquence Rideau : héritage automatique
  grâce à l'API commune des familles. Banc d'essai en 5 points au vert.
- L'Acte II compte désormais **16 missions** (Câbles + Projecteurs alternés
  dans le Carnet de Régie).
- `CACHE_VERSION` → v0.11.0. Aucun moteur existant modifié.

### v0.10.0 — Phase 3, livraison 4 : la famille Câbles + l'Acte II (juillet 2026)
- 🔌 **Nouveau moteur de puzzle** (`families/cables.js`) : tracer des
  câbles au doigt pour relier les paires de prises. Pas de croisement,
  revenir sur ses pas efface, reprendre un câble le retaille. Score =
  total de cases utilisées (moins = mieux).
- ♿ Redondance couleur + forme (GDD §13) : chaque couleur de prise porte
  son pictogramme (● ■ ▲ ◆ ✚) + palettes daltonisme ajustées.
- 🎭 **L'Acte II (Théâtre Suzume) s'ouvre** après la Générale de l'Acte I
  (règle GDD §7.3) — 8 missions, thème rouge et or appliqué à l'écran.
- 🔧 **Solveur Câbles** : il a rejeté SIX designs impossibles avant
  livraison (dont des croisements topologiquement irréalisables) ;
  les 8 niveaux publiés sont prouvés, seuils dérivés du minimum.
- 🔊 Deux sons : déroulé de câble (frottement feutré) et branchement
  (clic + LED en ré-la, accordés avec le jeu).
- Reprise du plateau, annulation, Recommencer, Éventails d'Or : tout
  fonctionne pour la nouvelle famille (même API que Flight Cases).
- `CACHE_VERSION` → v0.10.0. `save.js` et Flight Cases non touchés.

### v0.9.0 — Phase 3, livraison 3 : export/import de sauvegarde (juillet 2026)
- 💾 Dans les Réglages : **Exporter** génère un code `NINJA-…` (toute la
  progression, réglages et Éventails d'Or compris) avec somme de contrôle ;
  **Importer** restaure depuis un code, avec confirmation et messages
  d'erreur clairs (format inconnu / code tronqué / contenu invalide).
- ⚠️ `save.js` (fichier critique) modifié avec justification : c'est la
  parade au **risque n°1 du GDD §18** (iOS peut effacer le localStorage
  d'une PWA délaissée ~7 jours). Deux fonctions ajoutées, zéro ligne de
  la logique existante modifiée — vérifié par banc d'essai.
- 🐛 Correction au passage : « Effacer la progression » re-liait les
  écouteurs des Réglages à chaque usage (écritures en double).
- `CACHE_VERSION` → v0.9.0.

### v0.8.0 — Phase 3, livraison 2 : l'Acte I complet (juillet 2026)
- 🧩 **9 nouvelles missions** (A1-04 → A1-12) : Poussière d'or, Les
  coulisses étroites, Les Frères Ampli font la paix, Le pilier têtu,
  La ronde des lanternes, Tanuki est encore en retard, L'entrée du
  magicien, Le nœud du régisseur, La générale du parquet (avec le Chat).
  Courbe en vagues (GDD §8.2) : leçon → défi → respiration.
- 🔧 **Nouvel outil interne : le solveur** (prévu au GDD §18, risque n°2).
  Il reproduit exactement les règles du moteur et prouve par recherche
  exhaustive que chaque niveau est solvable + calcule l'optimum.
- 🐛 Il a immédiatement attrapé **deux seuils impossibles** livrés en
  v0.1.0 : A1-02 exigeait 9 coups pour 3 éventails (optimum réel : 11)
  et A1-03 en exigeait 12 (optimum réel : 13). Personne n'aurait jamais
  pu les obtenir. Tous les seuils dérivent désormais des optima prouvés
  (notés en commentaire dans `act1.js`).
- Il a aussi rejeté un niveau candidat « résolu d'avance » (la première
  Ronde des lanternes) avant qu'il n'atteigne le jeu.
- `CACHE_VERSION` → v0.8.0. Moteur, sauvegarde, audio non touchés.

### v0.7.0 — Phase 3, livraison 1 : Le Grand Album (juillet 2026)
- 📖 Nouvel écran **Le Grand Album** (depuis le Dojo) : statistiques de la
  tournée (spectacles, éventails, parfaits, coups joués) et la collection
  des Éventails d'Or.
- 🪭 **10 Éventails d'Or** (GDD §17.4), bienveillants et sans grind :
  « Les trois coups », « Le Chat a dormi sur ta solution »,
  « Zéro annulation », « Pas un coup de plus », « Salle comble »,
  « Le spectacle de minuit », « Le rappel », « Cinq minutes de plus »…
- 🔔 Bandeau washi de déblocage (file d'attente, carillon, vibration),
  visible même pendant la séquence Rideau.
- Le moteur compte désormais les annulations par partie (transmises à la
  victoire, sauvegardées avec le plateau en cours).
- `save.js` **non modifié** : les succès vivent dans `unlocks.achievements`,
  créé paresseusement.
- `CACHE_VERSION` → v0.7.0.

### v0.6.0 — Phase 2, clôture : musique zen + ambiances (juillet 2026)
- 🎼 **« Le vieux parquet »** : musique de l'Acte I composée sur mesure —
  nappe ré-la-ré qui respire (cycle de 36 s), deux phrases de koto qui se
  répondent, basse posée toutes les 18 s. 72 s **en boucle sans couture**
  (la queue de réverbération est repliée au début du fichier).
- 🌬 **Ambiance « Coulisses »** (44 s en boucle) : air de salle feutré,
  souffle dans les cintres, 4 craquements de parquet, 2 tintements
  lointains de lanterne (en ré, accordés avec tout le reste).
- 🔊 `audio.js` : bus « Musique » et « Ambiances » avec fondus d'entrée
  (3,5 s / 4,5 s) — les trois curseurs des Réglages sont maintenant TOUS
  actifs en direct. `startLoop`/`stopLoop` exposés pour les changements
  d'acte à venir.
- Mixage GDD §12.2 : la musique reste un fond discret sous les effets.
- Poids audio total : ~1,1 MB (budget : 4 MB).
- `CACHE_VERSION` → v0.6.0. Moteur, sauvegarde, niveaux non touchés.

### v0.5.1 — Le Chat de la Régie, le vrai (juillet 2026)
- 🐛 **Positionnement corrigé** : `.grid-cat` manquait dans la liste des
  éléments positionnés du Scene Engine — le chat flottait en haut de la
  grille au lieu de dormir sur sa case, et son songe partait tout seul.
- 🐱 **Chat SVG dessiné dans le style du jeu** (fini l'emoji) : roulé en
  boule couleur miel, oreilles, yeux fermés, rayures, queue qui frémit
  toutes les 6 s, souffle, « z z » dorés. Toutes les parties sont nommées
  (`.cat-body`, `.cat-tail`, `.cat-eyes`…) pour évoluer facilement —
  un futur réveil ne demandera que quelques lignes de CSS.
- `CACHE_VERSION` → v0.5.1.

### v0.5.0 — Phase 2, livraison finale : reprise du plateau + le Chat (juillet 2026)
- 💾 **Interruptibilité totale (GDD §9.2)** : le plateau est photographié
  après chaque coup (positions, compteur, historique d'annulation) dans
  `current.state` — un format que `save.js` prévoyait depuis la v0.1.0,
  il n'a donc PAS été modifié. Rouvrir le même niveau (ou l'app) reprend
  la partie exactement où elle en était, annulations comprises.
- 🎬 Bouton **« Reprendre »** au Dojo quand une mission est en cours
  (reprise en 2 touchers depuis l'écran d'accueil, comme au GDD).
- 🐱 **Le Chat de la Régie** (modificateur `cat`, niveau A1-03) : il dort
  sur sa case en respirant avec un 💤, bloque les caisses comme un pilier,
  et frémit quand on le dérange — mais ne se lève jamais.
- La victoire nettoie l'état sauvegardé ; « Recommencer » sauvegarde le
  plateau remis à zéro.
- `CACHE_VERSION` → v0.5.0.

### v0.4.2 — Applaudissements réalistes (juillet 2026)
- 👏 Applaudissements entièrement resynthétisés en physique du clap :
  chaque clap traverse deux **résonateurs** (la cavité des mains ~750–1250 Hz
  + le claquement ~1,5–2,4 kHz) au lieu d'un simple souffle — c'était la
  cause du rendu « papier froissé ».
- Deux plans sonores : ~700 claps en masse (hauteurs variées ±18 %) et
  26 claps « premiers rangs » distincts, plus une rumeur de salle qui
  respire.
- Aigus arrondis, graves nettoyés, réverbération de salle longue (1,1 s),
  compression douce, 5,7 s avec un fondu naturel.
- Un seul fichier changé : `assets/audio/applause.m4a` (50 KB).
- `CACHE_VERSION` → v0.4.2.

### v0.4.1 — Sons accordés et réverbérés (juillet 2026)
- 🎵 Les 11 sons sont régénérés : **tout est accordé en ré majeur
  pentatonique** (la gamme de l'arpège de victoire) — gaffeur en ré6/la6,
  tap en ré6, bloom des projecteurs en ré3. Plus de notes qui se frottent.
- ✨ **Réverbération de petite salle** sur les sons de spectacle (coups,
  rideau, gaffeur, victoire, projecteurs, applaudissements) : de l'air,
  du liant, moins de sécheresse. Les sons fréquents (roulement, annuler)
  restent secs pour ne pas empâter.
- 👏 Applaudissements réécrits : 130 claps aux timbres variés + une rumeur
  chaleureuse de foule en dessous.
- 🥁 Trois coups plus « bois de brigadier » (trois modes de résonance).
- Poids total : 111 KB (budget GDD : 4 MB).
- Aucun fichier de code modifié (mêmes noms de fichiers sons).
- `CACHE_VERSION` → v0.4.1.
- ℹ️ Rappel : en ouvrant `index.html` en direct (`file://`), les navigateurs
  de bureau bloquent le chargement des sons — tester via GitHub Pages ou
  `python3 -m http.server 8000`.

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
