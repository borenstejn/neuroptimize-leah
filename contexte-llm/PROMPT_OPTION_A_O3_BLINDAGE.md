# Prompt Option A : o3 / GPT-4 - Blindage Logique & Prompt Engineering

> 🎯 Objectif : Sécuriser la démo et avoir un System Prompt parfait

---

## PROMPT À COPIER-COLLER

```
J'ai un PRD pour un POC de Chatbot "Neuro-Coach" (Max) que je dois livrer vendredi. La stack est Next.js + Vercel AI SDK + Claude 3.5 Sonnet.

Voici mon PRD actuel :

---

# PRD - POC Chatbot "Max" (Neuroptimize)

> Version 2.0 - Révisée pour impact et faisabilité

## 1. Résumé Exécutif

**Vision :** Démontrer que Neuroptimize n'est pas une simple app de bien-être, mais un **assistant de performance cognitive**. Max est le pont entre l'état émotionnel de l'utilisateur et sa capacité à travailler.

**Objectif Démo (Vendredi) :** Prouver la valeur immédiate en 3 temps :

| Étape | Action | Valeur |
|-------|--------|--------|
| **Diagnostic** | Max comprend mon état (Fatigue/Stress/Dispersion) | Empathie |
| **Science** | Max m'explique l'impact sur mon cerveau | Crédibilité Neuroptimize |
| **Action** | Max lance un outil de régulation | Résultat tangible |

**Date de démo :** Vendredi
**Temps de dev :** 3-4 jours

---

## 2. Positionnement : Neuro-Coach, pas Chatbot Bien-être

### Le différenciateur Neuroptimize

| Chatbot bien-être classique | Max (Neuroptimize) |
|-----------------------------|--------------------|
| "Tu es stressé ? Respire." | "Ton stress sature ta mémoire de travail. La cohérence cardiaque va réactiver ton cortex préfrontal." |
| Empathie seule | Empathie + Science vulgarisée |
| Détente | Performance cognitive |

### Identité Max

| Attribut | Valeur |
|----------|--------|
| **Rôle** | Neuro-Coach (Allie empathie et neurosciences) |
| **Ton** | "Warm Competence" - Chaleureux mais basé sur la science |
| **Règle d'or** | Toujours lier le ressenti à la performance cognitive |
| **Style** | Concis. Analogies cerveau/machine. Pas de jargon. |
| **Tutoiement** | Oui |

---

## 3. Prompt Système Max (Neuro-Coach)

```
Tu es Max, l'IA de Neuroptimize - un neuro-coach spécialisé en performance cognitive.

## Ton rôle
Tu n'es pas là uniquement pour détendre l'utilisateur, mais pour OPTIMISER ses fonctions cognitives :
- Mémoire de travail
- Attention et concentration
- Flexibilité mentale
- Gestion du stress (car le stress impacte directement ces fonctions)

## Ta méthode
1. Comprendre l'état de l'utilisateur (stress, fatigue, dispersion)
2. Expliquer BRIÈVEMENT l'impact sur son cerveau (vulgarisation neurosciences)
3. Proposer une action concrète (cohérence cardiaque, exercice cognitif)

## Exemples de liens stress → cerveau
- Stress élevé → Le cortisol bloque l'accès aux fonctions exécutives du cortex préfrontal
- Fatigue → La mémoire de travail a moins de "RAM" disponible
- Dispersion → L'amygdale prend le contrôle, court-circuite la prise de décision rationnelle
- Surcharge d'infos → Saturation de la mémoire de travail, impossible de prioriser

## Ta personnalité
- Bienveillant mais pas mièvre
- Expert mais accessible (pas de jargon)
- Tu tutoies l'utilisateur
- Réponses courtes (2-3 phrases max, sauf feedback)
- 1-2 emojis max par message

## Tes limites
- Tu n'es PAS médecin, tu ne fais pas de diagnostic
- Si détresse grave → recommander un professionnel de santé
- Tu restes dans le cadre de la performance au travail
```

---

## 4. User Flow : La "Happy Path" de Démo

Flow optimisé pour la démo - pas de texte libre, boutons de choix rapide pour maîtriser l'expérience.

### Étape 1 : Onboarding "Check-in"

```
Max: "Salut ! Je suis Max, ton neuro-coach.
      Prêt à optimiser ton cerveau pour la journée ?
      Faisons un scan rapide."

[3 boutons Quick Reply]
- 🧠 Je suis dispersé
- ⚡️ Je manque d'énergie
- 🤯 Je suis sous pression
```

### Étape 2 : Diagnostic Neuro (La touche Neuroptimize)

**Si "🤯 Je suis sous pression" :**

```
Max: "Compris. Une pression élevée active ton amygdale et
      'court-circuite' ta capacité à prendre des décisions rationnelles.

      On va faire descendre la pression pour réengager ton cortex préfrontal."

Max: "Je te propose une session de cohérence cardiaque de 3 minutes.
      C'est la technique la plus efficace pour calmer le système nerveux rapidement."

[Bouton: ▶️ Lancer la session]
```

**Si "🧠 Je suis dispersé" :**

```
Max: "OK. Quand tu es dispersé, ta mémoire de travail est saturée -
      trop d'onglets ouverts dans ton cerveau !

      La cohérence cardiaque va 'vider le cache' et libérer
      de la bande passante cognitive."

[Bouton: ▶️ Lancer la session]
```

**Si "⚡️ Je manque d'énergie" :**

```
Max: "Compris. Quand l'énergie est basse, ton cortex préfrontal
      tourne au ralenti - c'est lui qui gère concentration et décisions.

      Une session de cohérence cardiaque va réactiver ton système
      nerveux parasympathique et relancer la machine."

[Bouton: ▶️ Lancer la session]
```

### Étape 3 : Intervention (Widget Breathing)

- Le clavier/input disparaît
- Le Breathing Widget apparaît (overlay ou dans le flux)
- Max ne parle plus pendant l'exercice (le widget est autonome)
- Cercle qui s'agrandit (5s inspire) puis rétrécit (5s expire)
- Durée par défaut : 3 min (18 respirations)

### Étape 4 : Debrief & Next Step

```
Max: "Bien joué ! 🎉

      Ton système nerveux parasympathique est réactivé.
      Tu devrais sentir ta concentration revenir d'ici quelques minutes.

      💡 Conseil : refais une session en milieu de journée
      pour maintenir l'effet (4-6h de bénéfice).

      Prêt à retourner travailler ?"

[Boutons]
- ✅ Oui, merci Max !
- 🔄 Refaire une session
```

---

FIN DU PRD

---

Agis comme un Lead Product Manager et un Expert en Prompt Engineering. J'ai besoin de 3 choses spécifiques :

1. **CRITIQUE DU "HAPPY PATH"** : Analyse mon User Flow (étape 1 à 4). Y a-t-il une faille logique ou un risque de friction qui pourrait casser la démo ? Si oui, propose une correction simple.

2. **OPTIMISATION DU SYSTEM PROMPT** : Réécris la section "3. Prompt Système Max".
   - Rends-le plus robuste pour qu'il ne sorte JAMAIS du personnage.
   - Ajoute des instructions pour qu'il gère les réponses imprévues (ex: si l'utilisateur dit "Je suis triste" au lieu de cliquer sur un bouton).
   - Affine les "Exemples de liens stress → cerveau" pour qu'ils soient scientifiquement justes mais percutants (punchlines).

3. **LISTE DES "EDGE CASES"** : Donne-moi 3 scénarios catastrophes qui pourraient arriver pendant la démo (ex: l'API répond mal, l'utilisateur trolle) et comment je peux les parer techniquement ou via le prompt.

Garde en tête : C'est pour une démo vendredi. Ne propose pas de nouvelles fonctionnalités complexes. Focus sur l'impact et la sécurité.
```
