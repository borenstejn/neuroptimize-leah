# Testing Checklist - Neuroptimize POC v5.3

Checklist de validation manuelle complète de l'application.

## ✅ Setup et Build

- [ ] `npm install` fonctionne sans erreur
- [ ] `npm run build` compile sans erreur
- [ ] `npm run dev` démarre le serveur de développement
- [ ] Application accessible sur http://localhost:3000
- [ ] Aucune erreur dans la console navigateur au chargement

## ✅ Interface Utilisateur

### Layout et Design
- [ ] Dégradé de fond visible (bleu → blanc → violet)
- [ ] Header "Neuroptimize" affiché correctement
- [ ] Layout 2 colonnes sur desktop (Chat + Grille)
- [ ] Layout stack vertical sur mobile
- [ ] Font Inter chargée correctement
- [ ] Pas de décalages visuels (CLS)

### Chat
- [ ] Avatar Max visible (rond, dégradé bleu-violet)
- [ ] Message intro de Max s'affiche au chargement
- [ ] Bouton "Commencer" visible
- [ ] Bulles différenciées user/assistant (couleur, position)
- [ ] Auto-scroll fonctionne (nouveaux messages visibles)

### Grille Neuronale
- [ ] Grille 4x4 (16 neurones) affichée
- [ ] Neurones en gris (état idle) initialement
- [ ] Container avec backdrop-blur visible
- [ ] Responsive (taille adaptée mobile/desktop)

## ✅ Flow Complet - Succès 100%

### Phase Intro
- [ ] Message intro de Max présent
- [ ] Bouton "Commencer" cliquable
- [ ] Clic sur "Commencer" démarre l'exercice

### Phase Encoding
- [ ] Message "Observe bien la séquence" s'affiche
- [ ] Neurones s'activent un par un (bleu)
- [ ] Animation scale + shadow visible
- [ ] Durée ~500ms par neurone
- [ ] Nombre de neurones = niveau (5 par défaut)
- [ ] Pas de doublons consécutifs visibles

### Phase Retention
- [ ] Message "Mémorise bien" s'affiche
- [ ] Délai de 2 secondes visible
- [ ] Grille en état idle pendant le délai

### Phase Recall
- [ ] Message "À toi. Clique..." s'affiche
- [ ] Neurones cliquables (cursor pointer)
- [ ] Clic enregistre la sélection (neurone devient bleu)
- [ ] Compteur de progression visible (dev mode)
- [ ] Séquence complète = transition automatique

### Phase Feedback
- [ ] Message de feedback s'affiche immédiatement
- [ ] Message contient le score (5/5, 100%)
- [ ] Message contient explication neuroscientifique
- [ ] Message mentionne "Excellent" ou équivalent
- [ ] Boutons "Continuer" + "Arrêter" visibles
- [ ] Neurones affichent correct (vert) ou wrong (rouge)

## ✅ Flow Complet - Succès Partiel (60-99%)

- [ ] Reproduire séquence avec 3/5 ou 4/5 correct
- [ ] Message feedback adapté ("Bien", pourcentage affiché)
- [ ] Explication présente
- [ ] Boutons présents
- [ ] Neurones corrects en vert, faux en rouge

## ✅ Flow Complet - Échec (<60%)

- [ ] Reproduire séquence avec 0/5 ou 1/5 correct
- [ ] Message feedback normalisateur ("C'est normal", "muscle")
- [ ] Ton empathique présent
- [ ] Explication neuroscientifique
- [ ] Boutons présents
- [ ] Affichage correct/wrong cohérent

## ✅ Adaptation du Niveau

### Montée de niveau
- [ ] Faire 2 succès consécutifs à 100%
- [ ] Message feedback mentionne "Niveau suivant : 6"
- [ ] Prochain essai a 6 éléments (pas 5)
- [ ] Séquence générée correctement à 6

### Descente de niveau
- [ ] Faire un échec (<60%)
- [ ] Message feedback mentionne "niveau 4" (si on était à 5)
- [ ] Prochain essai a 4 éléments
- [ ] Séquence générée correctement à 4

### Maintien du niveau
- [ ] Faire un succès partiel (60-99%)
- [ ] Message mentionne "On reste au niveau X"
- [ ] Prochain essai même niveau
- [ ] Succès consécutifs remis à 0 (tester en faisant 100% → 80% → 100%)

### Bornes de niveau
- [ ] Niveau minimum : 3 (ne descend pas en dessous)
- [ ] Niveau maximum : 12 (ne monte pas au-dessus)

## ✅ Contrôles de l'Exercice

### Bouton "Arrêter l'exercice"
- [ ] Visible dès que l'exercice démarre (encoding)
- [ ] Cliquable à tout moment (encoding, retention, recall, feedback)
- [ ] Clic arrête l'exercice et retourne à intro
- [ ] Message "Exercice arrêté" s'affiche
- [ ] Grille revient en idle
- [ ] Pas d'erreurs console

### Bouton "Effacer la sélection"
- [ ] Invisible en phase intro, encoding, retention, feedback
- [ ] Visible uniquement en phase recall
- [ ] Visible seulement si userSequence.length > 0
- [ ] Clic efface la sélection
- [ ] Neurones reviennent en idle
- [ ] Peut re-sélectionner après effacement

## ✅ Variations de Feedback

- [ ] Tester 5 succès à 100% → Au moins 2 messages différents observés
- [ ] Tester 5 échecs → Au moins 2 messages différents observés
- [ ] Tester 5 partiels → Au moins 2 messages différents observés

## ✅ Boutons de Réponse Rapide

- [ ] "Commencer" se désactive après clic
- [ ] "Continuer" se désactive après clic
- [ ] "Arrêter" se désactive après clic
- [ ] Un seul bouton cliquable à la fois
- [ ] État visuel différencié (clicked = bleu foncé + ring)
- [ ] Hover fonctionne sur boutons actifs
- [ ] Focus keyboard visible (Tab navigation)

## ✅ Animations et Transitions

- [ ] Neurones : transition 300ms fluide
- [ ] Hover neurone : scale(1.05) visible
- [ ] Active neurone : scale(0.95) visible
- [ ] Messages : fade-in à l'apparition
- [ ] Typing indicator : 3 dots qui rebondissent
- [ ] Pas de lag visible
- [ ] Pas de flash/flicker

## ✅ Accessibilité

### Clavier
- [ ] Tab navigation fonctionne (boutons, neurones)
- [ ] Focus visible (ring bleu)
- [ ] Enter/Space active les boutons
- [ ] Enter/Space active les neurones (en recall)

### ARIA
- [ ] Neurones ont aria-label descriptif
- [ ] Boutons ont aria-label
- [ ] QuickReply buttons ont aria-pressed

### Responsive
- [ ] Mobile (375px) : layout vertical, lisible
- [ ] Tablet (768px) : layout adapté
- [ ] Desktop (1920px) : layout 2 colonnes

## ✅ Performance

- [ ] Chargement initial < 2s (local dev)
- [ ] Pas de re-renders inutiles (React DevTools)
- [ ] Transitions fluides (60fps)
- [ ] Pas de memory leaks (plusieurs cycles)

## ✅ Tests Unitaires

- [ ] `npm run test` passe sans erreur
- [ ] useSequenceGenerator : 12/12 tests ✅
- [ ] useExerciseState : 20/20 tests ✅
- [ ] generateFeedback : 17/17 tests ✅
- [ ] Total : 49/49 tests ✅

## ✅ Console et Erreurs

- [ ] Aucune erreur console en production build
- [ ] Aucun warning React
- [ ] Debug info visible uniquement en dev mode
- [ ] Pas de PropTypes warnings

## ✅ Edge Cases

- [ ] Cliquer très rapidement : pas de bug
- [ ] Cliquer même neurone 2 fois en recall : accepté
- [ ] Refresh page pendant exercice : retour à intro OK
- [ ] Séquence longue (niveau 12) : fonctionne
- [ ] Séquence courte (niveau 3) : fonctionne

## 📝 Notes de Test

**Date de validation** : _______________

**Testeur** : _______________

**Navigateurs testés** :
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari

**Appareils testés** :
- [ ] Desktop (1920x1080)
- [ ] Mobile (iPhone/Android)
- [ ] Tablet

**Bugs trouvés** :
```
[Noter ici tout bug découvert]
```

## ✅ Validation Finale

- [ ] Tous les tests ci-dessus passent
- [ ] Application déployable en production
- [ ] README à jour
- [ ] Documentation complète

---

**Résultat** : ☐ VALIDÉ | ☐ À CORRIGER

**Signature** : _______________
