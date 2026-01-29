## Edge Case #1 : Refresh Page Pendant l'Encodage
- **Scénario** : L'utilisateur est en phase d'encodage (observation de la séquence de neurones), rafraîchit la page (F5 ou bouton refresh) au milieu de l'animation des pulses bleus.
- **Comportement attendu** : L'exercice devrait redémarrer à l'accueil, avec Max saluant à nouveau, sans perte de données persistantes (car pas de DB), et informer l'utilisateur que l'exercice a été interrompu.
- **Risque si non géré** : L'état de l'exercice est perdu, mais l'interface pourrait rester bloquée en mode "encoding" avec des animations cassées, menant à une frustration utilisateur et une démo échouée si cela arrive pendant la présentation.
- **Recommandation** : Utiliser localStorage pour persister l'état de l'exercice (niveau, consecutiveSuccess) et le restaurer sur refresh ; ajouter un message de Max comme "L'exercice a été interrompu. Recommençons ?"

## Edge Case #2 : Connexion Internet Perdue Pendant Appel API à Claude
- **Scénario** : Après le rappel (phase 4), le frontend envoie le résultat à Claude pour feedback, mais l'utilisateur perd la connexion internet (WiFi déconnecté) pendant l'appel API.
- **Comportement attendu** : Afficher un message d'erreur gracieux (e.g., "Connexion perdue. Veuillez réessayer."), fallback sur un feedback hardcodé (comme prévu dans le plan de rollback), et permettre de recommencer l'exercice.
- **Risque si non géré** : L'interface freeze en attendant une réponse infinie, bloquant l'utilisateur et rendant le POC inutilisable jusqu'au refresh, ce qui pourrait ruiner la démo live.
- **Recommandation** : Implémenter un timeout API (e.g., 5s) avec AbortController ; basculer sur feedbacks JSON hardcodés si erreur réseau détectée, et logger l'événement pour debugging.

## Edge Case #3 : Double-Clic Rapide sur un Neurone Pendant le Rappel
- **Scénario** : En phase de rappel, l'utilisateur double-clique rapidement sur le même neurone (e.g., à cause d'un lag ou d'une impatience), alors que les clics sur neurones déjà cliqués devraient être ignorés.
- **Comportement attendu** : Seul le premier clic est enregistré ; le second est ignoré sans erreur, et le feedback visuel (vert/rouge) s'affiche seulement une fois.
- **Risque si non géré** : Le neurone pourrait être compté deux fois, faussant le userSequence et menant à un successRate incorrect, ce qui dérègle l'algorithme adaptatif et donne un feedback erroné de Max.
- **Recommandation** : Ajouter un debounce (e.g., 200ms) sur les événements de clic des neurones via useDebounce hook ; désactiver temporairement les clics sur un neurone après le premier.

## Edge Case #4 : Spam de Boutons de Réponse Rapide
- **Scénario** : Après un feedback de Max (e.g., boutons "✅ Oui, commençons" ou "🔄 Réessayer"), l'utilisateur spamme les clics sur les boutons multiples fois rapidement (e.g., 10 clics en 2s).
- **Comportement attendu** : Seul le premier clic est traité ; les suivants sont ignorés, et l'interface passe à l'étape suivante sans dupliquer les actions ou appels API.
- **Risque si non géré** : Multiples appels API à Claude, entraînant des réponses dupliquées dans le chat, un état incohérent (e.g., plusieurs exercices lancés), et potentiellement des coûts API excessifs ou des limites de rate limiting.
- **Recommandation** : Désactiver les boutons après le premier clic (via state isLoading) et utiliser un mutex pour prévenir les actions concurrentes ; ajouter un cooldown de 1s sur les boutons.

## Edge Case #5 : LLM Renvoie une Réponse Non Conforme (e.g., Avec Emoji)
- **Scénario** : Claude 3.5 Sonnet, malgré le prompt strict interdisant les emojis, renvoie un feedback avec un emoji (e.g., "Excellent ✅") dû à une variabilité du modèle ou un prompt mal interprété.
- **Comportement attendu** : Le feedback est affiché tel quel, mais filtré pour supprimer les emojis afin de respecter la décision "Pas d'Emojis".
- **Risque si non géré** : Violation de la persona professionnelle de Max, réduisant la crédibilité scientifique et potentiellement confusant l'utilisateur (e.g., emojis dans un contexte thérapeutique).
- **Recommandation** : Ajouter un post-processing côté frontend pour stripper les emojis (regex comme /[\u{1F000}-\u{1FFFF}]/gu) avant d'afficher la réponse de Claude.

## Edge Case #6 : Input Utilisateur Malveillant dans le Chat (XSS)
- **Scénario** : Si l'input chat est activé (bien que désactivé pendant l'exercice), l'utilisateur entre du code malveillant comme "<script>alert('XSS')</script>" et l'envoie.
- **Comportement attendu** : Le message est sanitizé et affiché comme texte brut sans exécution de code ; Max répond normalement ou ignore si hors scope.
- **Risque si non géré** : Exécution de code JS malveillant, potentiellement compromettant la sécurité du navigateur (e.g., vol de données locales), et brisant l'expérience utilisateur.
- **Recommandation** : Utiliser une bibliothèque comme DOMPurify pour sanitizer tous les inputs et outputs utilisateur ; garder l'input chat désactivé par défaut sauf si explicitement activé.

## Edge Case #7 : Deux Onglets Ouverts avec Sessions Concurrentes
- **Scénario** : L'utilisateur ouvre deux onglets du POC, commence un exercice dans l'un, puis interagit dans l'autre (e.g., clique sur un bouton dans le second onglet pendant que le premier est en phase de rappel).
- **Comportement attendu** : Chaque onglet gère son propre état indépendamment (pas de sync, car pas de DB), sans interférence ; si localStorage est utilisé, synchroniser via storage events.
- **Risque si non géré** : Conflits d'état via localStorage partagé, menant à des niveaux ou séquences corrompus (e.g., un onglet overwrite l'autre), causant des comportements imprévisibles comme des crashes ou feedbacks erronés.
- **Recommandation** : Utiliser un ID de session unique par onglet (e.g., UUID stocké en localStorage) pour isoler les états ; écouter les storage events pour notifier l'utilisateur de conflits.

## Edge Case #8 : Conversation Très Longue Dépassant la Limite de Tokens
- **Scénario** : L'utilisateur effectue une session prolongée (e.g., 50 essais d'exercice), accumulant un historique de chat qui dépasse la limite de tokens de Claude (e.g., 8k tokens), menant à un appel API avec contexte trop grand.
- **Comportement attendu** : Le contexte est tronqué aux derniers N messages pour rester sous la limite, et Max continue de répondre cohéremment sans perte de l'exercice en cours.
- **Risque si non géré** : Erreur API (e.g., 413 Payload Too Large), bloquant les feedbacks et rendant le POC inutilisable après une longue session, frustrant les utilisateurs engagés.
- **Recommandation** : Implémenter une gestion de contexte glissant dans useChat (garder seulement les 10 derniers messages) ; ajouter un bouton "Réinitialiser la conversation" pour vider l'historique.

## Edge Case #9 : Accès sur Mobile (Malgré Non-Support)
- **Scénario** : L'utilisateur accède au POC sur un mobile (e.g., iPhone Safari), où la grille 4x4 n'est pas responsive, et essaie de cliquer sur les neurones (espacement 80px trop grand pour petits écrans).
- **Comportement attendu** : Afficher un message d'avertissement "Optimisé pour desktop uniquement" et désactiver les interactions, ou scaler la grille basiquement.
- **Risque si non géré** : Clics imprécis (e.g., neurones adjacents cliqués par erreur), animations non visibles, et une expérience frustrante menant à un abandon, même si hors scope.
- **Recommandation** : Ajouter une media query pour détecter mobile et afficher un overlay bloquant avec message ; ou implémenter un scaling minimal via CSS viewport units pour la démo.

## Edge Case #10 : Navigateur Ancien Sans Support pour Framer Motion
- **Scénario** : L'utilisateur utilise un navigateur ancien (e.g., IE11 ou Safari vieux) qui ne supporte pas les APIs modernes comme CSS transitions ou Framer Motion, menant à des animations cassées pendant l'encodage.
- **Comportement attendu** : Fallback sur une version statique sans animations (e.g., changer de couleur sans pulse), et informer l'utilisateur que le navigateur n'est pas supporté.
- **Risque si non géré** : Animations ne s'exécutent pas, rendant l'exercice incompréhensible (e.g., séquence non visible), et potentiellement crashant le composant, bloquant tout le POC.
- **Recommandation** : Détecter le support via feature detection (e.g., if (!window.CSS.supports('animation')) ) et fallback sur changements de classe CSS simples ; ajouter un polyfill pour Framer Motion si possible.