# Irréductible Biterrois 22 — Site officiel

Site du groupe de supporters **Irréductible Biterrois 22**, développé en **Vue 3** + **Vite**, déployé automatiquement sur **GitHub Pages** via **GitHub Actions**.

🔗 Site en ligne : https://thomas-roland.github.io/irreductible_biterrois_22/

---

## 🚀 Démarrage rapide

### Installer les dépendances (une seule fois, ou après un `git pull` qui touche `package.json`)

```bash
npm install
```

### Lancer le site en local (mode développement, avec rechargement automatique)

```bash
npm run dev
```

Puis ouvre : `http://localhost:5173`

### Construire le site pour la production (génère le dossier `dist/`)

```bash
npm run build
```

### Prévisualiser le build de production en local (avant de push)

```bash
npm run preview
```

Puis ouvre : `http://localhost:4173/irreductible_biterrois_22/`
⚠️ Toujours tester avec `preview`, pas juste `dev`, avant de push — c'est le seul moyen de détecter en local les bugs qui n'apparaissent qu'en production (routing, images...).

---

## 📁 Structure du projet

```
website_ib22/
├── .github/workflows/deploy.yml   ← Le robot qui build + déploie automatiquement
├── public/
│   └── images/                    ← Toutes les images du site (logos, photos, maillots...)
├── src/
│   ├── router/index.js            ← La liste des pages et leurs URLs
│   ├── views/                     ← Une page = un fichier .vue
│   │   ├── Accueil.vue
│   │   ├── Groupe.vue
│   │   ├── Organigramme.vue
│   │   ├── Album.vue              (Musée du Foot / L'histoire)
│   │   ├── Maillots.vue
│   │   ├── Palmares.vue
│   │   ├── Projet.vue
│   │   └── Contact.vue
│   ├── App.vue                    ← Le header + footer, communs à toutes les pages
│   └── main.js
├── vite.config.js                 ← Config technique (ne pas toucher sans savoir pourquoi)
└── package.json
```

---

## ✏️ Modifier une page existante

1. Ouvre le fichier correspondant dans `src/views/` (ex: `Contact.vue` pour la page Contact).
2. Modifie le texte, les images, le style CSS en bas du fichier.
3. Vérifie en local (`npm run dev`), puis publie (voir section **Déploiement** ci-dessous).

---

## ➕ Ajouter une nouvelle page

1. Crée un nouveau fichier dans `src/views/`, ex: `MaPage.vue` (copie la structure d'une page existante comme base).
2. Ouvre `src/router/index.js` et ajoute une ligne dans le tableau `routes` :
   ```javascript
   import MaPage from '../views/MaPage.vue'
   // ...
   const routes = [
     // ...
     { path: '/ma-page', component: MaPage },
   ]
   ```
3. Ajoute un lien vers cette page dans le menu (`src/App.vue`), dans les deux `<nav>` (header ET footer) :
   ```html
   <router-link to="/ma-page">Ma page</router-link>
   ```

---

## 🖼️ Ajouter ou utiliser une image — règle IMPORTANTE

Toutes les images du site vivent dans `public/images/`. Pour en ajouter une :

1. Dépose le fichier image dans `public/images/`.
2. Dans le code, référence-la de cette façon (JAMAIS en écrivant `/images/...` en dur) :

```javascript
// En haut du <script setup>, si la fonction n'existe pas déjà dans le fichier :
function img(path) {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
```

```html
<img :src="img('/images/mon-image.jpg')" alt="Description" />
```

**Pourquoi ?** Le site est hébergé dans un sous-dossier (`/irreductible_biterrois_22/`) et non à la racine du domaine. Un chemin écrit en dur comme `src="/images/mon-image.jpg"` pointe vers la racine du domaine GitHub et casse l'image une fois en ligne (même si ça marche en `npm run dev` local). La fonction `img()` corrige automatiquement le chemin quel que soit l'environnement (dev, preview, production).

---

## 🌍 Déploiement (mettre le site à jour en ligne)

Le déploiement est **automatique** : à chaque `git push` sur la branche `main`, GitHub Actions build le site et le publie tout seul (~1-2 minutes).

```bash
git add .
git commit -m "Description de ce que tu as changé"
git push
```

Puis va vérifier sur : `github.com/Thomas-Roland/irreductible_biterrois_22/actions`
- 🟡 Rond jaune = déploiement en cours, attends.
- ✅ Coche verte = c'est en ligne, rafraîchis https://thomas-roland.github.io/irreductible_biterrois_22/
- ❌ Croix rouge = le build a échoué, clique sur le run pour voir l'erreur (voir section Dépannage).

---

## 🐛 Dépannage

### Le site affiche un 404
- Vérifie que `Settings → Pages → Source` est bien réglé sur **"GitHub Actions"** (pas "Deploy from a branch").
- Vérifie que le workflow dans l'onglet **Actions** est bien vert.

### Le site affiche seulement le header et le footer, pages vides
→ Problème de routing. Vérifie que `src/router/index.js` contient bien :
```javascript
history: createWebHistory(import.meta.env.BASE_URL),
```

### Des images ne s'affichent pas en ligne (mais marchent en local avec `npm run dev`)
→ Chemin d'image écrit en dur. Utilise la fonction `img()` décrite plus haut (voir section **Ajouter une image**).

### Le build échoue sur GitHub Actions avec une erreur "Rolldown failed to resolve import"
→ Une dépendance utilisée dans le code (ex: `vue-router`) n'est pas déclarée dans `package.json`. Corrige avec :
```bash
npm install <nom-du-paquet-manquant>
git add package.json package-lock.json
git commit -m "Ajoute la dependance manquante"
git push
```

### Erreur liée à `build.rollupOptions.external` ou `vite-plugin-vue-devtools`
→ Le plugin devtools ne doit tourner qu'en dev, pas en build de prod. Vérifie que `vite.config.js` contient :
```javascript
command === 'serve' ? vueDevTools() : null,
```

---

## 🔧 Config technique (à ne pas modifier sans raison précise)

- **`vite.config.js`** : contient `base: '/irreductible_biterrois_22/'` — indispensable pour que tous les liens/assets fonctionnent sous ce sous-dossier. Ne pas changer sauf si le nom du repo GitHub change.
- **`.github/workflows/deploy.yml`** : le script qui automatise build + déploiement. Utilise Node 22 (requis par la version de Vite installée).
- **`package.json` → `engines`** : version de Node minimale requise pour builder le projet.

---

## Stack technique

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Vue Router 4](https://router.vuejs.org/)
- [Vite](https://vite.dev/) (bundler)
- Déploiement : [GitHub Pages](https://pages.github.com/) via [GitHub Actions](https://github.com/features/actions)

### Recommandations IDE

[VS Code](https://code.visualstudio.com/) + extension [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Recommandations navigateur (pour le développement)

- Chrome/Edge/Brave : [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- Firefox : [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)