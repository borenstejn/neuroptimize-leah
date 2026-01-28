# Architecture Technique - À définir

## Décisions à prendre

Ce document liste les choix techniques à faire avant le développement.

---

## 1. Nature du chatbot "Max"

### Option A : LLM conversationnel (GPT/Claude)

**Avantages :**
- Conversations naturelles et fluides
- Personnalisation poussée des réponses
- Capacité à comprendre le contexte
- Évolutif sans recoder

**Inconvénients :**
- Coût par requête (API)
- Risque de réponses hors sujet (hallucinations)
- Latence réseau
- Dépendance fournisseur

**Stack possible :**
- OpenAI GPT-4 / Anthropic Claude
- LangChain pour l'orchestration
- Prompt engineering + guardrails

### Option B : Arbre décisionnel / Flows

**Avantages :**
- Contrôle total du parcours
- Pas de coût par requête
- Réponses prédictibles
- Fonctionne offline

**Inconvénients :**
- Moins naturel
- Maintenance des arbres complexe
- Pas de vraie "conversation"

**Stack possible :**
- Botpress, Rasa, Dialogflow
- State machine custom

### Option C : Hybride (recommandé ?)

- **Exercices structurés** : flows prédéfinis
- **Feedback/encouragements** : LLM pour personnalisation
- **Analyse des réponses ouvertes** : LLM

---

## 2. Stack technique web

### Frontend

| Option | Pour | Contre |
|--------|------|--------|
| **Next.js** | SSR, React, écosystème riche | Learning curve |
| **Nuxt.js** | Vue, plus simple | Moins de libs |
| **SvelteKit** | Léger, performant | Écosystème plus petit |

### Backend

| Option | Pour | Contre |
|--------|------|--------|
| **Node.js (Express/Fastify)** | JS partout, rapide | Callback hell |
| **Python (FastAPI)** | Bon pour ML/IA, lisible | 2 langages |
| **Supabase** | BaaS, rapide à setup | Moins de contrôle |

### Base de données

| Option | Pour | Contre |
|--------|------|--------|
| **PostgreSQL** | Robuste, SQL, gratuit | Setup |
| **Supabase** | PostgreSQL + auth + API | Vendor lock-in |
| **MongoDB** | Flexible, JSON natif | Pas de relations |
| **PlanetScale** | MySQL serverless | Coût à l'échelle |

---

## 3. Authentification

### Options

| Solution | Pour | Contre |
|----------|------|--------|
| **Auth0** | Complet, SSO enterprise | Coût |
| **Clerk** | DX excellente, moderne | Moins de SSO |
| **Supabase Auth** | Intégré si Supabase | Limité |
| **NextAuth.js** | Gratuit, flexible | À configurer |

### Besoins enterprise

- SSO (SAML, OIDC) pour grandes entreprises
- Active Directory / Azure AD
- Multi-tenant (isolation par entreprise)

---

## 4. Hébergement

### Contraintes

- **RGPD** : données en Europe
- **HDS** : si données de santé (à clarifier juridiquement)
- **Performance** : temps de réponse < 500ms

### Options

| Solution | RGPD | HDS | Coût |
|----------|------|-----|------|
| **Vercel** | EU possible | Non | $$ |
| **Scaleway** | Oui (FR) | Option | $ |
| **OVH** | Oui (FR) | Option | $ |
| **Clever Cloud** | Oui (FR) | Option | $$ |
| **AWS (Paris)** | Oui | Non natif | $$$ |

---

## 5. Gamification

### Éléments à implémenter

- Points / XP
- Niveaux
- Badges / Trophées
- Streaks (jours consécutifs)
- Classement (optionnel, attention à la compétition)
- Objets virtuels à collectionner

### Stockage

- Table `user_achievements`
- Table `user_points`
- Table `user_streaks`

---

## 6. Analytics & Suivi

### Pour l'utilisateur

- Progression exercices cognitifs
- Scores par fonction (mémoire, attention, flexibilité)
- Historique cohérence cardiaque
- Évolution questionnaires

### Pour les RH (dashboard admin)

- Taux de participation
- Scores agrégés (anonymisés)
- Évolution dans le temps
- Alertes si score < seuil

### Stack analytics

| Option | Pour | Contre |
|--------|------|--------|
| **Custom (PostgreSQL)** | Contrôle total, RGPD | Dev à faire |
| **Mixpanel** | Puissant | US, coût |
| **PostHog** | Open source, EU hosting | Setup |
| **Metabase** | Dashboards faciles | Pas temps réel |

---

## 7. Conformité RGPD / HDS

### Questions juridiques à clarifier

1. Les données collectées sont-elles des "données de santé" au sens RGPD ?
   - Si oui → HDS obligatoire
   - Si questionnaires bien-être génériques → probablement non

2. Quelles données l'employeur peut-il voir ?
   - Recommandé : uniquement agrégé, jamais individuel

3. Consentement
   - Opt-in explicite
   - Droit de suppression

### Mesures techniques

- Chiffrement at rest et in transit
- Pseudonymisation des données
- Logs d'accès
- Politique de rétention

---

## 8. MVP vs V2

### MVP (Phase 1)

| Feature | Inclus | Exclu |
|---------|--------|-------|
| Chatbot Max | Flow basique | LLM avancé |
| Exercices cognitifs | 5-10 exercices | Bibliothèque complète |
| Cohérence cardiaque | 1 protocole (365) | Variantes |
| Questionnaire | Hebdomadaire simple | SATIN complet |
| Gamification | Points + badges | Objets virtuels |
| Dashboard user | Basique | Analytics poussés |
| Dashboard RH | Non | V2 |
| Mobile app | Non | V2 |
| SSO enterprise | Non | V2 |

### Estimation stack MVP

```
Frontend: Next.js + Tailwind
Backend: Supabase (auth + DB + API)
Hosting: Vercel (EU)
LLM: OpenAI GPT-4 (pour feedback personnalisé)
```

---

## Questions ouvertes

- [ ] Budget infrastructure mensuel ?
- [ ] Compétences disponibles (React ? Vue ? Python ?)
- [ ] Timeline MVP ?
- [ ] Premiers clients pour POC ?
- [ ] Validation juridique RGPD/HDS ?
