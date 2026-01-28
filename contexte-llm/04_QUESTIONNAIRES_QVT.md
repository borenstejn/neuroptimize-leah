# Questionnaires Bien-être / QVT - Recherche

## Objectifs des questionnaires

1. **Évaluer** l'état de bien-être initial (baseline)
2. **Suivre** l'évolution dans le temps
3. **Détecter** les signaux faibles (RPS, burn-out)
4. **Personnaliser** le parcours selon les besoins
5. **Mesurer** l'impact du programme (ROI pour les RH)

## Questionnaire de référence : SATIN (INRS)

### Présentation
- Développé par l'INRS + Université de Lorraine
- Outil validé scientifiquement
- Conçu pour la prévention des RPS en entreprise

### Dimensions évaluées
- Santé somatique
- Stress perçu
- Risques psychosociaux
- Environnement de travail
- Relations professionnelles

### Caractéristiques
- Durée : ~20 minutes
- Format : auto-questionnaire
- Anonyme

## Thématiques à couvrir

### 1. Santé mentale et émotionnelle

| Thème | Exemples de questions |
|-------|----------------------|
| Stress | "Sur une échelle de 1-10, quel est votre niveau de stress cette semaine ?" |
| Fatigue mentale | "Vous sentez-vous mentalement épuisé(e) en fin de journée ?" |
| Anxiété | "Ressentez-vous de l'inquiétude concernant votre travail ?" |
| Humeur | "Comment décririez-vous votre humeur générale ?" |

### 2. Charge cognitive

| Thème | Exemples de questions |
|-------|----------------------|
| Surcharge | "Avez-vous l'impression d'avoir trop de choses à gérer en même temps ?" |
| Concentration | "Arrivez-vous à vous concentrer sur une tâche sans interruption ?" |
| Mémoire | "Vous arrive-t-il d'oublier des tâches ou des rendez-vous ?" |
| Distractions | "Les notifications/emails perturbent-ils votre travail ?" |

### 3. Équilibre vie pro/perso

| Thème | Exemples de questions |
|-------|----------------------|
| Déconnexion | "Arrivez-vous à déconnecter du travail le soir/week-end ?" |
| Temps personnel | "Avez-vous suffisamment de temps pour vos activités personnelles ?" |
| Sommeil | "Dormez-vous suffisamment (7-8h) ?" |

### 4. Environnement de travail

| Thème | Exemples de questions |
|-------|----------------------|
| Relations | "Comment qualifiez-vous vos relations avec vos collègues ?" |
| Management | "Vous sentez-vous soutenu(e) par votre hiérarchie ?" |
| Reconnaissance | "Votre travail est-il reconnu à sa juste valeur ?" |
| Sens | "Trouvez-vous du sens dans votre travail quotidien ?" |

## Formats de réponses

### Échelle de Likert (5 points)
```
1 = Pas du tout d'accord
2 = Plutôt pas d'accord
3 = Neutre
4 = Plutôt d'accord
5 = Tout à fait d'accord
```

### Échelle numérique (0-10)
```
0 -------- 5 -------- 10
Pas du tout       Énormément
```

### Fréquence
```
- Jamais
- Rarement
- Parfois
- Souvent
- Toujours
```

### Emojis (mobile-friendly)
```
😫 😕 😐 🙂 😊
```

## Bonnes pratiques

### Conception
- **15 questions max** (10-15 min de complétion)
- Questions claires et concises
- Éviter le jargon
- Mix questions fermées + 1-2 ouvertes

### Administration
- **Anonymat garanti** (réponses plus sincères)
- Fréquence : hebdomadaire (court) ou mensuelle (complet)
- Même moment de la semaine (ex: vendredi matin)

### Restitution
- Feedback immédiat à l'utilisateur (son score, tendance)
- Données agrégées pour les RH (pas individuelles)
- Comparaison avec la moyenne / objectifs

## Implémentation chatbot

### Questionnaire rapide quotidien (2 min)

```
Max: Comment te sens-tu ce matin ?
[😫 😕 😐 🙂 😊]

Max: Quel est ton niveau d'énergie ?
[Slider 1-10]

Max: Un mot pour décrire ton état d'esprit ?
[Champ texte libre]

Max: Merci ! Ton score bien-être du jour : 7/10
Max: C'est mieux qu'hier (+1) ! Continue comme ça 💪
```

### Questionnaire hebdomadaire (10 min)

```
Max: C'est vendredi ! Faisons le point sur ta semaine.

[10-12 questions Likert sur les 4 thématiques]

Max: Résultat de ta semaine :
- Stress : 6/10 (↓ vs semaine dernière)
- Énergie : 5/10 (stable)
- Concentration : 7/10 (↑ +2 !)
- Équilibre : 4/10 (attention)

Max: Je te recommande de prioriser la cohérence cardiaque cette semaine.
```

### Questionnaire initial (onboarding)

Plus complet (~20 questions) pour :
- Établir une baseline
- Identifier les points faibles
- Personnaliser le parcours

## Indicateurs clés (KPIs)

### Pour l'utilisateur
- Score bien-être global (0-100)
- Évolution semaine/mois
- Points forts / axes d'amélioration

### Pour les RH (agrégé)
- Score moyen équipe/département
- Évolution dans le temps
- Taux de participation
- Alertes si score < seuil

## Conformité RGPD

- Consentement explicite avant collecte
- Données anonymisées pour reporting RH
- Droit d'accès/suppression pour l'utilisateur
- Pas de partage données individuelles avec l'employeur
- Hébergement sécurisé (HDS si données de santé)

## Sources

- [INRS - Questionnaire SATIN](https://www.inrs.fr/risques/bien-etre-travail/questionnaire-satin.html)
- [Teale - Questionnaire QVT](https://www.teale.io/blog/questionnaire-qvt)
- [CSE Guide - Questionnaire QVT](https://www.cse-guide.fr/questionnaire-qvt/)
- [Zola - Questionnaire bien-être exemple](https://www.zola.fr/fiches-pratiques/questionnaire-bien-etre-au-travail-exemple)
- [QuarksUp - Créer questionnaire bien-être](https://www.quarksup.com/creer-questionnaire-bien-etre-au-travail/)
