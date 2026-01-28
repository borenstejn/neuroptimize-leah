# Cohérence Cardiaque - Recherche

## Définition

La cohérence cardiaque est une technique de respiration contrôlée qui synchronise le rythme cardiaque avec la respiration, activant le système nerveux parasympathique pour réduire le stress.

## Le Protocole 365 (Standard)

### Les 3 chiffres clés

| Chiffre | Signification |
|---------|---------------|
| **3** | 3 fois par jour |
| **6** | 6 respirations par minute |
| **5** | 5 minutes par session |

### Détail du cycle respiratoire

**Protocole de base :**
- **Inspiration** : 5 secondes
- **Expiration** : 5 secondes
- = 10 secondes/cycle = 6 cycles/minute

**Variante relaxante (expiration longue) :**
- **Inspiration** : 4 secondes
- **Expiration** : 6 secondes
- Effet : relaxation plus profonde

**Variante 3-3-6 :**
- **Inspiration** : 3 secondes
- **Rétention** : 3 secondes
- **Expiration** : 6 secondes

### Moments recommandés

| Moment | Raison |
|--------|--------|
| **Matin au réveil** | Démarrer la journée serein (à jeun, avant café) |
| **Avant le déjeuner** | Évacuer les tensions de la matinée |
| **Fin d'après-midi** | Transition vers la soirée |

### Durée des effets

- Effets physiologiques : **4 à 6 heures**
- D'où l'intérêt de 3 sessions/jour

## Position et environnement

### Position recommandée
- **Assis** (de préférence, pas allongé)
- Dos droit
- Pieds à plat au sol
- Mains sur les cuisses ou la table
- Ne pas croiser les jambes

### Environnement
- Endroit calme
- Possibilité de fermer les yeux
- Éviter les distractions

## Effets physiologiques

### Immédiats (pendant l'exercice)
- Ralentissement du rythme cardiaque
- Baisse de la pression artérielle
- Activation du nerf vague
- Réduction du cortisol (hormone du stress)

### À moyen terme (pratique régulière)
- Meilleure gestion du stress
- Amélioration de la concentration
- Meilleure qualité de sommeil
- Renforcement du système immunitaire
- Réduction de l'anxiété

## Implémentation dans un chatbot

### Animation visuelle guidée

```
[Cercle qui s'agrandit pendant 5 sec]
Max: Inspirez...

[Cercle qui rétrécit pendant 5 sec]
Max: Expirez...

[Compteur: 1/30 respirations]
[Timer: 4:50 restantes]
```

### Éléments UI nécessaires

1. **Animation visuelle**
   - Cercle/forme qui pulse au rythme de la respiration
   - Couleurs apaisantes (bleu, vert)

2. **Guide audio** (optionnel)
   - Voix douce "Inspirez... Expirez..."
   - Ou simple son/gong

3. **Compteurs**
   - Nombre de respirations
   - Temps restant
   - Temps total de pratique (historique)

4. **Personnalisation**
   - Choix du protocole (5-5, 4-6, 3-3-6)
   - Durée de session (3, 5, 7 min)
   - Avec/sans son

### Flow utilisateur type

```
Max: Prêt pour ta session de cohérence cardiaque ?
Max: [Boutons: 3 min / 5 min / 7 min]

User: [Clique 5 min]

Max: Installe-toi confortablement, dos droit, pieds au sol.
Max: On commence dans 3... 2... 1...

[Animation de respiration guidée x 30 cycles]

Max: Bravo ! Session terminée.
Max: Tu as pratiqué 5 min aujourd'hui (total semaine: 25 min)
Max: Comment te sens-tu ? [Bien / Neutre / Pas top]
```

## Gamification possible

- **Streak** : X jours consécutifs de pratique
- **Badge** : "7 jours de cohérence"
- **Statistiques** : temps total, régularité
- **Objectif hebdo** : 3x5min minimum

## Sources

- [Florence Servan-Schreiber - 5 minutes de cohérence cardiaque](https://www.florenceservanschreiber.com/outils/5-minutes-de-coherence-cardiaque/)
- [Santé Respiratoire France - Tout savoir sur la cohérence cardiaque](https://sante-respiratoire.com/tout-savoir-sur-la-coherence-cardiaque/)
- [CHU Besançon - Découvrir la cohérence cardiaque](https://www.chu-besancon.fr/fileadmin/user_upload/MEDIATHEQUE/Professionnels/Soutien_psy_personnel_COVID19/Decouvrir_la_coherence_cardiaque.pdf)
- [IFEMDR - 5 minutes de cohérence cardiaque](https://www.ifemdr.fr/5-minutes-de-coherence-cardiaque/)
- [Université Laval - Cohérence cardiaque](https://www.ulaval.ca/mon-equilibre-ul/mes-habitudes-de-vie/coherence-cardiaque)
