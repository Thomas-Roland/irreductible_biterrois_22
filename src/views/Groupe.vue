<script setup>
const chapters = [
  {
    title: 'Kop Biterrois 15',
    label: 'HÉRITAGE',
    img: '/images/1.jpg.webp',
    text: `Premier groupe de supporters, le Kop Biterrois 15, créé en 2015, pour le match qui opposait Béziers à Dunkerque lors de la saison 2015-2016 de National 1. Ils ont commencé, ils étaient à peine cinq et au fil des matchs et des saisons, ils ont su motiver et rassembler, pour être lors de certains soirs de match une quarantaine. Après la montée historique acquise lors de la saison 2017-2018, KB15 change d'identité et se professionnalise pour devenir la Brigada Béziers 18.`,
    reverse: false,
  },
  {
    title: 'Brigada Béziers 18',
    label: '',
    img: '/images/2.jpg',
    text: `Club de supporters officiel, héritier de KB15, spécialement créé pour la montée en Ligue 2. Malheureusement, par manque de résultats et des conflits internes avec le club, BB18 stoppe toutes ses activités et délaisse petit à petit les sièges du stade, pour complètement arrêter en fin de saison, où le club finira 19ème et sera relégué en National 1.`,
    reverse: true,
  },
  {
    title: "Les amis de l'asb",
    label: '',
    img: '/images/3.jpg',
    text: `Souhaitant avoir un groupe de supporters pérenne, des fans ayant connu les deux précédents groupes ont créé Les Amis de l'ASB en juillet 2019. Ce groupe était présidé par Philipe Martos. A la suite des problèmes de résultats avec une descente en National 2, la crise du COVID et la tragique disparition de son président Philippe Martos, l'association était de moins en moins active jusqu'à l'arrêt total de son activité.`,
    reverse: false,
  },
]

const timelineSteps = [
  { year: '2007', text: "Création du club de l'AS Béziers Football" },
  { year: '2015', text: 'Création du premier groupe de supporters, le Kop Biterrois 15' },
  { year: '2018', text: 'Transformation en Brigada Besiers 18' },
  { year: '2019', text: 'Dissolution de Brigada Besiers 18' },
  { year: '2020', text: "Création de l'association Les amis de l'ASB" },
  { year: '2021', text: "Dissolution de l'association Les amis de l'ASB" },
  { year: '2022', text: 'Création de l\u2019association Irréductibles Biterrois 22' },
]
</script>

<template>
  <div class="groupe-page">
    <h1 class="page-title">LE GROUPE</h1>

    <!-- CHAPITRES HÉRITAGE -->
    <section
      v-for="c in chapters"
      :key="c.title"
      class="chapter"
      :class="{ reverse: c.reverse }"
    >
      <img class="chapter-media" :src="c.img" :alt="c.title" />
      <div class="chapter-text">
        <p v-if="c.label" class="chapter-label">{{ c.label }}</p>
        <h2>{{ c.title }}</h2>
        <p>{{ c.text }}</p>
      </div>
    </section>

    <!-- CHRONOLOGIE -->
    <section class="chapter timeline-section">
      <div class="chapter-text">
        <h2>Retour en image sur les archives supporters biterrois</h2>
        <ol class="timeline-list">
          <li v-for="t in timelineSteps" :key="t.year">
            <span class="timeline-year">{{ t.year }}</span> — {{ t.text }}
          </li>
        </ol>
      </div>
      <img class="chapter-media" src="/images/4.png" alt="Chronologie du groupe" />
    </section>

    <!-- HISTORIQUE -->
    <section class="chapter">
      <div class="chapter-text">
        <h2>L'HISTORIQUE</h2>
        <p>
          Irréductible Biterrois 22 est un groupe de supporters créé en 2022 par Mathieu Waqué et
          Thomas Roland, deux jeunes fans de l'AS Béziers Football. Le but de ce groupe est
          d'animer les soirées de match dans le vieux stade de Sauclières et de soutenir nos
          footballeurs biterrois. En effet, depuis de nombreuses années, il n'y a plus de groupes
          de supporters actifs pour le football biterrois. Le dernier en date étant l'association
          des Amis de l'ASB, inactif depuis 2020.
        </p>
      </div>
      <img class="chapter-media" src="/images/5.jpg" alt="Historique du groupe" />
    </section>

    <!-- NOS VALEURS -->
    <section class="chapter">
      <img class="chapter-media" src="/images/6.png" alt="Nos valeurs" />
      <div class="chapter-text">
        <h2>NOS VALEURS</h2>
        <p>
          Nous ne souhaitons en aucun cas promouvoir ou représenter des idées politiques
          quelconques, ni tolérer toutes formes de violence. En effet, nous sommes un groupe de
          supporters familial qui met en avant la bienveillance, le partage et le respect. Nous
          proposons donc un cadre idyllique et confortable pour nos adhérents.
        </p>
      </div>
    </section>

    <!-- NOUS REJOINDRE -->
    <section class="chapter join-section">
      <div class="chapter-text">
        <h2>NOUS REJOINDRE</h2>
        <p>
          Si tu souhaites rejoindre IB22, contacte-nous via nos réseaux sociaux ou bien à notre
          adresse mail et téléphone suivante :
        </p>
        <p class="join-contact">
          <a href="mailto:irreductiblesbiterrois22@gmail.com">irreductiblesbiterrois22@gmail.com</a>
          &nbsp;/&nbsp; 06 95 90 77 13
        </p>
      </div>
    </section>

    <!-- BANNIÈRE ABONNEMENT -->
    <section class="banner-section">
      <img class="banner" src="/images/REJOINT-NOUS.png" alt="Rejoignez-nous - Irréductible Biterrois 22" />
    </section>

    <!-- RETOUR -->
    <div class="retour">
      <router-link to="/" class="btn-retour">RETOUR</router-link>
    </div>
  </div>
</template>

<style scoped>
.groupe-page {
  background-color: #ffffff;
  padding: 3rem 4rem;
}

.page-title {
  text-align: center;
  color: #111;
  background: transparent;
  font-size: 3rem;
  font-weight: 900;
  padding: 0 0 3rem;
  margin: 0;
}

/* CHAPITRES (image + texte alternés) */
.chapter {
  display: flex;
  flex-wrap: wrap;
  background-color: #1c3a5e;
  color: white;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2.5rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

.chapter.reverse {
  flex-direction: row-reverse;
}

.chapter-media {
  flex: 1;
  min-width: 300px;
  min-height: 320px;
  width: 100%;
  object-fit: cover;
}

.chapter-text {
  flex: 1;
  min-width: 300px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.chapter-label {
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.chapter-text h2 {
  font-size: 2.2rem;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.chapter-text p {
  line-height: 1.6;
  font-size: 1.05rem;
  margin-bottom: 1.5rem;
}

/* CHRONOLOGIE */
.timeline-section h2 {
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.timeline-list {
  padding-left: 1.2rem;
  line-height: 1.9;
}

.timeline-year {
  font-weight: bold;
}

/* NOUS REJOINDRE */
.join-section .chapter-text {
  align-items: flex-start;
}

.join-contact {
  font-weight: bold;
  font-size: 1.2rem;
}

.join-contact a {
  color: white;
}

/* BANNIÈRE */
.banner-section {
  margin-bottom: 2.5rem;
  border-radius: 8px;
  overflow: hidden;
}

.banner {
  width: 100%;
  display: block;
  min-height: 250px;
  object-fit: cover;
}

/* RETOUR */
.retour {
  text-align: center;
  padding: 1rem 0 0;
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
  .groupe-page {
    padding: 2rem 1.5rem;
  }
}
</style>