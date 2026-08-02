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

// 👉 Chiffres clés du palmarès
const stats = [
  { number: '1', label: 'Saison en Division 1 (1957-58)' },
  { number: '40', label: 'Saisons en Division 2' },
  { number: '12', label: 'Saisons en Division 3' },
  { number: '9', label: 'Saisons en Division 4' },
  { number: '3', label: 'Saisons en Division 5' },
  { number: '4', label: 'Saisons en Division 6' },
]

// 👉 Titres et distinctions
const titresGauche = [
  { icon: 'check', text: 'Un 1/4 de finale de Coupe de France (1962)' },
  { icon: 'trophy', text: 'Vainqueur de Division 3 en 1973 (Sud-Est)' },
  { icon: 'trophy', text: 'Un titre de champion de CFA 2 (2010)' },
  { icon: 'medal', text: 'Vice-champion en 2018 (promotion en Ligue 2)' },
]

const titresDroite = [
  { icon: 'trophy', text: 'Champion de Régional 1 (2009 et 2019)' },
  { icon: 'trophy', text: "Coupe de l'Hérault (2017 et 2019)" },
  { icon: 'trophy', text: 'Championnat de France National 3 (2023)' },
]

// 👉 Frise saison par saison
const saisons = [
  { periode: '1911', texte: 'Fondation du Stade Béziers Sport.' },
  { periode: '1918', texte: 'Le club est rebaptisé Stade Olympien Biterrois.' },
  { periode: '1932-33', texte: 'Le SO Biterrois joue en Division Honneur Sud-Est (D2) et termine 7ème.' },
  { periode: '1934-35', texte: "DH Sud-Est (D3). 6ème. Le club est rebaptisé Entente Sportive Biterroise à la suite d'une fusion avec 4 clubs Biterrois." },
  { periode: '1935-36', texte: 'DH Sud-Est (D3). 7ème.' },
  { periode: '1936-37', texte: 'DH Sud-Est (D4). 5ème.' },
  { periode: '1937-38', texte: 'DH Sud-Est (D4). 6ème.' },
  { periode: '1938-39', texte: 'DH Sud-Est (D3). 4ème. Le club est rebaptisé Association Sportive Béziers (ASB) et devient la section football du club omnisport de la ville de Béziers.' },
  { periode: '1939-40', texte: '2ème guerre mondiale. Les championnats officiels de football sont interrompus.' },
  { periode: '1945-46', texte: "Obtention du statut professionnel et intégration en Division 2 (D2). L'AS Béziers termine 13ème du Groupe Sud." },
  { periode: '1946-47', texte: 'D2. 15ème.' },
  { periode: '1947-48', texte: 'D2. 16ème.' },
  { periode: '1948-49', texte: 'D2. 12ème.' },
  { periode: '1949-50', texte: 'D2. 4ème.' },
  { periode: '1950-51', texte: 'D2. 15ème.' },
  { periode: '1951-52', texte: 'D2. 15ème.' },
  { periode: '1952-53', texte: 'D2. 14ème.' },
  { periode: '1953-54', texte: 'D2. 16ème.' },
  { periode: '1954-55', texte: 'D2. 11ème.' },
  { periode: '1955-56', texte: 'D2. 4ème.' },
  { periode: '1956-57', texte: "D2. 2ème, l'AS Béziers est promu en Division 1 (D1)." },
  { periode: '1957-58', texte: "Le 1er match de l'histoire de l'AS Béziers en D1 se solde par un match nul contre l'AS Saint-Étienne (2-2). La 1ère victoire est obtenue lors de la 10ème journée contre l'Olympique d'Alès (3-2). 18ème et dernier, l'AS Béziers est relégué en D2." },
  { periode: '1958-59', texte: 'D2. 10ème.' },
  { periode: '1959-60', texte: 'D2. 12ème.' },
  { periode: '1960-61', texte: 'D2. 5ème.' },
  { periode: '1961-62', texte: 'D2. 17ème.' },
  { periode: '1962-63', texte: 'D2. 10ème.' },
  { periode: '1963-64', texte: 'D2. 18ème et dernier.' },
  { periode: '1964-65', texte: 'D2. 16ème et dernier.' },
  { periode: '1965-66', texte: 'D2. 7ème.' },
  { periode: '1966-67', texte: 'D2. 5ème.' },
  { periode: '1967-68', texte: 'D2. 13ème.' },
  { periode: '1968-69', texte: "D2. 18ème, l'AS Béziers est relégué en CFA (D3) et abandonne son statut professionnel." },
  { periode: '1969-70', texte: 'CFA (D3). 6ème du Groupe Sud.' },
  { periode: '1970-71', texte: "Intégration dans le championnat Open de D2. L'AS Béziers termine 14ème du Groupe Sud." },
  { periode: '1971-72', texte: "D2. 13ème du Groupe C, l'AS Béziers est relégué en Division 3 (D3)." },
  { periode: '1972-73', texte: "D3. 1er du Groupe Sud-Est, l'AS Béziers est promu en D2. 3ème du Groupe A de la Phase Finale de D3." },
  { periode: '1973-74', texte: 'D2. 15ème du Groupe B.' },
  { periode: '1974-75', texte: 'D2. 13ème du Groupe B.' },
  { periode: '1975-76', texte: 'D2. 9ème du Groupe B.' },
  { periode: '1976-77', texte: 'D2. 7ème du Groupe A.' },
  { periode: '1977-78', texte: 'D2. 15ème du Groupe A.' },
  { periode: '1978-79', texte: 'D2. 3ème du Groupe A.' },
  { periode: '1979-80', texte: 'D2. 9ème du Groupe B.' },
  { periode: '1980-81', texte: 'D2. 4ème du Groupe A.' },
  { periode: '1981-82', texte: 'D2. 7ème du Groupe A.' },
  { periode: '1982-83', texte: 'D2. 11ème du Groupe A.' },
  { periode: '1983-84', texte: 'D2. 15ème du Groupe A.' },
  { periode: '1984-85', texte: 'D2. 15ème du Groupe B.' },
  { periode: '1985-86', texte: 'D2. 8ème du Groupe A.' },
  { periode: '1986-87', texte: "D2. 18ème et dernier du Groupe B, l'AS Béziers est relégué en D3." },
  { periode: '1987-88', texte: "D3. 14ème du Groupe Centre-Ouest, l'AS Béziers est relégué en Division 4 (D4)." },
  { periode: '1989-90', texte: 'D4. 13ème du Groupe H.' },
  { periode: '1990-91', texte: "Disparition de l'AS Béziers." },
  { periode: '2007-08', texte: "Fondation de l'Avenir Sportif Béziers, CFA 2. 17ème, relégation en DH" },
  { periode: '2008-09', texte: "DH; 1er de la Poule Unique, montée en CFA 2" },
  { periode: '2009-10', texte: "CFA 2. 1er du Groupe F, Montée en CFA" },
  { periode: '2010-11', texte: "CFA. 16ème du Groupe C" },
  { periode: '2011-12', texte: "CFA. 15ème du Groupe C" },
  { periode: '2012-13', texte: "CFA. 9ème du Groupe C" },
  { periode: '2013-14', texte: "CFA. 9ème du Groupe C" },
  { periode: '2014-15', texte: "CFA. 1er du Groupe C, montée en National 1" },
  { periode: '2015-16', texte: "National 1. 10ème" },
  { periode: '2016-17', texte: "National 1. 8ème" },
  { periode: '2017-18', texte: "National 1. 2ème, montée en Ligue 2" },
  { periode: '2018-19', texte: "Ligue 2. 18ème, réléguation en National 1" },
  { periode: '2019-20', texte: "National 1. 16ème (25 journées), saison arrêtée (covid-19), relégation en National 2" },
  { periode: '2020-21', texte: "National 2. 1er (9 journées) Groupe D, saison blanche (covid-19)" },
  { periode: '2021-22', texte: "National 2. 6ème du Groupe D, relégation administrative en National 3" },
  { periode: '2022-23', texte: "National 3. 1er du Groupe Occitanie, relégation administrative en Régional 1" },
  { periode: '2023-24', texte: "Régional 1. 7ème du Groupe A" },
  { periode: '2024-25', texte: "Régional 1. 7ème du Groupe A" },
  { periode: '2025-26', texte: "Régional 1. 7ème du Groupe A" },

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

    <h1 class="main-title">LE PALMARÈS DE L'AS BÉZIERS FOOTBALL</h1>

    <p>
      Au total, Béziers peut s'enorgueillir d'un palmarès modeste mais réel :
    </p>

    <!-- CHIFFRES CLÉS -->
    <div class="stats-grid">
      <div v-for="(stat, i) in stats" :key="i" class="stat-box">
        <div class="stat-number">{{ stat.number }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>

    <hr />

    <!-- TITRES ET DISTINCTIONS -->
    <div class="titres-grid">
      <ul class="titres-list">
        <li v-for="(titre, i) in titresGauche" :key="'g' + i">
          <span class="titre-icon">
            <svg v-if="titre.icon === 'check'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <svg v-else-if="titre.icon === 'medal'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="15" r="6"/>
              <path d="M9 10L6 3M15 10l3-7"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 4h8v6a4 4 0 0 1-8 0V4z"/>
              <path d="M5 5H3v2a4 4 0 0 0 4 4"/>
              <path d="M19 5h2v2a4 4 0 0 1-4 4"/>
              <path d="M9 18h6"/>
              <path d="M10 14v3M14 14v3"/>
              <path d="M8 20h8"/>
            </svg>
          </span>
          <span>{{ titre.text }}</span>
        </li>
      </ul>

      <ul class="titres-list">
        <li v-for="(titre, i) in titresDroite" :key="'d' + i">
          <span class="titre-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 4h8v6a4 4 0 0 1-8 0V4z"/>
              <path d="M5 5H3v2a4 4 0 0 0 4 4"/>
              <path d="M19 5h2v2a4 4 0 0 1-4 4"/>
              <path d="M9 18h6"/>
              <path d="M10 14v3M14 14v3"/>
              <path d="M8 20h8"/>
            </svg>
          </span>
          <span>{{ titre.text }}</span>
        </li>
      </ul>
    </div>

    <hr />

    <!-- FRISE SAISON PAR SAISON -->
    <h2>SAISON PAR SAISON</h2>

    <div class="saisons-list">
      <p v-for="(s, i) in saisons" :key="i">
        <strong>{{ s.periode }}</strong> : {{ s.texte }}
      </p>
    </div>

    <hr />

    <!-- RETOUR -->
    <div class="retour">
      <router-link to="/" class="btn-retour">RETOUR</router-link>
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
  margin-bottom: 1.5rem;
}

.page h2 {
  color: #a83c3c;
  font-size: 1.8rem;
  font-weight: 800;
  margin-top: 2.5rem;
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

/* CHIFFRES CLÉS */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2.5rem 0;
}

.stat-box {
  border: 2px solid #1e2a4a;
  border-radius: 4px;
  padding: 1.5rem 1rem;
  text-align: center;
}

.stat-number {
  color: #a83c3c;
  font-size: 3.2rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 0.8rem;
}

.stat-label {
  font-weight: 600;
  font-size: 1.05rem;
}

/* TITRES ET DISTINCTIONS */
.titres-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 3rem;
  margin: 1.5rem 0;
}

.titres-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.titres-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
  font-size: 1.1rem;
}

.titre-icon {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  color: #a83c3c;
}

.titre-icon svg {
  width: 100%;
  height: 100%;
}

/* FRISE SAISON PAR SAISON */
.saisons-list p {
  margin-bottom: 1.4rem;
}

/* RETOUR */
.retour {
  text-align: center;
  margin-top: 2rem;
}

.btn-retour {
  display: inline-block;
  background-color: #a83c3c;
  color: #fff;
  font-weight: 700;
  padding: 0.9rem 2.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.btn-retour:hover {
  background-color: #8c2f2f;
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
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .titres-grid {
    grid-template-columns: 1fr;
  }
}
</style>