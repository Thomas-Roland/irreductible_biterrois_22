<script setup>
// Horaires (utilisés dans le footer, commun à toutes les pages)
const schedule = [
  { day: 'Lun', hours: '8h00 – 18h00' },
  { day: 'Mar', hours: '8h00 – 18h00' },
  { day: 'Mer', hours: '8h00 – 18h00' },
  { day: 'Jeu', hours: '8h00 – 18h00' },
  { day: 'Ven', hours: '8h00 – 18h00' },
  { day: 'Sam', hours: '8h00 – 18h00' },
  { day: 'Dim', hours: 'Fermé' },
]
</script>

<template>
  <div class="site">
    <!-- HEADER (commun à toutes les pages) -->
    <header class="header">
      <router-link to="/" class="logo-link" aria-label="Retour à l'accueil">
        <img class="logo" src="/images/logo-IB22.png" alt="Logo Irréductible Biterrois 22" />
      </router-link>
      <h1 class="site-title">IRRÉDUCTIBLE BITERROIS 22</h1>
      <nav class="nav">
        <router-link to="/">Accueil</router-link>
        <router-link to="/groupe">Le groupe</router-link>
        <router-link to="/organigramme">Organigramme</router-link>
        <router-link to="/album">Musée du Foot</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </header>

    <!-- CONTENU DE LA PAGE ACTIVE -->
    <router-view />

    <!-- FOOTER (commun à toutes les pages) -->
    <footer class="footer">
      <div class="footer-col">
        <h3>Les pages</h3>
        <router-link to="/">Accueil</router-link>
        <router-link to="/groupe">Le groupe</router-link>
        <router-link to="/organigramme">Organigramme</router-link>
        <router-link to="/album">Musée du Foot</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
      <div class="footer-col">
        <h3>Contact</h3>
        <a href="mailto:irreductiblesbiterrois22@gmail.com">irreductiblesbiterrois22@gmail.com</a>
      </div>
      <div class="footer-col">
        <h3>Les horaires</h3>
        <p v-for="s in schedule" :key="s.day">{{ s.day }} {{ s.hours }}</p>
      </div>
      <div class="footer-col">
        <h3>Nos réseaux</h3>
        <div class="socials">
          <a href="https://www.facebook.com/profile.php?id=100089442218327" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>
          </a>
          <a href="https://www.instagram.com/irreductiblesbiterrois22?igsh=MWtiY21yOGVpMnBnag%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.76c-.5.5-1.1.9-1.76 1.15-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 0 1 5.44.54C6.08.29 6.81.12 7.87.07 8.94.02 9.28 0 12 0zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.17 1.17 0 1 1 0-2.34 1.17 1.17 0 0 1 0 2.34z" transform="translate(0 2)"/></svg>
          </a>
          <a href="https://www.tiktok.com/@irrductibles.biterrois22?_t=8rsvTAEy26Q&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82a4.28 4.28 0 0 1-3.14-1.39V16.6a5.1 5.1 0 1 1-4.4-5.06v2.56a2.6 2.6 0 1 0 1.83 2.48V2h2.53a4.28 4.28 0 0 0 3.18 4.13v2.55a6.8 6.8 0 0 1-3.18-.83v-.03a4.28 4.28 0 0 0 3.18-4.13V2h-2.53z"/></svg>
          </a>
        </div>
      </div>
      <p class="copyright">© 2025 Irréductible Biterrois 22. Tous droits réservés.</p>
    </footer>
  </div>
</template>

<style>
:root {
  --rouge: #a83c3c;
  --bleu: #1c3a5e;
}

* {
  box-sizing: border-box;
}

.site {
  font-family: 'Arial', sans-serif;
  color: #222;
}

/* HEADER */
.header {
  background-color: #a83c3c;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem 3rem;
  flex-wrap: wrap;
}

.logo-link {
  display: inline-block;
  line-height: 0;
  cursor: pointer;
}

.logo {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
  background: #222;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.logo-link:hover .logo {
  transform: scale(1.05);
  opacity: 0.9;
}

.site-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 900;
  flex: 1;
  margin: 0;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  color: white;
  font-weight: bold;
}

.nav a {
  color: white;
  text-decoration: none;
}

.nav a:hover {
  opacity: 0.75;
}

.nav a.router-link-active {
  text-decoration: none;
  opacity: 0.75;
}

/* FOOTER */
.footer {
  background-color: #a83c3c;
  color: white;
  padding: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 240px));
  justify-content: center;
  gap: 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  text-align: center;
}

.footer-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-col h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.footer-col a {
  display: block;
  color: white;
  text-decoration: none;
  margin-bottom: 0.5rem;
}

.footer-col p {
  margin: 0.3rem 0;
}

.socials {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  font-size: 1.5rem;
}

.socials a {
  background: white;
  border-radius: 6px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.socials a svg {
  width: 22px;
  height: 22px;
  color: #a83c3c;
}

.copyright {
  grid-column: 1 / -1;
  text-align: center;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding-top: 1.5rem;
}
</style>