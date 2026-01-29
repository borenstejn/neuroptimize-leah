RAPPORT DE RISQUES – POC « MAX »  

======================================================================

1. Risque : Planning 3-4 jours / 12 h dev  
   Probabilité : Haute  
   Impact : Critique  
   Mitigation : Couper tout ce qui n’est pas indispensable ; livrer une démo scriptée sans adaptation, sans audio et sans streaming LLM. Prévoir 2 jours buffer ou un second dev.

2. Risque : Intégration Claude 3.5 Sonnet (disponibilité & quotas)  
   Probabilité : Moyenne/Haute (SLAs très jeunes, outages réguliers)  
   Impact : Critique (démo bloquante)  
   Mitigation :  
   • Préparer clé OpenAI de secours + switch runtime.  
   • Cacher les feedbacks dans le JSON fallback et enregistrer la vidéo AVANT jeudi soir.  

3. Risque : Coût / Free Tier Anthropic & Vercel  
   Probabilité : Haute (3–4 conversations ≈ OK, 100 users = KO)  
   Impact : Majeur  
   Mitigation : Limiter la taille des prompts, couper le streaming, utiliser proxy « pay-as-you-go » avec budget plafond.  

4. Risque : Concurrence Vercel Free Tier (100 req/s maximum, 10 s function limit)  
   Probabilité : Haute si démo partagée publiquement  
   Impact : Majeur  
   Mitigation : Passer sur   edge-functions payantes ou Fly.io ; throttle front-end à 1 appel toutes 10 s.  

5. Risque : Cold-start Serverless → latence initiale >3 s  
   Probabilité : Moyenne  
   Impact : Majeur (critère de succès <3 s)  
   Mitigation : Pré-chauffer la route via ping chaque minute ; ou héberger l’API sur un process long-living (Railway, Render).  

6. Risque : 60 fps avec Framer Motion + Tailwind + 16 SVG animés  
   Probabilité : Haute (laptop Intel 2019)  
   Impact : Majeur  
   Mitigation : Utiliser canvas/WebGL ou CSS transforms simples ; réduire ombrés et glow ; désactiver animations en cascade.  

7. Risque : Son « bip » cross-browser / auto-play policies  
   Probabilité : Moyenne  
   Impact : Mineur  
   Mitigation : Retirer l’audio, ou déclencher par interaction explicite.  

8. Risque : Génération de séquence « non-adjacente » toujours faisable (N=7 sur grille 4×4)  
   Probabilité : Moyenne  
   Impact : Majeur (boucle infinie possible)  
   Mitigation : Algo back-tracking + timeout ; fallback à « doublons autorisés ».  

9. Risque : Gestion d’état partagé Chat ↔ Exercice (race conditions)  
   Probabilité : Moyenne  
   Impact : Majeur  
   Mitigation : Stocker l’état dans un reducer unique, verrouiller les transitions par enum stricte ; tests manuels + console overlay.  

10. Risque : Prompt-Injection / Jailbreak (l’utilisateur peut taper du texte)  
    Probabilité : Haute si champ texte laissé actif  
    Impact : Critique (Max révèle le prompt, emojis, jargon)  
    Mitigation : Désactiver ChatInput, n’utiliser que des quick-replies ; ou filtrer / sanitize toute entrée.  

11. Risque : Fuites de clé API (NextJS edge env → bundle)  
    Probabilité : Moyenne  
    Impact : Critique (factures surprises, sécurité)  
    Mitigation : Appel API uniquement côté serverless, clé dans env ; « publicRuntimeConfig » interdit.  

12. Risque : RGPD / Données médicales implicites  
    Probabilité : Moyenne  
    Impact : Majeur (investisseurs FR)  
    Mitigation : Aucun PII collecté, anonymiser logs, bannière consentement avant l’appel LLM externalisé.  

13. Risque : Logs Vercel (console.debug) exposent séquences & PII  
    Probabilité : Moyenne  
    Impact : Majeur  
    Mitigation : Flag DEBUG à false en prod, purge logs après démo.  

14. Risque : LLM imprévisible (emojis, analogies CPU) malgré prompt  
    Probabilité : Haute (tests réels)  
    Impact : Majeur (critère d’échec)  
    Mitigation : Post-processing serveur (regex) pour supprimer emojis & mots interdits ; boucle de re-ask si violation.  

15. Risque : Absence de tests automatisés → régressions invisibles  
    Probabilité : Haute  
    Impact : Majeur  
    Mitigation : Au minimum unit-test `generateSequence` & adaptation avec Vitest.  

16. Risque : Technical Debt UI : logique métier intégrée dans composants React  
    Probabilité : Haute  
    Impact : Majeur à moyen terme  
    Mitigation : Séparer core (`lib/engine.ts`) du rendu ; commentaire TODO clear.  

17. Risque : Dépendance lourde à Vercel AI SDK (breaking‐changes hebdo)  
    Probabilité : Moyenne  
    Impact : Majeur  
    Mitigation : Isoler la couche SDK derrière `lib/ai.ts`, tests end-to-end.  

18. Risque : Sécurité XSS – insertion de HTML dans feedback LLM  
    Probabilité : Moyenne  
    Impact : Critique  
    Mitigation : Afficher feedback en `textContent`, pas `dangerouslySetInnerHTML`.  

19. Risque : Accessibilité / Focus-Trap (clavier) non géré  
    Probabilité : Moyenne  
    Impact : Mineur (pour la démo) mais important ensuite  
    Mitigation : ARIA roles de base, test tab-navigation rapide.  

20. Risque : Scalabilité mémoire-browser (100 users × 60fps)  
    Probabilité : Basse-Moyenne  
    Impact : Mineur sur POC, mais blocant produit  
    Mitigation : Throttle `requestAnimationFrame`, unmount idle composants.  

21. Risque : Absence d’auth → aucune isolation de session, possibilité de partager URL et polluer stats / logs  
    Probabilité : Haute (lien Slack commun)  
    Impact : Mineur pour POC, Majeur plus tard  
    Mitigation : Jeton de session stocké en cookie, même si non persistant.  

22. Risque : Déploiement Vercel bloqué sur quota de builds (Free)  
    Probabilité : Moyenne  
    Impact : Mineur  
    Mitigation : Construire localement, push dossier `.vercel/output`.  

23. Risque : Vidéo de secours pas synchronisée avec nouveau build → incohérence lors d’une panne de dernière minute  
    Probabilité : Moyenne  
    Impact : Moyen  
    Mitigation : Enregistrer la vidéo une fois le build final gelé ; passer le script en full offline si crash.  

======================================================================

NOTE DE FAISABILITÉ : 3 / 10  

Justification :  
• 12 h net pour un full-stack solo incluant UI animée 60 fps, intégration LLM fiable, logique adaptative, fallback vidéo, tests manuels et déploiement est tout simplement trop serré.  
• Trois dépendances réseau (Vercel Edge, Anthropic, CDN) peuvent toutes casser la démo.  
• Les critères d’excellence (60 fps, <3 s API, zéro emoji) nécessitent plusieurs itérations de tuning et de QA.  
• On peut montrer un prototype cliquable (séquence fixe, feedback statique) en 2 jours, mais pas la liste complète des “Must Have” sans sacrifier qualité ou dormir.