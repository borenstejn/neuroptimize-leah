1. Forces

1) Proposition de valeur & focus scientifique  
- Vision désormais claire : remédiation cognitive scientifiquement fondée, pas “wellness”.  
- Différenciation nette vs apps de méditation / coaching : exercice structuré, protocole inspiré Cogmed, vocabulaire de neuropsychologie vulgarisé.  
- Rôle de l’IA clarifié : feedback conversationnel pédagogique, pas du “AI-washing” d’algorithme adaptatif.

2) POC bien cadré et faisable  
- Scope très précis : un seul exercice, un seul persona, un seul “personnage” (Max), pas de login, pas de DB.  
- Plan de dev détaillé, priorisation P0/P1, scénario de fallback (niveau fixe, feedbacks hardcodés).  
- Gestion des risques et plan B (vidéo, feedbacks statiques) déjà anticipés.

3) Narratif démo solide  
- Flow de démo en 3 actes très lisible pour un jury :  
  1) Exercice type Cogmed visuo-spatial.  
  2) Adaptation de la difficulté.  
  3) Explication neuroscientifique par Max.  
- Persona Pierre bien défini, permet une histoire concrète : “cadre stressé, veut du sérieux, pas du ‘bravo champion’”.

4) Fondations produit réutilisables  
- Prompt Max très travaillé, aligné avec le positionnement “neuropsychologue accessible” → peut devenir le backbone de l’identité de marque.  
- Architecture modulaire (exercises/, chat/, hooks/) prête à accueillir d’autres exercices et des features futures (tracking, multi‑exos).  
- Choix techno standard et scalables (Next.js, Vercel, Claude).

5) KPIs POC orientés crédibilité produit  
- Critères de succès concrets pour une démo : fluidité, temps de réponse, comportement adaptatif, respect du ton scientifique.  
- Pas de “vanity metrics” type MAU/churn qui seraient hors sujet pour un POC de 3 jours.


2. Faiblesses / Points à améliorer

1) Proposition de valeur business pas encore formulée  
- On voit bien “ce que fait” le POC, moins “pour qui on facture quoi demain”.  
- Il manque une phrase-type investisseur :  
  “Neuroptimize = [plateforme X] qui permet à [segment Y] de [résultat Z mesurable] grâce à [approche différenciante].”

2) Différenciation marché encore incomplète  
- Le doc dit “on n’est pas Calm / Headspace”, mais ne tranche pas assez :  
  - vs Cogmed / Peak / Lumosity / autres outils de remédiation existants ?  
  - vs simple mini‑jeu sur web + ChatGPT branché à côté ?  
- Il manque un tableau concurrentiel simple avec 3–4 lignes fortes (science, personnalisation, distribution, prix, UX).

3) Aucun élément sur modèle économique & go-to-market  
- Qui paie : B2C (Pierre), B2B (entreprises), B2B2C (neuropsychologues / cliniques) ?  
- Ticket moyen, fréquence d’usage ciblée (programme de 6 semaines ? abonnement mensuel ?) inexistants.  
- Sans au moins une hypothèse claire, un jury va rapidement poser des questions de viabilité.

4) KPIs d’impact cognitif absents  
- Le POC mesure des aspects techniques (FPS, temps API), pas de prémices de métriques “métier” :  
  - % de séquences réussies, progression moyenne de niveau sur une session, durée d’engagement, etc.  
- Même en POC, montrer 2–3 indicateurs simples de progression cognitive/session donnerait de la matière business.

5) Scalabilité produit implicite mais non racontée  
- L’architecture laisse penser qu’on peut ajouter d’autres exercices et un protocole complet.  
- Mais il manque une “roadmap vision” haute-niveau :  
  - V1 = 3–5 exercices, suivi longitudinal, protocole 6–8 semaines.  
  - V2 = adaptation plus fine, profils cognitifs, reporting pro.  
- Sans cette projection, le jury risque de voir “un jeu cool” plus qu’un embryon de plateforme.


3. Questions probables du jury + réponses suggérées

1) “En quoi êtes-vous différents de Cogmed ou des jeux type Lumosity / Peak ?”

Réponse suggérée :  
“Cogmed est très solide scientifiquement mais peu accessible : interface datée, parcours lourd, souvent réservé à des prises en charge spécialisées et coûteuses.  
Neuroptimize vise trois différences clés :  
1) Une expérience conversationnelle avec un ‘neuropsychologue virtuel’ qui explique ce qui se passe dans le cerveau, pour augmenter l’adhérence au programme.  
2) Un format plus léger et digital‑first, pensé pour des adultes actifs comme Pierre, qui peuvent intégrer 5–10 minutes par jour dans leur agenda.  
3) Une plateforme modulaire qui permettra à terme d’ajouter plusieurs types d’exercices validés et de les combiner en protocoles personnalisés.  
Le POC montre ce socle : qualité de l’exercice + pédagogie intégrée.”

---

2) “Pourquoi un chatbot/Max est-il nécessaire ? On ne pourrait pas juste faire un mini-jeu de mémoire ?”

Réponse suggérée :  
“Le simple jeu existe déjà partout et a deux problèmes majeurs :  
- faible rétention (on s’en lasse vite),  
- peu de compréhension de ce qu’on entraîne vraiment.  
Max apporte deux choses :  
1) La pédagogie : il explique en langage simple les mécanismes (hippocampe, mémoire de travail), ce qui augmente la motivation et la perception de valeur.  
2) La structure : il peut guider un protocole sur plusieurs semaines, adapter, contextualiser les résultats et accompagner l’utilisateur dans le temps.  
Le POC illustre ce rapport ‘patient–neuropsychologue’ à l’échelle, mais en numérique.”

---

3) “Quel est votre modèle économique cible ? Qui paiera et combien ?”

Réponse suggérée (à préparer clairement) :  
“Nous voyons trois options, avec une hypothèse prioritaire :  
- Priorité : B2C premium, sur des adultes comme Pierre, avec un abonnement mensuel autour de 20–30€/mois pour un programme structuré (3–5 exercices, suivi, rapports).  
- B2B : packages pour entreprises qui veulent proposer de la remédiation cognitive / hygiène cognitive à leurs collaborateurs très sollicités.  
- B2B2C : mise à disposition de la plateforme à des neuropsychologues qui suivent leurs patients, avec un prix par patient / par mois.  
Le POC d’aujourd’hui sert à démontrer que l’interface et l’UX sont assez fortes pour justifier ce type de monétisation.”

---

4) “Comment passe-t-on de ce POC à un produit réellement validé scientifiquement ?”

Réponse suggérée :  
“Le POC reprend déjà un exercice proche d’un paradigme testé depuis 30 ans (Cogmed‑like).  
La suite est en trois étapes :  
1) Packager 3–5 exercices issus de la littérature existante et documenter précisément les protocoles.  
2) Mener une étude pilote avec un petit groupe (par exemple via des neuropsychologues partenaires) pour mesurer l’évolution de certaines variables (span de mémoire de travail, adhérence, ressenti).  
3) Itérer sur la difficulté et l’adaptation avec ces données, puis viser une validation plus formelle avec un partenaire académique.  
Ce POC est la première brique UX/tech qui rend possible cette démarche scientifique.”

---

5) “Quelle est votre stratégie d’acquisition et de distribution ? Comment atteindre vos ‘Pierre’ à grande échelle ?”

Réponse suggérée :  
“À court terme :  
- Nous ciblons des niches très identifiables : cadres tech, profils neuro‑Atypique (TDAH diagnostiqué), patients sortant de prise en charge avec un besoin de suivi digital.  
- Canaux : partenariats avec neuropsychologues et coachs cognitifs, contenus pédagogiques courts sur LinkedIn/YouTube expliquant les mécanismes de la mémoire de travail.  
À moyen terme :  
- Offres packagées pour entreprises (programme ‘Hygiène Cognitive’ pour managers) où l’on vend un accès multi‑comptes.  
Le POC nous permet déjà de montrer une expérience suffisamment différenciante pour convaincre ces premiers partenaires.”

(Prévoir aussi des réponses brèves à : “et si OpenAI / Anthropic / Calm copiaient ?”, “quelles barrières à l’entrée ?” → réponse : protocole, contenu scientifique structuré, relation avec pros de santé, données long terme.)


4. Go / No-Go + justification

Recommandation : **Go** pour investir 3–4 jours sur ce POC, **avec un petit complément travail “business deck” en parallèle**.

Justification :

- Pour 3–4 jours de dev, on obtient un actif très réutilisable :  
  - Une première incarnation claire de la vision “remédiation cognitive + IA pédagogique”.  
  - Un démonstrateur live qui fait beaucoup mieux que des slides pour convaincre des investisseurs/jury.  
  - Une base technique modulaire sur laquelle on pourra brancher d’autres exercices et du suivi.

- Le POC est cohérent avec la vision profonde des fondatrices (remédiation cognitive) et nettoie l’erreur de trajectoire “widget respiration / sysadmin du cerveau”.

- Stratégie : pour convaincre un jury en quelques minutes, un “vertical slice” qui montre  
  1) un exercice sérieux,  
  2) une adaptation,  
  3) une explication neuro,  
  est nettement plus puissant qu’un ensemble de features dispersées.

Conditions de succès business pour vendredi :

1) Ajouter en amont 2–3 slides ou un pitch oral de 60–90 secondes qui couvrent :  
   - la phrase de valeur claire,  
   - le positionnement vs Cogmed/Lumosity/Calm,  
   - une hypothèse de modèle économique.  
   (Ce travail est léger par rapport à l’effort dev, mais indispensable.)

2) Préparer explicitement la “vision à 12–24 mois” :  
   - Combien d’exercices, quel protocole type, quel type de données on suit, quels clients pilotes.

3) Dans la démo, faire le lien explicite entre ce POC et la plateforme future :  
   “Ce que vous voyez sur un exercice aujourd’hui deviendra un programme complet de remédiation avec suivi et personnalisation.”

Dans ces conditions, le ROI attendu des 3–4 jours de dev est élevé : le POC sert à la fois de preuve de vision, de base technique, et d’outil de fundraising/partenariats.

5. Score Business

Je donnerais à ce PRD, en l’état, un **7,5 / 10** côté business :

- + Vision claire, différenciation initiée, exécution POC très bien cadrée.  
- – Modèle économique et story “plateforme scalable et monétisable” encore trop implicites.

Avec un complément deck/storytelling business, on peut monter à **8,5 / 10** pour une démo jury.