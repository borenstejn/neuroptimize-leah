# AUTOPSIE POST-MORTEM : Projet Max (Neuroptimize)
## Date de l'échec : M+6 après la démo POC

### 1. Résumé de l'échec
Le POC orienté « démo » a été recyclé tel quel en produit « beta ». Incapable de passer d’un flow guidé par trois boutons à une vraie conversation, Max a déçu les utilisateurs et grillé le budget API dans des sessions sans valeur. Adoption quasi nulle, churn immédiat, confiance des investisseurs perdue.

### 2. Cause racine
**Citation exacte du PRD :**  
"Objectif : Parcours optimisé pour la démo avec interactions prédictibles. **Pas de saisie texte libre dans la version POC.**" (Section 4 – User Flow : Parcours Guidé)

**Pourquoi c'était problématique :**  
Cette contrainte, posée pour sécuriser une démonstration, a gelé toute l’architecture (UI, prompt, logique front/back) autour d’un flow ultra-scripté. Elle a été interprétée comme une « spécification produit » et non comme une simple limitation POC ; aucun budget ni planning n’a ensuite été prévu pour basculer vers un chat libre indispensable à l’usage réel.

### 3. Enchaînement fatal
1. Le POC est développé en 4 jours autour de trois quick-replies, sans parser de langage naturel.
2. La démo impressionne (absence de friction, discours neuroscientifique clair) ; le board décide de lancer une bêta publique « sur la même base ».
3. L’équipe technique découvre que toute la logique (prompt, tests, onboarding, widget) repose sur ces trois intents statiques.  
   ‑> Passage au langage libre = refonte quasi totale du front, des prompts, des règles safety.  
4. Par manque de temps et de budget, on « patch » : regex approximatives + phrases d’auto-complétion.  
5. Les utilisateurs réels posent des questions hors scope, reçoivent des réponses hors-contexte ou des refus. Frustration + mauvaises notes store.  
6. KPI : taux de complétion du flow 18 %, NPS –37, coût API ×4 (re-try + prompts plus longs).  
   → Échec final, freeze des financements Série A.

### 4. Signaux ignorés dans le PRD
- Signal 1 : De nombreux champs critiques non remplis (« [À préciser] », « [À définir] ») indiquaient déjà un manque d’ownership et de cible utilisateur claire.  
- Signal 2 : Le planning « 3-4 jours ouvrés » pour un chatbot + widget animé + edge cases (Section 7) était irréaliste, mais aucune marge n’a été ajoutée hors du buffer de 4 h.

### 5. Hypothèses qui se sont révélées fausses
| Hypothèse du PRD | Réalité |
|------------------|---------|
| Les knowledge workers accepteront un parcours bouton-unique, sans taper de texte. | Ils ont jugé l’expérience infantilisante et non personnalisée. |
| « Flow guidé » peut être étendu facilement vers une conversation libre. | L’architecture quick-reply a nécessité un refacto complet > 6 semaines. |
| Coût API « ~0,50 $ le POC » (Section Variables) restera négligeable. | Volume réel ×200 ; coûts mensuels >2 k $, sans revenu. |
| Ton « analogie CPU / amygdale DDoS » est universellement apprécié. | 47 % des testeurs l’ont jugé condescendant ou obscur. |
| Les règles safety dans le prompt suffisent. | 15 % des conversations se sont arrêtées suite à des faux positifs de « trolling ». |

### 6. Ce qui aurait pu sauver le projet
- Geler dès la revue PRD une **story “passage au texte libre”** avec budget et échéance avant la bêta.  
- Remplacer la phrase racine par « Pas de saisie texte libre **pour la démo uniquement — MUST HAVE en production** » afin d’éviter l’ambiguïté.  
- Imposer une **phase de discovery utilisateurs** après la démo pour valider le format conversationnel.  
- Exiger une **check-list “placeholder non toléré”** (dates, audience, budget) avant validation PRD.  
- Planifier un **refacto technique** plutôt que d’empiler des patchs ; le vrai point de non-retour se situe juste après la décision de « mettre le POC en production ».