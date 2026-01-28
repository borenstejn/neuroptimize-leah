1. Forces

1) Proposition de valeur & positionnement
- Extrêmement claire et pitchable : “assistant de performance cognitive” vs “app de bien-être”, avec un lien explicite émotion → performance.
- Différenciation nette en une phrase : “On ne te dit pas juste de respirer, on t’explique ce que ça fait à ton cortex préfrontal et à ta RAM.”
- Persona/tonalité de Max très bien définis (“Warm Competence”, analogies CPU/RAM) : ça donne une identité mémorisable au produit.

2) Story de démo ultra maîtrisée
- Flow démo simple et démontrable en 3 minutes : choix d’état → explication neuroscientifique → exercice → debrief.
- Forte “aha moment” : la cohérence entre discours (neuro / performance) et expérience (widget de respiration avec jargon tech).
- Aucun élément superflu : tout est orienté vers montrer la différenciation scientifique + impact immédiat.

3) Focus business implicite solide
- Cible claire : travailleurs du savoir / tech, un segment avec pouvoir d’achat et appétence pour “performance” plutôt que “bien-être”.
- Angle B2B/B2B2E facilement dérivable : onboarding en 60s, protocole répétable, cela peut devenir un “rituel” d’entreprise.
- POC très crédible comme “modèle 0” d’un futur assistant multi-protocoles (autres exercices, personnalisation, analytics).

4) Faisabilité dans 3–4 jours
- Scope technique très maîtrisé pour un POC : une seule feature profonde (scan→explain→fix) bien décrite.
- Stack moderne standard, déploiement simplifié (Next/Vercel/Claude). Très peu de risques techniques imprévus.
- Architecture pensée pour la démo (pas pour le scale prématuré) → parfait pour un jury/investisseurs.

5) Narratif investisseur prêt à l’emploi
- On coche plusieurs cases tendance : santé mentale au travail, neurosciences, IA coach, productivité, knowledge workers.
- Capacité à raconter : “Aujourd’hui une seule intervention (cohérence cardiaque). Demain : un protocole complet de neuro-optimisation personnalisé.”

---

2. Faiblesses / Points à améliorer

1) Proposition de valeur business incomplète
- Le PRD décrit très bien l’expérience, peu le modèle économique.
- Manque : qui paie concrètement (individu vs entreprise), à quel ordre de prix, pour quel ROI mesurable (moins de temps perdu, + focus, etc.).

2) KPIs pas assez business / actionnables
- Les métriques listées sont surtout UX (temps de sélection, exercice complété, compréhension).
- Manque de métriques qui parlent à un jury : 
  - taux de réengagement (refaire une session),
  - NPS ressenti (“est-ce que tu te sens plus focus ?”),
  - intention de payer / d’intégrer dans la routine.

3) Différenciation concurrentielle à renforcer
- Le différenciateur “on relie émotions et performance avec neurosciences” est bon, mais :
  - Headspace/Calm ont déjà un discours “science-based”.
  - Les LLM généralistes peuvent déjà simuler ce type de discours.
- Il faut mieux articuler : qu’est-ce que Max fait de systématique, de structuré et de répétable qu’un chat GPT-like ne fait pas par défaut ?

4) Manque de vision sur la suite du parcours produit
- On voit très bien le POC. On voit moins le “produit v1” : 
  - Quel dashboard pour l’utilisateur ?
  - Quelles habitudes quotidiennes ?
  - Quelles data longitudinales (profil cognitif, rythme de la journée) ?
- Pour un investisseur, il faudra montrer la roadmap : “Max → suite de modules → plateforme”.

5) Risques marché à adresser explicitement
- Saturation d’outils bien-être / focus / mindfulness.
- Fatigue des salariés vis-à-vis des “apps de plus” imposées par les RH.
- Nécessité d’insister sur :
  - l’angle performance (non culpabilisant),
  - l’intégration dans le workflow (Slack, VSCode, Notion, etc.),
  - la légitimité scientifique (advisory board, références…).

---

3. Questions probables du jury + réponses suggérées

1) “En quoi êtes-vous vraiment différents de Calm/Headspace ou d’un simple chatbot ChatGPT personnalisé ?”
- Réponse suggérée :
  - “Trois différences clés :
    1) Max suit un protocole systématique SCAN → EXPLAIN → FIX centré performance, pas détente générique.
    2) Tout est ancré dans un cadre neuroscientifique cohérent et répétable, avec un glossaire et des analogies stables. On ne fait pas de ‘small talk’, on fait du debug cognitif.
    3) Notre cible est explicitement la performance cognitive des knowledge workers, pas le bien-être générique. Le succès se mesure en capacité de focus et de production, pas uniquement en relaxation perçue.”

2) “Quel est votre modèle économique ? Comment vous comptez monétiser ce produit ?”
- Réponse suggérée :
  - “Deux axes :
    - B2C : abonnement individuel (ex. 8–15 €/mois) pour un assistant de performance cognitive intégré au quotidien (rappels, protocoles personnalisés, historique des points de charge mentale).
    - B2B : licence par utilisateur actif pour entreprises (ex. 5–10 €/employé/mois) intégrée à leurs outils (Slack/Teams) avec reporting anonymisé sur les patterns de charge cognitive.
    - Le POC d’aujourd’hui est la brique de base : un protocole simple, mais démontrable, autour duquel on va packager l’offre.”

3) “Comment allez-vous prouver que ça améliore réellement la performance et pas seulement le ressenti subjectif ?”
- Réponse suggérée :
  - “Dès le MVP produit, on ajoute :
    - des mesures avant/après chaque intervention : niveau de focus perçu, capacité à reprendre une tâche difficile ;
    - des mini-tâches cognitives rapides (par ex. n-back ou tâches d’attention simples) pour mesurer l’effet court terme ;
    - sur le B2B, des corrélations anonymisées avec des indicateurs concrets : temps moyen de deep work déclaré, ressenti de clarté cognitive.
    - Le POC actuel montre la faisabilité comportementale : l’utilisateur accepte un micro-protocole guidé et comprend le lien cerveau → performance.”

4) “Comment ça scale au-delà d’un seul exercice de cohérence cardiaque ?”
- Réponse suggérée :
  - “Le POC illustre un pattern :
    - 1 dysfonction cognitif (stress/fatigue/dispersion) →
    - 1 explication neuro adaptée →
    - 1 protocole court guidé.
    - Demain, on ajoute d’autres protocoles : micro-siestes guidées, micro-rituels de passage en deep work, reset après réunion, préparation avant prise de parole, etc.
    - Le moteur sous-jacent reste le même : classification d’état + protocole adapté. On construit une bibliothèque de ‘patchs’ cognitifs.”

5) “Pourquoi maintenant ? Qu’est-ce qui rend votre timing pertinent ?”
- Réponse suggérée :
  - “Trois tendances convergent :
    1) Explosion du travail hybride et de la fatigue cognitive liée aux outils digitaux (Zoom fatigue, notifications, multi-tasking permanent).
    2) Normalisation de la santé mentale au travail, mais avec une demande forte de solutions pragmatiques orientées performance (et pas seulement bien-être).
    3) Maturité des LLM permettant des coachs contextuels crédibles. Le moment est idéal pour un assistant IA spécialisé, plutôt qu’un énième timer de pomodoro.”

---

4. Go / No-Go + justification

Recommandation : **GO** pour 3–4 jours de développement.

Justification business & stratégique :

- ROI démo élevé :  
  - En 3 minutes, on peut faire vivre une expérience complète, différenciante, ultra-visuelle (widget respiration) et parfaitement alignée avec le narratif Neuroptimize.  
  - Cela donne une “preuve tangible” aux investisseurs que l’équipe sait livrer une UX cohérente avec sa promesse.

- Coût d’opportunité faible :  
  - 3–4 jours pour un POC aussi ciblé et réutilisable (base technique pour un futur produit) est très raisonnable.
  - Ce n’est pas un prototype jetable : c’est un socle (chat, persona, widget) qu’on pourra enrichir.

- Valeur stratégique :  
  - Clarifie le positionnement produit (performance cognitive vs bien-être), ce qui est clé pour tout le reste (roadmap, pricing, go-to-market).
  - Sert d’outil de test utilisateur post-jury (rapidement testable en remote auprès de 10–20 knowledge workers pour affiner la V1).

- Risque maîtrisé :  
  - Scope technique limité, user journey simple, stack standard.  
  - La vraie incertitude est marché/usage, et ce POC est justement un bon investissement pour l’explorer.

Conditions de succès pour la démo :
- Ajouter 2–3 phrases de pitch business en intro (“ce que ça deviendra”).
- Prévoir 1–2 slides rapides sur : marché, modèle économique envisagé, roadmap après POC.

---

5. Score Business

Je donne au PRD, en l’état, un **8/10** côté business.

- + Vision claire, différenciation crédible, démo impactante, faisabilité forte.
- − À renforcer : articulation du modèle économique, métriques business, et vision produit au-delà de ce premier protocole.

Avec un léger travail en amont de la démo sur le pitch business (pricing, roadmap, usage B2B), ce POC a un très bon potentiel pour convaincre un jury/investisseurs.