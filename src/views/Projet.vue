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

    <h1 class="main-title">LE PROJET</h1>

    <p>
      La riche histoire du football biterrois a longtemps été peu mise en avant et parfois
      incomplète. C'est de ce constat qu'est né ce projet. Pendant plusieurs mois, nous avons
      travaillé à la collecte d'un maximum d'informations, d'archives, de traces historiques,
      de photographies et de témoignages, afin de pouvoir vous présenter aujourd'hui ce
      <strong>Musée Virtuel du football biterrois</strong>.
    </p>

    <p>
      Après un important travail de vérification, de tri et de classement chronologique des
      données recueillies, nous avons mis en forme l'ensemble de ces contenus pour vous
      proposer une page claire et accessible, retraçant l'histoire du club et du football
      biterrois dans sa globalité.
    </p>

    <p>
      Ce projet d'archives numériques a pour objectif de <strong>transmettre dans le temps
      la culture du football biterrois</strong>, de réaliser un véritable travail de mémoire
      et de contribuer à mieux préparer l'avenir en sachant d'où nous venons. Le Musée Virtuel
      se veut évolutif : il continuera de s'enrichir au fil du temps grâce à de nouvelles
      archives, témoignages et contributions.
    </p>

    <p>
      Nous tenons à remercier chaleureusement toutes les personnes qui ont participé et apporté
      leur aide à ce projet. Parmi elles, nous pouvons notamment citer
      <strong>Monsieur Camille Passi, Bernard Camon, Roland Pratx</strong>, ainsi que toutes
      celles et ceux qui ont contribué, de près ou de loin, à la préservation de cette mémoire
      collective.
    </p>

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
  margin-bottom: 1.5rem;
}

.page p {
  line-height: 1.7;
  font-size: 1.05rem;
  margin-bottom: 1.2rem;
}

.page hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 2.5rem 0;
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
}
</style>