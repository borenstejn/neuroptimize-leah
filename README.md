# Neuroptimize - POC v5.3

Plateforme de remédiation cognitive conversationnelle avec l'exercice "Le Réseau Neural" pour entraîner la mémoire de travail visuo-spatiale.

## 🎯 Objectif

Créer un chatbot thérapeutique (Max) qui guide l'utilisateur à travers un exercice cognitif interactif ciblant la mémoire de travail visuo-spatiale, avec adaptation intelligente du niveau de difficulté.

## ✨ Fonctionnalités

### Exercice "Le Réseau Neural"

- **Grille 4x4 de neurones** : Interface visuelle épurée avec 16 neurones
- **5 phases de l'exercice** :
  1. **Intro** : Max présente l'exercice
  2. **Encoding** : Affichage séquentiel des positions à mémoriser
  3. **Retention** : Délai de 2s pour consolider la mémoire
  4. **Recall** : L'utilisateur reproduit la séquence
  5. **Feedback** : Analyse personnalisée avec explication neuroscientifique

### Système intelligent

- **Adaptation automatique du niveau** :
  - +1 niveau après 2 succès consécutifs (100%)
  - -1 niveau après un échec (<60%)
  - Maintien du niveau entre 60-99%
  - Niveaux de 3 à 12 éléments

- **Feedback personnalisé** :
  - 3 variations de messages par catégorie (succès, partiel, échec)
  - Ton empathique et normalisateur
  - Explications neuroscientifiques vulgarisées (hippocampe, neuroplasticité)
  - Mention explicite des changements de niveau

### Interface utilisateur

- **Layout 2 colonnes responsive** :
  - Chat conversationnel avec Max (gauche)
  - Grille neural interactive (droite)
  - Stack vertical sur mobile

- **Composants** :
  - Messages différenciés (user/assistant)
  - Avatar de Max
  - Boutons de réponse rapide (anti-spam)
  - Indicateur de saisie (typing indicator)
  - Contrôles d'exercice (arrêter, effacer)

- **Animations CSS** :
  - Transitions fluides (300ms)
  - Hover et scale effects
  - Feedback visuel immédiat

## 🚀 Installation

### Prérequis

- Node.js 18+
- npm ou yarn

### Setup

```bash
# Cloner le repository
git clone <repo-url>
cd neuroptimize-leah

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start
```

L'application sera accessible sur http://localhost:3000

## 🌐 Démo en Ligne

L'application est déployée sur Vercel :

**URL de production** : https://neuroptimize-leah.vercel.app

Pour déployer votre propre version, consultez [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🧪 Tests

```bash
# Tests unitaires (Vitest)
npm run test

# Tests spécifiques
npm run test -- useSequenceGenerator
npm run test -- useExerciseState
npm run test -- feedback

# Tests E2E (à implémenter - Ticket #24)
npm run test:e2e
```

### Couverture des tests

- ✅ `useSequenceGenerator` : 12/12 tests
- ✅ `useExerciseState` : 20/20 tests (logique métier)
- ✅ `generateFeedback` : 17/17 tests
- ⏳ Tests E2E : À implémenter

## 📁 Structure du projet

```
neuroptimize-leah/
├── app/
│   ├── layout.tsx          # Layout global avec dégradé
│   ├── page.tsx            # Page principale (orchestration)
│   └── globals.css         # Styles globaux + animations
├── components/
│   ├── ChatContainer.tsx   # Conteneur principal du chat
│   ├── MessageList.tsx     # Liste des messages avec auto-scroll
│   ├── MessageBubble.tsx   # Bulle de message individuelle
│   ├── QuickReplyButtons.tsx  # Boutons de réponse rapide
│   ├── TypingIndicator.tsx    # Indicateur de saisie
│   ├── NeuralNetwork.tsx   # Grille 4x4 de neurones
│   ├── Neuron.tsx          # Neurone individuel
│   └── ExerciseControls.tsx   # Boutons Arrêter/Effacer
├── hooks/
│   ├── useSequenceGenerator.ts  # Génération séquences aléatoires
│   └── useExerciseState.ts      # State machine de l'exercice
├── lib/
│   ├── constants.ts        # Configuration de l'exercice
│   └── feedback.ts         # Système de feedback intelligent
├── types/
│   └── exercise.ts         # Types TypeScript
└── public/
    ├── max-avatar.svg      # Avatar de Max
    └── favicon.svg         # Favicon
```

## 🎨 Design System

### Couleurs

- **Primaire** : Bleu (#3b82f6) → Violet (#8b5cf6)
- **États neurones** :
  - Idle : Gris (#e5e7eb)
  - Active : Bleu (#3b82f6)
  - Correct : Vert (#22c55e)
  - Wrong : Rouge (#ef4444)

### Typographie

- **Font** : Inter (Google Fonts)
- **Fallback** : Système (San Francisco, Segoe UI)

### Animations

- **Transitions** : 300ms ease-in-out
- **Hover** : scale(1.05)
- **Active** : scale(0.95)
- **Fade-in** : opacity + translateY

## 🧠 Logique de l'exercice

### State Machine

```
intro → encoding → retention → recall → feedback
  ↑                                        ↓
  └────────────────────────────────────────┘
```

### Timings

- **Encoding** : 500ms par neurone
- **Retention** : 2000ms (délai fixe)
- **Recall** : Temps libre pour l'utilisateur
- **Animations** : 300ms (transitions CSS)

### Règles d'adaptation

- **Succès complet (100%)** : +1 succès consécutif
  - Si 2 succès → Niveau +1 (max 12)
- **Succès partiel (60-99%)** : Reset succès consécutifs
  - Niveau maintenu
- **Échec (<60%)** : Niveau -1 (min 3)
  - Reset succès consécutifs

## 🔧 Technologies

- **Framework** : Next.js 16 (App Router)
- **Rendu** : React 19 Server Components + Client Components
- **Langage** : TypeScript 5.9 (strict mode)
- **Styling** : Tailwind CSS 4
- **Animations** : CSS Transitions (pas de Framer Motion pour POC)
- **Tests** : Vitest + React Testing Library
- **Build** : Turbopack
- **Déploiement** : Vercel (à configurer - Ticket #18)

## 📝 Tickets implémentés

### Phase 1 : Setup (1 ticket)
- ✅ #1 - Setup Next.js 14

### Phase 2 : Logique métier (7 tickets)
- ✅ #2 - Types TypeScript
- ✅ #3 - Constantes et configuration
- ✅ #7 - Hook useSequenceGenerator
- ✅ #25 - Tests useSequenceGenerator
- ✅ #8 - Hook useExerciseState
- ✅ #26 - Tests useExerciseState
- ✅ #4 - Système de feedback

### Phase 3 : Composants visuels (3 tickets)
- ✅ #19 - Avatar Max et assets
- ✅ #5 - Composant Neuron
- ✅ #6 - Composant NeuralNetwork

### Phase 4 : Composants d'interaction (4 tickets)
- ✅ #9 - Composants Chat (MessageBubble, MessageList)
- ✅ #10 - QuickReplyButtons
- ✅ #12 - TypingIndicator
- ✅ #14 - ExerciseControls

### Phase 5 : Layout & Intégration (3 tickets)
- ✅ #15 - Layout global
- ✅ #11 - ChatContainer
- ✅ #16 - Page principale

**Total : 18/26 tickets P0 complétés** ✅

### Tickets restants (optionnels P1)

- ⏳ #13 - API Route avec Claude (optionnel)
- ⏳ #24 - Tests E2E avec Playwright
- ⏳ #21 - Son "bip" à chaque activation
- ⏳ #18 - Déploiement Vercel
- ⏳ #17 - Tests manuels et checklist
- ⏳ #22 - Script de démo
- ⏳ #23 - Validation finale

## 🎬 Utilisation

1. **Lancer l'application** : `npm run dev`
2. **Ouvrir** : http://localhost:3000
3. **Cliquer** : "Commencer"
4. **Observer** : La séquence de neurones s'active (phase encoding)
5. **Attendre** : 2 secondes (phase retention)
6. **Reproduire** : Cliquer sur les neurones dans le bon ordre (phase recall)
7. **Recevoir** : Feedback personnalisé de Max (phase feedback)
8. **Continuer** : L'exercice adapte automatiquement le niveau

### Contrôles

- **Arrêter l'exercice** : Bouton rouge (toujours disponible)
- **Effacer la sélection** : Bouton gris (pendant phase recall uniquement)

## 🔬 Fondements neuroscientifiques

L'exercice cible spécifiquement :

- **Mémoire de travail visuo-spatiale** : Capacité à maintenir et manipuler des informations spatiales
- **Hippocampe** : Structure cérébrale centrale pour l'encodage mnésique
- **Neuroplasticité** : Capacité du cerveau à se reconfigurer avec l'entraînement
- **Zone proximale de développement** : Adaptation du niveau pour challenger sans saturer

## 📚 Références

- PRD Neuroptimize v5.2
- TICKETS_IMPLEMENTATION_v5.3.md
- Research : Études sur remédiation cognitive et mémoire de travail

## 👥 Équipe

- **Développement** : Claude Sonnet 4.5
- **Projet** : Jérôme Borenstejn
- **Bénéficiaire** : Leah Weil

## 📄 Licence

Projet privé - Tous droits réservés

---

**Version** : 5.3
**Date** : Janvier 2026
**Statut** : ✅ POC Fonctionnel
