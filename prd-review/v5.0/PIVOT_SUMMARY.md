# PIVOT STRATÉGIQUE v5.0 : Du Widget de Respiration à la Remédiation Cognitive

## Résumé Exécutif du Changement

Le PRD v4.0 était **complètement hors-sujet**. La vidéo de Léah et Paola montre clairement qu'elles veulent :

1. **Des exercices de remédiation cognitive** (pas juste de la respiration)
2. **Un protocole scientifique** (Encodage → Distraction → Rappel)
3. **Un ton professionnel/bienveillant** (pas "sysadmin du cerveau")

## Nouveau Scope (MVP pour Vendredi)

### Exercices à Implémenter

1. **Mémorisation de 4 Mots** (mémoire épisodique)
   - Encodage : Afficher pomme, soleil, chat, montagne
   - Distraction : "Comment te sens-tu ?"
   - Si stress → Cohérence cardiaque (widget 60s)
   - Rappel : QCM avec 4 options
   - Feedback : Explication scientifique

2. **Ordre d'Allumage de Quadrants** (mémoire de travail)
   - Animation : Séquence 2→4→1→3
   - Rappel : QCM avec schémas visuels
   - Feedback : Félicitations

### Stack Technique (Simplifié)

- Next.js + Tailwind
- Vercel AI SDK (useChat)
- Claude 3.5 Sonnet
- Framer Motion (animations)

### Plan de Dev (12h total)

**Jeudi :**
- Matin : Setup + Flow Exercice 1 (Encodage)
- Après-midi : Widget Respiration + Rappel QCM

**Vendredi Matin :**
- Polish + Debug
- Déploiement
- (Optionnel) Exercice 2

## Différences clés vs v4.0

| Aspect | v4.0 | v5.0 |
|--------|------|------|
| Focus | Widget respiration | Exercices cognitifs |
| Persona | "SysAdmin cerveau" | "Coach professionnel" |
| Ton | Analogies CPU/RAM | Science vulgarisée |
| Scope | Sur-ingéniérie | 2 exercices hardcodés |


