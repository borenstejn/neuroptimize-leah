# Tickets d'Implémentation - Neuroptimize POC v5.2

> **Objectif:** Construire le POC complet en suivant le PRD v5.2 avec ralph-loop

**Total:** 23 tickets
**Priorité P0 (Must Have):** 19 tickets
**Priorité P1 (Nice to Have):** 4 tickets

---

## 📋 Vue d'Ensemble des Tickets

### Phase 1: Setup & Infrastructure (Tickets #1-4)

**Ordre d'exécution:** 1 → 2 → 3 → 4

| # | Ticket | Priorité | Durée estimée |
|---|--------|----------|---------------|
| #1 | Setup projet Next.js 14 avec App Router, Tailwind CSS et Vercel AI SDK | P0 | 1h |
| #2 | Créer les types TypeScript pour l'exercice et le state management | P0 | 30min |
| #3 | Créer le fichier de constantes et configuration de l'exercice | P0 | 30min |
| #4 | Créer le prompt système Max v5.1 et les fallbacks JSON | P0 | 30min |

**Dépendances:** Aucune
**Livrable:** Projet configuré, types définis, constantes en place

---

### Phase 2: Composants Visuels de Base (Tickets #5-6, #9, #12, #19)

**Ordre d'exécution:** 19 → 5 → 6 en parallèle avec 9 → 12

| # | Ticket | Priorité | Durée estimée |
|---|--------|----------|---------------|
| #19 | Créer l'avatar de Max et les assets visuels | P0 | 30min |
| #5 | Créer le composant Neuron avec animations Framer Motion | P0 | 2h |
| #6 | Créer le composant NeuralNetwork (grille 4x4 de neurones) | P0 | 1h |
| #9 | Créer les composants de base du Chat (MessageBubble, MessageList) | P0 | 1h30 |
| #12 | Créer le composant TypingIndicator (trois points qui clignotent) | P0 | 30min |

**Dépendances:**
- #5 et #6 dépendent de #2 (types) et #3 (constantes)
- #9 dépend de #19 (avatar Max)

**Livrable:** Composants visuels fonctionnels et animés

---

### Phase 3: Logique Métier (Tickets #7-8)

**Ordre d'exécution:** 7 → 8

| # | Ticket | Priorité | Durée estimée |
|---|--------|----------|---------------|
| #7 | Créer le hook useSequenceGenerator pour générer séquences aléatoires valides | P0 | 1h |
| #8 | Créer le hook useExerciseState pour gérer le state de l'exercice | P0 | 2h |

**Dépendances:**
- #7 dépend de #2 (types) et #3 (constantes)
- #8 dépend de #2, #3, #7

**Livrable:** State machine de l'exercice fonctionnelle

---

### Phase 4: Composants d'Interaction (Tickets #10-11, #14)

**Ordre d'exécution:** 10 → 14 → 11

| # | Ticket | Priorité | Durée estimée |
|---|--------|----------|---------------|
| #10 | Créer le composant QuickReplyButtons avec désactivation après clic | P0 | 1h |
| #14 | Créer le composant ExerciseControls avec bouton "Arrêter l'exercice" (P0) | P0 | 1h |
| #11 | Créer le composant ChatContainer principal avec intégration Vercel AI SDK | P0 | 2h |

**Dépendances:**
- #11 dépend de #8 (useExerciseState), #9 (MessageBubble/List), #10 (QuickReplyButtons), #12 (TypingIndicator)

**Livrable:** Orchestration complète Chat + Exercice

---

### Phase 5: Backend & API (Ticket #13)

| # | Ticket | Priorité | Durée estimée |
|---|--------|----------|---------------|
| #13 | Créer la route API /api/chat avec Claude 3.5 Sonnet et timeout 5s | P0 | 1h30 |

**Dépendances:** #4 (prompt Max)

**Livrable:** API Claude fonctionnelle avec fallback

---

### Phase 6: Layout & Styling (Tickets #15-16)

**Ordre d'exécution:** 15 → 16

| # | Ticket | Priorité | Durée estimée |
|---|--------|----------|---------------|
| #15 | Créer le layout global avec dégradé de fond et typography | P0 | 1h |
| #16 | Créer la page principale (app/page.tsx) qui orchestre Chat + Exercice | P0 | 1h30 |

**Dépendances:**
- #16 dépend de TOUS les composants (#5, #6, #11, #14)

**Livrable:** Application complète assemblée

---

### Phase 7: Tests & Validation (Ticket #17, #23)

**Ordre d'exécution:** 17 → 23

| # | Ticket | Priorité | Durée estimée |
|---|--------|----------|---------------|
| #17 | Implémenter les tests manuels et créer la checklist de validation | P0 | 1h |
| #23 | Validation finale et intégration complète avant démo | P0 | 2h |

**Dépendances:** #17 et #23 dépendent de TOUTE l'application

**Livrable:** POC validé et prêt pour démo

---

### Phase 8: Déploiement & Documentation (Tickets #18, #20, #22)

**Ordre d'exécution:** 18 et 20 en parallèle → 22

| # | Ticket | Priorité | Durée estimée |
|---|--------|----------|---------------|
| #18 | Configurer le déploiement Vercel et variables d'environnement | P0 | 1h |
| #20 | Rédiger le README.md complet du projet | P0 | 1h |
| #22 | Préparer le script de démo et la vidéo de backup (P0) | P0 | 1h30 |

**Dépendances:** #22 dépend de #23 (validation OK)

**Livrable:** POC déployé, documenté, démo préparée

---

### Phase 9: Nice to Have (Ticket #21)

| # | Ticket | Priorité | Durée estimée |
|---|--------|----------|---------------|
| #21 | Implémenter le son "bip" à chaque activation de neurone (P1 - Nice to Have) | P1 | 30min |

**Dépendances:** #5 (Neuron)

**Livrable:** Feedback audio (optionnel)

---

## 🎯 Ordre d'Exécution Recommandé pour Ralph-Loop

### Jour 1 (Jeudi) - 8h de dev

**Matin (4h):**
```
#1 → #2 → #3 → #4 → #19 → #15
```

**Checkpoint Midi:** Setup complet, types, constantes, layout OK

**Après-midi (4h):**
```
#5 → #6 → #7 → #9 → #12
```

**Checkpoint Soir:** Composants visuels fonctionnels, génération séquences OK

---

### Jour 2 (Vendredi matin) - 4h de dev

**Matin (4h):**
```
#8 → #10 → #14 → #13 → #11 → #16
```

**Checkpoint 11h:** Application complète assemblée

**Tests & Validation (1h):**
```
#17 → #23
```

**Déploiement & Démo (1h):**
```
#18 → #20 → #22
```

**Checkpoint Final 13h:** POC déployé, testé, démo préparée

---

### Nice to Have (si temps restant)

```
#21 (Son bip - 30min)
```

---

## 📊 Métriques de Succès

### Must Have (Bloquants)
- [ ] Exercice complet fonctionne (encodage → rappel → feedback)
- [ ] Adaptation niveau fonctionne (2 succès → +1, échec → -1)
- [ ] API Claude répond avec timeout 5s + fallback
- [ ] Boutons "Arrêter" et "Effacer" fonctionnels
- [ ] Animations fluides 60fps
- [ ] Prompt Max respecté (pas d'emojis, vocabulaire vulgarisé)
- [ ] Déployé sur Vercel
- [ ] Script de démo prêt

### Nice to Have
- [ ] Son "bip" à chaque activation
- [ ] Lighthouse Performance >90
- [ ] Tests automatisés (Jest/Vitest)

---

## 🚨 Critères de GO/NO-GO (Vendredi 10h)

✅ **GO si:**
- Tous les tickets P0 complétés
- Flow complet end-to-end fonctionne
- API timeout + fallback testés
- Performance acceptable (≥30fps minimum)
- Déployé sur Vercel sans erreur

❌ **NO-GO si:**
- Crash pendant flow complet
- API ne répond pas ET pas de fallback
- Animations <30fps
- Prompt Max contient du jargon

**Plan B:** Montrer vidéo backup (#22)

---

## 📝 Notes pour Ralph-Loop

**Commande de lancement:**
```bash
/ralph-loop
```

**Instructions spécifiques:**
1. Suivre l'ordre des phases strictement (dépendances critiques)
2. Après chaque ticket, faire un commit avec message descriptif
3. Tester manuellement chaque composant avant de passer au suivant
4. Si blocage >30min sur un ticket, passer au suivant et revenir plus tard
5. Prioriser la stabilité sur la perfection (mieux vaut un MVP stable qu'un POC ambitieux qui crash)

**Critères d'acceptation par ticket:**
- Tous les checkbox cochés
- Commit git avec message clair
- Tests manuels passés
- Pas de console errors

---

**Version:** 1.0
**Date:** 2026-01-29
**Auteur:** Claude Sonnet 4.5 (d'après PRD v5.2)
