# 💬 Fonctionnalité de Chat avec Max

## Vue d'ensemble

L'application Neuroptimize permet désormais de **discuter librement avec Max**, le spécialiste en remédiation cognitive, via une vraie IA (Claude Haiku 4.5).

Cette fonctionnalité vient en complément de l'exercice "Le Réseau Neural" et permet de montrer que Max est un véritable assistant IA expert, pas un simple chatbot à scripts prédéfinis.

---

## 🎯 Objectif

- **Démontrer l'expertise de Max** en remédiation cognitive
- **Permettre des questions libres** sur la mémoire, les fonctions cognitives, etc.
- **Créer un dialogue authentique** avec une IA spécialisée
- **Offrir une expérience conversationnelle** en parallèle de l'exercice

---

## 🛠️ Architecture Technique

### Stack
- **Frontend**: React 19 + TypeScript
- **Backend**: Next.js API Route (`/api/chat`)
- **IA**: Claude Haiku 4.5 via Requesty API
- **Proxy**: Requesty Router (https://router.requesty.ai/v1)

### Composants Créés

#### 1. **API Route** (`app/api/chat/route.ts`)
- Endpoint POST `/api/chat`
- Accepte un tableau de messages (historique de conversation)
- Appelle Claude Haiku 4.5 via Requesty
- Retourne la réponse de Max

#### 2. **ChatInput Component** (`components/ChatInput.tsx`)
- Champ de saisie textarea (2 lignes)
- Bouton d'envoi avec indicateur de chargement
- Support Cmd/Ctrl + Enter pour envoyer
- États disabled pendant l'attente de réponse

#### 3. **ChatContainer Modifié** (`components/ChatContainer.tsx`)
- Intègre le ChatInput en bas du chat
- Gère l'historique de conversation
- Affiche le typing indicator pendant les réponses
- Sépare les messages d'exercice des messages libres

#### 4. **useExerciseState Hook Modifié** (`hooks/useExerciseState.ts`)
- Nouvelle méthode `addMessage()` pour ajouter des messages au chat
- Permet d'injecter les messages user/assistant dans l'historique

---

## 🧠 Prompt Système de Max

Max est configuré avec un prompt système détaillé qui définit :

### Identité
- Assistant spécialisé en remédiation cognitive
- Chaleureux, empathique et professionnel
- Vulgarise les concepts neuroscientifiques

### Domaines d'expertise
- Remédiation cognitive et entraînement cérébral
- Mémoire de travail (visuo-spatiale, verbale)
- Fonctions exécutives (attention, inhibition, flexibilité)
- Neuroplasticité et apprentissage
- Hippocampe et circuits mnésiques
- Stratégies compensatoires et métacognition

### Style de communication
- Messages courts et structurés (2-3 paragraphes max)
- Une explication neuroscientifique par message
- Exemples concrets et applicables
- Questions ouvertes pour engager

### Limites éthiques
- ❌ Ne diagnostique pas de troubles
- ❌ Ne prescrit pas de traitements
- ❌ Ne remplace pas un professionnel
- ❌ Ne donne pas de faux espoirs

---

## 🎨 Expérience Utilisateur

### Layout

```
┌─────────────────────────────────────────┐
│  Max - Remédiation Cognitive            │
├─────────────────────────────────────────┤
│                                         │
│  Messages (scroll)                      │
│  ├─ Messages d'exercice                │
│  └─ Messages de conversation libre     │
│                                         │
├─────────────────────────────────────────┤
│  [Boutons de réponse rapide]           │  ← Contextuels (exercice)
├─────────────────────────────────────────┤
│  [Champ de saisie texte]                │  ← Toujours visible
│  [Bouton Envoyer]                       │
│  Cmd+Enter pour envoyer                 │
└─────────────────────────────────────────┘
```

### Flux de Conversation

1. **Utilisateur tape un message** (ex: "Comment fonctionne la mémoire de travail ?")
2. **Message ajouté au chat** avec role='user'
3. **Typing indicator s'affiche** (3 points animés)
4. **API appelée** avec historique complet de conversation
5. **Réponse de Max** ajoutée avec role='assistant'
6. **Historique conservé** pour contexte dans prochains messages

### États Visuels

- **Input actif** : Border bleue sur focus
- **Envoi en cours** : Spinner sur bouton + textarea disabled
- **Boutons désactivés** : Pendant attente de réponse IA
- **Typing indicator** : Animation 3 points pendant réponse

---

## 🔒 Sécurité

### API Key
- Stockée dans le code backend (API Route)
- ❌ Jamais exposée côté client
- ✅ Utilisée uniquement par le serveur Next.js

### Rate Limiting
- À implémenter : limiter les requêtes par IP/session
- Prévenir les abus de l'API

### Validation
- Messages utilisateur validés côté serveur
- Prompt système verrouillé (non modifiable par client)

---

## 📊 Exemples de Conversations

### Exemple 1 : Question sur la mémoire

**User** : "Pourquoi est-ce que j'oublie ce que je viens de lire ?"

**Max** : "La mémoire de travail, c'est comme un bloc-notes mental temporaire. Elle te permet de maintenir des infos en tête le temps de les utiliser.

L'hippocampe encode ces infos. Avec l'entraînement, les connexions neuronales se renforcent (neuroplasticité). C'est exactement ce que fait l'exercice du Réseau Neural.

As-tu remarqué des moments où ta mémoire de travail est plus sollicitée au quotidien ?"

### Exemple 2 : Question sur l'exercice

**User** : "Pourquoi y a-t-il un délai de 2 secondes entre l'affichage et le rappel ?"

**Max** : "Excellent retour ! La phase de rétention (2 secondes) est cruciale. C'est là que l'hippocampe consolide l'information.

Si tu trouves l'exercice difficile, c'est normal. La mémoire de travail a une capacité limitée (environ 7 éléments). Le but est de la stimuler progressivement, pas de réussir parfaitement du premier coup.

Veux-tu des stratégies pour améliorer ta mémorisation ?"

### Exemple 3 : Question générale

**User** : "C'est quoi la remédiation cognitive ?"

**Max** : "La remédiation cognitive, c'est entraîner le cerveau comme un muscle. On cible des fonctions spécifiques (mémoire, attention) avec des exercices répétés.

La recherche montre que c'est efficace, surtout si c'est régulier et adapté au bon niveau de difficulté.

Y a-t-il d'autres fonctions cognitives que tu aimerais travailler ?"

---

## 🚀 Utilisation

### En tant qu'utilisateur

1. **Lancez l'application** : `npm run dev`
2. **Naviguez** vers http://localhost:3000
3. **Scrollez** vers le bas du chat
4. **Tapez** votre question dans le champ de texte
5. **Appuyez** sur le bouton d'envoi ou Cmd/Ctrl+Enter
6. **Attendez** la réponse de Max (quelques secondes)
7. **Continuez** la conversation ou lancez l'exercice

### En tant que développeur

```typescript
// Dans ChatContainer.tsx
const handleSendMessage = async (userMessage: string) => {
  // Ajouter le message utilisateur
  exercise.addMessage({
    role: 'user',
    content: userMessage,
  });

  // Appeler l'API
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: conversationHistory,
    }),
  });

  const data = await response.json();

  // Ajouter la réponse de Max
  exercise.addMessage({
    role: 'assistant',
    content: data.message,
  });
};
```

---

## 🧪 Tests

### Tests Manuels

- [ ] Envoyer un message simple
- [ ] Vérifier que la réponse est cohérente
- [ ] Tester Cmd+Enter pour envoyer
- [ ] Vérifier le typing indicator
- [ ] Tester une conversation multi-tours
- [ ] Vérifier que l'historique est conservé
- [ ] Tester pendant un exercice en cours
- [ ] Vérifier que les boutons d'exercice restent fonctionnels

### Tests Automatisés (À implémenter)

```typescript
// Test de l'API Route
describe('/api/chat', () => {
  it('should return a valid response from Max', async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'Bonjour Max' }
        ]
      })
    });

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.message).toBeDefined();
  });
});
```

---

## 📈 Améliorations Futures

### Court terme
- [ ] Rate limiting par IP/session
- [ ] Historique de conversation sauvegardé (localStorage)
- [ ] Bouton "Nouvelle conversation" pour reset
- [ ] Indicateur de tokens utilisés

### Moyen terme
- [ ] Citations de sources scientifiques
- [ ] Suggestions de questions (quick prompts)
- [ ] Export de conversation en PDF
- [ ] Analytics sur les types de questions

### Long terme
- [ ] Multi-langue (FR/EN)
- [ ] Voice input (speech-to-text)
- [ ] Recommandations personnalisées d'exercices
- [ ] Intégration avec profil utilisateur

---

## 🐛 Troubleshooting

### Problème : "Failed to get response from AI"
**Solution** : Vérifier que la clé API Requesty est valide et que le service est accessible.

### Problème : Messages envoyés mais pas de réponse
**Solution** : Vérifier les logs serveur (console Next.js) pour voir les erreurs API.

### Problème : Typing indicator reste affiché
**Solution** : Vérifier que le finally dans handleSendMessage est bien exécuté.

### Problème : Historique de conversation perdu
**Solution** : L'historique est en mémoire. Il sera perdu au refresh. Pour persister, utiliser localStorage.

---

## 📝 Notes Techniques

### Pourquoi Haiku 4.5 ?
- **Rapide** : Réponses en 1-2 secondes
- **Économique** : Moins cher que Sonnet/Opus
- **Performant** : Suffisant pour conversations simples
- **Spécialisé** : Excellent pour tâches ciblées

### Pourquoi Requesty ?
- **Proxy unifié** : Un seul endpoint pour tous les modèles
- **Pas de gestion de clés multiples** : Une seule clé pour OpenAI, Anthropic, etc.
- **Simplicité** : API compatible OpenAI (chat/completions)

### Structure des Messages
```typescript
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  buttons?: string[]; // Pour messages d'exercice uniquement
}
```

---

## 🎉 Conclusion

Cette fonctionnalité transforme Neuroptimize d'un simple exercice cognitif en une **plateforme conversationnelle complète** avec un véritable assistant IA expert.

Max n'est plus un simple chatbot à scripts, mais un **spécialiste accessible** qui peut répondre à des questions complexes sur la remédiation cognitive, la neuroplasticité, et les stratégies d'entraînement cérébral.

**Démo prête** pour montrer la puissance de l'IA conversationnelle dans le domaine de la santé cognitive ! 🚀

---

**Version** : 5.4
**Date** : 2026-01-30
**Status** : ✅ Fonctionnel et déployable
