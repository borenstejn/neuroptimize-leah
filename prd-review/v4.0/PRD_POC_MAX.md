# PRD - POC Chatbot "Max" (Neuroptimize)

> **Version :** 4.0  
> **Date de création :** [Date du jour]  
> **Dernière mise à jour :** [Date du jour]  
> **Auteur(s) :** [Ton Nom], VP of Product  
> **Date de démo cible :** Vendredi [DATE EXACTE]  
> **Statut :** Approved

**Changelog v4.0 :**
- Consolidation et arbitrage des reviews CTO, QA, UX, Business & Pre-Mortem.
- Ajustement du ton et de la clarté des messages de Max (P1).
- Renforcement des exigences d'accessibilité (P0) et d'ergonomie mobile (P1).
- Clarification de la dette technique de l'architecture "démo-first" (P0).
- Ajustement du plan de développement pour plus de réalisme.

---

## 0. Parties Prenantes & Responsabilités

| Rôle | Nom | Responsabilité | Contact |
|------|-----|----------------|---------|
| **Product Owner (VP Product)** | [Ton Nom] | Validation finale du PRD, arbitrage, go/no-go | [Email] |
| **Lead Developer** | [Nom] | Implémentation technique, architecture, sécurité | [Email] |
| **Designer UI/UX** | [Nom] | Validation accessibilité, polish visuel | [Email] |
| **Présentateur Démo** | [Nom] | Pitch et démonstration live | [Email] |
| **Audience Démo** | Jury / Investisseurs | Validation de la valeur produit et du potentiel business | N/A |

---

## 1. Résumé Exécutif

### Vision Produit
Démontrer que Neuroptimize se positionne comme un **assistant de performance cognitive**, distinct des applications de bien-être généralistes. Max, le chatbot neuro-coach, établit le lien entre l'état émotionnel de l'utilisateur et son efficacité au travail.

### Objectif de la Démo
**Audience cible :** Jury / Investisseurs

**Proposition de valeur en 3 étapes :**

| Étape | Action de Max | Valeur démontrée | Acteur |
|-------|---------------|------------------|--------|
| **1. Diagnostic** | Identifie l'état cognitif (Fatigue/Stress/Dispersion) | Empathie + Compréhension technique | Max |
| **2. Explication scientifique** | Explique l'impact neurologique sur la performance | Crédibilité scientifique de Neuroptimize | Max |
| **3. Intervention** | Lance un protocole de régulation (cohérence cardiaque) | Résultat tangible et immédiat | Max + Widget autonome |

### Contraintes
- **Date limite :** Vendredi [DATE EXACTE] à [HEURE]
- **Temps de développement :** 4 jours + 1 jour de buffer/polish
- **Budget API :** 20$ (pour le plan Vercel Pro + crédits Anthropic)
- **Devices cibles :** Desktop (Chrome/Safari/Firefox) + Mobile (iOS Safari, Android Chrome)

---

## 2. Positionnement Produit : Neuro-Coach vs Chatbot Bien-être

[Section inchangée]

---

## 3. Spécifications du Prompt Système

### Prompt Max v4.0

```markdown
# IDENTITY
You are Max, the Neuro-Coach of Neuroptimize.

**Mission:** Diagnose and optimize the user's cognitive performance by linking emotional states to brain mechanisms.

**Target Audience:** Knowledge workers, tech professionals (developers, product managers, designers).

**Language:** French, using "tu" (informal).

---

# PERSONALITY: "The SysAdmin of the Brain"

**Tone:** "Warm Competence" — Competent and science-based, but approachable. Avoid generic wellness platitudes.

**Style:**
- Use computer/tech analogies (CPU, RAM, bandwidth, cache, overclocking, blue screen).
- Keep responses concise (max 3 sentences per message).
- Use 1 emoji maximum per message, only when relevant.

**Formatting:**
- Use line breaks for readability.
- Bold key concepts sparingly.

---

# CORE ANALOGIES DATABASE

[Section inchangée]

---

# INTERACTION METHOD

## Step 1: SCAN (Diagnostic)
Identify the cognitive glitch from user input:
- **Stress/Pressure** → Amygdala hyperactivity
- **Fatigue** → Prefrontal cortex energy depletion
- **Dispersion** → Working memory overload

## Step 2: EXPLAIN (Neuroscience)
**CRITICAL RULE:** Explain the impact on the brain in simple terms FIRST, then use the tech analogy as an illustration.
*Structure: "Here is what's happening in your brain in simple terms. It's like [tech analogy]."*

## Step 3: FIX (Intervention)
Propose the coherence cardiaque protocol (cardiac coherence breathing):
- **Demo duration:** 60 seconds
- **Production duration:** 3 minutes
- Use the phrase: "60 secondes de cohérence cardiaque pour [specific benefit]."

---

# SAFETY & EDGE CASES

[Section inchangée, mais son implémentation et ses tests deviennent une priorité P1]

---

# DEBRIEF PROTOCOL

[Section inchangée]

---

# CONSTRAINTS

[Section inchangée]
```

### Message d'Onboarding (Géré par l'UI, pas le LLM) - **MODIFIÉ (P1)**

**Contexte :** Premier message affiché par l'interface au chargement, hardcodé côté frontend.

```
Max: "Salut, je suis Max.
      Je suis là pour t'aider à rebooter ton cerveau. Moins de blabla, plus de résultats.
      On lance un diagnostic rapide ?"

[3 boutons Quick Reply]
┌─────────────────────┐
│ 🧠 Je suis dispersé │
├─────────────────────┤
│ ⚡️ Je manque d'énergie │
├─────────────────────┤
│ 🤯 Je suis sous pression │
└─────────────────────┘
```

---

## 4. User Flow : Parcours Guidé (Happy Path)

**Objectif :** Parcours optimisé pour la démo avec interactions prédictibles. Pas de saisie texte libre dans la version POC.

### Étape 1 : Onboarding (Check-in Initial) - **MODIFIÉ (P1)**

**Acteur :** Interface (message hardcodé) + Utilisateur

```
Max: "Salut, je suis Max.
      Je suis là pour t'aider à rebooter ton cerveau. Moins de blabla, plus de résultats.
      On lance un diagnostic rapide ?"
...
```

### Étape 2 : Diagnostic Neuroscientifique - **MODIFIÉ (P1)**

**Acteur :** Max (LLM)

**Réponses par état (nouvelle structure "simple d'abord") :**

#### Si l'utilisateur clique sur "🤯 Je suis sous pression"

```
Max: "Tu te sens sous pression car ton système d'alerte interne est suractivé,
      ce qui sature ton centre de décision. C'est comme si ton amygdale
      lançait une attaque DDoS sur ton cortex préfrontal.

      60 secondes de cohérence cardiaque pour rebooter le système."

[Bouton]
┌─────────────────────┐
│ ▶️ Lancer la session │
└─────────────────────┘
```

#### Si l'utilisateur clique sur "🧠 Je suis dispersé"

```
Max: "Ton attention est fragmentée car ta mémoire de travail est surchargée.
      C'est comme avoir trop d'onglets ouverts dans la RAM de ton cerveau.

      60 secondes de cohérence cardiaque pour libérer de la bande passante."

[Bouton]
┌─────────────────────┐
│ ▶️ Lancer la session │
└─────────────────────┘
```

#### Si l'utilisateur clique sur "⚡️ Je manque d'énergie"

```
Max: "Ta batterie cognitive est faible, ce qui ralentit tes capacités de réflexion.
      Ton cortex préfrontal rame, comme un vieux PC sans assez de RAM.

      60 secondes de cohérence cardiaque pour recharger la machine."

[Bouton]
┌─────────────────────┐
│ ▶️ Lancer la session │
└─────────────────────┘
```

### Étape 3 : Intervention (Widget Breathing Autonome) - **MODIFIÉ (P0)**

**Acteur :** Widget frontend (autonome, pas de dépendance LLM)

**Spécifications techniques du widget :**

| Paramètre | Valeur |
|-----------|--------|
| **Durée d'un cycle** | 10 secondes (5s inspiration + 5s expiration) |
| **Nombre de cycles (démo)** | 6 cycles = 60 secondes |
| **Animation** | Cercle qui s'agrandit (inspiration) puis rétrécit (expiration) |
| **Labels** | "Inspire..." / "Expire..." (hardcodés) |
| **Contrôles** | Boutons "Pause" et "Arrêter". **Sur mobile, utiliser des icônes (`||`, `■`).** |
| **Autonomie** | Timer géré par un hook React (`useBreathing`), indépendant du LLM |
| **Accessibilité (P0)** | **Doit utiliser des `aria-live regions` pour annoncer vocalement "Inspirez", "Expirez". Les contrôles doivent être entièrement utilisables au clavier.** |

### Étape 4 : Debrief & Prochaines Étapes

[Section inchangée]

---

## 5. Architecture Technique - **MODIFIÉ (P0)**

### Stack Technologique

| Composant | Technologie Choisie | Justification |
|-----------|---------------------|---------------|
| ... | ... | ... |
| **Hébergement** | Vercel (**Plan Pro**) | CI/CD, edge functions, **fonctions "always-on" pour éviter le cold start**, domaine HTTPS. |

### Diagramme d'Architecture

[Section inchangée]

### Structure des Fichiers

[Section inchangée]

### **NOUVEAU : Limites de l'Architecture POC & Dette Technique (P0)**

Il est crucial de reconnaître que l'architecture de ce POC est optimisée pour la **fiabilité de la démo**, et non pour la scalabilité à long terme.

1.  **Dépendance au Flow Guidé :** L'intégralité du produit (prompt, UI, logique) repose sur 3 intents prédéfinis. Il n'est **pas** conçu pour gérer le texte libre.
2.  **Dette Technique Actée :** Le passage à une conversation en langage naturel nécessitera une **refonte significative** de l'UI et du backend. Cette refonte est le **jalon prioritaire #1** immédiatement après la validation du POC.
3.  **Principe de Conception :** La route `/api/chat` doit être conçue de manière aussi modulaire que possible pour faciliter cette future migration, en séparant la logique de communication avec l'API LLM de la logique de gestion du flow de la démo.

---

## 6. Design System

[Section modifiée pour inclure la recommandation sur les icônes du widget pour le mobile (P1)]

### Composants UI

#### Boutons Quick Reply
**Action P0 :** Implémenter un `debounce` (ex: 300ms) sur le `onClick` pour prévenir les doubles-clics.

#### Widget Breathing Circle
**Spécifications visuelles :**
- **Contrôles (P1) :** Sur mobile, privilégier des boutons icônes (`||` pour Pause, `■` pour Stop) pour maximiser la zone de clic.

---

## 7. Plan de Développement (4 Jours + 1 Buffer) - **MODIFIÉ**

**Hypothèses :**
- 1 développeur full-time
- **Plan Vercel Pro activé dès le Jour 1.**
- **Accès à l'API Claude 3.5 Sonnet validé avant le début du sprint.**

### Jour 1 : Infrastructure & Intelligence (8h)

| Tâche | Durée estimée |
|-------|---------------|
| Setup projet Next.js + Tailwind + Vercel Pro | 30 min |
| ... | ... |
| **NOUVEAU : Vérification sécurité clé API (server-side only)** | 30 min |

### Jour 2 : Widget Breathing & Quick Replies (8h)

| Tâche | Durée estimée |
|-------|---------------|
| ... | ... |
| Composant `BreathingWidget` (UI + **Accessibilité `aria-live` P0**) | 3h |
| **NOUVEAU : Implémenter `debounce` sur `QuickReplyButtons` (P0)** | 1h |

### Jour 3 : Flow Guidé + Polish + Déploiement (8h)

| Tâche | Durée estimée |
|-------|---------------|
| ... | ... |
| Tests edge cases (timeout, troll, détresse) **et fallbacks UI (P1)** | 1.5h |
| ... | ... |

### **Jour 4 (Buffer & Polish - 8h) - MODIFIÉ**

**Objectif :** Fiabilisation, résolution de bugs, et préparation intensive de la démo.

| Tâche | Durée estimée |
|-------|---------------|
| Corrections bugs identifiés lors des tests | 4h |
| Optimisation et tests finaux sur devices réels (iOS/Android) | 2h |
| Répétition du script de démo avec le présentateur | 1h |
| **NOUVEAU : Enregistrement vidéo de secours de la démo (P0)** | 1h |

---

## 8. Critères de Succès & Métriques

### Must Have (Bloquants pour la Démo)

| Critère | Méthode de Validation |
|---------|----------------------|
| ... | ... |
| **NOUVEAU : Widget accessible (WCAG)** | Test avec un lecteur d'écran (VoiceOver/NVDA) et au clavier. |
| ... | ... |

---

## 9. Gestion des Risques & Edge Cases - **MODIFIÉ**

### Risques Techniques

| Risque | Probabilité | Impact | Mitigation | Plan B |
|--------|-------------|--------|------------|--------|
| **API Claude indisponible ou instable** | **Moyenne** | Critique | **Valider l'accès et la stabilité avant le sprint.** Monitoring 24h avant. | **Basculer sur un modèle de secours (ex: GPT-4o).** Vidéo pré-enregistrée. |
| **Latence API >5s** | Moyenne | Élevé | Utiliser le plan Vercel Pro (always-on). Timeout à 8s + retry. | Message "Max réfléchit..." avec loader. |
| ... | ... | ... | ... | ... |

---

## 10. Script de Démonstration - **MODIFIÉ**

### Phase 3 : Conclusion & Vision (30 secondes)

**Script :**

> "Ce que vous venez de voir, c'est la première brique. Mais imaginez :
> - Des exercices cognitifs personnalisés...
> - Un dashboard RH...
>
> Neuroptimize, ce n'est pas une app de méditation. C'est un **système d'exploitation pour votre cerveau**, avec un modèle économique B2B ciblant les entreprises tech à **5-8€ par utilisateur/mois**.
>
> Max est déployé, vous pouvez l'essayer maintenant."

---

## 11. Décisions de Design Validées

[Section mise à jour avec les nouvelles décisions]

| Question | Décision | Justification |
|----------|----------|---------------|
| **Ton & Clarté** | Ton "Warm Competence". Explication simple d'abord, puis analogie. | Préserve l'identité de marque tout en maximisant la clarté pour un utilisateur stressé. |
| **Architecture POC** | Flow guidé uniquement, avec dette technique actée pour le passage au texte libre. | Sécurise la démo à court terme tout en planifiant la viabilité du produit à long terme. |
| **Accessibilité** | WCAG AA minimum, notamment pour le widget de respiration. | Inclusivité et professionnalisme non-négociables. |

---

[Sections 12. Annexes et suivantes restent inchangées, mais les informations qu'elles contiennent (ex: clé API) doivent être gérées avec la plus grande rigueur comme spécifié dans les modifications.]