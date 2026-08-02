<script setup>
const socials = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100089442218327',
    icon: 'M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/irreductiblesbiterrois22?igsh=MWtiY21yOGVpMnBnag%3D%3D',
    icon: 'M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.76c-.5.5-1.1.9-1.76 1.15-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 0 1 5.44.54C6.08.29 6.81.12 7.87.07 8.94.02 9.28 0 12 0zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.17 1.17 0 1 1 0-2.34 1.17 1.17 0 0 1 0 2.34z',
    transform: 'translate(0 2)',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@irrductibles.biterrois22?_t=8rsvTAEy26Q&_r=1',
    icon: 'M16.6 5.82a4.28 4.28 0 0 1-3.14-1.39V16.6a5.1 5.1 0 1 1-4.4-5.06v2.56a2.6 2.6 0 1 0 1.83 2.48V2h2.53a4.28 4.28 0 0 0 3.18 4.13v2.55a6.8 6.8 0 0 1-3.18-.83v-.03a4.28 4.28 0 0 0 3.18-4.13V2h-2.53z',
  },
]

const faqs = [
  {
    q: 'Comment rejoindre le groupe ?',
    a: "Écrivez-nous simplement un mail, on revient vers vous rapidement pour vous expliquer comment nous rejoindre en tribune.",
  },
  {
    q: 'Vous organisez des déplacements ?',
    a: "Oui, on organise régulièrement des déplacements pour suivre l'équipe. Contactez-nous pour connaître les prochaines dates.",
  },
  {
    q: 'Vous avez une archive ou une photo à partager ?',
    a: "Avec plaisir ! Envoyez-la nous par mail, on adore enrichir le musée du foot avec les souvenirs des supporters.",
  },
]
</script>

<template>
  <div class="page">

    <!-- EN-TÊTE -->
    <div class="hero">
      <h1 class="main-title">CONTACT</h1>
      <p class="subtitle">
        Une question, une information à nous transmettre, une archive à partager ?
        N'hésitez pas à nous écrire, nous vous répondrons avec plaisir.
      </p>
    </div>

    <!-- CARTES DE CONTACT -->
    <div class="contact-grid">
      <a href="mailto:irreductiblesbiterrois22@gmail.com" class="contact-card">
        <div class="contact-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 6l-10 7L2 6"/>
            <rect x="2" y="4" width="20" height="16" rx="2"/>
          </svg>
        </div>
        <div class="contact-info">
          <span class="contact-label">Écrivez-nous à</span>
          <span class="contact-email">irreductiblesbiterrois22@gmail.com</span>
        </div>
        <span class="contact-arrow">→</span>
      </a>

      <div class="contact-card contact-card--socials">
        <div class="contact-icon contact-icon--dark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>
          </svg>
        </div>
        <div class="contact-info">
          <span class="contact-label">Suivez-nous</span>
          <div class="socials">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.href"
              :aria-label="s.name"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path :d="s.icon" :transform="s.transform" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="faq-section">
      <h2 class="faq-title">Questions fréquentes</h2>
      <details v-for="(item, i) in faqs" :key="i" class="faq-item">
        <summary>{{ item.q }}</summary>
        <p>{{ item.a }}</p>
      </details>
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
  min-height: 50vh;
}

/* HERO */
.hero {
  margin-bottom: 3rem;
}

.main-title {
  color: #a83c3c;
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.subtitle {
  line-height: 1.7;
  font-size: 1.1rem;
  color: #444;
  max-width: 700px;
  margin: 0;
}

/* GRID DE CARTES */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background-color: #faf5f5;
  border: 2px solid #a83c3c;
  border-radius: 10px;
  padding: 1.8rem 2rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

a.contact-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(168, 60, 60, 0.2);
  background-color: #fff;
}

.contact-icon {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #a83c3c;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-icon--dark {
  background-color: #1c3a5e;
}

.contact-icon svg {
  width: 28px;
  height: 28px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
  overflow-x: auto;
}

.contact-label {
  font-size: 0.85rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact-email {
  font-size: 1.15rem;
  font-weight: 700;
  color: #a83c3c;
  white-space: nowrap;
}

.contact-arrow {
  margin-left: auto;
  font-size: 1.4rem;
  color: #a83c3c;
  transition: transform 0.2s ease;
}

a.contact-card:hover .contact-arrow {
  transform: translateX(4px);
}

/* RESEAUX DANS LA CARTE */
.socials {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.2rem;
}

.social-link {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #1c3a5e;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.social-link:hover {
  background-color: #a83c3c;
  transform: translateY(-2px);
}

.social-link svg {
  width: 18px;
  height: 18px;
  fill: #ffffff;
}

/* FAQ */
.faq-section {
  border-top: 1px solid #eee;
  padding-top: 2.5rem;
}

.faq-title {
  color: #1c3a5e;
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.faq-item {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

.faq-item summary {
  cursor: pointer;
  font-weight: 700;
  font-size: 1.05rem;
  color: #222;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary::after {
  content: '+';
  font-size: 1.4rem;
  color: #a83c3c;
  margin-left: 1rem;
  transition: transform 0.2s ease;
}

.faq-item[open] summary::after {
  transform: rotate(45deg);
}

.faq-item p {
  margin: 0.8rem 0 0;
  line-height: 1.7;
  color: #444;
}

@media (max-width: 800px) {
  .page {
    padding: 2rem 1.5rem;
  }
  .contact-card {
    flex-direction: column;
    text-align: center;
  }
  .contact-arrow {
    display: none;
  }
}
</style>