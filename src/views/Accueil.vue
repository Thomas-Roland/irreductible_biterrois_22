<template>
  <div>
    <!-- HERO IMAGE -->
    <section class="hero">
      <img src="/images/tribune.jpg" alt="Tribune du groupe de supporters" />
    </section>

    <!-- SECTION "C'EST LA REPRISE" -->
    <section class="reprise">
      <div class="reprise-visual">
        <img src="/images/drapeau-768x516.png" alt="Logo Irréductible Biterrois 22" />
      </div>
      <div class="reprise-content">
        <h2>C'est la reprise !</h2>
        <p>
          C'est le top départ de la saison 2025/2026 pour le jeune groupe des Irréductibles Biterrois 22.
          Première saison où nous avons le plus besoin de vous !
        </p>
        <p>
          Participez à un tout nouveau projet d'association pour le club de l'AS Béziers football,
          dans un cadre familial où tout le monde est le bienvenu.
        </p>
        <p>Pour tous renseignements, n'hésitez pas à nous contacter via la page contact.</p>
        <a href="/contact" class="btn-adherer">✋ Adhérer</a>
      </div>
    </section>

    <!-- NOS OFFRES -->
    <section class="offres">
      <div class="offres-content">
        <h2>Nos offres</h2>
        <p>
          Découvrez nos différentes formules d'abonnement pour la saison 2025/2026 et profitez
          d'avantages exclusifs pour soutenir le groupe tout au long de l'année.
        </p>
      </div>
      <div class="offres-media">
        <img src="/images/b.png" alt="Nos offres d'abonnement" />
      </div>

    </section>

    <!-- NOS ENGAGEMENTS -->
    <section class="engagements">
      <h2>Nos engagements</h2>
      <div class="engagements-grid">
        <div class="engagement">
          <h3>La jeunesse</h3>
          <p>
            Grâce à un partenariat avec des associations œuvrant pour la jeunesse, le groupe accueille,
            lors de certains matchs, des jeunes désireux de découvrir le monde associatif.
          </p>
        </div>
        <div class="engagement">
          <h3>L'environnement</h3>
          <p>
            Le groupe souhaite organiser ses événements en étant le plus respectueux possible de
            l'environnement, que ce soit par des actions de ramassage en collaboration avec des
            associations ou par nos activités en y portant une attention particulière.
          </p>
        </div>
        <div class="engagement">
          <h3>Action sociale</h3>
          <p>
            Proposer des activités associatives et sportives (matchs, déplacements) à moindre coût.
            De plus, participer à des collectes alimentaires, distributions et autres.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* HERO */
.hero {
  width: 100%;
  height: 380px; /* hauteur réduite, ajustez cette valeur selon le rendu souhaité */
  overflow: hidden;
  background: #000;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* remplit tout le bloc, l'image est recadrée verticalement */
  display: block;
}

/* REPRISE */
.reprise {
  display: flex;
  flex-wrap: wrap;
}

.reprise-visual {
  flex: 1;
  min-width: 300px;
  background: linear-gradient(#111, #1c3a5e);
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.reprise-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* l'image remplit tout le bloc */
}

.reprise-content {
  flex: 1;
  min-width: 300px;
  padding: 3rem;
}

.reprise-content h2 {
  color: #a83c3c;
  font-size: 2.5rem;
}

.btn-adherer {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #a83c3c;
  color: white;
  padding: 1rem 2rem;
  font-weight: bold;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1rem;
}

/* NOS OFFRES */
.offres {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}

.offres-content {
  flex: 1;
  min-width: 300px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.offres-content h2 {
  color: #a83c3c;
  font-size: 2.5rem;
  margin-top: 0;
}

.offres-content p {
  line-height: 1.6;
  font-size: 1.05rem;
}

.offres-media {
  flex: 1;
  min-width: 300px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.offres-media img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.placeholder {
  background: repeating-linear-gradient(
    45deg,
    #d8d8d8,
    #d8d8d8 10px,
    #c8c8c8 10px,
    #c8c8c8 20px
  );
  color: #555;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* ENGAGEMENTS */
.engagements {
  padding: 3rem;
}

.engagements h2 {
  color: #a83c3c;
  font-size: 2.5rem;
}

.engagements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  text-align: center;
}

.engagement .icon {
  font-size: 3rem;
}
</style>