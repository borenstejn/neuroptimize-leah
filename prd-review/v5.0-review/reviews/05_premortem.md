# AUTOPSIE POST-MORTEM : Projet Max (Neuroptimize)  
## Date de l'échec : 6 mois après le POC (31 juillet 2026)

### 1. Résumé de l'échec
Le produit final s’est avéré n’être qu’un « jeu de Simon » un peu bavard : répétitif, non-personnalisé et rapidement ennuyeux. Les utilisateurs sont partis après deux ou trois sessions, les revues ont pointé l’absence de preuves cliniques et l’« IA » vantée n’a convaincu personne. Le churn mensuel a dépassé 65 %, les revenus in-app sont restés anecdotiques et les investisseurs ont coupé le financement Série A.

### 2. Cause racine
Citation exacte du PRD :  
« Clarification du rôle de l'IA : – Claude (LLM) : Génère les feedbacks conversationnels… – Algorithme adaptatif : Règle déterministe simple (if/else)… »

Pourquoi c'était problématique :  
Cette ligne enterre, en une parenthèse, le fait que « Max » n’a aucune intelligence adaptative réelle. Or tout le reste du document (et la communication externe) promettait une « plateforme de remédiation cognitive scientifiquement fondée ». L’écart entre promesse et réalité technique s’est transformé en gouffre de crédibilité.

### 3. Enchaînement fatal
1. Le POC de 48 h livre un mini-jeu statique, mais la démo impressionne grâce au discours scientifique et à l’emballage UX.  
2. Le même code base sert de socle pour le produit bêta ; la « règle if/else » reste inchangée faute de temps et de budget pour un vrai moteur adaptatif.  
3. Marketing lance la campagne « IA neuro-adaptative » → premières cohortes d’utilisateurs constatent la pauvreté de l’adaptation et la redondance des séances.  
4. Avis négatifs sur le store (« Juste trois carrés qui s’allument »), taux de rétention J7 < 10 %.  
5. Les cliniciens contactés pour des partenariats refusent : absence d’études, pas de marquage Dispositif Médical.  
→ Échec final : retrait de l’app des stores et gel du financement.

### 4. Signaux ignorés dans le PRD
- Signal 1 : « Budget : 0 € (Free tier Vercel + crédits API existants) ». Impossible de soutenir des pics de charge ou d’enregistrer la data nécessaire à une vraie personnalisation.  
- Signal 2 : Section « Non-Objectifs » exclut « Sauvegarde des progrès (base de données) ». Sans historique, aucune progression ni analytics sérieuse n’étaient possibles.  
- Signal 3 : Délais irréalistes (12 h dev) + unique dev full-stack : dette technique certaine dès le jour 1.

### 5. Hypothèses qui se sont révélées fausses
| Hypothèse du PRD | Réalité |
|------------------|---------|
| La règle ±1 élément « suffit » à impressionner les utilisateurs | Jugée simpliste, répétitive, « pas plus maline qu’un niveau de Tetris » |
| « Feedback conversationnel » compensera la simplicité du jeu | Les textes se sont vite répétés ; manque d’ancrage visuel/sonore a renforcé l’ennui |
| Free tier Vercel & crédits API suffisent | Limites quotidiennes atteintes en 2 semaines → temps de réponse > 8 s |
| 60 fps sur Desktop garantit une bonne UX | La cible (cadres en mobilité) utilise surtout mobile ; pas d’app native, perf < 30 fps |
| Les utilisateurs préfèrent « zéro emoji » pour le sérieux | Ton perçu comme froid et scolaire ; manque d’engagement émotionnel |
| « Inspiré de Cogmed » assure la crédibilité scientifique | Presse spécialisée a exigé des données cliniques ; l’app n’en avait aucune |

### 6. Ce qui aurait pu sauver le projet
1. Formaliser dès le PRD une roadmap vers un VRAI moteur adaptatif (collecte data + ML léger) au-delà du POC.  
2. Prévoir, même en scope réduit, la persistance des sessions ; sans base de données, impossible d’offrir un sentiment de progression.  
3. Valider tôt l’attrait utilisateur via tests itératifs (≥30 utilisateurs) avant campagne marketing.  
4. Engager un conseiller clinique et préparer un protocole d’étude pilote pour étayer les claims de remédiation cognitive.  
5. Repositionner le messaging : « jeu d’entraînement cérébral ludique » plutôt que « neuro-coach IA », évitant la sur-promesse qui a détruit la confiance.