Risque : Périmètre beaucoup trop large pour 1 dev / 4 jours  
Probabilité : Haute  
Impact : Critique  
Mitigation : Réduire le scope : une seule vue desktop, 1 seul bouton d’état, pas de design system complet, pas de streaming (réponse full). Livrer un Figma click-dummy pour le reste.

Risque : Dépendance à l’API Anthropic (clé, quota, billing)  
Probabilité : Haute  
Impact : Critique  
Mitigation : Créer le compte et la clé AVANT le sprint, valider le credit card + whitelisting. Mettre une variable d’env de fallback pour basculer sur OpenAI gpt-3.5 si Anthropic rate-limit.

Risque : Rate-limit serveurless Vercel + Anthropic (5-10 QPS) → démo avec 100 users = KO  
Probabilité : Moyenne  
Impact : Majeur  
Mitigation : Pré-générer les trois réponses de diagnostic off-line et servir du statique. N’appeler le LLM qu’au debrief.

Risque : Latence LLM incompatible avec « <2 s debrief »  
Probabilité : Haute  
Impact : Majeur  
Mitigation : Pré-chauffer la fonction, demander un modèle « fast » (Haiku) ou pré-générer les messages. Afficher un loader animé pour masquer 4-6 s de latence.

Risque : Streaming Claude non officiellement supporté par Vercel AI SDK (au 03/24)  
Probabilité : Moyenne  
Impact : Majeur  
Mitigation : Vérifier la lib avant J-0. Sinon, fallback sur fetch + chunks maison ou réponse non streamée.

Risque : Cold-start des fonctions serverless Next 14 → 1-2 s supplémentaires  
Probabilité : Haute  
Impact : Majeur  
Mitigation : Passer la route API en « Edge Runtime » ou déployer sur un Node « Serverless Function » gardée chaude avec pings.

Risque : Prompt injection / jailbreak (utilisateur écrit librement)  
Probabilité : Moyenne  
Impact : Critique  
Mitigation : Utiliser un parser côté backend pour filtrer mots clés dangereux. Pré-fixer { "role":"system", "content": ... } à CHAQUE appel, pas seulement en début de session.

Risque : Données personnelles non gérées (RGPD, logs Anthropic US)  
Probabilité : Moyenne  
Impact : Majeur (juridique)  
Mitigation : Afficher un bandeau « données hébergées hors UE, pas de données sensibles ». Supprimer logs >30 j ou ne rien stocker.

Risque : Gestion des cas de détresse grave non testée  
Probabilité : Basse  
Impact : Majeur  
Mitigation : Écrire un test unitaire qui envoie « je veux me suicider » et vérifie la réponse avec le 3114. Garder un fallback hardcodé si LLM hallucine.

Risque : Animation Framer 60 fps sur mobile bas de gamme  
Probabilité : Moyenne  
Impact : Mineur  
Mitigation : Limiter la taille du cercle à 120 px, utiliser `will-change: transform`, désactiver la blur sur mobile.

Risque : Licence police Geist (commercial use)  
Probabilité : Basse  
Impact : Mineur  
Mitigation : Utiliser Inter (SIL) pour le POC.

Risque : Stack Next 14 App Router encore instable  
Probabilité : Moyenne  
Impact : Majeur  
Mitigation : Bloquer sur Next 13.5 stable ou activer le flag `experimental.serverActions=true` en connaissance de cause.

Risque : Gestion d’état naïve (useState) → spaghetti dès qu’on ajoute un deuxième widget  
Probabilité : Haute  
Impact : Majeur  
Mitigation : Isoler la logique chat dans un reducer ou Zustand dès le départ. Sinon refacto douloureux.

Risque : Hard-coding des messages d’accueil et quick-replies → pas I18N, pas scalable  
Probabilité : Haute  
Impact : Mineur pour le POC, Majeur ensuite  
Mitigation : Mettre ces chaînes dans un JSON de config.

Risque : Aucune tests / CI → régressions pendant la démo  
Probabilité : Haute  
Impact : Majeur  
Mitigation : Au moins un check Playwright qui fait le flow happy-path, et un test jest sur la route API.

Risque : Gestion du timer hors sync → fin de widget peut arriver avant la réponse LLM  
Probabilité : Moyenne  
Impact : Mineur  
Mitigation : Envoyer le `[SYSTEM]` 1 s avant la fin ou bloquer l’UI jusqu’à réception de la première chunk.

Risque : API key en clair dans le bundle Vercel si mal configuré  
Probabilité : Moyenne  
Impact : Critique  
Mitigation : Vérifier `env:` uniquement serverSide. Aucune variable dans `next.config.js` public.

Risque : 100 utilisateurs × 3 messages × 2 kTokens ≈ 600kTokens => 20$ en 3 min  
Probabilité : Moyenne  
Impact : Majeur (coût)  
Mitigation : Mettre un quota hardcodé ou pré-générer le contenu.

Risque : Claude 3.5 Sonnet « 20241022 » n’existe pas encore  
Probabilité : Haute  
Impact : Critique  
Mitigation : Utiliser `claude-3-sonnet` ou `gpt-4o` disponible today. Vérifier dans Postman.

Risque : Vercel Free Tier ≈ 100 req/jour + 1 GB/edge → throttle pendant démo  
Probabilité : Moyenne  
Impact : Majeur  
Mitigation : Passer en Hobby 20 $/mois ou héberger l’API sur Render/Fly.

Risque : Temps d’intégration du design system (Shadcn, couleurs, tokens) sous-estimé  
Probabilité : Haute  
Impact : Mineur pour POC, Majeur planning  
Mitigation : Commencer par Tailwind brut, ajouter Shadcn après la logique fonctionnelle validée.

Risque : Police/Avatar animé pendant chargement LLM peut bloquer reflow  
Probabilité : Basse  
Impact : Mineur  
Mitigation : Pré-charger assets, utiliser CSS `content-visibility:auto`.

Risque : Absence de SLA d’Anthropic le jour J  
Probabilité : Basse  
Impact : Critique  
Mitigation : Pré-render la démo complète offline et avoir une vidéo fallback.

------------------------------------------------
Note de faisabilité : 4 / 10

Justification :  
− 1 seul développeur ne pourra pas à la fois mettre en place une stack Next 14, streaming LLM, un widget animé 60 fps, la gestion complète du flow, le design system et la sécurisation en 3-4 jours.  
− Trop de dépendances externes (Anthropic, Vercel) susceptibles de bloquer sans marge de manœuvre.  
− Plusieurs inconnues (support streaming Claude, modèle non disponible, quotas) mettent la démo en péril.  
− En réduisant sévèrement le scope (réponses statiques + simple fetch LLM + UI minimale), l’objectif devient atteignable, mais ce n’est plus le POC décrit.