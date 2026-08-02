<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// 👉 Menu de navigation en haut de page (identique aux autres pages)
const navItems = [
  { label: "L'histoire", path: '/musee-de-lasb', icon: 'book' },
  { label: 'Les maillots', path: '/maillots', icon: 'shirt' },
  { label: 'Palmarès', path: '/palmares', icon: 'trophy' },
  { label: 'Le projet', path: '/projet', icon: 'scroll' },
]

// 👉 Liste des maillots (image de droite renseignée, case de gauche vide à compléter plus tard)
const maillots = [
  { img: '/images/vellas.png', caption: "Le défenseur de l'ASB Julien Vellas face à Uzes en CFA 2010-11" },
  { img: '/images/asbcfa.png', caption: 'FC Martigues - AS Béziers CFA 2013-2014' },
  { img: '/images/IMG_6117.jpg', caption: 'François Kembolo en National 1 2015-16' },
  { img: '/images/image-3.jpg', caption: 'Légende ...' },
  { img: '/images/atassi.png', caption: 'Réda Atassi en Ligue 2 face au Paris FC le 17 août 2018' },
  { img: '/images/kante.webp', caption: "3e maillot Ibrahima Savane face à l'AC Ajaccio en Ligue 2" },
  { img: '/images/cdf.jpg', caption: 'Vincent Viot contre Canet RFC pour le 7e tour de la Coupe de France 17 novembre 2018' },
  { img: '/images/testu.jpg', caption: 'Kévin Testuf face au Red Star le 20 décembre 2019 en National 1' },
  { img: '/images/taillan.jpg', caption: 'Robin Taillan face au FC Villefranche le 7 février 2020 en National 1' },
  { img: '/images/ramon.jpg', caption: 'Michel Ramon avec Stéphane Zobo contre Trélissac le 23 février 2022 en National 2' },
  { img: '/images/mostefan3.jpg', caption: 'Mehdi Mostefa le 27 août 2022 contre le SC Balma en National 3' },
  { img: '/images/mostefan32.jpg', caption: 'Mehdi Mostefa le 10 décembre 2022 face à Beaucaire en National 3' },
]
</script>

<template>
  <div class="page">

    <!-- MENU DE NAVIGATION HAUT DE PAGE -->
    <nav class="museum-nav">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ 'nav-item--active': route.path === item.path }"
      >
        <span class="nav-icon">
          <svg v-if="item.icon === 'book'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2z"/>
            <path d="M22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/>
          </svg>
          <svg v-else-if="item.icon === 'shirt'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 3l5 3-2 4-3-1v13H8V9l-3 1-2-4 5-3 2 2h4z"/>
          </svg>
          <svg v-else-if="item.icon === 'trophy'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 4h8v6a4 4 0 0 1-8 0V4z"/>
            <path d="M5 5H3v2a4 4 0 0 0 4 4"/>
            <path d="M19 5h2v2a4 4 0 0 1-4 4"/>
            <path d="M9 18h6"/>
            <path d="M10 14v3M14 14v3"/>
            <path d="M8 20h8"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h12l4 4v12H4z"/>
            <path d="M16 4v4h4"/>
          </svg>
        </span>
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </nav>

    <hr />

    <h1 class="main-title">LES MAILLOTS</h1>

    <!-- LISTE DES MAILLOTS -->
    <div
      v-for="(maillot, i) in maillots"
      :key="i"
      class="maillot-pair"
    >
      <div class="maillot-empty"></div>

      <figure class="maillot-photo">
        <img :src="maillot.img" :alt="maillot.caption" />
        <figcaption>{{ maillot.caption }}</figcaption>
      </figure>
    </div>

  </div>
</template>

<style scoped>
.page {
  background-color: #ffffff;
  color: #222;
  padding: 3rem 6rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* MENU DE NAVIGATION HAUT DE PAGE */
.museum-nav {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 1rem 0 2rem;
  flex-wrap: wrap;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #222;
  gap: 0.8rem;
}

.nav-icon {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px solid #a83c3c;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a83c3c;
  background: #fff;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-icon svg {
  width: 40px;
  height: 40px;
}

.nav-label {
  font-weight: 700;
  text-decoration: underline;
  color: #222;
}

.nav-item--active .nav-icon {
  background-color: #000;
  color: #fff;
  border-color: #000;
}

.main-title {
  color: #a83c3c;
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 2.5rem;
}

.page hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 2.5rem 0;
}

/* PAIRE MAILLOT : case vide à gauche / photo à droite */
.maillot-pair {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid #ddd;
  flex-wrap: wrap;
}

.maillot-pair:last-child {
  border-bottom: none;
}

.maillot-empty {
  flex: 1;
  min-width: 280px;
  background-color: #e5e7eb;
  border-radius: 6px;
  min-height: 420px;
}

.maillot-photo {
  flex: 1;
  min-width: 280px;
  margin: 0;
  text-align: center;
}

.maillot-photo img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 6px;
}

.maillot-photo figcaption {
  margin-top: 0.8rem;
  font-style: italic;
  color: #555;
}

@media (max-width: 800px) {
  .page {
    padding: 2rem 1.5rem;
  }
  .museum-nav {
    gap: 1.5rem;
  }
  .nav-icon {
    width: 70px;
    height: 70px;
  }
  .maillot-empty {
    min-height: 280px;
  }
  .maillot-photo img {
    height: 280px;
  }
}
</style>