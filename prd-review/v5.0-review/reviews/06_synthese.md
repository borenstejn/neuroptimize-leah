Excellent. En tant que VP of Product, mon rôle est de synthétiser ces expertises, d'arbitrer les tensions et de produire une vision claire et exécutable pour la démo. Le temps est critique, la clarté est notre meilleure alliée.

Voici ma synthèse et la version finale du PRD.

---

### PARTIE 1 : SYNTHÈSE DES FEEDBACKS

#### Tableau des conflits

| Sujet | Expert A dit | Expert B dit | Arbitrage (VP Product) |
|-------|--------------|--------------|-----------|
| **Bouton "Arrêter"** | **PRD v3.2** : P2 (Nice to Have). | **UX** : P0 (Critique). L'absence de contrôle est une source de frustration immense et une violation de l'heuristique de Nielsen. | **UX a raison.** Un utilisateur piégé dans une démo est un échec. Le bouton "Arrêter l'exercice" est **P0**. |
| **Feedback d'échec** | **PRD v3.2** : Ton factuel ("Tu as mémorisé 1/3"). | **UX** : Risque d'être perçu comme froid et démoralisant. Suggère un ton plus empathique ("C'est un point de départ normal..."). | **Arbitrage nuancé.** Pour le POC, le ton factuel est acceptable et rapide à implémenter. Cependant, la suggestion de l'UX est une amélioration P1 à faible coût. Nous l'intégrons dans le prompt de Max pour enrichir le feedback. |
| **Gestion des erreurs API** | **PRD v3.2** : Plan B avec vidéo ou feedbacks hardcodés. | **CTO** : Suggère d'ajouter une clé API OpenAI de secours avec un switch runtime. | **Le plan du PRD est plus réaliste pour un POC de 2 jours.** L'ajout d'un second provider est une sur-ingénierie qui augmente le risque. Nous validons le plan B (vidéo + JSON hardcodé) et en faisons une tâche P0 explicite. |
| **Emojis** | **PRD v3.2** : "Aucun emoji" pour maintenir la crédibilité professionnelle. | **Pre-Mortem** : A posteriori, le ton a été perçu comme "froid et scolaire", manquant d'engagement. | **Maintien de la décision du PRD pour le POC.** L'objectif immédiat est de prouver la crédibilité scientifique. Le manque d'engagement est un risque à long terme, pas pour la démo. Nous notons ce point pour les tests utilisateurs post-POC. |
| **Onboarding** | **PRD v3.2** : Flow en 2 étapes (Présentation puis Explication). | **UX** : Friction inutile, augmente la charge cognitive avant même de commencer. Suggère de fusionner en une seule étape. | **L'UX a 100% raison.** La friction est l'ennemi. Nous fusionnons les deux messages d'introduction en un seul. C'est une modification P0. |
| **Adaptation de la difficulté** | **PRD v3.2** : Règle déterministe simple (if/else ±1). | **Pre-Mortem** : Identifie cette simplicité comme la cause racine de l'échec à long terme (ennui, perte de crédibilité). | **Le PRD est lucide sur la nature du mécanisme.** Pour le POC, cette règle est suffisante. L'arbitrage n'est pas technique mais narratif : nous devons être **transparents** lors de la démo et parler de "difficulté progressive" ou "règle adaptative", et non de "moteur IA personnalisé". Le risque est la sur-promesse. |

---

#### Modifications P0 (bloquantes pour la démo)

1.  **Ajouter un bouton `Arrêter l'exercice`** : Doit être visible et fonctionnel à toutes les phases de l'exercice (Arbitrage UX vs PRD).
2.  **Accessibilité du feedback visuel** : Le feedback de clic (correct/incorrect) doit utiliser **couleur + icône** (✓/✗) pour ne pas reposer uniquement sur la couleur (Critique UX).
3.  **Indicateur de chargement de l'IA** : Afficher une animation de "typing" de Max pendant l'attente de la réponse de l'API Claude pour éviter l'impression de "gel" (Critique UX).
4.  **Fusionner l'onboarding** : Combiner les deux messages d'introduction en un seul pour réduire la friction (Critique UX).
5.  **Désactiver l'input de chat texte** : Pour prévenir tout risque de prompt injection, la démo ne fonctionnera qu'avec des boutons de réponse rapide (Critique CTO).
6.  **Clarifier les libellés de boutons** : Remplacer les boutons ambigus comme `➡️ Continuer` par des actions explicites, ex: `➡️ Prochain essai (même niveau)` (Critique UX).
7.  **Gestion des pannes (connexion/API)** : Implémenter le fallback sur des feedbacks JSON hardcodés si l'API Claude ne répond pas en moins de 5s ou si la connexion est perdue (Critique QA/CTO).
8.  **Prévention du spam de boutons** : Désactiver les boutons de réponse rapide dès le premier clic pour éviter les actions multiples et les appels API dupliqués (Critique QA).

---

#### Modifications P1 (importantes mais non bloquantes)

1.  **Ajouter un bouton `Effacer la sélection`** : Offrir une fonction "Undo" pendant la phase de rappel pour améliorer le contrôle utilisateur (Recommandation UX).
2.  **Améliorer l'empathie du feedback** : Ajuster le prompt de Max pour qu'il normalise l'échec ("C'est normal au début...") afin d'améliorer l'engagement émotionnel (Recommandation UX).
3.  **Ajouter des micro-interactions** : Implémenter des états `:hover` et `:active` sur les neurones et boutons pour améliorer l'affordance et la perception de qualité (Recommandation UX).
4.  **Post-traitement des réponses LLM** : Ajouter une fonction côté serveur ou client pour nettoyer la réponse de Claude et supprimer les emojis ou mots-clés interdits qui auraient pu passer le prompt (Critique CTO/QA).
5.  **Créer une vidéo de secours** : Enregistrer une démo parfaite jeudi soir comme plan de secours ultime si tout le système live échoue (Critique CTO).

---

#### Modifications rejetées (avec justification)

1.  **Ajouter un second développeur** (CTO) : **Rejeté.** La contrainte est fixe (1 dev, 2 jours). La solution est de réduire le scope, pas d'augmenter les ressources.
2.  **Utiliser WebGL/Canvas pour les animations** (CTO) : **Rejeté.** Trop complexe pour le délai. Nous utiliserons Framer Motion et simplifierons les animations si des problèmes de performance apparaissent.
3.  **Persister l'état dans `localStorage`** (QA) : **Rejeté.** Pour une démo, un rafraîchissement de page qui réinitialise l'exercice est un comportement acceptable et plus simple à implémenter.
4.  **Ajouter des KPIs d'impact cognitif** (Business) : **Rejeté pour le POC.** Impossible à mesurer en 2 jours. C'est une priorité pour la V1, pas pour la démo. Le focus est sur la démonstration de la mécanique, pas sur la preuve de son efficacité.
5.  **Implémenter un switch vers une API OpenAI** (CTO) : **Rejeté.** Sur-ingénierie pour ce stade. Le fallback vers des messages JSON hardcodés est une solution plus robuste et plus rapide pour garantir le succès de la démo.

---

### PARTIE 2 : PRD v4.0 (VERSION FINALE)

# PRD - POC Chatbot "Max" (Neuroptimize)

> **Version :** 4.0 (Final - Post-Reviews)
> **Date :** 2026-01-29
> **Auteur :** Jérôme Borenstejn (VP Product)
> **Statut :** **Approved for Development**
> **Date de démo :** Vendredi 31 janvier 2026

---

## Changelog v4.0 (Synthèse & Arbitrage)

**MODIFICATIONS P0 (BLOQUANTES) INTÉGRÉES :**
- ✅ **Flow d'onboarding simplifié :** Fusion des 2 messages d'introduction en un seul pour réduire la friction (UX).
- ✅ **Contrôle utilisateur renforcé :** Ajout d'un bouton `Arrêter l'exercice` visible en permanence (UX).
- ✅ **Accessibilité améliorée :** Le feedback de clic utilise désormais **couleur + icône (✓/✗)** (UX).
- ✅ **Feedback d'état :** Un indicateur de "typing" s'affiche pendant l'attente de la réponse de Max (UX).
- ✅ **Sécurité renforcée :** L'input de texte libre est **désactivé**. Seuls les boutons de réponse rapide sont utilisables (CTO).
- ✅ **Clarté des actions :** Libellés de boutons ambigus remplacés par des actions explicites (UX).
- ✅ **Robustesse accrue :** Implémentation d'un timeout de 5s sur l'API et d'un fallback sur des messages JSON hardcodés en cas d'erreur réseau (QA).
- ✅ **Prévention du spam :** Les boutons sont désactivés après le clic (QA).

**MODIFICATIONS P1 (IMPORTANTES) INTÉGRÉES :**
- ✅ **Empathie de Max :** Le prompt a été ajusté pour que Max normalise l'échec de manière plus encourageante (UX).
- ✅ **Contrôle amélioré :** Ajout d'un bouton `Effacer la sélection` pendant la phase de rappel (UX).
- ✅ **Qualité perçue :** Ajout de micro-interactions (états `:hover`/`:active`) sur les éléments cliquables (UX).

---

*(Le reste du document est une version modifiée du PRD v5.1 pour refléter ces changements. Les sections inchangées sont omises pour la brièveté, mais considérées comme faisant partie du document final.)*

---

## 1. Résumé Exécutif

### Vision Produit

Démontrer que Neuroptimize applique les **protocoles de remédiation cognitive** dans une interface **conversationnelle moderne, engageante et robuste**.

**Clarification du rôle de l'IA (pour la démo) :**
- **Claude (LLM)** : Génère les feedbacks conversationnels et explications neuroscientifiques.
- **Algorithme adaptatif** : Règle **déterministe** simple (if/else) qui ajuste la difficulté. **Narratif de démo :** parler de "difficulté progressive", pas d'IA adaptative.

---

## 3. L'Exercice : Le Réseau Neural

### 3.3 Flow Détaillé (Révisé v4.0)

#### Phase 1 : Présentation (Simplifiée)

```
Max : "Bonjour. Je suis Max, spécialisé en remédiation cognitive.

       Cet exercice va entraîner ta mémoire de travail visuo-spatiale.
       Tu vas observer une séquence d'activations, puis la reproduire.
       
       Elle ne s'affichera qu'une fois. Prêt ?"

[Bouton unique, clair et direct]
┌────────────────────────┐
│ ▶️ Commencer l'exercice │
└────────────────────────┘
```
**Logique :** Le bouton est désactivé après le clic pour éviter le spam.

---

#### Phase 2 : Encodage (Observation)

*(Aucun changement majeur, mais un bouton `Arrêter l'exercice` est désormais visible en bas à gauche de l'écran)*

---

#### Phase 4 : Rappel (Reproduction) (Révisé v4.0)

```
Max : "À toi. Clique sur les neurones dans le même ordre."

[L'utilisateur clique sur les neurones]

[Feedback visuel immédiat à chaque clic :]
- ✅ Vert (#00ff00) + Icône Coche (✓) si correct.
- ❌ Rouge (#ff0000) + Icône Croix (✗) si erreur.

[Affichage de deux boutons de contrôle sous la grille]
┌──────────────────────┐ ┌───────────────────┐
│ 🗑️ Effacer la sélection │ │ 🛑 Arrêter l'exercice │
└──────────────────────┘ └───────────────────┘
```
**Logique :**
- `Effacer la sélection` (P1) : Réinitialise `userSequence` et l'état visuel des neurones pour cet essai.
- `Arrêter l'exercice` (P0) : Interrompt l'exercice et retourne à l'écran d'accueil.

---

#### Phase 5 : Feedback & Explication (Révisé v4.0)

*(Pendant que le frontend attend la réponse de Claude...)*
```
[Avatar de Max] [Indicateur de "typing" : trois points qui clignotent]
```

**Cas A : Succès (100%)**

```
Max : "Excellent. Tu as reproduit la séquence sans erreur.

       L'hippocampe (centre de la mémoire) a parfaitement encodé la séquence.
       
       Prêt pour le niveau suivant ?"

[Bouton]
┌─────────────────┐
│ ➡️ Niveau suivant │
└─────────────────┘
```

**Cas B : Erreur Partielle (60-99%)**

```
Max : "Bien. Tu as mémorisé 3 éléments sur 5.

       La séquence complète était : [Affichage visuel]

       La mémoire de travail se renforce avec la répétition. Chaque essai compte.
       
       Continuons sur ce niveau."

[Bouton]
┌─────────────────────────────┐
│ 🔄 Nouvel essai (même niveau) │
└─────────────────────────────┘
```

**Cas C : Échec (<60%) (Ton empathique)**

```
Max : "Tu as mémorisé 1 élément sur 5. C'est un point de départ tout à fait normal.

       La mémoire de travail est comme un muscle. Le but est de la stimuler progressivement.

       Je maintiens le niveau à 5 éléments pour adapter l'exercice."

[Bouton]
┌─────────────────────────────┐
│ 🔄 Réessayer (même niveau) │
└─────────────────────────────┘
```

---

## 4. Architecture Technique

### 4.2 Prompt Système Max v4.0 (Extrait révisé)

```markdown
# EXEMPLES DE RÉPONSES (TON EMPATHIQUE)

**Succès (100%) :**
> "Excellent. Tu as reproduit la séquence sans erreur. L'hippocampe (centre de la mémoire) a parfaitement encodé l'information. Prêt pour le niveau suivant ?"

**Échec partiel (60-99%) :**
> "Bien. Tu as mémorisé 4 éléments sur 5. La mémoire de travail se renforce avec la répétition. Chaque essai compte. Continuons sur ce niveau."

**Échec (<60%) :**
> "Tu as mémorisé 2 éléments sur 5. C'est un point de départ tout à fait normal. La mémoire de travail est comme un muscle, le but est de la stimuler. Je maintiens le niveau à 5 éléments pour le prochain essai."
```

---

## 5. Plan de Développement (2 Jours) (Révisé et réaliste)

### Hypothèses

- **Priorité absolue :** Stabilité de la démo. Un POC fonctionnel avec un scope réduit est mieux qu'un POC ambitieux qui plante.
- **Fallback Actif :** Le développeur doit préparer les feedbacks JSON hardcodés et enregistrer une vidéo de la démo **jeudi soir**.

---

### Jeudi 30 Janvier (8h) : Le socle fonctionnel

| Tâche | Durée | Livrable | Priorité |
|-------|-------|----------|----------|
| Setup Next.js, Vercel AI SDK, UI Chat basique | 2h | Interface de chat fonctionnelle (sans l'exercice) | P0 |
| **Intégrer le flow d'onboarding simplifié (1 étape)** | 30min | Max dit bonjour et propose de commencer | P0 |
| Composant `NeuralNetwork` (grille statique) | 30min | Grille 4x4 affichée | P0 |
| Logique de l'exercice (Encodage -> Rappel) **SANS adaptation** | 2h | L'exercice fonctionne avec une séquence fixe de 3 éléments | P0 |
| **Feedback visuel (couleur + icône ✓/✗)** | 30min | Les clics sont validés visuellement et de manière accessible | P0 |
| **Bouton `Arrêter l'exercice` fonctionnel** | 1h | L'utilisateur peut quitter l'exercice à tout moment | P0 |
| **Préparer les feedbacks JSON de secours** | 30min | Un fichier `fallback.json` est prêt | P0 |
| Déploiement initial sur Vercel | 30min | Une première URL est live | P0 |

**Checkpoint Soir :** ✅ Un exercice non-adaptatif mais **parfaitement stable** est déployé.

---

### Vendredi 31 Janvier Matin (4h) : Adaptation et Polish

| Tâche | Durée | Livrable | Priorité |
|-------|-------|----------|----------|
| **Logique adaptative (niveau +/-1)** | 1h30 | La difficulté s'ajuste. **Si trop complexe, on garde le niveau fixe.** | P0 (stretch) |
| **Intégration Claude pour le feedback** | 1h | Max donne son feedback via l'API. | P0 |
| **Indicateur "typing" + fallback API** | 30min | L'UI est fluide même si l'API est lente ou down. | P0 |
| **Bouton `Effacer la sélection`** | 30min | Fonction "Undo" implémentée. | P1 |
| Tests finaux et debugging intensif | 30min | Tous les bugs P0 sont corrigés. | P0 |
| **Enregistrement de la vidéo de démo finale** | (Hors dev) | Vidéo de 3min prête. | P0 |

**Checkpoint Final (11h) :**
- ✅ L'exercice est fonctionnel, idéalement adaptatif.
- ✅ Max donne un feedback robuste (via API ou fallback).
- ✅ L'expérience utilisateur est contrôlée et sans friction.
- ✅ Le plan de secours (vidéo) est prêt.

---

## 7. Gestion des Risques (Mise à jour)

| Risque | Probabilité | Impact | Mitigation | Plan B |
|--------|-------------|--------|------------|--------|
| **Manque de temps** | **Très Élevée (80%)** | **Critique** | **Priorité P0 absolue.** L'adaptation de la difficulté est un "stretch goal". Le livrable minimum viable est un exercice à niveau fixe (3 éléments) mais parfaitement stable. | **Démontrer l'exercice à niveau fixe** et expliquer verbalement que l'étape suivante est l'adaptation. |
| **API Claude indisponible** | Faible (5%) | **Critique** | Implémenter un timeout de 5s. | **Basculement automatique et transparent vers les feedbacks JSON hardcodés.** La démo continue en live. La vidéo est le secours ultime. |
| **Prompt Injection** | **Élevée (si input)** | **Critique** | **Désactiver l'input texte.** N'utiliser que des boutons de réponse rapide. | N/A (risque éliminé par la mitigation). |
| **Bug de logique (adaptation)** | Moyenne (40%) | Élevé | Tests manuels intensifs. Si un bug persiste, on désactive la feature pour la démo. | Revenir à la version à niveau fixe, qui doit être sur une branche git séparée et stable. |

---

*(Le reste du PRD v5.1 est conservé, notamment les sections sur les Personas, le Lexique, et la Stack Technique, qui restent valides.)*