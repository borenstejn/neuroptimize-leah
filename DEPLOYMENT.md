# Guide de Déploiement Vercel - Neuroptimize POC v5.3

Guide complet pour déployer l'application sur Vercel.

---

## 🚀 Prérequis

- Compte Vercel (gratuit) : https://vercel.com/signup
- Vercel CLI installé : `npm install -g vercel`
- Application buildée localement avec succès : `npm run build`

---

## 📋 Étapes de Déploiement

### 1. Connexion à Vercel

```bash
# Se connecter à Vercel CLI
vercel login

# Vérifier la connexion
vercel whoami
```

### 2. Initialisation du Projet

```bash
# À la racine du projet
vercel

# Répondre aux questions :
# - Set up and deploy? → Yes
# - Which scope? → [Votre compte]
# - Link to existing project? → No
# - What's your project's name? → neuroptimize-leah (ou autre)
# - In which directory is your code located? → ./
# - Want to override the settings? → No
```

Cette commande :
- Crée un lien entre le projet local et Vercel
- Crée un fichier `.vercel/project.json`
- Déploie une version preview

### 3. Configuration des Variables d'Environnement (Optionnel)

Si vous implémentez le Ticket #13 (API Claude), configurez la variable :

```bash
# Via CLI
vercel env add ANTHROPIC_API_KEY production

# Ou via Dashboard Vercel :
# → Projet → Settings → Environment Variables
# → Ajouter : ANTHROPIC_API_KEY = sk-ant-...
```

**Note** : Pour le POC actuel (sans API Claude), aucune variable d'environnement n'est requise.

### 4. Déploiement en Production

```bash
# Déployer en production
vercel --prod

# La commande affiche l'URL de production
# Exemple : https://neuroptimize-leah.vercel.app
```

### 5. Vérification du Déploiement

```bash
# Lister les déploiements
vercel ls

# Tester l'URL
curl -I https://your-project.vercel.app

# Ouvrir dans le navigateur
vercel open
```

---

## 🔧 Configuration Vercel

Le fichier `vercel.json` contient la configuration du projet :

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "regions": ["cdg1"],
  "cleanUrls": true,
  "trailingSlash": false
}
```

### Paramètres clés

- **buildCommand** : Commande de build Next.js
- **framework** : Détection automatique Next.js
- **regions** : `cdg1` (Paris) pour la France
- **cleanUrls** : URLs sans `.html`
- **trailingSlash** : Pas de `/` final

---

## 🌍 URLs et Environnements

Vercel crée automatiquement 3 environnements :

### 1. Production
- URL : `https://neuroptimize-leah.vercel.app`
- Branche : `main` (ou `master`)
- Déploiement : Manuel via `vercel --prod`

### 2. Preview
- URL : `https://neuroptimize-leah-<hash>.vercel.app`
- Branche : Toutes les branches (automatique)
- Déploiement : Automatique sur `git push`

### 3. Development
- URL : `http://localhost:3000`
- Local uniquement
- Déploiement : `npm run dev`

---

## 🔄 Déploiement Continu (CI/CD)

### Configuration avec Git

1. **Connecter le repository GitHub** :
   ```bash
   # Via Dashboard Vercel
   # → Import Project → Import Git Repository
   # → Sélectionner le repository
   ```

2. **Déploiements automatiques** :
   - Chaque `git push` → Déploiement preview
   - Merge dans `main` → Déploiement production

### Désactiver les déploiements automatiques (optionnel)

```bash
# Via vercel.json
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "preview": false
    }
  }
}
```

---

## 📊 Monitoring et Analytics

### 1. Via Dashboard Vercel

- **Deployments** : Historique des déploiements
- **Analytics** : Visites, performances
- **Logs** : Logs en temps réel

### 2. Via CLI

```bash
# Logs de production
vercel logs --prod

# Logs d'un déploiement spécifique
vercel logs https://your-deployment-url.vercel.app
```

---

## 🚨 Dépannage

### Erreur : "Build failed"

```bash
# Tester le build localement
npm run build

# Vérifier les logs Vercel
vercel logs --prod

# Nettoyer le cache
vercel --prod --force
```

### Erreur : "Module not found"

```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
vercel --prod
```

### Erreur : "Timeout during build"

Vérifier la configuration dans `vercel.json` :

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next",
      "config": {
        "maxDuration": 300
      }
    }
  ]
}
```

### Page 404 après déploiement

- Vérifier que `app/page.tsx` existe
- Vérifier la structure Next.js App Router
- Nettoyer le cache : `rm -rf .next && npm run build`

---

## 🔒 Sécurité

### Variables d'environnement

- Ne jamais commit les `.env.local`
- Utiliser Vercel Environment Variables
- Différencier production/preview/development

### Headers de sécurité

Ajouter dans `vercel.json` :

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

## 📈 Performance

### Optimisations automatiques Vercel

- ✅ Compression Brotli/Gzip
- ✅ CDN global (Edge Network)
- ✅ Image optimization
- ✅ Caching intelligent
- ✅ Code splitting automatique

### Métriques attendues

| Métrique | Valeur Cible | Note |
|----------|--------------|------|
| **First Contentful Paint** | < 1.5s | ✅ |
| **Time to Interactive** | < 3s | ✅ |
| **Lighthouse Performance** | > 90 | ✅ |
| **Build Time** | < 10s | ✅ |

---

## 🎯 Checklist Post-Déploiement

- [ ] URL de production accessible
- [ ] Application charge correctement
- [ ] Interface responsive (mobile/desktop)
- [ ] Exercice fonctionne (intro → feedback)
- [ ] Pas d'erreurs console
- [ ] Avatar Max visible
- [ ] Animations fluides
- [ ] Boutons fonctionnels
- [ ] Tests manuels passent (TESTING_CHECKLIST.md)

---

## 🔗 Liens Utiles

- **Dashboard Vercel** : https://vercel.com/dashboard
- **Documentation Vercel** : https://vercel.com/docs
- **Next.js Deployment** : https://nextjs.org/docs/deployment
- **Vercel CLI** : https://vercel.com/docs/cli

---

## 📝 Commandes Utiles

```bash
# Déploiement
vercel                    # Preview deployment
vercel --prod             # Production deployment

# Gestion
vercel ls                 # Lister les déploiements
vercel rm <url>           # Supprimer un déploiement
vercel domains            # Gérer les domaines
vercel env ls             # Lister les variables d'env

# Logs
vercel logs               # Logs du dernier déploiement
vercel logs --prod        # Logs de production
vercel logs --follow      # Logs en temps réel

# Configuration
vercel link               # Lier le projet local à Vercel
vercel pull               # Télécharger la config Vercel
vercel whoami             # Vérifier l'authentification

# Développement
vercel dev                # Simuler l'environnement Vercel localement
```

---

## 🎬 Workflow Recommandé

### Développement

1. Développer localement : `npm run dev`
2. Tester : `npm run test`
3. Build : `npm run build`
4. Commit : `git commit -m "Feature X"`
5. Push : `git push origin feature-branch`
6. Preview déployé automatiquement

### Production

1. Merger dans `main` : `git merge feature-branch`
2. Déployer : `vercel --prod`
3. Vérifier : Tester l'URL de production
4. Monitorer : Vérifier les logs et analytics

---

**Déploiement Vercel configuré pour Neuroptimize POC v5.3**

🚀 Prêt pour mise en ligne publique !
