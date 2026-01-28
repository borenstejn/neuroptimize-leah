# Contexte LLM - Neuroptimize

Ce dossier contient toute la documentation nécessaire pour développer la solution Neuroptimize.

## Structure du dossier

| Fichier | Description |
|---------|-------------|
| `01_PROJET_SPECS.md` | Vision produit, équipe, specs fonctionnelles, points d'interrogation |
| `02_REMEDIATION_COGNITIVE.md` | Recherche sur les exercices cognitifs (mémoire, attention, flexibilité) |
| `03_COHERENCE_CARDIAQUE.md` | Protocole 365, techniques de respiration |
| `04_QUESTIONNAIRES_QVT.md` | Questionnaires bien-être, SATIN, bonnes pratiques |
| `05_ARCHITECTURE_TECHNIQUE.md` | Décisions techniques, stack, contraintes |
| `06_DESIGN_GUIDELINES.md` | Palette couleurs, typographie, tokens Tailwind |
| **`PRD_POC_MAX.md`** | **PRD v3.0 - Document principal pour la démo vendredi** |

### Fichiers d'analyse LLM

| Fichier | Description |
|---------|-------------|
| `PROMPT_OPTION_A_O3_BLINDAGE.md` | Prompt envoyé à o3 pour blindage logique |
| `PROMPT_OPTION_B_GROK_COPYWRITING.md` | Prompt envoyé à Grok pour copywriting |
| `O3_RESPONSE_BLINDAGE.md` | Réponse o3 : edge cases, system prompt blindé |
| `GROK4_RESPONSE_COPYWRITING.md` | Réponse Grok 4.1 : punchlines, analogies |
| `GROK4_FULL_RESPONSE_COPYWRITING.md` | Réponse Grok 4 full : version détaillée |

### Code Snippets (prêts à copier)

| Fichier | Description |
|---------|-------------|
| `../code-snippets/prompts.ts` | System prompt + messages hardcodés |
| `../code-snippets/breathing-widget.tsx` | Widget respiration avec Framer Motion |
| `../code-snippets/page-integration.tsx` | Exemple intégration page.tsx |
| `../code-snippets/api-chat-route.ts` | Route API Next.js pour Claude |

## Le projet en une phrase

**Neuroptimize** = Chatbot IA "Max" pour entreprises qui propose exercices de remédiation cognitive + cohérence cardiaque + questionnaires bien-être, avec gamification et suivi de progression.

## POC Vendredi - État actuel

**PRD v3.1 - Super-Prompt Final** :
- ✅ Structure blindée (o3) + Style punchy (Grok 4.1) + Validation (Gemini)
- ✅ Personnalité : "The SysAdmin of the Brain" (pas wellness fluff)
- ✅ Analogies : "Trop d'onglets dans ta RAM", "Batterie cognitive à 2%"
- ✅ Intro : "Ton cerveau est en bug ? Pas de câlins bisounours"
- ✅ Timer démo 60s (pas 3 min)
- ✅ Edge cases couverts (API fail, troll, détresse)
- ✅ Trigger debrief automatique après widget

## Équipe

- **Paola Scemama-Ittah** (DG) : Neuropsychologue, fournit le contenu scientifique
- **Leah Weil** (COO) : Business, modèle économique
- **CTO** (à recruter) : Développement du produit

## Cible

- B2B : Entreprises (RH, responsables bien-être)
- Utilisateurs finaux : Salariés en situation de stress/surcharge cognitive

## Contacts

- Paola : paolaittah@hotmail.com
- Leah : leahweil2@gmail.com / +33 6 09 21 27 36
- Site : www.mowglie-coaching.com
