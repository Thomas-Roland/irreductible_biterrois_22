<script setup>
// 👉 Remplace les chemins ci-dessous par tes vraies images (dans le dossier public/images/)
const imgPresident = 'images/thomas.png'
const imgTresorier = 'images/mathieu.png'
const imgSecretaire = 'images/amandine.png'
const imgCommunityManager = 'images/julien.png'

const membres = [
  {
    role: 'PRÉSIDENT',
    img: imgPresident,
    text: `Thomas ROLAND, président depuis la création en 2022. Motivé pour aider le club à son échelle de supporter, Thomas a décidé, accompagné de Mathieu WAQUÉ, de créer le groupe de supporters des Irréductibles Biterrois 22. Animé par l'idée de relancer un mouvement de supporterisme à Béziers et de le pérenniser dans le temps.`,
    quote: `Je suis très content et fier de présider le groupe de supporters des Irréductibles Biterrois 22. Un projet qui, j'espère, vous intéressera et vous permettra de passer de bons moments en tribune.`,
    author: 'Thomas',
    reverse: false,
  },
  {
    role: 'TRÉSORIER',
    img: imgTresorier,
    text: `Mathieu WAQUÉ, trésorier depuis la création du groupe en 2022. Très ingénieux et passionné de mathématiques, il tient à assumer ce rôle afin d'assurer la pérennité de l'association dans le temps.`,
    quote: `Salut, moi c'est Mathieu Waqué. Je suis honoré de participer au projet de l'association, en espérant que nous grandirons et que nous serons de plus en plus nombreux en tribune. N'hésitez pas à tenter l'aventure, on vous attend nombreux !`,
    author: 'Mathieu',
    reverse: true,
  },
  {
    role: 'SECRÉTAIRE',
    img: imgSecretaire,
    text: `Amandine HOUASINI, secrétaire depuis la création en 2022. Très soucieuse du moindre détail, elle tient à être impliquée dans tous les aspects de l'association, quel que soit leur nature. Elle s'investit pleinement dans les tâches administratives que personne ne souhaite réaliser, contribuant ainsi au bon fonctionnement de l'association.`,
    quote: `Ravie de faire partie de cette association, d'y contribuer au maximum pour qu'elle grandisse et soit pérenne dans le temps. Allez Béziers !`,
    author: 'Amandine',
    reverse: false,
  },
  {
    role: 'COMMUNITY MANAGER',
    img: imgCommunityManager,
    text: `Dans le but d'agrandir l'équipe pour les prochaines saisons, Julien SAUNY a pris le poste de community manager.`,
    quote: `Salut, moi c'est Julien Sauny, je suis très fier de faire partie de l'aventure des IB22. Biterrois de naissance et fervent supporter des rouges et bleus, c'est avec une immense joie que je m'investis dans l'association dès que j'en ai l'occasion. Allez Béziers !`,
    author: 'Julien',
    reverse: true,
  },
]
</script>

<template>
  <div class="organigramme-page">
    <h1 class="page-title">ORGANIGRAMME</h1>

    <section
      v-for="m in membres"
      :key="m.role"
      class="chapter"
      :class="{ reverse: m.reverse }"
    >
      <img class="chapter-media" :src="m.img" :alt="m.role" />
      <div class="chapter-text">
        <h2>{{ m.role }}</h2>
        <p>{{ m.text }}</p>
        <p class="quote">{{ m.author }} : « {{ m.quote }} »</p>
      </div>
    </section>

    <div class="retour">
      <router-link to="/" class="btn-retour">RETOUR</router-link>
    </div>
  </div>
</template>

<style scoped>
.organigramme-page {
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

.chapter-text .quote {
  font-style: italic;
}

.retour {
  text-align: center;
  padding: 3rem 0 0;
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
  .organigramme-page {
    padding: 2rem 1.5rem;
  }
  .page-title {
    font-size: 2rem;
    padding-bottom: 2rem;
  }
}
</style>