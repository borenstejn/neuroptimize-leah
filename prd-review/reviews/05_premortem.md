# AUTOPSIE POST-MORTEM : Projet Max (Neuroptimize)  
## Date de l'échec : 6 mois après le POC

### 1. Résumé de l'échec  
Le POC n’a jamais convaincu le jury : la démo était bancale, les réponses de Max trop lentes et parfois hors-ton, et l’effet « performance cognitive » promis n’a pas été perçu. Les investisseurs ont jugé la proposition comme « un énième app de respiration avec un vernis geek ». L’équipe, épuisée par les sprints de rattrapage, a perdu confiance et le financement de bridge n’a pas été signé.

### 2. Cause racine  
Citation exacte du PRD : « Contraintes – Délai : 3-4 jours de développement » (section 0 : Contraintes)  
Pourquoi c’était problématique : cette fenêtre minuscule, reprise plus loin en Planning (section 7 : « 1 développeur, 3 jours + 1 buffer »), a poussé toute la chaîne décisionnelle à privilégier la vitesse au détriment de la validation scientifique, de la robustesse technique et surtout des tests utilisateurs. Tout le reste (ton, promesse de “tangible performance”, maîtrise de l’LLM) en a dépendu.

### 3. Enchaînement fatal  
1. Planification sur 3-4 jours ⇒ pas de phase de discovery ni de tests utilisateurs.  
2. Rédaction d’un prompt très prescriptif sans itérations réelles ⇒ Max génère souvent > 3 phrases ou sort de l’analogie, ce qui casse la démo.  
3. Absence de preuve de « gain de performance en 60 s » ⇒ investisseurs demandent des datas, l’équipe n’en a pas.  
4. Rush permanent pour corriger les dérapages du LLM (latence, coûts, safety) ⇒ burnout dev + dérive budgétaire sur l’API.  
5. Démo finale : lag de 6-7 s entre clic et réponse, discours jugé « gadget » ⇒ désengagement du jury.  
→ Échec final : refus de financement, arrêt du projet.

### 4. Signaux ignorés dans le PRD  
- Signal 1 : Statut « Draft », « Date à compléter », « Auteur à compléter » – indicateurs qu’aucune validation formelle n’a été faite.  
- Signal 2 : Mismatch entre états listés (Stress/Fatigue/Dispersion) et boutons proposés (Dispersé/Manque d’énergie/Sous pression) – révélateur d’un manque de cohérence produit.  
- Signal 3 : « Compréhension du lien cerveau-performance » comme métrique, mais aucune méthode de mesure définie.  
- Signal 4 : Hypothèse implicite que l’LLM respectera toujours un format ultra court (3 phrases) – non garanti par construction.  

### 5. Hypothèses qui se sont révélées fausses  

| Hypothèse du PRD | Réalité |
|------------------|---------|
| 1 développeur peut livrer un POC polished en 3-4 jours | 3 semaines n’ont pas suffi pour stabiliser latence & UX |
| 60 s de cohérence cardiaque démontre un « résultat tangible » | Aucun KPI objectif pendant la démo; ressenti utilisateur inchangé |
| LLM suivra strictement les contraintes (3 phrases, 1 emoji) | 22 % des réponses dépassaient les limites; « jailbreaks » fréquents |
| Investors se satisferont d’une métaphore neuroscientifique | Ils ont réclamé des données de performance et de rétention |
| Coût API négligeable pour un POC | Facture mensuelle x6 par rapport au budget prévu |

### 6. Ce qui aurait pu sauver le projet  
- Allouer 2-3 semaines pour un vrai POC et 1 semaine de user-testing avant la démo.  
- Définir un KPI objectif (ex. score de Stroop pré/post respiration) pour prouver le gain de performance.  
- Prototyper d’abord le flow sans LLM (scripté) pour figer la narration, puis brancher l’IA.  
- Mettre en place un “LLM guardrail” simple (regex + trimming) afin de garantir le format des réponses durant la démo.  
- Impliquer un neuroscientifique et un user-researcher dès J-0 pour crédibiliser la promesse et ajuster le ton.