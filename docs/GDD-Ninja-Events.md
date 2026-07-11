# 🥷🎭 NINJA EVENTS — Game Design Document

**Version :** 1.1 — Validation finale
**Date :** Juillet 2026
**Auteur :** Seb (direction produit) & Claude (rédaction / conception)
**Plateforme :** PWA — iOS & Android, mode portrait
**Genre :** Puzzle zen / logistique de spectacle
**Statut :** ✅ Document de référence officiel du projet — base de développement pluriannuelle

| Version | Date | Changements |
|---|---|---|
| 1.0 | Juillet 2026 | Document fondateur complet |
| **1.1** | **Juillet 2026** | **Validation finale** : règle de conception fondamentale (§1.6), positionnement dans l'univers Ninja (§1.7), festivals saisonniers (§17.6), stratégie de production clarifiée (§21), Déclaration d'intention (§23) |

---

## Table des matières

1. [Vision globale](#1-vision-globale)
2. [Concept & pitch](#2-concept--pitch)
3. [Univers & narration](#3-univers--narration)
4. [Personnages](#4-personnages)
5. [Gameplay — les familles de puzzles](#5-gameplay--les-familles-de-puzzles)
6. [Boucle de jeu](#6-boucle-de-jeu)
7. [Progression & structure du monde](#7-progression--structure-du-monde)
8. [Courbe de difficulté & apprentissage sans texte](#8-courbe-de-difficulté--apprentissage-sans-texte)
9. [UX — Expérience utilisateur](#9-ux--expérience-utilisateur)
10. [UI — Interface](#10-ui--interface)
11. [Direction artistique](#11-direction-artistique)
12. [Direction sonore](#12-direction-sonore)
13. [Accessibilité](#13-accessibilité)
14. [Architecture technique](#14-architecture-technique)
15. [Performances](#15-performances)
16. [Monétisation](#16-monétisation)
17. [Vision long terme](#17-vision-long-terme)
18. [Difficultés potentielles & risques](#18-difficultés-potentielles--risques)
19. [Planning de développement](#19-planning-de-développement)
20. [Priorités de développement](#20-priorités-de-développement)
21. [Conseils de production](#21-conseils-de-production)
22. [Annexes](#22-annexes)
23. [Déclaration d'intention](#23-déclaration-dintention)

---

# 1. Vision globale

## 1.1 La phrase fondatrice

> **« Prépare le spectacle. Ouvre le rideau. Savoure les applaudissements. »**

Ninja Events est un jeu de puzzle zen où le joueur incarne un jeune ninja reconverti en régisseur technique. Chaque niveau est une mission de préparation d'un spectacle : installer, brancher, ranger, organiser. Quand tout est prêt, le rideau s'ouvre — et c'est la récompense.

## 1.2 Les cinq piliers du jeu

Chaque décision de conception doit être validée par ces cinq piliers. Si une idée contredit un pilier, elle est rejetée, même si elle est séduisante.

| # | Pilier | Ce que ça veut dire concrètement |
|---|--------|----------------------------------|
| 1 | **Calme** | Aucun chronomètre par défaut, aucune pression, aucun échec punitif. On peut poser le téléphone au milieu d'un niveau. |
| 2 | **Intelligence** | Le plaisir vient de la réflexion, jamais du réflexe. Chaque puzzle a une logique élégante qui procure un « aha ! ». |
| 3 | **Chaleur** | L'univers est bienveillant. Les personnages sourient, l'échec n'existe pas — seulement des essais. |
| 4 | **Récompense théâtrale** | La fin de chaque niveau est une petite cérémonie : rideau, lumières, applaudissements. C'est LA signature du jeu. |
| 5 | **Honnêteté** | Pas de pay-to-win, pas de publicité forcée, pas de mécanique d'addiction (pas de vies limitées, pas d'énergie, pas de FOMO). |

## 1.3 Le joueur cible

**Profil principal :** adultes 25–55 ans, joueurs occasionnels, qui jouent :
- dans les transports (une main, sessions de 3–5 minutes) ;
- le soir au lit (mode sombre indispensable) ;
- pour décompresser (pas pour se stresser).

**Références de goût :** joueurs qui ont aimé *Monument Valley*, *Mini Metro*, *Unpacking*, *A Little to the Left*, *Two Dots*, les jeux Nintendo « feel-good ».

**Profil secondaire :** les gens du spectacle vivant (techniciens, roadies, régisseurs, intermittents) qui reconnaîtront leur métier avec tendresse. C'est une niche fidèle et très active sur les réseaux — un vecteur de bouche-à-oreille naturel.

## 1.4 Promesse d'expérience

En une session de 5 minutes, le joueur doit vivre ce cycle émotionnel :

```
Curiosité  →  Réflexion  →  Petit blocage  →  Déclic ("aha !")  →  Rideau  →  Fierté
```

Si un niveau ne produit pas ce cycle, il est retravaillé ou supprimé.

## 1.5 Ce que Ninja Events N'EST PAS

- ❌ Un jeu de gestion en temps réel (pas de stress type *Overcooked*).
- ❌ Un jeu de réflexes ou d'adresse.
- ❌ Un free-to-play agressif avec monnaies, coffres et minuteurs.
- ❌ Un jeu violent, même de façon cartoon.
- ❌ Un jeu bavard : le texte est réduit au strict minimum.

## 1.6 Règle de conception fondamentale

> **« Aucune mécanique ne doit exister uniquement pour augmenter la difficulté.
> Chaque mécanique doit raconter quelque chose du métier du spectacle. »**

Cette règle est le filtre de validation de toute nouvelle idée de gameplay. Une contrainte de puzzle n'est acceptée que si un vrai technicien pourrait la reconnaître en souriant. Trois illustrations :

| Mécanique | Ce qu'elle raconte du métier |
|---|---|
| **Praticables** (§5.4) | L'ordre de montage compte : dans la vraie vie, un monteur qui pose ses plateformes sans penser à son chemin de sortie se retrouve littéralement coincé au milieu de la scène. La contrainte « ne pas s'enfermer » n'est pas un piège de game designer — c'est une leçon de plateau. |
| **Câbles** (§5.2) | La longueur limitée existe parce qu'un touret de câble a une longueur réelle ; les passe-câbles jaune/noir existent parce qu'on ne laisse jamais un câble nu traverser un passage public. Chaque règle du puzzle est une règle de sécurité ou de bon sens du métier. |
| **Loges d'artistes** (§5.7) | Les contraintes de placement (« la danseuse près du miroir, le batteur loin de la chorale ») ne sont pas des logigrammes abstraits : c'est la diplomatie quotidienne d'un régisseur, qui compose avec les besoins — et les petites manies — de vrais êtres humains. |

Corollaire pratique : si une idée de modificateur est amusante mais ne correspond à rien du métier, elle est soit rethématisée jusqu'à devenir crédible, soit abandonnée.

## 1.7 Positionnement dans l'univers Ninja

Ninja Events n'arrive pas seul : il s'inscrit dans une famille de projets qui partagent le même personnage-monde et la même philosophie de douceur.

| Projet | Domaine | Rôle dans l'univers |
|---|---|---|
| **Papa Ninja** | Remise en forme | Le ninja au service du corps |
| **Morning Ninja** | Bien-être | Le ninja au service des matins sereins |
| **Ninja Stones** | Puzzle (taquin) | **Premier jeu publié** — la porte d'entrée ludique |
| **Ninja Events** | Puzzle (spectacle) | **Le projet premium et long terme** — le vaisseau amiral |

**Ninja Stones est le laboratoire de Ninja Events.** Tout ce qui est éprouvé sur Ninja Stones est directement réutilisable ici :

- le **moteur de scène** (Scene Engine, ratio 9:16, positionnement en pourcentages) ;
- le système de **sauvegardes** (localStorage, versionnage, robustesse) ;
- la grammaire d'**animations** (ambiantes CSS, transitions séquencées fade-out → fade-in) ;
- les principes d'**interface** (une main, boutons larges, quasi zéro texte) ;
- la chaîne **audio** (chargement, volumes, contraintes iOS) ;
- toute la **publication PWA** (manifeste, service worker, hors ligne, installation).

Autrement dit : chaque bug résolu sur Ninja Stones est un bug que Ninja Events ne rencontrera jamais.

---

# 2. Concept & pitch

## 2.1 Pitch court (elevator pitch)

> Un jeune ninja devient régisseur technique. Son maître lui confie des spectacles à préparer : théâtres, festivals, concerts. Chaque préparation est un puzzle zen. Quand tout est en place, le rideau s'ouvre et le public applaudit. **Ninja Events : le jeu où l'on prépare la magie.**

## 2.2 Pitch long

Dans un Japon imaginaire et chaleureux, les ninjas ne se battent plus depuis longtemps. Leur art de la précision, du silence et du geste parfait s'est reconverti dans... le spectacle vivant. Le clan Kage-Kōji (« l'ombre en coulisses ») est devenu la plus prestigieuse équipe de régie technique du pays.

Le joueur incarne **Yuki**, jeune recrue du clan. Sous l'œil bienveillant du **Maître Genba** (un vieux ninja-régisseur qui a « fait toutes les tournées »), Yuki apprend le métier mission après mission : pousser des flight cases dans des couloirs étroits, accrocher les projecteurs dans le bon ordre, démêler des kilomètres de câbles, orchestrer le ballet des camions de tournée.

Chaque mission réussie se conclut par le moment magique que tous les techniciens du monde connaissent : la salle s'éteint, le rideau s'ouvre, la lumière jaillit, et le public applaudit un spectacle dont il ne saura jamais qu'un ninja l'a rendu possible.

## 2.3 Pourquoi ce concept fonctionne

1. **Un thème universel et inédit.** Personne n'a fait de jeu de puzzle sur les coulisses du spectacle. Le thème est chaleureux, visuel, sonore, et immédiatement compréhensible.
2. **Le thème génère naturellement des mécaniques.** Flight cases = sokoban. Câbles = puzzles de connexion. Projecteurs = logique de placement. Camions = ordonnancement. Le métier de régisseur EST un générateur de puzzles.
3. **La récompense est intégrée à la fiction.** Le rideau qui s'ouvre n'est pas un écran de score artificiel : c'est la conclusion logique et émotionnelle de chaque mission.
4. **Extension infinie.** Théâtre, cirque, opéra, festival, tournée, plateau TV, feu d'artifice... l'univers du spectacle offre des années de contenu.

## 2.4 Références et positionnement

| Jeu | Ce qu'on lui emprunte | Ce qu'on fait différemment |
|-----|----------------------|---------------------------|
| *Monument Valley* | L'élégance visuelle, les niveaux-tableaux | Nos puzzles sont plus « logiques » et moins contemplatifs |
| *Unpacking* | La satisfaction du rangement, la narration sans texte | Nous avons une vraie logique de puzzle avec solutions |
| *Mini Metro* | Le minimalisme lisible, la montée en complexité | Pas de temps réel, pas de stress |
| *A Little to the Left* | Le plaisir tactile du geste juste | Un univers narratif plus riche |
| *Sokoban* (classique) | La mécanique de poussée de caisses | Habillage thématique + variantes modernes |
| Jeux Nintendo (*Captain Toad*, *Pikmin*) | La chaleur, la lisibilité, la bienveillance | Format mobile portrait, une main |

---

# 3. Univers & narration

## 3.1 Le monde

Le jeu se déroule dans **Hanabi-chō** (« la ville des fleurs de feu »), un pays imaginaire mêlant Japon traditionnel et culture du spectacle vivant :

- des **lanternes en papier** côtoient des **projecteurs LED** ;
- des **torii** servent de portiques de scène ;
- les **kuroko** (assistants en noir du théâtre kabuki, historiquement réels !) sont l'ancêtre officiel du clan ninja-régisseur ;
- les camions de tournée sont décorés comme des **chars de matsuri** (festivals japonais).

Ce mélange n'est pas un gadget : historiquement, les kuroko du kabuki étaient déjà des « ninjas de scène », vêtus de noir pour être invisibles du public. Le jeu s'appuie sur cette vérité culturelle charmante.

## 3.2 Le ton

- **Chaleureux** : tout le monde est gentil. Les « antagonistes » sont des situations (un couloir trop étroit, une pluie surprise, un artiste capricieux mais adorable), jamais des méchants.
- **Humour discret** : références tendres au monde du spectacle. Le gaffeur (scotch de techos) est un objet sacré. Le café de la régie est légendaire. Le catering est un lieu de pèlerinage.
- **Poétique** : les noms de niveaux, comme dans Ninja Stones, sont soignés (« La première lanterne », « Le silence avant les trois coups », « Cent chaises pour un violon »).

## 3.3 Structure narrative

La narration est **environnementale et minimale** : pas de dialogues longs, pas de cinématiques bavardes.

- **Entre les chapitres** : une image fixe illustrée + une phrase du Maître Genba (1 ligne maximum, poétique ou drôle).
- **Pendant les niveaux** : zéro texte narratif.
- **Après le rideau** : parfois, une micro-vignette (2–3 secondes) montre le spectacle qu'on a rendu possible — un chanteur, une danseuse, un magicien. C'est la « photo souvenir » de la mission.

**Exemple d'arc narratif du chapitre 1 :**
> Le Maître Genba confie à Yuki la petite salle municipale de Hanabi-chō. Mission après mission, la salle décrépite reprend vie. Au dernier niveau du chapitre, la salle affiche complet pour la première fois depuis vingt ans. Genba, ému, dit simplement : *« Le public ne te verra jamais. C'est ta plus belle réussite. »*

## 3.4 Vocabulaire de l'univers (glossaire interne)

| Terme du jeu | Signification |
|---|---|
| **Le Clan Kage-Kōji** | La compagnie de régie ninja |
| **Une Mission** | Un niveau |
| **Le Rideau** | L'écran de victoire |
| **Le Carnet de Régie** | Le menu de sélection des niveaux (un carnet à spirale annoté) |
| **Le Dojo** | L'écran d'accueil / hub du joueur |
| **Les Trois Coups** | Le son de lancement d'un niveau (tradition théâtrale française des 3 coups de brigadier) |
| **La Feuille de Route** | La carte de progression (roadmap des tournées) |

---

# 4. Personnages

## 4.1 Yuki — le joueur

- Jeune ninja androgyne (le joueur peut choisir son apparence — voir Costumes, §17).
- Silencieux·se comme tout bon kuroko : Yuki ne parle jamais. Il/elle s'exprime par gestes, mimiques et petits sauts de joie.
- Tenue de base : le noir classique du kuroko, avec un bandeau coloré personnalisable.
- **Rôle en jeu :** Yuki est visible dans certains puzzles (il pousse les flight cases, grimpe aux ponts lumière) et sert de curseur incarné dans d'autres.

## 4.2 Maître Genba

- Vieux ninja-régisseur à la retraite active. Barbe blanche, bandana délavé, gaffeur à la ceinture comme un sabre.
- Son nom vient de « genba » (現場) : « le terrain », le lieu où les choses se passent réellement — mot très utilisé dans les métiers techniques japonais.
- **Rôle :** mentor, voix des intertitres, distributeur de missions. Une réplique par chapitre, jamais plus.
- **Humour :** il compare tout à ses anciennes tournées. *« En 1978, on a monté un opéra dans un typhon. Alors ta petite pluie... »*

## 4.3 Personnages secondaires (galerie récurrente)

| Personnage | Description | Fonction ludique |
|---|---|---|
| **Tanuki-san** | Un tanuki chauffeur de camion, toujours en avance ou en retard, jamais à l'heure | Niveaux de logistique camions |
| **Mme Suzume** | Directrice de la salle municipale, minuscule et énergique | Donne le thème des chapitres « théâtre » |
| **Les Frères Ampli** | Deux frères jumeaux sonorisateurs qui se disputent le placement des enceintes | Niveaux audio |
| **Hikari** | Éclairagiste rêveuse qui parle aux projecteurs | Niveaux lumière |
| **Le Chat de la Régie** | Un chat qui dort TOUJOURS à l'endroit exact où l'on doit poser quelque chose | Obstacle mobile adorable, gag récurrent |

Le Chat de la Régie est pressenti pour devenir la mascotte secondaire du jeu (potentiel merchandising / stickers).

## 4.4 Le public

Le public n'est jamais un personnage individuel : c'est une **entité chaleureuse** — silhouettes douces, lueurs de visages, applaudissements. Il représente la récompense abstraite : la gratitude invisible du métier.

---

# 5. Gameplay — les familles de puzzles

## 5.0 Philosophie générale

Chaque famille de puzzle repose sur **une règle simple + des variations profondes**. Une famille doit pouvoir vivre seule sur 40 à 80 niveaux sans s'épuiser, grâce à des « modificateurs » introduits progressivement.

**Règles communes à toutes les familles :**

- Contrôle à **un doigt** : tap, glisser, ou tap-tap. Jamais de multi-touch obligatoire.
- **Annulation illimitée** (bouton « pas en arrière ») et **redémarrage instantané** du niveau.
- **Aucun chronomètre** par défaut. Un compteur de coups existe mais reste discret (voir §5.9, les Éventails).
- Toute action est **réversible ou recommençable** : l'échec définitif n'existe pas.
- Chaque niveau tient sur **un seul écran portrait** (pas de scrolling pendant la résolution, sauf familles qui l'exigent explicitement).

## 5.1 Famille A — Les Flight Cases (« Le Ballet des Caisses »)

**La mécanique cœur du jeu. C'est par elle que commence le développement.**

### Règle de base
Un sokoban revisité : Yuki pousse des flight cases sur une grille pour les amener sur leurs emplacements marqués au gaffeur (des rectangles de scotch au sol — détail authentique du métier).

### Ce qui la différencie d'un sokoban classique
- Les flight cases ont des **tailles différentes** : 1×1, 1×2, 2×2 (comme de vraies caisses de matériel).
- Les caisses **roulent** : une fois poussées, certaines glissent jusqu'à l'obstacle suivant (variante « roulettes libres »), d'autres avancent d'une case (variante « roulettes freinées »). La couleur des roulettes l'indique visuellement.
- Des caisses **s'empilent** (mécanique avancée) : une petite caisse peut monter sur une grande via une rampe.

### Modificateurs progressifs (introduits sur ~60 niveaux)
1. Murs et piliers de salle (niveaux 1–10)
2. Caisses 1×2 qui pivotent en poussant sur un coin (11–20)
3. Roulettes libres — la caisse glisse jusqu'au mur (21–30)
4. Monte-charge : plateforme 2×2 qui transporte les caisses entre deux zones (31–40)
5. Le Chat de la Régie dort sur une case : il faut d'abord pousser une caisse à côté de lui pour qu'il aille dormir dessus (41–50)
6. Sol fragile de vieille scène : certaines cases ne supportent qu'un passage (51–60)

### Sensations recherchées
Le « clonk » satisfaisant de la caisse qui arrive sur sa marque. Le gaffeur qui « s'illumine » doucement quand la caisse est bien placée.

## 5.2 Famille B — Les Câbles (« Le Grand Démêlage »)

### Règle de base
Relier des prises de départ (régie) à des prises d'arrivée (instruments, projecteurs, enceintes) en traçant des câbles au doigt sur une grille. **Les câbles ne peuvent pas se croiser.**

C'est une variante du puzzle de flux (« Flow »-like), mais enrichie par le thème :

### Modificateurs progressifs
1. Câbles de couleurs différentes (audio = bleu, lumière = jaune, vidéo = violet) — chaque couleur va à sa prise (1–15)
2. **Longueur limitée** : chaque câble a un nombre de cases maximum (un touret de câble affiche la longueur restante) (16–25)
3. **Passages de câbles** : des ponts (passe-câbles jaune/noir, authentiques) permettent UN croisement à cet endroit précis (26–35)
4. **Multiprises** : un câble peut se diviser en Y, mais chaque branche compte dans la longueur (36–45)
5. **Zones interdites** : plans d'eau (danger électrique !), passage public — le câble doit les contourner (46–55)
6. **Ordre de branchement** : certaines prises doivent être branchées avant d'autres (le son avant la lumière), matérialisé par des numéros (56–65)

### Sensations recherchées
Le tracé fluide sous le doigt, le « clic » de la prise qui se branche, la petite LED qui s'allume sur l'appareil connecté.

## 5.3 Famille C — Les Projecteurs (« Peindre avec la lumière »)

### Règle de base
Placer et orienter des projecteurs sur des ponts lumière pour **éclairer exactement les zones demandées de la scène** — ni plus, ni moins. Chaque projecteur émet un cône de lumière ; le puzzle consiste à couvrir toutes les zones cibles sans éclairer les zones interdites (le public, les coulisses).

### Modificateurs progressifs
1. Projecteurs à cône fixe, on choisit seulement leur position (1–12)
2. Rotation des projecteurs par pas de 45° (13–22)
3. **Gélatines de couleur** : les zones demandent des couleurs, on glisse des filtres sur les projecteurs. Superposer deux couleurs les mélange (rouge + bleu = magenta) — introduction douce à la synthèse additive, dimension éducative discrète (23–35)
4. **Obstacles portés** : décors qui projettent des ombres — utiliser l'ombre comme un outil (36–45)
5. **Miroirs et surfaces réfléchissantes** (le côté « ninja » : la lumière ricoche) (46–55)
6. **Intensités** : zones à éclairer fort ou doux, projecteurs avec gradateur à 2 niveaux (56–65)

### Sensations recherchées
Le « thunk » du projecteur qui s'accroche, le fondu doux de la lumière qui s'allume, la scène qui devient belle sous nos yeux.

## 5.4 Famille D — Le Montage de Scène (« Tetris de praticables »)

### Règle de base
Assembler le plancher de scène avec des **praticables** (plateformes modulaires réelles du métier : 1×2 m, 2×2 m...) de formes différentes (domino, carré, L, T) pour couvrir exactement la surface demandée, sans trou ni débord.

C'est un puzzle de pavage (type pentominos), avec des contraintes de métier :

### Modificateurs progressifs
1. Formes simples, surface rectangulaire (1–12)
2. Surfaces irrégulières (scène avec avancée, proscenium) (13–22)
3. **Trappes obligatoires** : certaines cases doivent rester ouvertes (entrée du magicien !) (23–32)
4. **Hauteurs** : praticables à 20 cm, 40 cm, 60 cm — construire des escaliers et des niveaux (vue isométrique douce) (33–45)
5. **Ordre de montage** : on ne peut pas poser un praticable si on se retrouve enfermé — il faut penser au chemin de sortie du monteur (46–58)
6. **Poids limité** : vieilles scènes fragiles, répartir les charges (59–70)

## 5.5 Famille E — Les Enceintes (« L'Accord Parfait »)

### Règle de base
Positionner des enceintes pour **couvrir toutes les zones du public** avec du son, sans zone morte ni zone de larsen (les enceintes ne doivent pas se faire face directement, et ne doivent pas pointer vers les micros).

Puzzle de couverture de zones, complémentaire de la famille Projecteurs mais avec des règles inversées (éviter les recouvrements dangereux).

### Modificateurs progressifs
1. Enceintes à cône large, zones simples (1–12)
2. Interdiction de pointer vers un micro (larsen — un petit « ouille » visuel le signale en préparation) (13–22)
3. **Retours de scène** : les artistes aussi doivent s'entendre — double objectif public/scène (23–32)
4. **Obstacles acoustiques** : piliers qui bloquent le son (33–42)
5. **Délais (subwoofers)** : version simplifiée et visuelle des lignes de retard — les grosses enceintes couvrent loin mais pas près (43–55)

## 5.6 Famille F — La Logistique (« Le Ballet des Camions »)

### Règle de base
Puzzle d'ordonnancement : faire entrer/sortir des camions de tournée d'une cour de déchargement étroite (type « Rush Hour » / embouteillage), et/ou décider de **l'ordre de déchargement** pour que le matériel arrive dans le bon ordre (on ne peut pas monter la lumière avant la scène !).

### Modificateurs progressifs
1. Embouteillage simple : libérer LE camion prioritaire (1–15)
2. Camions de longueurs différentes, remorques (16–25)
3. **Ordre de déchargement imposé** : scène → son → lumière → décor (26–38)
4. Tanuki-san est déjà garé n'importe comment au début du niveau (gag récurrent + difficulté) (39–48)
5. **Quai unique** : un seul quai de déchargement, planifier toute la séquence (49–60)

## 5.7 Famille G — Les Loges & le Catering (« Petits bonheurs d'artistes »)

### Règle de base
Puzzle de **placement sous contraintes** (type logigramme visuel) : installer les loges des artistes en respectant leurs petites demandes adorables, exprimées en icônes (jamais en texte).

**Exemples de contraintes (toujours en pictogrammes) :**
- La danseuse veut être à côté du miroir.
- Le batteur ne veut PAS être à côté de la chorale.
- Le magicien veut une loge avec deux portes (on ne sait pas pourquoi, on ne demande pas).
- Le Chat de la Régie doit avoir un coussin quelque part.

### Modificateurs progressifs
1. 3 artistes, 2 contraintes (1–10)
2. Contraintes croisées (A près de B, B loin de C) (11–22)
3. Ressources limitées (un seul miroir, deux prises) (23–34)
4. Loges sur deux étages, contrainte d'escalier (35–45)

Cette famille apporte l'humour et l'humanité : c'est la famille « douce » entre deux familles plus cérébrales.

## 5.8 Famille H — Les Chemins du Public (« Cent pas sereins »)

### Règle de base
Tracer les circulations du public avec des **barrières** : le flux (visualisé comme un ruisseau doux de petites silhouettes) doit aller de l'entrée aux zones (gradins, buvette, sanitaires) sans croisements dangereux et sans cul-de-sac.

Puzzle de canalisation de flux, version zen (le flux est continu et paisible, jamais paniqué).

### Modificateurs progressifs
1. Un flux, un objectif (1–12)
2. Deux flux qui ne doivent pas se croiser (entrée / sortie) (13–24)
3. Nombre de barrières limité (25–36)
4. **Accessibilité** : un chemin doit être sans marche pour les fauteuils (dimension inclusive assumée et valorisée) (37–48)
5. Flux « VIP backstage » invisible du public — le chemin ninja ! (49–60)

## 5.9 Le système des Éventails (score qualitatif optionnel)

À la fin de chaque mission, le joueur reçoit **1 à 3 éventails** (sensu) :

- 🪭 **1 éventail** : mission accomplie. C'est TOUJOURS suffisant pour progresser.
- 🪭🪭 **2 éventails** : solution efficace (nombre de coups sous un seuil généreux).
- 🪭🪭🪭 **3 éventails** : solution optimale ou quasi optimale.

**Règles de bienveillance :**
- Les seuils ne sont jamais affichés PENDANT le jeu (pas de pression).
- Aucun contenu essentiel n'est verrouillé derrière les 3 éventails : ils débloquent uniquement du cosmétique (costumes, couleurs).
- Le joueur perfectionniste a son terrain de jeu ; le joueur détendu ne voit même pas la différence.

## 5.10 Niveaux « Générale » (fin de chapitre)

Le dernier niveau de chaque chapitre est une **Générale** (répétition générale) : un niveau plus grand qui combine 2 familles de puzzles déjà maîtrisées (ex. placer les caisses PUIS brancher les câbles sur le même plateau). C'est le « boss » pacifique du jeu — plus long (8–10 min), plus mémorable, suivi d'un rideau spécial avec confettis.

---

# 6. Boucle de jeu

## 6.1 Boucle courte (une mission, 3–5 minutes)

```
1. Carnet de Régie : choisir la mission
        ↓
2. LES TROIS COUPS (toc, toc, toc — son signature)
        ↓
3. Découverte du plateau (2–3 s de survol animé doux)
        ↓
4. RÉSOLUTION (le cœur : 2–4 min de puzzle)
   • essais, annulations, déclic
        ↓
5. Dernière pièce posée → tout se verrouille avec un son doux
        ↓
6. LA SÉQUENCE RIDEAU (8–10 s, non-interactive, skippable dès la 2e fois) :
   • noir progressif de la salle
   • le rideau s'ouvre
   • la lumière jaillit sur le résultat DU JOUEUR
   • applaudissements + éventails gagnés
   • (parfois) vignette du spectacle
        ↓
7. Écran de fin sobre : [Mission suivante] [Carnet] [Rejouer]
```

**Point de design crucial :** en étape 6, la lumière se lève sur *la scène telle que le joueur l'a construite*. Le joueur applaudit littéralement son propre travail. C'est le cœur émotionnel du jeu.

## 6.2 Boucle moyenne (une session, 10–20 minutes)

2 à 4 missions → déblocage éventuel d'un cosmétique ou d'une vignette → petit moment au Dojo (regarder sa collection, changer de costume) → sortie propre du jeu (sauvegarde automatique à chaque action).

## 6.3 Boucle longue (un chapitre, 1–2 semaines de jeu occasionnel)

10 à 15 missions → la salle du chapitre se transforme visuellement (comme le jardin de Ninja Stones : la salle municipale se rénove, le festival se construit) → Générale → intertitre de Genba → nouveau lieu.

## 6.4 Boucle méta (des mois)

Collection de costumes, galerie des vignettes de spectacles (le « Grand Album »), défis quotidiens (§17), perfection des éventails.

---

# 7. Progression & structure du monde

## 7.1 Les cinq actes de la carrière

La carrière de Yuki suit la trajectoire d'un vrai technicien du spectacle : du local au géant.

| Acte | Lieu | Ambiance | Niveaux | Familles introduites | Familles approfondies |
|---|---|---|---|---|---|
| **I** | **La Salle Municipale** de Hanabi-chō | Petite salle poussiéreuse qui reprend vie, parquet qui grince, velours fatigué | 1–20 | A (Flight Cases), B (Câbles) | — |
| **II** | **Le Théâtre Suzume** | Théâtre à l'italienne chaleureux, dorures douces, kabuki | 21–45 | C (Projecteurs), D (Praticables) | A, B |
| **III** | **Le Festival des Lanternes** | Plein air, guirlandes, food-trucks, herbe et étoiles | 46–75 | E (Enceintes), H (Chemins du public) | A, B, C, D |
| **IV** | **La Grande Tournée** | Routes, quais de déchargement, villes qui défilent, camions-matsuri | 76–105 | F (Camions), G (Loges) | Toutes |
| **V** | **Le Concert Géant** du Mont Hanabi | Stade au pied d'un volcan endormi, feu d'artifice final | 106–140 | Générales combinées (2–3 familles par niveau) | Toutes |

Total du jeu « 1.0 » : **140 niveaux faits main**, soit environ 10–15 heures de jeu.

## 7.2 Rythme d'introduction des mécaniques

Règle d'or : **jamais deux nouveautés en même temps.**

- Une nouvelle famille est toujours introduite par **3 niveaux « découverte »** ultra simples (30 s – 1 min chacun) où elle est seule à l'écran.
- Une famille déjà connue ne reçoit un nouveau modificateur (§5) qu'après **au moins 4 niveaux** sans nouveauté.
- Chaque acte alterne les familles pour éviter la lassitude : jamais plus de 3 niveaux d'affilée de la même famille à partir de l'Acte II.

**Exemple de séquence (Acte II, niveaux 21–30) :**
```
21  C-découverte 1   (premier projecteur)
22  C-découverte 2   (deux projecteurs)
23  C-découverte 3   (couleurs)
24  A               (flight cases — connu, repos mental)
25  C               (projecteurs, 1er vrai défi)
26  B               (câbles — connu)
27  C               (projecteurs + obstacle)
28  A + rappel      (flight cases, modificateur pivot)
29  C               (projecteurs)
30  B               (câbles, longueur limitée — nouveau modificateur)
```

## 7.3 Déverrouillage des niveaux

- Les niveaux se débloquent **linéairement dans chaque lieu**, MAIS le joueur dispose toujours de **3 niveaux ouverts en avance** (« la fenêtre de liberté ») : s'il bloque sur le niveau 34, il peut jouer le 35 ou le 36 et revenir plus tard.
- Passer à l'acte suivant exige de terminer la Générale de l'acte en cours (avec 1 éventail suffit — jamais d'exigence de perfection).

## 7.4 La transformation des lieux

Comme le jardin de Ninja Stones, **chaque lieu se transforme visuellement au fil des missions** :

- **Salle Municipale** : poussière → grand ménage → velours neuf → enseigne rallumée → salle comble.
- **Festival** : champ vide → premières tentes → guirlandes → grande scène → nuit d'ouverture.

La transformation est visible sur le Carnet de Régie (fond d'écran du chapitre) et récompense la progression sans un mot de texte. Prévoir **4 à 5 états visuels par lieu**.

## 7.5 Carte de progression (« La Feuille de Route »)

Écran vertical scrollable : un chemin sinueux de gaffeur (le scotch !) relie les cinq lieux, dessinés comme des vignettes illustrées. Les lieux verrouillés sont dans la pénombre (rideau baissé). Simple, lisible, poétique.

---

# 8. Courbe de difficulté & apprentissage sans texte

## 8.1 Principe : « montrer, jamais expliquer »

Zéro tutoriel texte. L'apprentissage repose sur quatre outils :

1. **Le niveau-leçon** : le premier niveau d'une mécanique est SI simple qu'il n'a qu'une seule action possible. Le joueur ne peut pas se tromper, il découvre la règle en agissant.
2. **La démonstration passive** : au chargement d'un niveau-leçon, une main fantôme (ou Yuki lui-même) esquisse le geste pendant 1,5 s. Skippable par n'importe quel toucher.
3. **Le langage visuel constant** : une même règle a toujours la même apparence (le gaffeur = destination, le jaune/noir = passage autorisé, le rouge doux = interdit). Ce langage est un contrat avec le joueur, il ne change JAMAIS.
4. **Le feedback anticipé** : pendant la manipulation, le jeu montre en temps réel si le geste est valide (surbrillance douce) ou invalide (léger tremblement + son mat, jamais agressif).

## 8.2 Forme de la courbe

La difficulté suit des « vagues » plutôt qu'une pente continue :

```
difficulté
   ▲
   │        ╱╲        ╱╲          ╱╲
   │   ╱╲  ╱  ╲   ╱╲ ╱  ╲    ╱╲  ╱  ╲
   │  ╱  ╲╱    ╲ ╱  ╲╱    ╲  ╱  ╲╱    ╲
   │ ╱          ╲╱          ╲╱
   └──────────────────────────────────▶ niveaux
     leçon  défi  repos leçon  défi  Générale
```

- Après chaque pic (défi), un niveau « respiration » plus facile.
- La Générale de fin d'acte est le sommet local, suivi des niveaux-leçons du nouvel acte (vallée).
- **Erreur à éviter absolument** (bug vécu sur Ninja Stones) : un plateau de difficulté causé par une formule. Ici, **chaque niveau est conçu à la main** avec une difficulté cible explicite notée dans ses métadonnées (voir §14.5).

## 8.3 Paramètres de difficulté par famille

| Famille | Leviers de difficulté (du plus doux au plus fort) |
|---|---|
| A — Flight Cases | taille de grille → nombre de caisses → tailles mixtes → roulettes libres → ordre implicite des poussées |
| B — Câbles | nombre de paires → densité de la grille → longueurs limitées → ponts → ordre de branchement |
| C — Projecteurs | nombre de zones → angles → couleurs à mélanger → obstacles → gélatines |
| D — Praticables | surface → formes disponibles → trappes → hauteurs → ordre de montage |
| E — Enceintes | zones → interdits larsen → double objectif → obstacles → subwoofers |
| F — Camions | densité du parking → longueurs → ordre de déchargement → quai unique |
| G — Loges | nombre d'artistes → contraintes croisées → ressources rares → étages |
| H — Chemins | un flux → flux croisés → barrières limitées → accessibilité → chemin ninja |

## 8.4 Anti-frustration : le Coup de Main de Genba

Si le joueur reste bloqué (détection douce : beaucoup d'annulations OU 5+ minutes sans progrès), une petite lanterne s'allume discrètement dans un coin. En la touchant :

- **1er toucher** : Genba surligne UN élément pertinent (« regarde par ici »).
- **2e toucher** : il montre le premier coup de la solution.
- **Jamais** de solution complète automatique : le déclic doit rester au joueur.

Le Coup de Main est **gratuit, illimité et sans pénalité** (il retire au plus le 3e éventail, jamais la victoire). Aucune publicité à regarder, jamais.

## 8.5 Méthode de calibrage (playtest)

- Chaque niveau reçoit une **difficulté cible de 1 à 5** dans ses métadonnées.
- Test de validation : Seb (concepteur) doit résoudre le niveau ; puis 2–3 testeurs externes naïfs. Si un testeur naïf abandonne un niveau censé être de difficulté ≤ 3, le niveau est retravaillé.
- Mesures automatiques enregistrées localement (temps, coups, annulations, usage du Coup de Main) et consultables via un écran de debug (héritage du `scene-debug.js` de Ninja Stones).

---

# 9. UX — Expérience utilisateur

## 9.1 Le pouce est roi

Le jeu se joue **à une main, au pouce**, téléphone en portrait :

```
┌─────────────────┐
│   ZONE INFO     │  ← haut : titre, éventails, décor (jamais d'action requise)
│   (lecture)     │
├─────────────────┤
│                 │
│   ZONE PUZZLE   │  ← centre : le plateau (interactions par glisser/tap)
│   (interaction) │
│                 │
├─────────────────┤
│  ZONE BOUTONS   │  ← bas : annuler, recommencer, pause (zone du pouce)
└─────────────────┘
```

- Tous les boutons d'action sont dans le **tiers inférieur** de l'écran.
- Taille minimale des cibles tactiles : **48×48 px CSS** (recommandation d'accessibilité), boutons principaux à 64 px.
- Aucune interaction ne demande deux doigts, un appui long ou un geste précis en haut de l'écran.

## 9.2 Interruptibilité totale

Un jeu mobile se joue entre deux stations de métro. Donc :

- **Sauvegarde continue** : chaque coup est enregistré immédiatement (localStorage). Fermer l'app, recevoir un appel, verrouiller l'écran → au retour, le plateau est exactement dans le même état.
- Pas d'écran de pause bloquant : quitter = pause.
- Reprise en 2 touchers maximum depuis l'icône de l'écran d'accueil : splash (1 s) → « Reprendre la mission » en gros bouton.

## 9.3 Le texte, denrée rare

Inventaire complet du texte visible en jeu :

| Où | Texte | Exemple |
|---|---|---|
| Titre de mission | 2–5 mots poétiques | « La première lanterne » |
| Phrase de Genba | 1 ligne, fins de chapitre uniquement | « Le silence aussi s'installe. » |
| Boutons | 1 mot ou icône seule | « Continuer », ↩, ⟳ |
| Réglages | libellés courts + icônes | « Musique », « Vibrations » |

Tout le reste passe par l'icône, la couleur, l'animation. Bénéfice bonus : la **localisation** du jeu entier représente ~200 chaînes courtes (traduction quasi gratuite vers l'anglais, le japonais...).

## 9.4 Feedback : la règle des 100 ms

Toute action du joueur reçoit une réponse sensorielle en moins de 100 ms : visuelle (l'objet suit le doigt), sonore (roulement, clic), haptique (micro-vibration optionnelle). C'est la matière première de la sensation « premium ».

## 9.5 Respect du joueur (checklist UX)

- ✅ Peut jouer 100 % hors ligne.
- ✅ Peut couper musique et sons séparément.
- ✅ N'est jamais interrompu par une popup.
- ✅ Ne reçoit aucune notification par défaut.
- ✅ Peut recommencer un niveau sans aucune friction (1 toucher + confirmation légère).
- ✅ Ne voit jamais de compte à rebours.
- ✅ N'a jamais besoin de créer un compte.

---

# 10. UI — Interface

## 10.1 Inventaire des écrans (v1.0)

| Écran | Contenu | Priorité |
|---|---|---|
| **Splash / Titre** | Logo, rideau fermé, « toucher pour entrer » | MVP |
| **Le Dojo** (accueil) | Yuki + costume actuel, boutons : Jouer, Album, Réglages | MVP |
| **La Feuille de Route** | Carte verticale des 5 lieux | MVP |
| **Le Carnet de Régie** | Liste des missions du lieu, éventails gagnés | MVP |
| **Mission (jeu)** | Plateau + HUD minimal | MVP |
| **Le Rideau** (victoire) | Séquence rideau + éventails + phrase éventuelle | MVP |
| **Réglages** | Sons, musique, vibrations, daltonisme, mode sombre, langue | MVP |
| **Le Grand Album** | Vignettes de spectacles, costumes, succès | v1.1 |
| **Défis du jour** | Voir §17 | v1.2 |

## 10.2 HUD en mission (minimalisme strict)

En jeu, seuls 4 éléments sont visibles hors du plateau :

1. Titre de la mission (haut, discret, disparaît après 3 s).
2. Bouton **↩ Annuler** (bas gauche, toujours accessible, appui répété = remonte l'historique).
3. Bouton **⟳ Recommencer** (bas droite, avec confirmation en un glissé pour éviter les erreurs).
4. **☰ Pause/menu** (coin bas centre) : reprendre, réglages, quitter la mission.

Le compteur de coups et la lanterne du Coup de Main n'apparaissent que contextuellement. Aucune barre, aucun score visible pendant la réflexion.

## 10.3 Langage visuel des composants

- **Boutons** : galets arrondis (rayon généreux), ombre douce, enfoncement de 2 px au toucher + son.
- **Panneaux** : papier washi légèrement texturé, coins arrondis.
- **Icônes** : trait épais 2,5 px, coins ronds, remplissage plat — style « signalétique de festival ».
- **Typographie** : une seule famille, ronde et humaniste (ex. *Nunito*, *Quicksand* ou équivalente libre), 2 graisses (Regular, Bold). Taille minimale : 16 px.
- **États verrouillés** : jamais de cadenas gris anxiogène — un rideau baissé ou une lanterne éteinte.

## 10.4 Le composant signature : le Rideau

Le rideau rouge est LE composant d'interface du jeu : il sert de transition entre TOUS les écrans (il se ferme, l'écran change, il s'ouvre). Il est notre « fade-out/fade-in » thématique — la continuité du principe de transitions séquencées validé sur Ninja Stones, en version spectacle.

---

# 11. Direction artistique

## 11.1 Intention

**« Un festival japonais dessiné par un studio Nintendo. »** Flat design haut de gamme : formes simples, couleurs franches mais chaudes, lumière omniprésente, zéro réalisme, zéro texture photographique (leçon de Ninja Stones : les photos posent des problèmes de cadrage et de poids — ici, 100 % vectoriel/dessiné).

## 11.2 Palette

**Palette cœur (chaleur backstage) :**

| Rôle | Couleur | Hex indicatif |
|---|---|---|
| Fond coulisses | Bleu nuit chaud | `#2B3A55` |
| Bois de scène | Miel | `#D9A05B` |
| Rideau / accents | Rouge lanterne | `#C94F4F` |
| Lumière | Or doux | `#F5C86E` |
| Gaffeur / signalétique | Jaune vif | `#F2D437` |
| Végétal / validation | Vert matcha | `#7FA65A` |
| Yuki / kuroko | Encre | `#22252B` |
| Papier / UI | Washi crème | `#F7F1E3` |

**Règle des ambiances** : chaque acte a sa dominante (Salle = bois et poussière dorée ; Théâtre = rouge et or ; Festival = nuit bleue et lanternes ; Tournée = gris routes + néons chauds ; Concert géant = violet nuit + explosion de couleurs au final).

## 11.3 Formes et style

- Tout est **rond** : coins arrondis, personnages « boules de riz », même les flight cases ont des angles adoucis.
- **Perspective** : vue de dessus légèrement inclinée (fausse isométrie douce, ~15°) pour les plateaux ; vue de face pour les scènes du Rideau.
- **Ombres** : une seule ombre portée douce par objet, toujours dans la même direction. Pas de dégradés complexes.
- **Contours** : pas de contour noir systématique ; la séparation se fait par contraste de valeurs (plus doux, plus « premium »).

## 11.4 Animation

Douceur systématique, courbes d'accélération naturelles (`ease-out` dominant), durées 150–400 ms.

**Animations ambiantes** (héritage direct des 5 animations CSS de Ninja Stones) : lanternes qui oscillent, poussière dorée dans un rai de lumière, guirlandes qui clignotent lentement, rideau qui respire, le Chat de la Régie dont la queue bat doucement. Deux à quatre animations ambiantes par écran, jamais plus (sobriété + batterie).

**Animations de gameplay** : anticipation légère (l'objet se soulève de 2 px quand on le saisit), suivi du doigt sans latence, arrivée avec un mini-rebond (squash & stretch discret à 5 %).

## 11.5 La séquence Rideau (spécification du moment signature)

Storyboard, durée totale 8–10 s :

1. (0,0 s) Dernière pièce posée → tous les éléments du plateau pulsent une fois en vert matcha, son de verrouillage.
2. (0,8 s) La lumière de travail s'éteint — noir quasi total 400 ms (le silence avant).
3. (1,2 s) **Toc. Toc. Toc.** Les trois coups.
4. (2,0 s) Le rideau s'ouvre en 1,5 s (tissu animé, physique simple).
5. (3,5 s) Les projecteurs s'allument un par un (0,3 s d'intervalle) sur le plateau construit par le joueur.
6. (5,0 s) Applaudissements + silhouettes du public en contre-jour + particules (pétales ou confettis selon le lieu).
7. (7,0 s) Les éventails apparaissent un à un ; Yuki salue discrètement côté cour.
8. (9,0 s) Panneau de fin.

Skippable d'un toucher dès la deuxième vision. Ce moment justifie à lui seul une part disproportionnée du budget de polish : c'est lui que les joueurs filmeront et partageront.

---

# 12. Direction sonore

## 12.1 Philosophie

Le son est la moitié de la sensation « zen premium ». Références : *Monument Valley*, *Mini Metro*, *Prune*. Règle : **on doit pouvoir jouer avec le son coupé sans rien perdre d'essentiel — mais avec le son, tout devient délicieux.**

## 12.2 Musique

- **Une pièce par acte** (5 pièces + thème du titre), boucles de 2–3 min, instrumentation acoustique douce : koto, shakuhachi, guitare feutrée, marimba, nappes discrètes.
- La musique est **mixée bas** (–12 dB sous les SFX) : c'est un fond, pas un premier plan.
- **Couche adaptative simple** : quand le joueur approche de la solution (80 %+ des objectifs remplis), une couche mélodique s'ajoute en fondu. Discret mais grisant.
- Pendant la séquence Rideau : la musique de fond laisse place au thème « spectacle » du lieu (8 s), puis retour.

## 12.3 Effets sonores (liste de production v1.0)

| Catégorie | Sons | Notes |
|---|---|---|
| Flight cases | roulement (3 variantes de durée), « clonk » d'arrivée, choc doux contre mur | Le roulement suit la durée du déplacement |
| Câbles | déroulé (frottement doux), « clic » de prise, LED qui s'allume (« tick » aigu) | |
| Projecteurs | « thunk » d'accroche, relais électrique, fondu lumineux (souffle) | |
| Praticables | pose de bois (« tok » grave), verrouillage de pied | |
| UI | tap (bulle), annuler (papier), page de carnet, rideau (tissu) | |
| Récompense | trois coups, applaudissements (3 intensités selon le lieu), éventail qui s'ouvre (« fwip ») | Applaudissements : foule petite → immense selon l'acte |
| Ambiances | backstage (murmures lointains, talkie discret), grillons (festival), pluie douce (certains niveaux) | Boucles légères, –18 dB |

Format : **.m4a/AAC** (léger, bien supporté), avec repli .ogg. Poids cible total audio v1.0 : **< 4 MB**.

## 12.4 Règles de mixage et options

- Trois curseurs indépendants : **Musique / Effets / Ambiances** (exigence d'accessibilité du brief).
- Jamais deux sons identiques simultanés (anti-cacophonie : léger décalage de pitch aléatoire ±3 %).
- Haptique (vibrations) : micro-impulsions sur pose d'objet et victoire, **désactivable**, et automatiquement désactivée si l'API n'est pas disponible (iOS Safari limite l'haptique web — voir §18).

---

# 13. Accessibilité

L'accessibilité n'est pas une option de dernière minute : elle est dans les fondations.

| Besoin | Réponse de design |
|---|---|
| **Daltonisme** | Redondance systématique couleur + forme : les câbles ont couleur ET pictogramme d'embout (rond/carré/triangle) ; les zones lumière ont couleur ET motif (points/rayures). Mode « palettes alternatives » (deutéranopie, protanopie, tritanopie) dans les réglages, appliqué via variables CSS. |
| **Basse vision** | Icônes larges, contraste AA minimum (4,5:1) sur tout texte, taille de texte respectant le zoom système, mode « gros éléments » (plateau agrandi avec scroll doux si nécessaire). |
| **Mode sombre** | Le jeu est naturellement sombre (coulisses !) ; le mode sombre s'applique surtout aux écrans de menus (papier washi → papier nuit). Suit `prefers-color-scheme` + réglage manuel. |
| **Sensibilité vestibulaire** | Réglage « réduire les animations » (suit aussi `prefers-reduced-motion`) : transitions en fondus simples, particules réduites. |
| **Audition** | Aucune information portée uniquement par le son. Sous-titrage inutile (pas de dialogues audio). |
| **Motricité** | Une main, un doigt, aucune contrainte de temps, cibles ≥ 48 px, tolérance de geste généreuse (un glissé approximatif est interprété avec bienveillance). |
| **Vibrations** | Désactivables (et jamais porteuses d'information exclusive). |
| **Cognitif** | Pas de texte nécessaire, Coup de Main gratuit, aucune punition, recommencement sans friction. |
| **Données** | Sauvegarde 100 % locale, aucun compte requis, jeu complet hors ligne. |

**Clin d'œil intégré au gameplay** : la famille H (Chemins du public) inclut des niveaux où l'objectif EST de créer un chemin accessible aux fauteuils roulants. L'accessibilité comme mécanique valorisée, pas comme case à cocher.

---

# 14. Architecture technique

## 14.1 Choix fondateurs

| Décision | Choix | Justification |
|---|---|---|
| Plateforme | **PWA** (HTML/CSS/JavaScript) | Un seul code pour iOS + Android, pas de stores obligatoires, mises à jour instantanées — modèle validé sur Ninja Stones |
| Framework | **Vanilla JavaScript** (aucun framework) | Zéro dépendance = zéro conflit, zéro build, fichiers lisibles, maintenance simple pour un binôme non-développeur + IA |
| Rendu | **HTML/CSS d'abord**, Canvas 2D uniquement si une famille l'exige (physique du rideau, particules) | Le CSS suffit pour des grilles et des animations douces ; il est plus simple à déboguer par captures d'écran |
| Build | **Aucun** (pas de bundler, pas de npm) | Les fichiers déposés sur GitHub sont les fichiers servis. Workflow 100 % compatible GitHub web UI |
| Hébergement | GitHub Pages (ou équivalent statique) | Gratuit, HTTPS natif (requis pour les PWA) |
| Sauvegarde | localStorage (v1.0), export/import manuel (v1.1) | Simple, hors ligne, éprouvé sur Ninja Stones |

## 14.2 Le Scene Engine 2.0

On reconduit le principe du RFC-001 de Ninja Stones, qui a fait ses preuves :

- Un conteneur `.game-scene` au **ratio fixe 9:16**, centré, letterboxé si l'écran est plus large/haut.
- Tous les éléments positionnés **en pourcentages** du conteneur → rendu identique sur tous les iPhone/Android.
- Nouveauté Ninja Events : une **couche grille** (`.puzzle-grid`) à l'intérieur de la scène, qui convertit des coordonnées logiques (colonne, ligne) en pourcentages. Les niveaux sont définis en cases, jamais en pixels.
- L'outil de debug (`scene-debug.js`, activable par `DEBUG_SCENE`) est repris et enrichi : affichage de la grille logique, des zones tactiles, des métriques de calibrage (§8.5).

## 14.3 Structure des dossiers

```
ninja-events/
├── index.html              ← point d'entrée unique
├── manifest.json           ← manifeste PWA (icônes, portrait, standalone)
├── sw.js                   ← service worker (hors ligne + versions)
├── css/
│   ├── base.css            ← variables (palette, tailles), reset, typo
│   ├── scene.css           ← Scene Engine (ratio 9:16, grille)
│   ├── ui.css              ← boutons, panneaux, HUD, menus
│   ├── themes.css          ← les 5 ambiances d'actes + mode sombre + daltonisme
│   └── animations.css      ← ambiantes + gameplay + séquence Rideau
├── js/
│   ├── main.js             ← démarrage, navigation entre écrans
│   ├── scene-engine.js     ← grille logique ↔ pourcentages
│   ├── scene-debug.js      ← outil de debug (hors production)
│   ├── save.js             ← lecture/écriture localStorage (⚠️ fichier critique)
│   ├── levels-index.js     ← catalogue des niveaux (métadonnées légères)
│   ├── levels/
│   │   ├── act1.js         ← définitions des niveaux de l'acte I
│   │   ├── act2.js         ← etc. (chargés à la demande)
│   ├── families/
│   │   ├── cases.js        ← moteur famille A (⚠️ critique une fois validé)
│   │   ├── cables.js       ← moteur famille B
│   │   ├── lights.js       ← famille C … (un fichier par famille)
│   ├── curtain.js          ← séquence Rideau + transitions
│   ├── audio.js            ← chargement/lecture sons, 3 volumes
│   └── progress.js         ← éventails, déblocages, transformation des lieux
├── assets/
│   ├── img/                ← SVG et PNG optimisés (sprites par acte)
│   ├── audio/              ← .m4a compressés
│   └── icons/              ← icônes PWA (192, 512, maskable)
└── docs/
    └── GDD-Ninja-Events.md ← ce document
```

Principes hérités du workflow Ninja Stones : **un fichier = une responsabilité**, fichiers gameplay critiques (`save.js`, moteurs de familles validés) **jamais modifiés sans justification explicite**, livraisons de **fichiers complets** uniquement.

## 14.4 Modules et responsabilités

```
main.js ──► navigation ──► curtain.js (transitions)
   │
   ├──► scene-engine.js ◄── families/*.js (les moteurs de puzzle)
   │
   ├──► levels-index.js ──► levels/actN.js (données)
   │
   ├──► save.js ◄──► progress.js (état du joueur)
   │
   └──► audio.js (appelé par tous, ne dépend de personne)
```

Règle d'architecture : **les données de niveaux ne contiennent jamais de code**, et les moteurs de familles ne connaissent pas la navigation. On peut ainsi ajouter 100 niveaux sans toucher un seul fichier critique.

## 14.5 Format d'un niveau (JSON dans les fichiers actN.js)

```javascript
{
  id: "A1-07",                       // acte 1, niveau 7
  family: "cases",                   // famille de puzzle
  name: { fr: "La première lanterne", en: "The First Lantern" },
  difficulty: 2,                     // cible 1–5 (calibrage §8.5)
  grid: { cols: 6, rows: 8 },
  pieces: [
    { type: "case-1x1", at: [2, 3] },
    { type: "case-1x2", at: [4, 1], rot: 0, wheels: "free" }
  ],
  targets: [ { for: "case-1x1", at: [2, 7] } ],
  walls: [ [0,4], [1,4] ],
  modifiers: ["cat"],                // le Chat de la Régie est là !
  par: { moves2fans: 14, moves3fans: 9 },  // seuils d'éventails
  reward: null                       // ou "costume:lantern-band"
}
```

Ce format déclaratif permet : validation automatique (un petit script vérifie que chaque niveau est solvable et cohérent), édition facile, et prépare directement l'éditeur de niveaux (§17).

## 14.6 Format de sauvegarde (localStorage)

```javascript
{
  version: 3,                        // migration automatique si le format évolue
  settings: { music: 0.8, sfx: 1, ambient: 0.6, haptics: true,
              colorblind: "none", darkMode: "auto", reducedMotion: false },
  progress: {
    "A1-07": { fans: 3, bestMoves: 9, completedAt: 1752230000 }
  },
  current: { levelId: "A1-08", state: { /* plateau en cours, historique */ } },
  unlocks: { costumes: ["default", "lantern-band"], activeCostume: "default" },
  stats: { totalLevels: 42, totalFans: 97, playSeconds: 15400 }
}
```

Règles : écriture après **chaque coup** (débounce 300 ms), champ `version` obligatoire avec migrations, **export/import** par copier-coller d'un code (v1.1) pour pallier le risque d'effacement du localStorage par iOS (voir §18).

## 14.7 PWA et hors ligne

- `manifest.json` : `display: standalone`, `orientation: portrait`, icônes maskable, écran de démarrage aux couleurs du rideau.
- **Service worker** : stratégie « cache d'abord » pour le cœur du jeu (HTML, CSS, JS, audio UI, assets de l'acte en cours), « réseau puis cache » pour les actes non encore visités (téléchargés en tâche de fond quand l'acte précédent est bien entamé).
- **Versionnage** : constante `CACHE_VERSION` incrémentée à chaque livraison ; l'ancienne version est purgée ; un discret « Nouvelle version installée 🏮 » s'affiche au démarrage suivant.
- Le jeu complet fonctionne en mode avion dès la première visite terminée.

---

# 15. Performances

## 15.1 Budgets (contraintes chiffrées)

| Ressource | Budget v1.0 | Rappel Ninja Stones |
|---|---|---|
| Poids total premier chargement | **< 2,5 MB** | (bundle images ramené de 1,47 MB à 436 KB : la discipline paie) |
| Poids par acte supplémentaire | < 1,5 MB | chargé en différé |
| Audio total | < 4 MB | .m4a compressé |
| Temps de démarrage (4G, téléphone moyen) | < 3 s | |
| Fluidité | 60 fps sur les animations, aucune saccade au glisser | |
| Mémoire | < 150 MB | pas de fuite entre niveaux |

## 15.2 Règles de fabrication des assets

- **SVG en priorité** pour les décors et l'UI (net à toutes les tailles, très léger, recolorable par CSS pour les modes daltonisme/sombre).
- PNG palette-indexés uniquement quand nécessaire (technique validée sur les personnages de Ninja Stones), sprites regroupés par acte.
- Pas de vidéo. La séquence Rideau est faite en CSS/JS temps réel (elle reste ainsi personnalisée avec le plateau du joueur).

## 15.3 Règles de code

- Animations : **uniquement** `transform` et `opacity` (jamais `top/left/width` animés) → GPU, 60 fps garanti.
- Un seul écouteur tactile global délégué (pas un par case).
- Aucun `setInterval` permanent : `requestAnimationFrame` pendant les gestes seulement ; le jeu au repos ne consomme quasi rien (batterie = confort de jeu au lit).
- Test de référence : iPhone SE / Android milieu de gamme à 5 ans d'âge. Si c'est fluide là, c'est fluide partout.

---

# 16. Monétisation

## 16.1 Modèle : « démo généreuse + Premium unique »

| Offre | Contenu | Prix indicatif |
|---|---|---|
| **Gratuit** | Actes I + II complets (45 niveaux, ~4 h de jeu), toutes les options d'accessibilité | 0 € |
| **Ninja Events Premium** | Actes III, IV, V (95 niveaux), tous les costumes de base, le Grand Album | **5,99 €** une seule fois |
| **Packs de saisons** (post-1.0) | 30–40 niveaux thématiques (Cirque, Opéra, Feu d'artifice…) | 2,99 € le pack |

## 16.2 Principes non négociables

- **Aucune publicité**, même optionnelle. (Une pub « récompensée » casserait le pilier Calme.)
- **Aucune monnaie virtuelle.** On paie en euros, une fois, comme au théâtre : on achète sa place.
- Le gratuit n'est pas bridé : pas de vies, pas d'attente, pas de bandeau « achetez ». Une seule invitation, élégante : à la fin de l'acte II, le rideau du Festival est entrouvert, Genba dit *« La suite de la tournée t'attend »*, avec le prix affiché clairement.
- Les 3 éventails, le Coup de Main, l'annulation : tout reste gratuit pour tous, toujours.

## 16.3 Réalité technique du paiement en PWA

Pas de store = pas d'achat intégré natif. Solutions par ordre de simplicité :

1. **v1.0 :** page de paiement web (Stripe Payment Links — aucun code serveur complexe) qui délivre un **code de déblocage** à saisir dans le jeu (le code signe le déblocage dans la sauvegarde locale).
2. **v2.x :** si le jeu trouve son public, un empaquetage vers les stores (via TWA Android / wrapper iOS) ouvrira l'achat intégré classique. Décision reportée : ne pas complexifier la v1.0.

---

# 17. Vision long terme

## 17.1 Trajectoire de contenu

| Jalon | Niveaux cumulés | Contenu |
|---|---|---|
| **v1.0** | **140** | Les 5 actes, 8 familles, faits main |
| **v1.x (année 1)** | **~300** | Packs de saisons (Cirque, Opéra, Plateau TV, Nouvel An), défis quotidiens, succès |
| **v2.0 (année 2)** | **500** | Éditeur de niveaux + niveaux de la communauté (modérés), 2 familles nouvelles |
| **Horizon** | **1000** | Le cap des 1000 est atteint par la communauté + génération assistée validée à la main — jamais par des niveaux procéduraux non testés |

## 17.2 L'éditeur de niveaux (« L'Atelier du Clan »)

- Le format JSON déclaratif (§14.5) EST déjà le format de l'éditeur : l'Atelier n'est qu'une interface tactile posée dessus.
- Le joueur compose une grille, place pièces et objectifs, **doit résoudre son propre niveau** pour pouvoir le partager (garantie de solvabilité).
- Partage v2.0 : par **code court** copier-coller (le niveau tient dans l'URL/un texte), sans serveur. Une galerie en ligne modérée viendra ensuite si la demande existe.

## 17.3 Défis quotidiens (« La Mission du Jour »)

- Un niveau par jour, identique pour tous (généré par graine datée à partir de gabarits validés à la main).
- Manquer un jour n'a **aucune conséquence** : pas de série à maintenir, pas de flamme qui s'éteint. Le calendrier du mois affiche des lanternes allumées, jamais de cases « ratées ».

## 17.4 Succès (« Les Éventails d'Or »)

Une trentaine de succès bienveillants et souvent drôles : *« Cent caisses au millimètre »*, *« Le Chat a dormi sur ta solution »*, *« Zéro annulation »*, *« Tu as regardé le Rideau 50 fois sans le passer »*. Aucun succès de grind absurde.

## 17.5 Classements

Uniquement sur les Missions du Jour, **opt-in**, anonymes par pseudo, et présentés avec douceur : on affiche « ta solution : 12 coups — la plus élégante du jour : 9 coups », jamais un rang numérique humiliant. (Nécessite un micro-service en ligne : repoussé en v1.2 minimum.)

## 17.6 Festivals saisonniers (« Les Quatre Saisons de Hanabi-chō »)

Quatre événements légers rythment l'année du jeu, comme les vraies saisons rythment le spectacle vivant :

| Saison | Événement | Ambiance | Contenu type |
|---|---|---|---|
| 🍁 Automne | **Festival d'Automne** | Feuilles d'érable, lumières ambrées, théâtre de plein air | 8–10 niveaux thématiques, décors momiji, costume « Yuki des érables », musique koto automnale |
| 🎄 Hiver | **Concert d'Hiver** | Neige douce, lanternes chaudes dans la nuit, chorale | Niveaux enneigés (le Chat dort près du radiateur), costume écharpe, boucle musicale cristalline |
| 🌸 Printemps | **Hanami** | Pétales de cerisier, scène au bord de l'étang | Niveaux sous les sakura, pluie de pétales dans la séquence Rideau, costume hanami |
| 🎆 Été | **Matsuri d'Été** | Feu d'artifice, yukata, stands de festival | Niveaux nocturnes, Rideau spécial hanabi (feu d'artifice final), costume yukata |

**Règles non négociables des saisons** (alignées sur les piliers §1.2) :

- **Aucune nouvelle mécanique obligatoire.** Les niveaux saisonniers utilisent les familles existantes, simplement rethématisées. Un joueur qui ignore l'événement ne rate aucun apprentissage.
- **Du décor, de la musique, des niveaux, des costumes — rien d'autre.** L'événement est un cadeau visuel et sonore, pas un système.
- **Zéro FOMO, zéro connexion quotidienne.** Pas de compte à rebours anxiogène, pas de récompense « à ne pas manquer » : les niveaux saisonniers **restent jouables toute l'année** dans le Grand Album une fois leur saison passée. La saison en cours les met simplement en avant, avec l'habillage assorti du Dojo.
- **Le retour du joueur est une invitation, jamais une obligation.** Aucune notification par défaut ; au plus, une lanterne de saison s'allume sur l'écran titre.

Coût de production maîtrisé : chaque saison réutilise les moteurs et gabarits existants — c'est essentiellement un travail de direction artistique et de level design, parfaitement adapté à des mises à jour trimestrielles légères.

---

# 18. Difficultés potentielles & risques

| # | Risque | Gravité | Parade |
|---|---|---|---|
| 1 | **iOS peut effacer le localStorage** d'une web-app inutilisée ~7 jours (règle ITP de Safari) — perte de sauvegarde | 🔴 | Installer la PWA sur l'écran d'accueil (les PWA installées sont mieux protégées) + export/import de sauvegarde par code dès la v1.1 + message doux d'invitation à installer |
| 2 | **Volume de production des niveaux** : 140 niveaux faits main, c'est le vrai chantier | 🔴 | Outil interne de création dès le Sprint 3 (l'Atelier en version brute), gabarits par famille, validation automatique de solvabilité |
| 3 | **Une famille de puzzle « ne prend pas »** en test | 🟡 | Prototyper chaque famille en version jetable AVANT de produire ses niveaux ; accepter d'en couper une (le GDD en prévoit 8, la v1.0 peut vivre avec 6) |
| 4 | **Audio sur iOS Safari** : lecture bloquée avant le premier geste, haptique web limitée | 🟡 | Débloquer l'audio au premier toucher (écran titre « toucher pour entrer » — déjà prévu), haptique = bonus jamais nécessaire |
| 5 | **Calibrage de la difficulté** en solo | 🟡 | Métriques locales (§8.5) + 2–3 bêta-testeurs réguliers + la « fenêtre de liberté » (§7.3) qui amortit tout blocage |
| 6 | **Dérive du périmètre** (scope creep) : 8 familles × modificateurs × 5 actes, c'est immense | 🔴 | La règle des sprints Ninja Stones : une fonctionnalité par livraison, jalons courts, et le tableau de priorités §20 fait foi |
| 7 | Paiement PWA hors stores : friction du code de déblocage | 🟡 | Assumé en v1.0 (public early-adopter), stores envisagés en v2.x |
| 8 | Charge artistique (5 actes × 4 états visuels × personnages) | 🟡 | Style flat volontairement économe, SVG réutilisables, priorité au Rideau et à l'acte I ; les actes IV–V peuvent réutiliser des briques |

---

# 19. Planning de développement

Méthode éprouvée sur Ninja Stones : **sprints courts, un objectif par sprint, validation par captures d'écran avant de passer au suivant, tag Git stable à chaque jalon.**

| Sprint | Objectif | Livrable vérifiable | Durée indicative |
|---|---|---|---|
| **0** | Fondations | Scene Engine 2.0 + navigation + save.js + PWA hors ligne (coquille vide installable) | 1–2 semaines |
| **1** | Prototype famille A | 5 niveaux Flight Cases jouables, moches mais fluides | 2 semaines |
| **2** | Le Rideau | Séquence victoire complète (le moment signature) + transitions | 1–2 semaines |
| **3** | Habillage acte I | DA de la Salle Municipale, animations ambiantes, audio de base | 2–3 semaines |
| **4** | Contenu acte I | 20 niveaux famille A+B calibrés, Carnet de Régie, éventails | 3 semaines |
| **🏁 JALON « VERTICAL SLICE »** | *Le jeu complet en miniature : on décide ici s'il est bon* | | |
| **5–6** | Familles C + D, acte II | 25 niveaux, Théâtre Suzume | 4–5 semaines |
| **7** | Coup de Main + accessibilité complète | Daltonisme, reduced motion, gros éléments | 2 semaines |
| **8–9** | Familles E + H, acte III | 30 niveaux, Festival | 4–5 semaines |
| **10–11** | Familles F + G, actes IV–V | 45 niveaux, Générales combinées | 5–6 semaines |
| **12** | Premium + polish final | Paiement/code, Grand Album, équilibrage global, bêta publique | 3 semaines |
| **🏁 v1.0** | | | **~6–8 mois** de travail régulier |

Après chaque sprint : liste « corrigé / reste à faire / commandes exactes / résultat attendu », conformément au protocole de livraison établi.

---

# 20. Priorités de développement

Classement MoSCoW — en cas d'arbitrage, on coupe par le bas, jamais par le haut :

**MUST (sans ça, pas de jeu)**
Famille A · Scene Engine 2.0 · Le Rideau · Sauvegarde continue · PWA hors ligne · 20 niveaux calibrés · Annuler/Recommencer · Audio de base

**SHOULD (sans ça, pas un BON jeu)**
Familles B, C, D · Actes I–III habillés · Éventails · Coup de Main · Accessibilité complète · Transformation des lieux

**COULD (le jeu vit sans, mais elles le grandissent)**
Familles E–H · Actes IV–V · Grand Album · Costumes · Vignettes de spectacles · Le Chat de la Régie animé partout

**WON'T (pas en v1.0, décision ferme)**
Éditeur public · Classements en ligne · Comptes/cloud · Stores natifs · Localisation au-delà FR/EN

---

# 21. Conseils de production

## 21.0 Stratégie de lancement : Ninja Stones d'abord

Le conseil le plus important de ce document, avant même la première ligne de code :

- **Ne pas développer Ninja Events immédiatement.** Ce GDD est une carte, pas un ordre de départ. Il peut mûrir tranquillement pendant des mois sans rien perdre de sa valeur.
- **Utiliser Ninja Stones pour valider les fondations techniques et l'expérience utilisateur.** Chaque sprint de Ninja Stones (Scene Engine, sauvegardes, transitions, audio, publication PWA, retours des premiers joueurs) est un investissement direct dans Ninja Events — au sens strict : le §14 de ce document en réutilise les acquis ligne par ligne.
- **Commencer Ninja Events seulement après une version stable et publiée de Ninja Stones.** Concrètement : Ninja Stones installé en PWA sur de vrais téléphones, joué par de vrais joueurs, sauvegardes fiables dans la durée, et enseignements consignés. Le Sprint 0 de Ninja Events (§19) ne s'ouvre qu'à ce moment-là.

Cette patience n'est pas de la prudence excessive : c'est la différence entre construire le vaisseau amiral sur un chantier éprouvé, ou sur du sable.

## 21.1 Les neuf conseils de chantier

1. **Le Rideau d'abord.** Construire le moment signature au Sprint 2, très tôt : si l'émotion fonctionne sur un prototype moche, tout le reste vaut la peine. Si elle ne fonctionne pas, on le sait avant d'avoir produit 140 niveaux.
2. **Une famille qui brille vaut mieux que huit familles ternes.** La v1.0 peut sortir avec 6 familles si les tests le commandent. Personne ne lira le GDD ; tout le monde sentira le polish.
3. **Prototyper jetable.** Chaque famille reçoit d'abord une version grise en une semaine max. On joue, on sent, on décide. Le code jetable est jeté (pas de dette).
4. **Le contenu est le vrai coût.** Le moteur d'une famille = 2 semaines ; ses 60 niveaux calibrés = bien davantage. D'où l'outil interne de création au plus tôt et la validation automatique de solvabilité.
5. **Protéger les fichiers critiques.** Comme sur Ninja Stones : `save.js` et un moteur de famille validé ne se rouvrent qu'avec une justification écrite et un risque affiché (🟢🟡🔴). Tag stable avant toute intervention.
6. **Tester sur vrai téléphone chaque semaine.** Le simulateur ment sur le tactile, le son et la batterie. Le rituel : chaque vendredi, une session complète sur iPhone, une capture des problèmes.
7. **Bêta-testeurs naïfs tôt et souvent.** Trois personnes qui n'ont jamais vu le jeu valent mieux que trente captures d'écran. Observer sans parler ; noter où le doigt hésite.
8. **Ne jamais négocier les piliers.** La tentation viendra (un petit timer « optionnel », une petite pub « récompensée »...). La réponse est dans le §1.2 : elle est non.
9. **Célébrer les jalons.** Chaque fin de sprint mérite son propre petit rideau. Un projet de 8 mois se gagne au moral.

---

# 22. Annexes

## 22.1 Vingt noms de missions (banque de départ)

« La première lanterne » · « Trois caisses et un rêve » · « Le silence avant les trois coups » · « Cent chaises pour un violon » · « Le nœud du dragon » (câbles) · « Lumière sur le vieux parquet » · « Le sommeil du Chat » · « L'entrée du magicien » · « Tanuki est encore en retard » · « Le pont des câbles jaunes » · « Praticables au clair de lune » · « La loge aux deux portes » · « Un chemin pour tous » · « Le quai unique » · « Les Frères Ampli font la paix » · « Poussière d'or » · « La générale du hanami » · « Neuf coups, pas un de plus » · « Le rideau respire » · « Complet, enfin »

## 22.2 Phrases de Genba (banque de départ)

*« Le public ne te verra jamais. C'est ta plus belle réussite. »* · *« Un câble bien rangé est une pensée claire. »* · *« En 1978, on a monté un opéra dans un typhon. Alors, ta petite pluie… »* · *« Les applaudissements traversent les rideaux. Écoute. »* · *« Le gaffeur répare tout, sauf l'orgueil. »* · *« Arrive avant la lumière, pars après le silence. »*

## 22.3 Glossaire technique du spectacle (pour l'authenticité)

**Flight case** : caisse de transport renforcée sur roulettes · **Gaffeur** : ruban adhésif toilé, sacré chez les techniciens · **Praticable** : plateforme modulaire de scène · **Kuroko** : assistant vêtu de noir du kabuki, « invisible » par convention · **Larsen** : sifflement quand une enceinte réinjecte dans un micro · **Générale** : dernière répétition dans les conditions du direct · **Côté cour / côté jardin** : droite / gauche de la scène vue du public · **Les trois coups** : coups de brigadier annonçant le lever de rideau.

## 22.4 Checklist de lancement v1.0

☐ 140 niveaux validés par 3 testeurs ☐ Hors ligne complet vérifié en mode avion ☐ Installation PWA testée iOS + Android ☐ Sauvegarde survivant à 10 fermetures brutales ☐ Export/import de sauvegarde ☐ Modes daltonisme vérifiés (simulateur) ☐ 60 fps sur téléphone de référence ☐ Poids < 2,5 MB au premier chargement ☐ Page de paiement + code testés de bout en bout ☐ Icônes, splash, nom, description ☐ Une bande-annonce de 30 s (captures du Rideau)

---

# 23. Déclaration d'intention

> **« Ninja Events n'est pas conçu comme un produit jetable, mais comme un jeu capable de grandir pendant des années autour d'une idée simple : préparer la magie avant qu'elle n'apparaisse sur scène. »**

Ce document est la référence officielle du projet. Il pourra évoluer — les bonnes idées de demain y trouveront leur place — mais ses piliers (§1.2), sa règle de conception fondamentale (§1.6) et sa promesse de respect du joueur ne sont pas négociables. Ils sont le contrat que le jeu passe avec ceux qui y joueront.

*« Personne ne voit le ninja. Personne ne voit le régisseur. Et pourtant, sans eux, rien n'existe. »*

**— Fin du document — v1.1, Validation finale —**
