## Edge Case #1 : Input malveillant avec injection XSS
- **Scénario** : L'utilisateur entre un message contenant du code malveillant, comme "<script>alert('XSS')</script>", dans le champ de saisie au lieu de cliquer sur un bouton, et le frontend affiche ce message dans une bulle utilisateur sans sanitization.
- **Comportement attendu** : Le message devrait être affiché en texte brut sans exécuter le script, et Max devrait rediriger vers les choix d'états comme pour un input flou.
- **Risque si non géré** : Exécution de code JavaScript arbitraire dans le navigateur de l'utilisateur, potentiellement menant à des fuites de données ou des attaques sur d'autres utilisateurs si partagé.
- **Recommandation** : Utiliser une bibliothèque comme DOMPurify pour sanitizer les inputs utilisateur avant affichage, et valider les messages côté frontend.

## Edge Case #2 : Perte de connexion pendant l'exercice de respiration
- **Scénario** : L'utilisateur lance l'exercice via le bouton "▶️ Lancer la session", le widget de respiration commence (autonome), mais la connexion internet est perdue avant la fin des 60 secondes, et le debrief est déclenché via un appel API au LLM.
- **Comportement attendu** : Le widget complète l'exercice localement, mais le debrief ne s'affiche pas ; un message d'erreur poli devrait apparaître, invitant à recharger la page.
- **Risque si non géré** : Le chat reste bloqué sans debrief, frustrant l'utilisateur et brisant le flow, potentiellement menant à une mauvaise impression lors de la démo de 3 minutes.
- **Recommandation** : Ajouter une gestion d'erreurs pour les appels API (try-catch avec fallback message local), et stocker l'état du widget en localStorage pour persister en cas de reconnexion.

## Edge Case #3 : Double-clic rapide sur le bouton de lancement de session
- **Scénario** : L'utilisateur clique deux fois rapidement sur "▶️ Lancer la session" après le diagnostic, ce qui envoie deux messages système au LLM et tente de lancer deux instances du widget de respiration.
- **Comportement attendu** : Seul un widget devrait s'afficher, et les clics multiples devraient être ignorés (débouncing) pour éviter des duplications.
- **Risque si non géré** : Multiples widgets superposés ou appels API redondants, causant un UI cassé, des animations incohérentes, ou une surcharge du LLM avec des coûts inutiles.
- **Recommandation** : Implémenter un débouncing sur les boutons (e.g., via lodash.debounce) et désactiver le bouton après le premier clic jusqu'à la fin de l'exercice.

## Edge Case #4 : Réponse LLM corrompue ou invalide
- **Scénario** : Le LLM (Claude) renvoie une réponse inattendue, comme un texte non formaté, trop long (>3 phrases), ou contenant du jargon médical brut, en violation du prompt système, dû à une surcharge serveur ou un bug API.
- **Comportement attendu** : La réponse devrait être filtrée ou rejetée, avec un fallback à un message hardcodé générique, et le flow continue sans interruption.
- **Risque si non géré** : Affichage d'une réponse incohérente qui brise l'identité de Max (e.g., ton non "Warm Competence"), confusant l'utilisateur et échouant la démo sur la crédibilité scientifique.
- **Recommandation** : Ajouter une validation post-génération côté backend (e.g., vérifier longueur et mots-clés), et fallback à un message prédéfini si invalide.

## Edge Case #5 : Utilisateur en détresse réelle avec trolling répété
- **Scénario** : L'utilisateur envoie plusieurs messages indiquant une détresse grave (e.g., "Je veux me suicider") mélangés à du trolling (e.g., messages hors sujet), testant la limite du prompt qui recommande le 3114 mais gère le trolling séparément.
- **Comportement attendu** : Max répond immédiatement avec la recommandation professionnelle pour la détresse, ignore le trolling, et ne continue pas le flow normal.
- **Risque si non géré** : Réponse inadaptée qui pourrait aggraver la situation (e.g., rediriger vers des boutons d'états au lieu d'aider), exposant à des responsabilités légales ou éthiques.
- **Recommandation** : Renforcer le prompt avec une priorité claire pour la détresse (e.g., keywords triggers), et logger ces interactions pour monitoring sans stocker de données sensibles.

## Edge Case #6 : Changement d'orientation sur mobile en mode sombre
- **Scénario** : Sur un appareil mobile, l'utilisateur commence l'exercice de respiration en mode paysage, passe en mode portrait pendant l'animation, et active le mode sombre du navigateur, testant la responsivité et les couleurs (indigo/violet).
- **Comportement attendu** : L'UI s'adapte fluidement sans glitch, l'animation continue, et les couleurs restent lisibles en mode sombre.
- **Risque si non géré** : Animation déformée, textes illisibles (e.g., indigo sur fond sombre), ou crash du widget, ruinant l'expérience mobile lors de la démo.
- **Recommandation** : Utiliser media queries Tailwind pour responsivité et mode sombre, et tester avec Framer Motion pour des transitions d'orientation sans interruption.

## Edge Case #7 : Deux onglets ouverts avec interactions concurrentes
- **Scénario** : L'utilisateur ouvre deux onglets du chatbot, sélectionne un état dans le premier, lance l'exercice dans le second, causant des conflits d'état (pas de session partagée, historique local par onglet).
- **Comportement attendu** : Chaque onglet gère son propre état indépendamment, sans interférence, mais avec un avertissement si une session est détectée en cours.
- **Risque si non géré** : Historiques de chat incohérents, exercices superposés, ou appels API dupliqués menant à des réponses confuses et une surcharge serveur.
- **Recommandation** : Utiliser localStorage ou IndexedDB pour synchroniser l'état entre onglets (e.g., via Broadcast Channel), et verrouiller les interactions si une session est active.

## Edge Case #8 : Conversation très longue dépassant la limite de mémoire navigateur
- **Scénario** : L'utilisateur envoie de nombreux messages libres (e.g., 100+ messages courts), saturant l'historique de conversation géré par useState dans React, et approchant les limites de mémoire du navigateur.
- **Comportement attendu** : Le chat devrait limiter l'historique (e.g., garder les 10 derniers messages) et continuer à fonctionner sans crash.
- **Risque si non géré** : Plantage du navigateur ou ralentissement extrême, surtout sur mobile, empêchant la complétion de la démo de 3 minutes.
- **Recommandation** : Implémenter une limite d'historique dans le code (e.g., slice array to last N messages), et optimiser avec useMemo pour les rendus de la liste de messages.

## Edge Case #9 : Timeout API lors du debrief post-exercice
- **Scénario** : Après la fin du widget de respiration, l'appel API au LLM pour le debrief timeout (e.g., >10s dû à surcharge Anthropic), laissant le chat en silence après l'exercice.
- **Comportement attendu** : Un message de chargement devrait apparaître, suivi d'un fallback debrief hardcodé si timeout.
- **Risque si non géré** : Silence prolongé post-exercice, brisant le critère de succès (<2s pour debrief), et donnant une impression de POC non fiable lors de la démo.
- **Recommandation** : Ajouter un timeout dans l'API route (e.g., Promise.race avec delay), et fournir un debrief statique en cas d'échec.

## Edge Case #10 : Refresh navigateur pendant une conversation en cours
- **Scénario** : L'utilisateur rafraîchit la page après avoir sélectionné un état et reçu le diagnostic, mais avant de lancer l'exercice, perdant l'historique local (pas de persistance).
- **Comportement attendu** : Le chat redémarre à l'accueil avec le message hardcodé, sans tentative de restauration, mais avec une transition fluide.
- **Risque si non géré** : Perte d'état menant à une confusion (e.g., boutons manquants ou messages partiels), frustrant l'utilisateur et échouant le flow rapide de la démo.
- **Recommandation** : Persister l'historique minimal en localStorage (e.g., dernier état sélectionné), et recharger le contexte au refresh pour une reprise partielle.