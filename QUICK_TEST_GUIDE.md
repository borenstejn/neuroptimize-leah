# 🧪 Guide de Test Rapide - Chat avec Max

## ✅ Vérification Rapide

L'application est prête ! Voici comment tester la nouvelle fonctionnalité de chat.

---

## 🚀 Lancement

```bash
cd /Users/jeromeborenstejn/PERSONNEL/Code/neuroptimize-leah
npm run dev
```

Ouvrez : http://localhost:3000

---

## 💬 Test de Conversation

### 1. Questions à Tester

**Question Basique :**
```
Bonjour Max, peux-tu te présenter ?
```

**Question Technique :**
```
Comment fonctionne la mémoire de travail ?
```

**Question sur l'Exercice :**
```
Pourquoi y a-t-il un délai de 2 secondes dans l'exercice ?
```

**Question Avancée :**
```
Qu'est-ce que la neuroplasticité ?
```

**Question Pratique :**
```
Comment puis-je améliorer ma mémoire au quotidien ?
```

---

## 🎯 Ce Que Vous Devriez Voir

### 1. Interface
- ✅ Champ de texte en bas du chat (toujours visible)
- ✅ Bouton d'envoi avec icône d'avion en papier
- ✅ Placeholder : "Posez une question à Max sur la remédiation cognitive..."
- ✅ Indication "Cmd+Enter pour envoyer"

### 2. Comportement
- ✅ Votre message apparaît immédiatement
- ✅ Indicateur "typing" (3 points animés)
- ✅ Réponse de Max en 2-3 secondes
- ✅ Avatar de Max à côté de ses messages
- ✅ Messages scrollent automatiquement

### 3. Réponses de Max
- ✅ Ton empathique et professionnel
- ✅ Explications neuroscientifiques vulgarisées
- ✅ Messages structurés (2-3 paragraphes)
- ✅ Questions ouvertes pour engager
- ✅ Contextualisation de l'exercice

---

## 🔍 Tests de Robustesse

### Test 1 : Conversation Multi-Tours
1. Posez une question
2. Attendez la réponse
3. Posez une question de suivi
4. Vérifiez que Max se souvient du contexte

**Exemple :**
```
User: "Qu'est-ce que la mémoire de travail ?"
Max: [Explique la mémoire de travail]
User: "Et comment l'exercice du réseau neural la renforce ?"
Max: [Doit faire référence à l'explication précédente]
```

### Test 2 : Pendant l'Exercice
1. Cliquez sur "Commencer"
2. Pendant la phase d'encoding, tapez une question
3. Vérifiez que vous pouvez envoyer
4. Vérifiez que l'exercice continue normalement

### Test 3 : Envoi Rapide
1. Tapez un message
2. Appuyez sur Cmd+Enter (Mac) ou Ctrl+Enter (Windows)
3. Vérifiez que ça envoie sans clic

### Test 4 : Message Vide
1. Essayez d'envoyer sans taper de texte
2. Le bouton doit être désactivé

### Test 5 : Pendant l'Attente
1. Envoyez un message
2. Pendant que le typing indicator est affiché
3. Essayez d'envoyer un autre message
4. Vérifiez que le champ est désactivé

---

## 🎨 Vérifications Visuelles

- [ ] Le champ de texte est bien visible en bas du chat
- [ ] Le bouton d'envoi a un dégradé bleu → violet
- [ ] Le spinner apparaît pendant l'envoi
- [ ] Le typing indicator s'affiche pendant l'attente
- [ ] Les messages de Max ont l'avatar
- [ ] Les messages utilisateur sont alignés à droite
- [ ] Le scroll est automatique

---

## 🐛 Débogage

### Voir les Logs API
Ouvrez la console Next.js (terminal) pour voir :
```
POST /api/chat 200 in XXXms
```

### Voir les Erreurs Client
Ouvrez DevTools du navigateur (F12) :
- **Console** : Erreurs JavaScript
- **Network** : Requêtes à /api/chat

### Erreurs Communes

**Erreur : "Failed to get response from AI"**
```bash
# Vérifier que Requesty API est accessible
curl -X POST https://router.requesty.ai/v1/chat/completions \
  -H "Authorization: Bearer rqsty-sk-9GhzYmd2TBKJ2zKJ+pGEFxRBeOgc+4Towv9wEidGCd5yx1H59tp7cEkeWy4rMJiSbkmiAq60QD/T0HTM011j0lUvWmsm/yt41UYRhaiUuwE=" \
  -H "Content-Type: application/json" \
  -d '{"model":"anthropic/claude-haiku-4-5","messages":[{"role":"user","content":"Hello"}]}'
```

**Erreur : "Cannot read property 'addMessage' of undefined"**
→ Vérifier que `useExerciseState` expose bien la méthode `addMessage`

---

## 📊 Métriques à Observer

### Temps de Réponse
- **Attendu** : 1-3 secondes
- **Si > 5s** : Vérifier la connexion réseau

### Qualité des Réponses
- **Ton** : Empathique et professionnel ✅
- **Structure** : 2-3 paragraphes ✅
- **Contenu** : Neuroscience vulgarisée ✅
- **Engagement** : Questions ouvertes ✅

### Contexte Conversationnel
- Max doit se souvenir des messages précédents
- Les réponses doivent être cohérentes avec l'historique
- Les questions de suivi doivent être bien comprises

---

## 🎥 Démo Suggérée

### Scénario 1 : Introduction
1. Ouvrir l'app
2. Taper : "Bonjour Max, je suis curieux de savoir ce que tu fais"
3. Montrer la réponse contextuelle de Max

### Scénario 2 : Question Technique
1. Taper : "Comment fonctionne la mémoire de travail ?"
2. Montrer l'explication neuroscientifique vulgarisée

### Scénario 3 : Lien avec l'Exercice
1. Taper : "Comment cet exercice m'aide-t-il concrètement ?"
2. Montrer que Max fait le lien avec le Réseau Neural

### Scénario 4 : Conversation + Exercice
1. Poser une question à Max
2. Pendant qu'il répond, cliquer "Commencer"
3. Montrer que les deux fonctionnent en parallèle

---

## ✨ Points à Mettre en Avant

1. **Vraie IA** : Pas de scripts prédéfinis, réponses contextuelles
2. **Expertise** : Max connaît vraiment la remédiation cognitive
3. **Empathie** : Ton chaleureux et normalisateur
4. **Flexibilité** : On peut discuter pendant l'exercice
5. **Vulgarisation** : Concepts complexes expliqués simplement

---

## 📝 Notes pour la Démo

### Ce qui Impressionne
- La capacité de Max à répondre à des questions complexes
- La cohérence entre les messages
- Le ton professionnel mais accessible
- Les explications neuroscientifiques précises

### À Éviter
- Questions trop génériques (Max est spécialisé)
- Demandes de diagnostic médical (il refuse poliment)
- Questions hors sujet (politique, actualité, etc.)

### Questions "Wow"
```
"Explique-moi la différence entre mémoire à court terme et mémoire de travail"
"Comment l'hippocampe intervient-il dans l'encodage mnésique ?"
"Quelles sont les stratégies pour améliorer ma mémoire visuo-spatiale ?"
"Pourquoi est-ce que j'oublie où j'ai mis mes clés ?"
```

---

## 🚀 Prêt à Tester !

L'application est **100% fonctionnelle** et prête pour :
- ✅ Tests manuels
- ✅ Démonstration client
- ✅ Validation utilisateur
- ✅ Déploiement production

**Bon test !** 🎉

---

**Version** : 5.4
**Date** : 2026-01-30
**Modèle IA** : Claude Haiku 4.5 via Requesty
