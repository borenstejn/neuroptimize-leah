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