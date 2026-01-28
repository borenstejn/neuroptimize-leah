1. Forces du PRD (business/stratégie)

1) Proposition de valeur & focus  
- Positionnement très clair : **“assistant de performance cognitive pour knowledge workers”**, pas “app bien-être”.  
- Narratif en 3 temps (diagnostic → explication neuro → intervention) simple, démontrable en 3 minutes.  
- Différenciation explicite par rapport aux apps de méditation (vocabulaire tech, performance, mécanismes cérébraux).

2) Démo parfaitement scénarisée  
- Flow **100 % guidé**, sans texte libre : très bon pour une démo fiable en 3-4 jours.  
- Script de pitch béton, déjà orienté investisseurs : problème, solution, différenciation, vision long terme.  
- Widget de cohérence cardiaque autonome → effet “wow” visuel, limite les risques de latence LLM.

3) Alignement produit-tech très propre  
- Stack moderne, standard SaaS (Next + Vercel + Claude), crédible pour des investisseurs tech.  
- Séparation claire : LLM pour le discours / widget pour l’intervention → bonne base produit.  
- Risques techniques anticipés + plan B (vidéo, réponses pré-écrites).

4) Identité de marque différenciante  
- Persona “sysadmin du cerveau”, ton “warm competence”, analogies DDoS/CPU/RAM → ça se retient.  
- Design system orienté **SaaS B2B**, pas “wellness B2C” → cohérent avec un futur go-to-market entreprises.  
- Sécurité psychologique traitée (suicide, trolling, etc.) → sérieux aux yeux d’un jury.

5) Vision d’extension claire  
- Roadmap implicite :  
  - court terme : autres protocoles respiratoires et exercices, mode libre  
  - moyen terme : gamification, exercices cognitifs, analytics RH  
- Ça montre que ce POC est une **brique d’un futur “OS du cerveau”**, pas un gadget isolé.


2. Faiblesses / points à améliorer (business)

1) Proposition de valeur encore trop “théorique” côté ROI  
- On parle de **performance cognitive**, mais pas de métriques business type : baisse des erreurs, temps de focus, réduction burn-out, etc.  
- Pour un jury investisseur, il manque au moins un **angle chiffré** (même hypothétique) : ex. “+X % de temps de deep work après 3 semaines d’usage”.

2) Différenciation vs ChatGPT pas assez exploitée  
- On distingue bien vs Calm/Headspace, mais **peu explicite vs “je demande à ChatGPT : je suis stressé, aide-moi”**.  
- Il faut marteler ce qui est non-trivial :  
  - flow ultra-guidé + widget physique autonome  
  - tonalité spécialisée knowledge workers  
  - protocole standardisé, pas une réponse générative aléatoire.

3) KPIs démo = essentiellement qualitatifs  
- Les questions post-démo sont utiles, mais ce sont des **vanity metrics de perception**.  
- Aucun début de logique de **rétention** (combien reviendraient ? fréquence cible ?), ni de **usage pattern** (2–3 sessions/jour ?).  
- Pour un investisseur : ça donne l’image d’un bon “concept UX” plus que d’un produit qui peut scaler.

4) Modèle économique seulement implicite  
- On devine un futur B2C abonnement ou B2B (RH / entreprises), mais ce n’est jamais posé explicitement.  
- Pas de réflexion sur :  
  - ticket moyen  
  - qui paie (individu vs entreprise)  
  - usage en volume (LLM cost vs ARPU).  
- Risque : questions du jury sur le business model auxquelles on répond de façon trop vague.

5) Risques de concurrence & timing sous-estimés  
- On mentionne la différence de ton, mais pas les **barrières à l’entrée** : qu’est-ce qui empêche Headspace/Calm/Unmind/Replika/big LLM de copier ce flow en 2 sprints ?  
- Pas de réflexion sur la saturation du marché “mental wellness” ni sur la niche “perf cognitive pour devs/PM” en chiffres.


3. Questions probables du jury + réponses suggérées

1) “En quoi est-ce vraiment différent de ce que je peux déjà faire avec ChatGPT ou un autre LLM ?”  
Réponse suggérée :  
- “Trois différences clés :  
  1) **Protocole guidé et répétable** : Max suit toujours un triptyque Diagnostic → Explication neuro → Intervention, alors qu’un LLM généraliste reste conversationnel et variable.  
  2) **Interaction multimodale** : le cœur de l’expérience est le widget de respiration synchrone, non textuel, que ChatGPT n’offre pas out‑of‑the‑box.  
  3) **Positionnement métier** : Max est conçu pour les knowledge workers, avec un vocabulaire et des analogies qui collent à leur quotidien tech. Notre roadmap ajoute ensuite des exercices cognitifs et analytics RH, ce qu’un LLM brut ne fournit pas.”

2) “Qui paie, et combien ? Votre modèle économique à terme ?”  
Réponse suggérée :  
- “Deux axes :  
  - **B2B2E** : neuro-coach pour équipes tech / knowledge workers. Pricing cible : **3–8 €/utilisateur/mois** selon le niveau de fonctionnalités (exercices, dashboard RH, intégrations Slack/Teams).  
  - **B2C premium** : abonnement individuel ~**8–12 €/mois** pour freelances et indépendants.  
  Le POC montre la valeur perçue ; les briques suivantes (habitudes, stats, intégration outils de travail) augmentent la valeur monétisable.”

3) “Quel est l’avantage compétitif durable ? Pourquoi un Calm ou un Headspace ne ferait pas la même chose ?”  
Réponse suggérée :  
- “Notre **focus extrême** sur performance cognitive pour métiers tech, pas bien-être généraliste :  
  - ton, analogies, persona, tout est optimisé pour développeurs/PM/designers, pas pour ‘tout le monde’.  
  - Roadmap : exercices de mémoire de travail, gestion de charge cognitive, analytics de focus par équipe.  
  Headspace ou Calm sont très larges ; nous visons un **segment vertical** où on peut aller beaucoup plus loin en profondeur, avec éventuellement des intégrations IDE, Slack, outils de ticketing. C’est là que se joue la barrière à l’entrée.”

4) “Quelles métriques vous suivriez dès la version alpha pour prouver que ça marche ?”  
Réponse suggérée :  
- “Dès la V1 :  
  - **Taux de complétion de session** et **sessions/jour/utilisateur actif** → adoption réelle, pas curiosité.  
  - **Retour auto-reporté sur focus** (NPS du focus avant/après) → même simple, ça donne un premier signal.  
  - À terme B2B : corrélation entre usage moyen par équipe et indicateurs internes (erreurs en prod, vélocité, sick days).  
  Le POC sert à valider la **désirabilité** et la capacité à guider un comportement, pour ensuite instrumenter la performance.”

5) “Marché et timing : pourquoi maintenant, et quelle taille de marché visez-vous ?”  
Réponse suggérée :  
- “Timing :  
  - explosion du télétravail et fatigue cognitive (Zoom fatigue, notifications permanentes).  
  - démocratisation de l’IA qui habitue les gens à avoir un ‘assistant’ numérique au quotidien.  
  Marché :  
  - rien qu’en Europe, ~**20M+ knowledge workers** (dev, PM, design, consulting, finance, etc.).  
  - Si on cible 5 % d’adoption payante à 5 €/mois, on est déjà sur un **TAM de plusieurs centaines de millions d’€**.  
  Le POC est notre première brique pour devenir la référence ‘perf cognitive’ dans ce segment.”


4. Go / No-Go + justification

**Recommandation : GO** pour investir 3–4 jours de dev.

Justification business/stratégique :

- **Clarté de la proposition en 30 secondes** : “Neuro-coach pour ta perf cognitive, pas appli zen.” → très facile à pitcher en démo.  
- **Démo hautement contrôlée** : on minimise les risques live (pas de texte libre, widget autonome). En 3-4 jours, on a une expérience **aboutie visuellement** et narrative, parfaite pour un jury.  
- **Effet vitrine** : ce POC montre déjà le “goût” du produit final : identité forte, lien ressenti/cerveau, protocole actionnable. C’est un très bon “MVP démonstratif” pour lever de l’intérêt/investissement avant de construire la suite.  
- **Scalabilité plausible** : la même architecture peut accueillir : plus de protocoles, un mode libre, scoring cognitif, dashboard B2B. On ne jette rien.  
- **Coût faible, risque limité** : 3-4 jours pour un POC produit propre, réutilisable en portfolio, pitch deck, landing… le ratio effort / valeur perçue est bon.

Conditions pour maximiser le ROI de ces 3-4 jours :  
- Préparer **2–3 slides business** pour la démo (marché, modèle éco, roadmap) afin de combler les trous du PRD côté monétisation.  
- Clarifier à l’oral : **“ce POC = 1 protocole. Le produit complet = bibliothèque de protocoles + analytics perf”**.  
- Intégrer dans le script de démo 1 phrase sur le **modèle économique cible** (B2B/B2C).


5. Score business

Je donnerais à ce POC, dans sa version actuelle de PRD :

**Score business : 7,5 / 10**

- + Proposition de valeur claire, démo très solide, différenciation narrative réussie.  
- + POC réutilisable comme base produit.  
- – Business model et métriques d’impact encore trop implicites.  
- – Avantage compétitif vs big apps et LLMs à articuler plus explicitement pendant la démo.

Avec une couche “business slides” bien préparée, ce même POC peut monter à **8,5/10** en perception jury.