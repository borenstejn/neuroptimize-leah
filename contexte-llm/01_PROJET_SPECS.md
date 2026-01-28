# Neuroptimize - Spécifications Projet

## Vision

Programme de remédiation cognitive B2B sous forme de chatbot IA ("Max") pour améliorer la santé mentale et la performance des salariés en entreprise.

## Problème adressé

- Stress chronique des employés → impact santé mentale + mémoire + efficacité
- Coût du mal-être : 3000€/an/collaborateur (Assurance Maladie)
- 23 milliards €/an en France pour la souffrance psychique
- Distractions constantes (emails, notifications) saturent la mémoire de travail

## Fonctionnalités définies (source: dossier PDF)

### 1. Exercices de remédiation cognitive
- Améliorer : mémoire de travail, attention, flexibilité mentale
- Format : via le chatbot Max
- Fréquence : "sessions courtes et régulières, plusieurs fois par semaine"

### 2. Cohérence cardiaque
- Exercices de respiration guidés
- Objectif : gestion du stress, alignement corps/esprit

### 3. Méditation
- Complémentaire à la cohérence cardiaque
- Objectif : bien-être émotionnel

### 4. Questionnaires de positionnement
- Évaluer l'état de bien-être des utilisateurs
- Suivi dans le temps

### 5. Gamification
- Trophées virtuels après chaque exercice
- Objets virtuels à collectionner
- Succès à débloquer
- Encouragements personnalisés

### 6. Suivi & Analytics
- Tests standardisés avant/après programme
- Indicateurs : mémoire de travail, attention, flexibilité cognitive
- Tableaux de bord pour apprenants
- Rapports/bilans pour RH

## Déploiement prévu

- Phase 1 : Interface web
- Phase 2 : Application mobile
- Adaptation selon besoins de chaque entreprise cliente

## Modèle économique

| Segment | Prix/utilisateur/mois |
|---------|----------------------|
| Individuel | 200-300€ HT |
| Entreprise (volume) | 100-150€ HT |

Référence : programme cabinet = 600€/patient

## Différenciation vs concurrence

| Concurrent | Limite |
|------------|--------|
| Cogmed | Contexte médical/éducatif, pas entreprise |
| HappyNeuron, NeuroNation | Pas intégrés en entreprise |
| Trello, Slack | Organisent le travail mais ne restaurent pas les capacités cognitives |

**Neuroptimize se différencie par :**
- Agent conversationnel personnalisé (Max)
- Conçu spécifiquement pour le contexte professionnel
- Combine cognitif + émotionnel (remédiation + cohérence cardiaque)
- Suivi de progression avec indicateurs

---

## Points d'interrogation à clarifier

### Contenu (questions pour Paola)

| Question | Impact |
|----------|--------|
| Format exact des exercices cognitifs ? | Mini-jeux ? Texte ? Images ? Vidéo ? |
| Combien d'exercices au total ? | Volume de dev |
| Protocole de remédiation ? | Durée programme, fréquence, adaptatif ou linéaire ? |
| Contenu existant ou à créer ? | Planning |
| Quels questionnaires exactement ? | Nombre de questions, échelles |

### UX / Parcours

| Question | Impact |
|----------|--------|
| Onboarding ? | Test initial pour personnaliser ? |
| Durée d'une session ? | 5 min ? 15 min ? |
| Notifications/rappels ? | Push, email, SMS ? |
| Personnalisation ? | Adaptatif selon progression ou parcours fixe ? |

### Technique

| Question | Impact |
|----------|--------|
| Nature du chatbot ? | LLM (GPT/Claude) ? Arbre décisionnel ? Hybride ? |
| Hébergement ? | Cloud FR ? HDS obligatoire ? |
| Données de santé ? | RGPD, anonymisation, consentement |
| Intégration entreprise ? | SSO, API RH, multi-tenant, white-label ? |

### Business

| Question | Impact |
|----------|--------|
| Scope MVP ? | Features in/out pour v1 |
| Timeline ? | Date cible présentation clients |
| Budget dev ? | Ressources disponibles |
| Premiers clients cibles ? | Pour POC |

---

## Livrables attendus du CTO

1. **MVP du chatbot Max** présentable aux clients
2. **Interface web** (app mobile en phase 2)
3. **Tableaux de bord** suivi apprenants
4. **Rapports/bilans** pour RH
5. **Conformité RGPD**
