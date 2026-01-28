RAPPORT DE RISQUES – PRD « Max » Neuroptimize  
Profil-auteur : CTO senior, 20 ans d’embruns en prod, allergique à la dette.

────────────────────────────────────────
1. Risque : Calendrier de 3-4 jours, 1 seul dev
   Probabilité : Haute  
   Impact : Critique  
   Mitigation : Réduire le scope (enlever responsive mobile, animations Framer, fallback offline), prévoir 2-3 dev ou repousser la date. 

2. Risque : Modèle « Claude 3.5 Sonnet » non public / instable
   Probabilité : Moyenne  
   Impact : Critique  
   Mitigation : Vérifier dès maintenant la dispo, prévoir switch vers GPT-4o ou Claude 3 Opus, abstraire le provider dans un service. 

3. Risque : Quotas et rate-limit Anthropic (1 req/sec + 100 req/min sur free tier)
   Probabilité : Haute (dès 100 users)  
   Impact : Majeur  
   Mitigation : Budget payé à l’avance, clé « production » dédiée, file d’attente côté backend, cache des réponses statiques du flow guidé. 

4. Risque : Coût API sous-estimé (prompt système long → +1 000 tokens à chaque call)
   Probabilité : Haute  
   Impact : Majeur  
   Mitigation : Raccourcir le prompt, injecter la partie « Core analogies » seulement au premier tour, ou stocker dans la mémoire de fonction. 

5. Risque : Cold start & mémoire des Edge Functions Vercel
   Probabilité : Moyenne  
   Impact : Majeur (latence > 5 s)  
   Mitigation : Activer « always-on function » payante ou bâtir un micro-service long-lived (Fly.io, Railway). 

6. Risque : Concurrence 100 utilisateurs → explosions des Lambda concurrentes (Vercel soft-limit 125 req/sec)  
   Probabilité : Moyenne  
   Impact : Majeur  
   Mitigation : Pré-générer les réponses du flow guidé, mettre Cloudflare Turnstile anti-bot, surveiller la métrique « Concurrent executions ». 

7. Risque : Latence LLM perceptible (2-8 s) alors que la démo exige instantané
   Probabilité : Haute  
   Impact : Majeur  
   Mitigation : Loader + messages fantômes pré-écrits, streaming token-by-token, réduire la taille maxTokens à 120. 

8. Risque : Architecture « stateless » → perte d’historique au refresh, incohérences si l’utilisateur fait « Refaire une session »
   Probabilité : Haute  
   Impact : Mineur (POC) / Majeur (post-POC)  
   Mitigation : Ajouter localStorage rapidement ou accepter la limite pour la démo. 

9. Risque : Prompt injection malgré règles
   Probabilité : Moyenne  
   Impact : Majeur (fuite du prompt, discrédit)  
   Mitigation : Filtrer côté backend les chaînes « ignore », « system », tester jailbreaks; garder le modèle en sandbox, logs. 

10. Risque : API key Anthropic exposée par erreur (bundle Next côté client mal configuré)  
    Probabilité : Moyenne  
    Impact : Critique (clé vidée et facture)  
    Mitigation : Vérifier que route.ts s’exécute server-side only, utiliser `.env` dans `serverVariables`, CI lint sur « ANTHROPIC_API_KEY » dans le bundle. 

11. Risque : RGPD / données santé (stress, fatigue = données sensibles)
    Probabilité : Moyenne  
    Impact : Critique (investisseurs européens)  
    Mitigation : Mettre une bannière consentement, anonymiser, héberger dans l’UE (Pas de région eu1 chez Anthropic), ou déclarer POC non-compliant. 

12. Risque : Cross-browser mobile – iOS Safari throttle `setTimeout` + animations 60 FPS
    Probabilité : Haute  
    Impact : Majeur (widget cassé)  
    Mitigation : Tester sur iOS 16/17, fallback CSS keyframes au lieu de Framer, désactiver blur lourd. 

13. Risque : Accessibilité & performance du widget (requestAnimationFrame 3 min → batterie)
    Probabilité : Moyenne  
    Impact : Mineur (POC), Majeur (prod)  
    Mitigation : Pause on tab hidden, reduce fps mobile. 

14. Risque : Dépendance Shadcn (copie de code) → pas de mises à jour automatiques
    Probabilité : Haute  
    Impact : Mineur court terme / Majeur long terme  
    Mitigation : Documenter fork, prévoir script de merge upstream. 

15. Risque : Stack Next 14 App Router encore instable (14.1 bugs SSR/Route Handlers)
    Probabilité : Moyenne  
    Impact : Majeur  
    Mitigation : Pinner `next@14.2.x`, tests E2E, option fallback vers Pages Router. 

16. Risque : Framer Motion + Tailwind + Shadcn dans Server Components (App Router) – hydration mismatch
    Probabilité : Moyenne  
    Impact : Majeur (white screen)  
    Mitigation : Isoler le widget en Client Component explicite `'use client'`, vérifier build. 

17. Risque : Absence de tests automatisés → régressions pendant la veille de la démo
    Probabilité : Haute  
    Impact : Majeur  
    Mitigation : Au minimum un test Playwright happy-path, CI sur push. 

18. Risque : Fallbacks d’erreur non testés live (quota, 500, 429)  
    Probabilité : Moyenne  
    Impact : Majeur  
    Mitigation : Script de chaos testing (curl avec status mocké), mock server local. 

19. Risque : Vidéo de secours non prête
    Probabilité : Moyenne  
    Impact : Critique (demo day)  
    Mitigation : Enregistrer screencast la veille, lien local. 

20. Risque : Dette future – flow 100 % « quick reply » donc refonte massive si conversation libre demandée
    Probabilité : Haute  
    Impact : Majeur (rework complet)  
    Mitigation : Séparer « LLM service » et « UI flow » dès maintenant, prévoir intent classifier modulaire. 

21. Risque : Monitoring absent (logs, traces, vitals)
    Probabilité : Haute  
    Impact : Majeur (debug en live impossible)  
    Mitigation : Activer Vercel Observability ou Logtail, console.info interdite. 

22. Risque : CORS ouvert sur `/api/chat` → bot spam, facture
    Probabilité : Moyenne  
    Impact : Majeur  
    Mitigation : Restrict origins, add simple secret token header. 

23. Risque : Plan gratuit Vercel ne supporte pas les Edge Functions en région EU + quotas 100 GB-hr
    Probabilité : Moyenne  
    Impact : Majeur  
    Mitigation : Passer au plan Pro (20 $/mois) ou Fly. 

24. Risque : Incompatibilité future avec Next 15 et React 19 (release Q4)
    Probabilité : Basse  
    Impact : Mineur court terme, Majeur long terme  
    Mitigation : Geler les versions, prévoir upgrade path. 

25. Risque : Politique d’usage Anthropic – content sur « health advice » peut être bloqué
    Probabilité : Basse à Moyenne  
    Impact : Critique (app coupée)  
    Mitigation : Relire TOS, soumettre pour pré-review, ou passer par GPT-4 qui autorise wellness. 

────────────────────────────────────────

NOTE DE FAISABILITÉ : 4 / 10

Justification :  
• Scope front + back + animations + multi-device en 4 jours par UN développeur est optimiste ; le moindre contre-temps API ou build fait déraper.  
• Forte dépendance à un modèle potentiellement non disponible + quotas serrés.  
• Concurrence, sécurité RGPD et tests quasi inexistants.  
• Les risques critiques cumulés laissent trop peu de marge pour une démo « sans filet ».  

En l’état, réduire le périmètre et sécuriser les dépendances externes est indispensable avant de confirmer la date.