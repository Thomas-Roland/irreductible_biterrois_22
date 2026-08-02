<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 👉 Menu de navigation en haut de page
const navItems = [
  { label: "L'histoire", path: '/musee-de-lasb', icon: 'book' },
  { label: 'Les maillots', path: '/maillots', icon: 'shirt' },
  { label: 'Palmarès', path: '/palmares', icon: 'trophy' },
  { label: 'Le projet', path: '/projet', icon: 'scroll' },
]

// 👉 Ajoute/modifie les logos ici (chemins vers /public/images/)
const logos = [
  { img: '/images/logo1.png', caption: 'Association Sportive Béziers (1945-1953)' },
  { img: '/images/logo2.png', caption: 'Association Sportive Béziers (1953-1956)' },
  { img: '/images/logo3.png', caption: 'Association Sportive Béziers (1956-1965)' },
  { img: '/images/logo4.png', caption: 'Association Sportive Béziers (1965-1990)' },
  { img: '/images/logo5.png', caption: 'Football Club Béziers 34 (1966-2005)' },
  { img: '/images/logo6.png', caption: 'Football Club Béziers Méditerranée' },
  { img: '/images/logo7.png', caption: 'Football Club Béziers Méditerranée Cheminot' },
  { img: '/images/logo8.png', caption: 'Avenir Sportif Béziers (2006-2007)' },
  { img: '/images/logo9.png', caption: 'Avenir Sportif Béziers (2007-..)' },
]

// 👉 Ajoute le préfixe correct (BASE_URL) devant chaque chemin d'image
function img(path) {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

// 👉 Nombre de logos visibles : 1 sur mobile (≤800px), 3 sur ordinateur
const VISIBLE = ref(window.innerWidth <= 800 ? 1 : 3)

function updateVisibleCount() {
  VISIBLE.value = window.innerWidth <= 800 ? 1 : 3
}

const startIndex = ref(0)
const AUTO_SCROLL_DELAY = 4000
let autoScrollTimer = null

// 👉 Référence DOM sur le conteneur du carrousel (pour l'IntersectionObserver)
const carouselRef = ref(null)
let observer = null

const visibleLogos = computed(() => logos.slice(startIndex.value, startIndex.value + VISIBLE.value))

function prevLogo() {
  startIndex.value = startIndex.value === 0
    ? logos.length - VISIBLE.value
    : startIndex.value - 1
}

function nextLogo() {
  startIndex.value = startIndex.value >= logos.length - VISIBLE.value
    ? 0
    : startIndex.value + 1
}

function goTo(i) {
  startIndex.value = Math.min(Math.max(0, i - 1), Math.max(0, logos.length - VISIBLE.value))
}

function startAutoScroll() {
  stopAutoScroll()
  autoScrollTimer = setInterval(() => {
    nextLogo()
  }, AUTO_SCROLL_DELAY)
}

function stopAutoScroll() {
  if (autoScrollTimer) {
    clearInterval(autoScrollTimer)
    autoScrollTimer = null
  }
}

function handleManualNav(action) {
  action()
  startAutoScroll()
}

onMounted(() => {
  window.addEventListener('resize', updateVisibleCount)

  // 👉 Le défilement auto ne tourne que quand le carrousel est visible à l'écran
  // (évite le micro-saut de scroll quand il change hors du champ de vision)
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      startAutoScroll()
    } else {
      stopAutoScroll()
    }
  }, { threshold: 0.3 })

  if (carouselRef.value) {
    observer.observe(carouselRef.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateVisibleCount)
  stopAutoScroll()
  if (observer) observer.disconnect()
})
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

    <h1 class="main-title">LA GRANDE HISTOIRE DU FOOTBALL BITERROIS</h1>

    <p>
      Plongez dans l'histoire du football biterrois, des débuts en <strong>1903</strong> jusqu'à
      aujourd'hui. Retrouvez les grandes heures du club, ses exploits, ses saisons en
      <strong>Division 1</strong>, mais aussi les périodes plus difficiles marquées par des
      descentes et des reconstructions.
    </p>

    <p>
      Revivez plus d'un siècle de passion, de défis et d'évolution du ballon rond à Béziers.
    </p>

<!-- CARROUSEL DE LOGOS (3 par 3 sur ordinateur, 1 par 1 sur mobile, défilement auto) -->
<div class="carousel" ref="carouselRef" @mouseenter="stopAutoScroll" @mouseleave="startAutoScroll">
  <button
    class="arrow arrow-left"
    @click="handleManualNav(prevLogo)"
    aria-label="Précédent"
  >‹</button>

  <div class="carousel-track">
    <div v-for="logo in visibleLogos" :key="logo.img" class="carousel-item">
      <img :src="img(logo.img)" :alt="logo.caption" />
      <p class="carousel-caption">{{ logo.caption }}</p>
    </div>
  </div>

  <button
    class="arrow arrow-right"
    @click="handleManualNav(nextLogo)"
    aria-label="Suivant"
  >›</button>
</div>

<div class="carousel-dots">
  <button
    v-for="(l, i) in logos"
    :key="i"
    class="dot"
    :class="{ active: i >= startIndex && i < startIndex + VISIBLE.value }"
    @click="handleManualNav(() => goTo(i))"
    :aria-label="'Aller au logo ' + (i + 1)"
  ></button>
</div>

<hr />

    <!-- SECTION 1903-1914 -->
    <h2>QUAND LE BALLON ROND PREND RACINE À BÉZIERS (1903 - 1914)</h2>
    <p>
      L'histoire du football à Béziers s'enracine dans les pratiques sportives locales de la fin
      du <strong>XIXe siècle</strong>. Avant même l'arrivée des sports britanniques, les Biterrois
      s'adonnaient à la barrette, ce jeu traditionnel languedocien apparenté à la soule médiévale.
      Sur les places de la ville et dans les rues, on pouvait voir des équipes s'affronter dans
      cette pratique sans règles strictes, où l'objectif était de porter une balle de cuir dans
      une zone définie. Le véritable tournant survient sous l'impulsion de jeunes lycéens
      passionnés. En <strong>1903</strong>, le Football Club Biterrois voit le jour, marquant les
      premiers pas du ballon rond dans la cité biterroise.
    </p>

    <p>
      Quelques années plus tard, en <strong>1911</strong>, une équipe fait ses débuts, encore très
      timides, en participant à des rencontres amicales organisées sur le terrain du Bosquet,
      route de Valras. En terre d'ovalie, la tâche est difficile et, avant chaque match, dirigeants
      et joueurs doivent tracer le terrain et installer les poteaux afin de jouer devant les
      premiers « mordus du ballon rond », encore peu nombreux.
    </p>

    <p>
      En <strong>1912</strong>, le <strong>Football Club Biterrois</strong> dispute le championnat
      de <strong>4e division de district</strong>, accède immédiatement à la 3e division et connaît
      un essor notable grâce au concours des militaires en garnison à Béziers, déjà passés par les
      clubs régionaux de <strong>Sète</strong>, <strong>Montpellier</strong> et <strong>Nîmes</strong>.
      Le club biterrois prend alors la dénomination de <strong>Stade Béziers Sport</strong>,
      jusqu'à la guerre de <strong>1914</strong>.
    </p>

    <hr />

    <!-- SECTION 1918-1934 -->
    <h2>LE STADE OLYMPIQUE BITERROIS (1918 - 1934)</h2>
    <p>
      L'histoire se complexifie après la Première Guerre mondiale. En <strong>1918</strong>, le
      <strong>Stade Olympien Biterrois</strong> est fondé, prenant la suite du
      <strong>Stade Béziers Sport</strong> créé en <strong>1911</strong>. Le club dispute alors le
      championnat amateur, dans une poule regroupant le <strong>FC Sète</strong>, l'
      <strong>Olympique Alésien</strong>, <strong>Montpellier</strong> et <strong>Nîmes</strong>,
      qui comptent chacun deux formations engagées.
    </p>

    <p>
      Les rencontres ont toujours lieu au <strong>Stade du Bosquet</strong>, où le public reste
      clairsemé. Mais il en faut beaucoup plus pour décourager les pionniers du ballon rond, qui
      luttent contre vents et marées pour implanter ce sport déjà si populaire dans toute la
      France.
    </p>

    <p>
      En <strong>1920</strong>, le <strong>Stade Olympien Biterrois</strong> dispute la
      <strong>demi-finale</strong> de la <strong>Coupe du Midi</strong> contre un club de la
      région bordelaise. Malgré une défaite jugée immméritée sur le score de
      <strong>3 buts à 1</strong>, le football conquiert néanmoins le droit de vivre à Béziers.
    </p>

    <p>
      Pour le football biterrois, le véritable départ intervient lors de la saison
      <strong>1932-1933</strong>. En effet, sous l'impulsion de <strong>M. Bonnefous</strong>,
      assisté de plusieurs pionniers (<strong>Chante</strong>, <strong>Rosado</strong>,
      <strong>Siaz</strong> et d'autres), naît une formation semi-professionnelle à la suite de
      la fusion avec l'<strong>Association Sportive Biterroise</strong>. Sous cette appellation,
      elle dispute pour la première fois le championnat au sein du football national.
    </p>

    <p>
      Mais l'entente ne dure pas et le club biterrois, redevenu le <strong>Stade Olympique
      Béziers</strong>, doit s'engager lors de la saison <strong>1933-1934</strong> dans le
      championnat professionnel sans pouvoir disposer du terrain de Sauclières.
    </p>

    <p>
      L'équipe, commandée par <strong>Jules Dewasquez</strong>, comprend de très bons éléments de
      valeur nationale avec <strong>Jourdan</strong>, <strong>Cabannes</strong>,
      <strong>Leitner</strong>, <strong>Horvart</strong>, entre autres.
    </p>

    <p>
      Le club obtient de très bons résultats, notamment grâce à un beau parcours en
      <strong>Coupe de France</strong>, avant d'être éliminé par le grand <strong>FC Sète</strong>. Mais la situation financière ne permet pas au club de survivre et le
      <strong>Stade Olympien Béziers</strong> doit finalement renoncer...
    </p>

    <figure class="inline-photo">
      <img src="/images/SOB-3334-couleur.png" alt="Stade Olympique Biterrois (1933-1934)" />
      <figcaption>Stade Olympique Biterrois (1933 - 1934)</figcaption>
    </figure>

    <hr />

    <!-- SECTION 1935-1945 -->
    <h2>CRÉATION DE LA SECTION FOOTBALL AU CLUB OMNISPORTS BITERROIS (1935 - 1945)</h2>
    <p>
      Cependant, les pionniers du football ne se découragent pas. Ils parviennent même à
      regrouper les éléments des diverses équipes grâce à la fusion de plusieurs clubs : le
      <strong>Red Star Béziers</strong>, l'<strong>Hispania Deportivo</strong>, l'<strong>Étoile
      Sportive de Roujan</strong> et le <strong>Stade Olympique Béziers</strong>, qui prend le nom
      d'<strong>Entente Sportive Biterroise</strong> lors de la saison <strong>1935-1936</strong>.
      Le club poursuit alors, dans les <strong>divisions amateurs</strong>, une carrière modeste
      jusqu'à la saison <strong>1939-1940</strong> où, placé sous la présidence de
      <strong>M. Charles Trapet</strong> et entouré d'une équipe de dirigeants dévoués
      (<strong>Gérin</strong>, <strong>Chante</strong>, <strong>Rosado</strong>,
      <strong>Portes</strong>, <strong>André</strong>), entièrement attachés à la cause du
      football, l'<strong>ES Biterroise</strong> sollicite à nouveau la fusion avec
      l'<strong>Association Sportive Biterroise</strong>.
    </p>

    <p>
      Grâce à la compréhension et à l'esprit sportif de <strong>M. Jean Guy</strong> et de
      <strong>Jules Cadenat</strong>, une section football est alors créée en
      <strong>1940-1941</strong> au sein du club omnisports de l'<strong>AS Béziers</strong>, à
      laquelle est accordée l'utilisation des installations du <strong>Parc des Sports de
      Sauclières</strong>. Puis viennent les années sombres de l'Occupation
      (<strong>1940-1945</strong>), où le football, comme toute chose, doit se replier sur
      lui-même.
    </p>

    <p>
      Les hommes manquent, le public aussi, les subsides se raréfient et les difficultés de
      transport n'arrangent rien. Mais c'est peut-être à cette période, où les loisirs étaient
      rares, que le football biterrois connaît l'éclosion d'une génération de jeunes joueurs
      talentueux.
    </p>

    <hr />

    <!-- SECTION 1945-1947 -->
    <h2>LE RETOUR DU PROFESSIONNALISME À BÉZIERS (1945 - 1947)</h2>
    <p>
      En <strong>1945</strong>, l'<strong>AS Béziers</strong> est admise à disputer le
      <strong>Challenge de la Libération</strong> aux côtés des grands clubs du Midi :
      <strong>Sète</strong>, <strong>Bordeaux</strong>, <strong>Toulouse</strong>,
      <strong>Nîmes</strong> et <strong>Montpellier</strong>. Elle fait figure d'honorable
      challenger et remporte même une très belle victoire face à <strong>Toulouse</strong>.
    </p>

    <p>
      En <strong>1946-1947</strong>, l'équipe est renforcée par des éléments venus de toute la
      France et compte dans ses rangs <strong>Fabregat</strong>, <strong>Ibarn</strong>,
      <strong>Janos</strong>, <strong>Debeugny</strong>, <strong>Menjou</strong>,
      <strong>Escudié</strong>, <strong>Ben Mehari</strong>, <strong>Coti</strong>,
      <strong>Cervellon</strong>, entre autres. Ses performances lui permettent alors d'obtenir
      son admission au sein de l'<strong>Association des Clubs Autorisés</strong> et le
      professionnalisme est à nouveau instauré à Béziers, sous les présidences successives de
      <strong>M. Feracci</strong> et de <strong>M. Robin</strong>.
    </p>

    <p>
      Durant deux saisons, l'<strong>AS Béziers</strong> connaît, en <strong>deuxième
      division</strong>, des heures modestes et des moments difficiles. L'équipe comprend alors
      <strong>Anchisi</strong>, <strong>Méline</strong>, <strong>Fabregat</strong>,
      <strong>Escudier</strong>, <strong>Veneziano</strong>, <strong>Hachelouf</strong>,
      <strong>Lahoue</strong>, <strong>Tobia</strong>, <strong>Dupraz</strong>,
      <strong>Ben Nehari</strong>, <strong>Rodrigues</strong> et <strong>Thomas</strong>, et est
      entraînée par <strong>Labat</strong>.
    </p>

    <figure class="inline-photo">
      <img src="/images/asb-4546.png" alt="L'Association Sportive Béziers (1945-1946)" />
      <figcaption>L'Association Sportive Béziers (1945 - 1946)</figcaption>
    </figure>

    <hr />

    <!-- SECTION 1948-1956 -->
    <h2>L'ÈRE DU PRÉSIDENT THÉO BRETAUD (1948 - 1956)</h2>
    <p>
      En <strong>1948</strong>, l'<strong>AS Béziers Football</strong> est placée sous la présidence
      de M. <strong>Théo Bretaud</strong>. Son dynamisme et sa confiance lui permettent de
      convaincre le <strong>président général</strong> de l'<strong>AS Béziers</strong>,
      <strong>M. Jean Guy</strong>, de l'avenir du football et de poursuivre ainsi l'œuvre déjà
      entreprise. Aux côtés du comité directeur, un comité de gestion est créé, mais l'absence
      d'un mécène ne permet pas une consécration immédiate.
    </p>

    <p>
      Ce n'est qu'en <strong>1949-1950</strong>, après un début de championnat fort modeste, que
      l'<strong>AS Béziers</strong> réussit, au cours des matchs retour, une remontée
      sensationnelle et se classe <strong>4e place</strong> du classement, après avoir attiré au
      <strong>Stade de Sauclières</strong> une grande affluence de sportifs.
    </p>

    <div class="photo-pair full-image">
      <figure class="inline-photo">
        <img src="/images/ASB-4950.png" alt="Association Sportive Béziers (1949-1950)" />
        <figcaption>Association Sportive Béziers (1949 - 1950)</figcaption>
      </figure>
    </div>

    <p>
      De <strong>1950</strong> à <strong>1955</strong>, les saisons restent modestes, mais la
      ténacité des dirigeants et le travail accompli portent leurs fruits. Lors de la saison
      <strong>1955-1956</strong>, le club manque de peu la montée en <strong>division 1</strong>,
      devancé par <strong>Valenciennes</strong> au goal-average après une fin de saison
      particulièrement agitée. Le club peut néanmoins se consoler avec un beau parcours en
      <strong>Coupe de France</strong> : après avoir tenu en échec le grand <strong>Stade de
      Reims</strong> sur le score de <strong>1-1</strong> en <strong>huitièmes de finale</strong>,
      les Biterrois s'inclinent <strong>2-0</strong> lors de la rencontre rejouée, les séances de
      tirs au but n'existant pas encore à cette époque.
    </p>

    <hr />

    <!-- SECTION 1956-1957 -->
    <h2>LA SAISON DE L'ACCESSION EN DIVISION 1 (1956-1957)</h2>
    <p>
      Continuant sur sa lancée, l'<strong>AS Béziers</strong> accède à la <strong>première
      division</strong> au cours de la saison <strong>1956-1957</strong>, saison mémorable au
      terme de laquelle elle termine deuxième derrière <strong>Alès</strong>, après une difficile
      victoire obtenue lors du dernier match disputé au <strong>Stade de Sauclières</strong> contre
      le <strong>CA Paris</strong>. Un succès acquis grâce à un but resté dans les mémoires, inscrit
      par l'arrière <strong>Louis Delhaye</strong>.
    </p>

    <p>
      L'<strong>AS Béziers</strong> reste invaincue à domicile du <strong>22 mai 1955</strong> au
      <strong>18 septembre 1957</strong>. L'équipe comprenait alors : <strong>Jammes</strong>,
      <strong>Emilio</strong>, <strong>Ferlati</strong>, <strong>Delhaye</strong>,
      <strong>Sieber</strong>, <strong>Rodielski</strong>, <strong>Grobarcik</strong>,
      <strong>Misziasek</strong>, <strong>Girardi</strong>, <strong>Dreyer</strong>,
      <strong>Sesia</strong>, <strong>Keller</strong>, <strong>Bessonard</strong>,
      <strong>Tagliacossi</strong>, <strong>Alexandre</strong>, <strong>Bonato</strong>,
      <strong>Lucia</strong> et <strong>Pujol</strong>. Elle était entraînée par
      <strong>Pépi Hampali</strong>, international tchèque venu de <strong>Strasbourg</strong>.
    </p>

    <figure class="inline-photo">
      <img src="/images/ASB-5657.png" alt="Association Sportive Béziers (1956-1957)" />
      <figcaption>Association Sportive Béziers (1956 - 1957)</figcaption>
    </figure>

    <div class="photo-pair">
      <figure class="inline-photo">
        <img src="/images/Montee_D1_1-rpvia6pvp7upp4phu3vuj8eipehse0jbzpoipf8w9m.png" alt="La fête à Sauclières après la victoire contre le CA Paris" />
        <figcaption>La fête à Sauclières après la victoire contre le CA Paris</figcaption>
      </figure>
      <figure class="inline-photo">
        <img src="/images/Montee_D1_2.png" alt="L'AS Béziers accède pour la première fois de son histoire en Division 1" />
        <figcaption>L'AS Béziers accède pour la première fois de son histoire en Division 1</figcaption>
      </figure>
    </div>

    <hr />

    <!-- SECTION 1957-1958 -->
    <h2>L'AS BÉZIERS DANS L'ÉLITE DU FOOTBALL FRANÇAIS (1957-1958)</h2>
    <p>
      La saison <strong>1957-1958</strong> voit affluer au <strong>Stade de Sauclières</strong> la
      grande foule des sportifs de tout le Biterrois. Certaines rencontres, comme face à
      <strong>Saint-Étienne</strong> ou au <strong>Racing</strong>, attirent plus de
      <strong>12 000 spectateurs</strong>.
    </p>

    <p>
      Le championnat débute toutefois avec l'équipe de la saison précédente et les renforts de
      <strong>Stojaspal</strong>, <strong>Garofalo</strong>, <strong>Unzain</strong> et
      <strong>Guilcher</strong> ne suffisent pas à maintenir durablement le club au plus haut
      niveau. Cette saison reste néanmoins marquée par plusieurs performances de prestige, dont
      une victoire mémorable face au <strong>Stade de Reims</strong>, alors considéré comme la
      référence du football français et l'une des meilleures équipes européennes de son époque.
    </p>

    <p>
      Le <strong>22 janvier 1958</strong>, lors de la <strong>22e journée</strong> de
      <strong>Division 1</strong>, l'<strong>AS Béziers</strong> affronte le <strong>Nîmes
      Olympique</strong> dans un derby du Sud au cœur de l'élite du football français.
    </p>

    <p>
      Pour cette saison <strong>1957-1958</strong>, <strong>Béziers</strong> découvre la
      <strong>Division 1</strong> et se mesure à des clubs plus expérimentés. Le match est
      disputé, engagé, mais tourne en faveur des <strong>Nîmois</strong>.
    </p>

    <p>
      Défaite <strong>0-1</strong> pour l'<strong>ASB</strong>, qui malgré le revers, continue
      d'écrire une page forte de son histoire parmi les grands du football français.
    </p>

    <p>
      L'expérience démontre malgré tout que le football de haut niveau a sa place à Béziers, où il
      peut rassembler une foule nombreuse de passionnés. Mais le séjour parmi l'élite ne dure pas,
      les erreurs de jeunesse et l'absence de capitaux suffisants pour constituer une grande équipe
      font de cette saison <strong>1957-1958</strong> un exercice difficile. Classée à la
      <strong>18e place</strong> du classement, l'<strong>AS Béziers</strong> est finalement
      reléguée en <strong>deuxième division</strong>.
    </p>

    <div class="photo-pair full-image">
      <figure class="inline-photo">
        <img src="/images/ASB-5758.png" alt="Association Sportive Béziers (1957-1958)" />
        <figcaption>Association Sportive Béziers (1957 - 1958)</figcaption>
      </figure>
    </div>

    <hr />

    <!-- SECTION 1958-1967 -->
    <h2>L'APRÈS DIVISION 1 (1958 - 1967)</h2>
    <p>
      La saison <strong>1958-1959</strong> est encore marquée par l'empreinte du passage en
      <strong>Division 1</strong> et l'équipe domine longtemps ses adversaires. Hélas, au cours
      des matches retour, un sérieux fléchissement entraîne de trop nombreuses défaites,
      repoussant l'<strong>AS Béziers</strong> à la <strong>10e place</strong> du classement final.
    </p>

    <p>
      Pour la saison <strong>1959-1960</strong>, l'assainissement de l'effectif laisse
      l'<strong>AS Béziers</strong> sérieusement diminuée. L'incorporation de nombreux jeunes
      éléments impose à l'entraîneur, <strong>Aimé Nuic</strong>, un travail considérable. Peu à
      peu, ses efforts sont récompensés, les résultats s'améliorent et la 12e place obtenue en fin
      de saison demeure honorable.
    </p>

    <div class="text-photo-row">
      <div class="text-photo-text">
        <p>
          La saison <strong>1960-1961</strong> débute sans grands changements. La politique de
          formation des jeunes, préconisée par le comité directeur, est poursuivie et de
          nombreux joueurs issus de la section amateur de l'<strong>AS Béziers</strong> sont
          lancés dans le grand bain.
        </p>
        <p>
          Grâce à la volonté de tous, à une tactique prudente parfaitement maîtrisée, mais aussi
          à une remarquable camaraderie et à un véritable esprit d'équipe, le club termine à une
          brillante <strong>5e place</strong>, avec seulement sept défaites.
        </p>
        <p>
          Ce classement lui vaut une place au tableau d'honneur, contre tous les pronostics
          formulés en début de saison. Le club prépare alors avec soin l'exercice suivant en
          orientant son recrutement vers de jeunes amateurs prometteurs, encadrés par des
          joueurs professionnels expérimentés. Cette politique, désormais adoptée par
          l'<strong>AS Béziers</strong>, doit permettre, à moyen terme, un retour durable parmi
          les meilleures équipes du football français.
        </p>
      </div>
      <figure class="inline-photo big-photo">
        <img src="/images/ASB-6061.png" alt="Association Sportive Béziers (1960-1961)" />
        <figcaption>Association Sportive Béziers (1960 - 1961)</figcaption>
      </figure>
    </div>

    <p>
      En <strong>1961-1962</strong>, toujours sous la direction d'<strong>Aimé Nuic</strong>,
      l'équipe est renforcée par <strong>Fioriti</strong>, <strong>Leandri</strong>,
      <strong>Diouf</strong>, <strong>Cristol</strong>, <strong>Goudart</strong>, ainsi que par
      plusieurs jeunes issus du club : <strong>Daure</strong>, <strong>Linares</strong>,
      <strong>Canal</strong>, <strong>Nougaret</strong> et <strong>Reig</strong>. Elle termine dans
      la seconde moitié du classement, tout en réalisant un remarquable parcours en
      <strong>Coupe de France</strong>. Les Biterrois atteignent les <strong>quarts de
      finale</strong>, où ils sont éliminés par <strong>Saint-Étienne</strong> au terme d'un
      match particulièrement méritoire. À l'issue de cette saison aux résultats mitigés en
      championnat, l'<strong>AS Béziers</strong> traverse une période délicate.
      <strong>Aimé Nuic</strong> est remplacé sous la direction de <strong>Pleimelding</strong>,
      ancien joueur au brillant passé, en provenance de <strong>Toulouse</strong>.
    </p>

    <p>
      La saison <strong>1962-1963</strong> est marquée par les arrivées de
      <strong>Gianella</strong>, <strong>Vidal</strong>, <strong>Dupuy</strong> et
      <strong>Cassagne</strong>. Après un début de championnat très difficile, les Biterrois
      redressent progressivement la situation et terminent à la <strong>10e place</strong>. À
      noter qu'<strong>Ernesto Gianella</strong> termine meilleur buteur de
      <strong>Division 2</strong>.
    </p>

    <p>
      En <strong>1963-1964</strong>, le comité directeur, toujours présidé par
      <strong>M. Bretaud</strong>, poursuit sa politique en faveur de la jeunesse.
      L'<strong>AS Béziers</strong> compte alors dans ses rangs <strong>Lavagne</strong>,
      <strong>Cuxac</strong>, <strong>Facerias</strong>, <strong>Daure</strong>,
      <strong>Nougaret</strong>, <strong>Bacquier</strong>, <strong>Masini</strong>,
      <strong>Carayon</strong>, <strong>Canal</strong> et <strong>Depuy</strong>, tous issus de
      clubs de la région biterroise. Mais le manque d'expérience de ces jeunes joueurs ne permet
      pas encore d'atteindre une maturité suffisante, ce qui se traduit par une
      <strong>dernière place</strong> en championnat, malgré un brillant parcours jusqu'aux
      <strong>seizièmes de finale</strong> de la <strong>Coupe de France</strong>.
    </p>

    <p>
      La saison <strong>1964-1965</strong> est particulièrement difficile. Avec le retour de
      <strong>Marcel Tomazover</strong> et un effectif quasiment inchangé,
      l'<strong>AS Béziers</strong> réalise de bons résultats à domicile mais termine une nouvelle
      fois à la dernière place.
    </p>

    <p>
      En <strong>1965-1966</strong>, l'installation des Pieds-Noirs à Béziers et dans la région
      donne un nouvel essor au football biterrois. Avec le retrait du président
      <strong>Bretaud</strong>, un dirigeant dynamique prend la tête du club :
      <strong>M. Charles Castelli</strong>, qui redonne au club de nouvelles ambitions. L'équipe
      retrouve alors un visage professionnel avec les arrivées de <strong>Haddi</strong> et
      <strong>Sekou</strong>, le retour de <strong>Bessonart</strong>, <strong>Gianella</strong>,
      ainsi que des jeunes <strong>Louis Bonnel</strong> et <strong>Bernard Iché</strong>.
      L'<strong>AS Béziers</strong> réalise une très belle saison, joue les premiers rôles et
      termine à la <strong>7e place</strong>. La grande foule revient alors au
      <strong>Stade de Sauclières</strong>.
    </p>

    <figure class="inline-photo">
      <img src="/images/ASB-65_66.png" alt="Association Sportive Béziers (1965-1966)" />
      <figcaption>Association Sportive Béziers (1965 - 1966)</figcaption>
    </figure>

    <div class="text-photo-row">
      <div class="text-photo-text">
        <p>
          En <strong>1966-1967</strong>, dans cette continuité, le président <strong>Castelli</strong>
          recrute plusieurs joueurs réputés : <strong>Salen</strong>, <strong>Bordas</strong> et
          <strong>Donoyan</strong> (venus de <strong>Saint-Étienne</strong>),
          <strong>Polonia</strong> (Lens) ainsi que <strong>Sparza</strong> (Cannes). Avec
          <strong>Donoyan</strong>, <strong>Facérias</strong>, <strong>Daure</strong>,
          <strong>Cuxac</strong>, <strong>Haddi</strong>, <strong>Salen</strong>,
          <strong>Bordas</strong>, <strong>Gianella</strong> et <strong>Bessonart</strong>,
          l'<strong>AS Béziers</strong> aligne une équipe de grande valeur qui s'installe
          rapidement à la <strong>première place</strong> et termine <strong>championne
          d'automne</strong>.
        </p>
        <p>
          Cependant, malgré les grandes satisfactions du début de saison, des tensions internes
          entre les joueurs entraînent une série de défaites. L'équipe, qui semblait en mesure de
          jouer la montée, ne termine finalement qu'à la <strong>6e place</strong>.
        </p>
        <p>
          Cette fin de championnat décevante provoque un remaniement du comité directeur : le
          président <strong>Castelli</strong> est remplacé par le président <strong>Wolff</strong>,
          dirigeant reconnu qui œuvrait depuis de nombreuses années aux côtés du président
          <strong>Bretaud</strong>. Mais l'objectif de l'accession à la
          <strong>division nationale</strong> demeure et continue d'animer les dirigeants de
          l'<strong>AS Béziers</strong>.
        </p>
      </div>
      <figure class="inline-photo big-photo">
        <img src="/images/Wolf_et_Castell.png" alt="M. Wolff et M. Castelli" />
        <figcaption>M. Wolff et M. Castelli</figcaption>
      </figure>
    </div>

    <hr />

    <!-- SECTION 1967-1969 -->
    <h2>LE RETOUR DU PRÉSIDENT THÉO BRETAUD ( 1967 - 1969)</h2>

    <div class="text-photo-side">
      <figure class="inline-photo">
        <img src="/images/ASB-67_68.png" alt="Association Sportive Béziers (1967-1968)" />
        <figcaption>Association Sportive Béziers (1967 - 1968)</figcaption>
      </figure>
      <div class="text-photo-text">
        <p>
          La saison <strong>1967-1968</strong> voit le retour au sein des instances dirigeantes du
          président <strong>Bretaud</strong>, éloigné durant deux saisons pour des raisons de
          santé. L'action bénéfique entreprise ne peut alors que se poursuivre, car désormais
          l'esprit de corps anime le comité directeur et la saison est préparée avec sérieux. On
          retrouve l'ossature de l'équipe de <strong>1966-1967</strong> et, compte tenu de la
          situation financière du club, le recrutement reste modeste. Le comité directeur n'en
          demeure pas moins confiant, chacun ayant conscience, tant parmi les joueurs que parmi
          les dirigeants, que l'<strong>AS Béziers</strong> peut encore faire flotter haut les
          couleurs rouge et bleu du club.
        </p>
        <p>
          Le club termine modestement dans le milieu du tableau. Mais à l'aube de la saison
          suivante, tous les espoirs restent permis pour voir le club biterrois figurer parmi les
          mieux classés de <strong>deuxième division nationale</strong>.
        </p>
      </div>
    </div>

    <p>
      Malheureusement, en <strong>1968-1969</strong>, en raison d'importantes difficultés
      financières, l'<strong>AS Béziers</strong> ne peut conserver sa place dans le football
      professionnel. L'équipe, toujours entraînée par <strong>Stan Golinski</strong>, et malgré
      les renforts de <strong>Zewulko</strong>, <strong>Bacquet</strong>, <strong>Audran</strong>,
      <strong>Garni</strong>, <strong>Scotti</strong> ainsi que des jeunes <strong>Amoros</strong>,
      <strong>Palma</strong> et <strong>Rovira</strong>, termine dans la zone de relégation.
    </p>

    <p>
      Pour la première fois de sa longue histoire, l'<strong>AS Béziers</strong> doit quitter la
      <strong>deuxième division</strong> et est reclassée dans le <strong>championnat amateur de
      troisième division</strong>.
    </p>

    <hr />

    <!-- SECTION 1969-1973 -->
    <h2>L'ASSOCIATION SPORTIVE BÉZIERS EN CHAMPIONNAT DE FRANCE AMATEUR (1969 - 1973)</h2>

    <div class="text-photo-side">
      <div class="text-photo-text">
        <p>
          En <strong>1969-1970</strong>, l'<strong>AS Béziers</strong> participe au
          <strong>groupe Sud</strong> de <strong>CFA</strong> et, malgré les renforts de
          <strong>Moine</strong>, <strong>Bait</strong> et <strong>Moyano</strong>, l'éclosion d'un
          jeune talent, <strong>Tony Garceran</strong>, ainsi que l'engagement sans faille de
          l'entraîneur <strong>Hector Maison</strong>, qui n'hésite pas à apporter sa contribution
          également comme joueur, le club ne parvient pas à se classer aux places permettant un
          retour en <strong>Division 2</strong>.
        </p>
        <p>
          Avec la création d'un <strong>championnat national</strong> s'étalant sur les saisons
          <strong>1970-1971</strong> et <strong>1971-1972</strong>, l'<strong>AS Béziers</strong> ne
          parvient pas à surmonter la crise. L'équipe, toujours entraînée par
          <strong>Hector Maison</strong>, est renforcée par plusieurs joueurs régionaux :
        </p>
        <p>
          <strong>Trani</strong> (Agde), <strong>Casolari</strong> (Marseille),
          <strong>Saez</strong>, <strong>Vigroux</strong>, <strong>Jean Fernandez</strong>,
          <strong>Lirousel</strong> (Montpellier), puis, en <strong>1971</strong>,
          <strong>Albert</strong> (Mazamet), <strong>Appaix</strong> (Rodez), ainsi qu'
          <strong>Azum</strong> et <strong>Bauwen</strong> (Saint-Gaudens). Mais, au terme de la
          saison <strong>1971-1972</strong>, le club est relégué en <strong>Division 3</strong>.
        </p>
      </div>
      <figure class="inline-photo">
        <img src="/images/ASB-7071.png" alt="L'Association Sportive Béziers (1970-1971)" />
        <figcaption>L'Association Sportive Béziers (1970 - 1971)</figcaption>
      </figure>
    </div>

    <div class="text-photo-side">
      <div class="text-photo-text">
        <p>
          En <strong>1972-1973</strong>, l'<strong>AS Béziers</strong> participe au championnat de
          <strong>3e division</strong>, <strong>groupe Sud</strong>. Sous l'autorité, d'abord de
          <strong>M. Couronne</strong> puis de <strong>M. Martinez</strong>, l'équipe est renforcée
          par <strong>Plinio</strong> et <strong>Casolari</strong> (Sète) et bénéficie également de
          l'éclosion de jeunes joueurs tels que <strong>Georges Martinez</strong>,
          <strong>Henri Wolff</strong>, <strong>Jean-Pierre Ourliac</strong>,
          <strong>Obradors</strong>, <strong>Bautès</strong> et <strong>Ortaega</strong>. Portée par
          une saison remarquable de <strong>Maison</strong> dans son rôle de joueur, l'équipe
          s'empare rapidement de la <strong>première place</strong> et obtient son retour en
          <strong>deuxième division</strong>.
        </p>
        <p>
          Il convient également de souligner les efforts du président <strong>Wolff</strong> et
          des dirigeants dévoués <strong>Marin</strong>, <strong>Faro</strong>,
          <strong>Larmande</strong>, <strong>Haas</strong>, <strong>Guigues</strong>,
          <strong>Valette</strong> et <strong>Galinier</strong> qui, grâce à un engagement
          constant et malgré de graves difficultés financières, permettent au club de poursuivre
          son développement. Leur action est progressivement confortée par l'intérêt croissant
          porté au club par celui qui deviendra bientôt le président de l'<strong>AS
          Béziers</strong>, <strong>Gérard Jullien</strong>.
        </p>
      </div>
    </div>

    <hr />

    <!-- SECTION 1973-1981 -->
    <h2>L'ASSOCIATION SPORTIVE BÉZIERS DE RETOUR EN DEUXIÈME DIVISION (1973 - 1981)</h2>

    <p>
      Ce renouveau se poursuit au cours de la saison <strong>1973-1974</strong>. Malgré des
      renforts importants en début de saison, avec le retour d'<strong>Iché</strong> et
      <strong>Garcia</strong> ainsi que l'arrivée de <strong>Glizinski</strong> (Red Star) et de
      l'international <strong>Mélic</strong> (Sochaux), l'<strong>AS Béziers</strong>, qui pratique
      pourtant un football de qualité, se retrouve à la <strong>dernière place</strong> avec
      seulement dix points à l'issue des matches aller.
    </p>

    <p>
      Les dirigeants <strong>Larmande</strong> et <strong>Faro</strong> craignent alors que tous
      les efforts consentis au cours des dernières années n'aient été vains et qu'une nouvelle
      relégation ne provoque la disparition du football professionnel à Béziers. Ils pensent
      alors à un sportif prestigieux issu de la région biterroise : l'international
      <strong>Jo Bonnel</strong>.
    </p>

    <p>
      Grâce à leur ténacité et malgré de nombreuses difficultés, ils parviennent à convaincre
      « Monsieur Jo » de reprendre en main le vieux club biterrois. L'arrivée de
      <strong>Bonnel</strong> permet à l'<strong>AS Béziers</strong>, au terme d'un match
      mémorable contre le <strong>Paris Saint-Germain</strong>, de conserver sa place en
      <strong>deuxième division</strong>. À noter également la belle victoire face à
      l'<strong>Olympique de Marseille</strong> en <strong>32e de finale</strong> de la
      <strong>Coupe de France</strong>. Un but de <strong>Gérard Albert</strong> en fin de
      rencontre avait offert la qualification.
    </p>

    <p>
      La saison <strong>1974-1975</strong> bat alors son plein. <strong>M. Bonnel</strong>,
      secondé par un autre enfant du pays, <strong>Léonce Lavagne</strong>, poursuit
      inlassablement son travail pour ramener l'<strong>AS Béziers</strong> parmi l'
      <strong>élite nationale</strong>. Désormais, le club peut envisager l'avenir avec
      confiance, car il est dirigé par un homme déterminé, de la trempe des grands présidents :
      <strong>M. Gérard Jullien</strong>. Nul doute que, admirablement entourée par des
      dirigeants forgés dans les années les plus difficiles du vieux club biterrois, la nouvelle
      équipe ne tardera pas à voir ses efforts récompensés par une consécration durable.
    </p>

    <p>
      Les saisons <strong>1975-1976</strong> et <strong>1976-1977</strong> sont satisfaisantes,
      sans toutefois apporter les résultats que l'on pouvait attendre des efforts entrepris par
      le président <strong>Jullien</strong> et son comité. L'<strong>AS Béziers</strong> termine
      respectivement aux <strong>9e</strong> et <strong>8e places</strong> avec trente-neuf puis
      trente-sept points, malgré des renforts sérieux tels que <strong>Maya</strong>,
      <strong>Bourdon</strong>, <strong>Palma</strong>, <strong>Ahache</strong>,
      <strong>Buffat</strong>, <strong>Komano</strong>, <strong>Sannier</strong> et
      <strong>Geurten</strong>.
    </p>

    <p>
      C'est cependant en <strong>Coupe de France 1975-1976</strong> que les Biterrois se
      distinguent à nouveau. Après avoir successivement éliminé <strong>Ajaccio</strong>
      (32e de finale) puis <strong>Thonon</strong> (16e de finale), ils atteignent les
      <strong>huitièmes de finale</strong>, où ils s'inclinent face à <strong>Angers</strong>.
    </p>

    <figure class="inline-photo">
      <img src="/images/ASB-7374.png" alt="Association Sportive Béziers (1973-1974)" />
      <figcaption>Association Sportive Béziers (1973 - 1974)</figcaption>
    </figure>

    <div class="text-photo-side">
      <figure class="inline-photo">
        <img src="/images/ASB-8081.png" alt="Association Sportive Béziers (1980-1981)" />
        <figcaption>Association Sportive Béziers (1980 - 1981)</figcaption>
      </figure>
      <div class="text-photo-text">
        <p>
          C'est lors de la saison <strong>1978-1979</strong> que le redressement s'opère, avec
          l'arrivée de <strong>Tokoto</strong> (Bordeaux), <strong>Kern</strong> (Rouen) et
          l'éclosion de jeunes talents tels qu'<strong>Antoine Martinez</strong> et
          <strong>Daniel Rey</strong>. Les Biterrois terminent à la <strong>3e place</strong> avec
          quarante-trois points et manquent de peu une qualification pour les barrages.
        </p>
        <p>
          Pour la saison <strong>1980-1981</strong>, le président <strong>Torre</strong> décide
          d'engager un profond renouvellement et fait confiance à de jeunes joueurs issus du
          club (<strong>Martinez</strong>, <strong>Rey</strong>, <strong>Laguerre</strong>,
          <strong>Moine</strong>, <strong>Parodi</strong>, <strong>Couronne</strong>,
          <strong>Sannier</strong>, <strong>Cabanel</strong>, etc.) ou venus de la région, comme
          <strong>Tur</strong> (La Paillade) et <strong>Grassi</strong>. Avec quelques joueurs
          plus expérimentés tels que <strong>Borgoni</strong>, <strong>Maya</strong>,
          <strong>Knayer</strong>, <strong>Edwige</strong> (venu de Montpellier) et
          <strong>Frey</strong>, l'<strong>AS Béziers</strong> réalise un parcours surprenant en
          championnat et se retrouve, à six journées de la fin, à la
          <strong>deuxième place</strong>, devant <strong>Toulouse</strong> et derrière
          <strong>Montpellier</strong>. Le club finira finalement à une belle
          <strong>quatrième place</strong>. Une saison particulièrement brillante,
        </p>
      </div>
    </div>

    <hr />

    <!-- SECTION 1986-1990 -->
    <h2>LE DÉCLIN ET LA DISPARITION DE L'ASSOCIATION SPORTIVE BÉZIERS (1986 - 1990)</h2>

    <p>
      Dès le milieu de la décennie, les dirigeants multiplient les appels à la mobilisation pour
      préserver l'avenir du club, comme en témoigne la saison <strong>1986-1987</strong> où,
      malgré les bons résultats des équipes amateurs et de jeunes, la section senior reste
      fragilisée par un manque d'équilibre budgétaire.
    </p>

    <p>
      Reléguée en <strong>troisième division</strong>, puis la saison suivante en
      <strong>Quatrième division</strong> l'<strong>AS Béziers</strong> tente de se reconstruire
      sous la présidence de <strong>Camille Passi</strong>, ancien joueur du club. Si l'ambition
      de remontée est affichée, les résultats ne suivent pas, les tensions internes se
      multiplient, les choix sportifs peinent à produire l'électrochoc attendu et la situation
      financière reste fragile.
    </p>

    <p>
      Au cours des dernières saisons professionnelles, l'arrivée de joueurs de renom comme
      <strong>Antonetti</strong>, <strong>Bousdira</strong> (international français),
      <strong>Bracci</strong> (ancien joueur de l'OM et international français) ainsi que de la
      légende stéphanoise <strong>Gérard Janvion</strong> (international français et finaliste
      de la Coupe d'Europe avec l'ASSE) témoigne néanmoins de la volonté du club de maintenir
      ses ambitions malgré un contexte devenu plus difficile.
    </p>

    <p>
      Malgré le dévouement de son président, le couperet tombe en <strong>1990</strong>,
      l'<strong>Association Sportive Biterroise</strong>, fondée en <strong>1940</strong>, est
      liquidée par le tribunal du football professionnel et disparaît du paysage
      footballistique français. La faute à une ingérence financière lors de la dernière décennie.
    </p>

    <p>
      Certains des meilleurs éléments du club rejoignent alors des clubs voisins, dont le
      <strong>Football Club Devèze Béziers</strong>, club du quartier de la Devèze, afin de
      préserver le football biterrois, qui n'a jamais été dans une situation aussi difficile.
      Cela permet d'ailleurs à ce club de se développer et d'atteindre la
      <strong>quatrième division française</strong>.
    </p>

    <div class="photo-pair">
      <figure class="inline-photo">
        <img src="/images/passi.png" alt="Le président Camille Passi avec son entraîneur Éric Firoud (1988-1989)" />
        <figcaption>Le président Camille Passi avec son entraîneur Éric Firoud (1988 - 1989)</figcaption>
      </figure>
      <figure class="inline-photo">
        <img src="/images/rey.png" alt="Une nouvelle saison débute pour le capitaine Dany Rey (1988-1989)" />
        <figcaption>Une nouvelle saison débute pour le capitaine Dany Rey (1988 - 1989)</figcaption>
      </figure>
    </div>

    <hr />

    <!-- SECTION 1990-2006 -->
    <h2>L'APRÈS ASSOCIATION SPORTIVE BÉZIERS (1990 - 2006)</h2>

    <p>
      Malgré des résultats sportifs limités, le <strong>FC Devèze Béziers</strong> fondé en
      <strong>1966</strong> s'impose progressivement comme le principal représentant du football
      biterrois après la disparition de l'<strong>AS Béziers Football</strong>. Fort de son
      ancrage dans le quartier de la Devèze, le club nourrit alors l'ambition de dépasser ce
      cadre local pour redonner à Béziers une place sur la scène régionale puis nationale.
    </p>

    <p>
      Afin d'accompagner ce développement, les dirigeants entreprennent une profonde évolution
      de son identité. L'objectif n'est pas de créer un nouveau club, mais de donner une image
      plus fédératrice, capable de rassembler l'ensemble des Biterrois autour d'un même projet.
      À partir de <strong>2000</strong>, le nom <strong>FC Devèze Béziers</strong> laisse ainsi
      progressivement place au <strong>Béziers FC 34</strong>. Le choix du numéro 34, en
      référence au département de l'<strong>Hérault</strong>, symbolise cette volonté de
      représenter tous les Biterrois.
    </p>

    <p>
      Si son identité évolue, le club reste fidèle à ses racines. Depuis sa création, le
      <strong>FC Devèze Béziers</strong> évolue sous les couleurs rouge et noir et adopte le
      scorpion comme emblème, un symbole qui lui vaut rapidement le surnom de « Scorpions ».
      Ces éléments identitaires sont conservés tout au long de cette transformation, illustrant
      la continuité de son histoire malgré le changement de nom.
    </p>

    <figure class="inline-photo">
      <img src="/images/FCDeveze-010990.png" alt="Football Club Devèze Béziers (1990-1991)" />
      <figcaption>Football Club Devèze Béziers (1990 - 1991)</figcaption>
    </figure>

    <p>
      Après la disparition du <strong>Béziers FC 34</strong> (ancien FC Devèze Béziers), le
      <strong>FC Béziers Méditerranée</strong> évoluant en rouge et bleu, devient le principal
      représentant du football biterrois.
    </p>

    <p>
      En <strong>2006</strong>, le club du <strong>Béziers Méditerranée Football Cheminots</strong>
      fusionne avec l'<strong>Avenir Sportif Saint-Chinian</strong> pour former l'
      <strong>AS Béziers 2</strong>, qui conserve les couleurs jaune et noir. La même année, le
      <strong>12 novembre</strong>, au <strong>Stade de Sauclières</strong>, le
      <strong>FC Béziers Méditerrannée</strong> remporte le premier derby de championnat de son
      histoire face à l'<strong>AS Béziers 2</strong> sur le score de <strong>2 à 0</strong>, lors
      de la <strong>7e journée</strong> de <strong>Division d'Honneur Élite</strong>. Grâce à des
      réalisations de <strong>Martinez</strong> et de <strong>Bru</strong> en première période,
      cette victoire marque une page importante dans l'histoire du football biterrois.
    </p>

    <p>
      Le projet de fusion entre les clubs biterrois, visant à créer un grand club, est déjà
      engagé. Il ne se concrétisera une année plus tard.
    </p>

    <div class="photo-pair full-image">
      <figure class="inline-photo">
        <img src="/images/ASB_2_0607.png" alt="Avenir Sportif Béziers 2 (2006-2007)" />
        <figcaption>Avenir Sportif Béziers 2 (2006 - 2007)</figcaption>
      </figure>
      <figure class="inline-photo">
        <img src="/images/FC_Beziers_M-0607.png" alt="Football Club Béziers Méditerranée (2006-2007)" />
        <figcaption>Football Club Béziers Méditerranée (2006 - 2007)</figcaption>
      </figure>
    </div>

    <hr />

    <!-- SECTION 2007-2016 -->
    <h2>LE RENOUVEAU DU FOOTBALL BITERROIS (2007 - 2016)</h2>

    <p>
      Il faut attendre <strong>2007</strong> pour voir renaître un véritable projet
      footballistique ambitieux à Béziers.
    </p>

    <p>
      Trois clubs locaux fusionnent alors : l'<strong>Avenir Sportif Saint-Chinian</strong>, le
      <strong>Football Club Béziers Méditerranée</strong> et le
      <strong>Béziers Méditerranée Football Cheminots</strong>, afin de donner naissance à
      l'<strong>Avenir Sportif Béziers</strong>. L'idée de réunir plusieurs clubs biterrois pour
      retrouver une équipe capable d'évoluer durablement dans les championnats nationaux
      apparaît dès <strong>2006</strong>, mais c'est en <strong>2007</strong> que
      l'<strong>Avenir Sportif Béziers</strong> voit officiellement le jour.
    </p>

    <p>
      Le club évolue alors en <strong>CFA 2</strong>, niveau auquel évoluait déjà l'
      <strong>Avenir Sportif Saint-Chinian</strong>, l'un des trois clubs fondateurs. Ce nouveau
      club est présidé par l'ancien président de Saint-Chinian, <strong>Gérard Rocquet</strong>.
    </p>

    <div class="text-photo-side">
      <figure class="inline-photo">
        <img src="/images/ASB-0910.png" alt="Avenir Sportif Béziers (2009-2010)" />
        <figcaption>Avenir Sportif Béziers (2009 - 2010)</figcaption>
      </figure>
      <div class="text-photo-text">
        <p>
          Pour sa première saison, l'<strong>AS Béziers Football</strong> évolue donc en
          <strong>CFA 2</strong> mais n'échappe pas à la relégation en
          <strong>Division d'Honneur</strong> à l'issue du championnat.
        </p>
        <p>
          À la fin de la saison <strong>2008-2009</strong>, l'<strong>ASB</strong> obtient
          cependant une remontée immédiate en <strong>CFA 2</strong> puis réalise l'exploit de
          terminer premier de son groupe.
        </p>
        <p>
          Seulement deux ans après sa descente en élite régionale, le club remporte le titre de
          <strong>champion de France</strong> de <strong>CFA 2</strong> et accède en
          <strong>CFA</strong>.
        </p>
      </div>
    </div>

    <p>
      Pour sa première saison en <strong>CFA</strong>, l'<strong>AS Béziers Football</strong>
      termine dans la zone de relégation avant d'être repêchée à la suite des rétrogradations
      administratives de plusieurs clubs.
    </p>

    <p>
      Après trois nouvelles saisons passées dans le ventre mou du championnat de
      <strong>CFA</strong>, la saison <strong>2014-2015</strong> marque un tournant historique
      pour <strong>Xavier Collin</strong> et ses hommes. En effet, le
      <strong>23 mai 2015</strong>, le club biterrois obtient sa promotion en
      <strong>National</strong> pour la première fois de son histoire.
    </p>

    <div class="photo-pair full-image">
      <figure class="inline-photo">
        <img src="/images/montee_en_N1.jpg" alt="Michel Ramon, Kévin Fortune, Mahamadou Drame" />
        <figcaption>Michel Ramon, Kévin Fortune, ..., ... et Mahamadou Drame</figcaption>
      </figure>
    </div>

    <p>
      C'est donc à l'issue d'une saison exceptionnelle, au cours de laquelle
      <strong>Xavier Collin</strong> est auréolé du titre de <strong>meilleur entraîneur de
      CFA</strong>, que le titre de champion échappe de peu au club au profit du
      <strong>CS Sedan Ardennes</strong>. Promu au troisième niveau du football français,
      l'<strong>AS Béziers football</strong> prépare alors sa première saison en
      <strong>National</strong> dans la continuité du travail accompli depuis plusieurs années,
      renouant ainsi avec les ambitions des générations précédentes qui avaient porté le
      football biterrois jusqu'en <strong>Première division</strong>.
    </p>

    <p>
      Lors de la saison suivante, en <strong>2015-2016</strong>, l'<strong>AS Béziers
      Football</strong> réalise son meilleur parcours en <strong>Coupe de France</strong>. Le
      club débute au <strong>5e tour</strong> face à <strong>Marvejols Sports</strong> (DHR) et
      atteint le <strong>8e tour</strong>, où il s'incline face à l'
      <strong>EFC Fréjus Saint-Raphaël</strong> (National) sur le score de
      <strong>1 but à 0</strong>. À noter également la belle victoire obtenue au
      <strong>7e tour</strong> face au voisin du <strong>FC Sète</strong> (CFA), également sur
      le score de <strong>1 but à 0</strong>.
    </p>

    <hr />

    <!-- SECTION 2017-2019 -->
    <h2>LE RETOUR DANS LE MONDE PROFESSIONNEL POUR L'AS BÉZIERS (2017 - 2019)</h2>

    <p>
      Après trois saisons passées à lutter pour le maintien en <strong>National</strong>, le
      club biterrois, dirigé par <strong>Mathieu Chabert</strong>, décroche, lors de l'ultime
      journée de la saison <strong>2017-2018</strong>, son accession au football professionnel
      en terminant à la <strong>deuxième place</strong> du championnat.
    </p>

    <p>
      Grâce à un large succès <strong>4-1</strong> au <strong>Stade de Sauclières</strong> face
      aux <strong>Herbiers</strong> et au faux pas de son concurrent direct,
      <strong>Grenoble Foot 38</strong>, pourtant à domicile contre le relégable
      <strong>Entente Sannois Saint-Gratien</strong>, l'<strong>AS Béziers Football</strong>
      obtient les trois points nécessaires pour conserver sa <strong>deuxième place</strong> et
      accéder à la <strong>Ligue 2</strong>.
    </p>

    <p>
      <strong>Trente ans</strong> après la disparition du club historique, Béziers retrouve
      ainsi le football professionnel. Cette renaissance est notamment marquée par un match
      d'anthologie face à <strong>Valenciennes</strong>, remporté sur le score de
      <strong>6 à 5</strong>, qui constitue alors le match le plus prolifique de
      <strong>Ligue 2</strong> depuis <strong>1993</strong>. Conformément aux exigences de la
      <strong>Ligue du Football Professionnel</strong>, l'équipe évolue désormais au
      <strong>Stade de la Méditerranée</strong>, même si le <strong>Stade de Sauclières</strong>
      demeure profondément ancré dans la mémoire collective des supporters.
    </p>

    <p>
      Malgré un début de saison encourageant, le club ne parvient toutefois pas à assurer son
      maintien en <strong>Ligue 2</strong>. En manque de résultats, particulièrement à domicile
      où il doit attendre le <strong>15 mars 2019</strong> pour décrocher sa première victoire
      <strong>1-0</strong> face à <strong>Auxerre</strong>, le club termine à un point de la
      place de barragiste et est relégué en <strong>National</strong> à l'issue de la saison
      <strong>2018-2019</strong>, un an seulement après son accession.
    </p>

    <div class="photo-pair">
      <figure class="inline-photo">
        <img src="/images/image-1.jpg" alt="Valenciennes - Béziers, victoire 5-6, 33e journée Ligue 2" />
        <figcaption>Valenciennes - Béziers / victoire : 5-6 / 33e journée Ligue 2</figcaption>
      </figure>
      <figure class="inline-photo">
        <img src="/images/image2.jpg" alt="Béziers - Nancy, victoire 3-0, 38e journée Ligue 2" />
        <figcaption>Béziers - Nancy / victoire : 3-0 / 38e journée Ligue 2</figcaption>
      </figure>
    </div>

    <hr />

    <!-- SECTION 2019-AUJOURD'HUI -->
    <h2>LA CHUTE APRÈS L'EUPHORIE (2019 - AUJOURD'HUI)</h2>

    <p>
      L'euphorie est toutefois de courte durée. Reléguée en <strong>National</strong> à l'issue
      de la saison <strong>2018-2019</strong>, l'<strong>AS Béziers Football</strong> connaît une
      nouvelle descente dès la saison suivante. Le championnat <strong>2019-2020</strong> est
      interrompu prématurément en raison de la pandémie de <strong>Covid-19</strong> et le club,
      qui occupait alors une place dans la zone de relégation au moment de l'arrêt des
      compétitions, est rétrogradé en <strong>National 2</strong>. Au cours de cette saison,
      <strong>Mathieu Chabert</strong>, entraîneur emblématique de la remontée du club, est
      remplacé par <strong>Didier Santini</strong> en provenance de la sélection chinoise U19.
    </p>

    <div class="photo-pair">
      <figure class="inline-photo">
        <img src="/images/mostefa.jpg" alt="Mehdi Mostefa avant Béziers-Laval (2019-2020)" />
        <figcaption>Mehdi Mostefa avant Béziers-Laval (2019 - 2020)</figcaption>
      </figure>
    </div>

    <p>
      Malgré ces difficultés sportives, l'<strong>AS Béziers Football</strong> compte dans ses
      rangs plusieurs joueurs marquants. Le gardien <strong>Magno Novaes</strong> joue un rôle
      déterminant dans l'accession en <strong>Ligue 2</strong>. Le club voit également éclore
      plusieurs joueurs qui poursuivent ensuite leur carrière aux échelons supérieurs, notamment
      <strong>Kévin Fortuné</strong>, <strong>Ibrahim Sissoko</strong> et
      <strong>Steeve Beusnard</strong>, ainsi que des joueurs issus du territoire, à l'image de
      <strong>Robin Taillan</strong>, illustrant la qualité du recrutement et de la formation
      biterroise.
    </p>

    <p>
      De retour en <strong>National 2</strong> à l'issue de la saison <strong>2019-2020</strong>,
      le club parvient à conserver plusieurs éléments majeurs de son effectif, parmi lesquels le
      capitaine <strong>Mehdi Mostefa</strong>, le milieu de terrain <strong>Enzo Reale</strong>
      ainsi que le gardien <strong>Yan Marillat</strong>. Et par la même occasion enregistre de
      bonnes arrivées tel que le défenseur expérimenté <strong>Quentin Gau</strong>, le retour du
      milieu de terrain <strong>Michel Ramon</strong> ainsi que le serial buteur
      <strong>Fodé Guirassy</strong>. Toujours sous la direction de <strong>Didier
      Santini</strong>, l'équipe réalise un excellent début de saison <strong>2020-2021</strong>
      et occupe la <strong>première place</strong> du championnat après neuf journées.
      Toutefois, la pandémie de Covid-19 entraîne une nouvelle interruption des compétitions. La
      <strong>Fédération Française de Football</strong> décide finalement de classer la saison
      <strong>2020-2021</strong> comme « saison blanche », sans promotion ni relégation.
    </p>

    <p>
      L'<strong>AS Béziers Football</strong> évolue donc de nouveau en <strong>National 2</strong>
      lors de la saison <strong>2021-2022</strong>. Avec le nouveau coach
      <strong>Colbert Marlot</strong> en provenance du <strong>Limoges FC</strong> avec
      l'objectif de remonter en <strong>National 1</strong>, deux ans après avoir quitté ce
      niveau. Mais les résultats ne furent pas à la hauteur des ambitions et
      <strong>Colbert Marlot</strong> sera limogé en cours d'exercice et remplacé par
      <strong>Hugo Munoz</strong>.
    </p>

    <p>
      À l'issue de la saison <strong>2021-2022</strong>, le club termine à une encourageante
      <strong>sixième place</strong> de son groupe. Durant l'été <strong>2022</strong>, le club
      est toutefois rétrogradé administrativement en <strong>National 3</strong> par la
      <strong>DNCG</strong> en raison de difficultés financières.
    </p>

    <p>
      Lors de la saison <strong>2022-2023</strong>, de retour en <strong>cinquième
      division</strong>. Le club mise sur la jeunesse avec des jeunes <strong>U19
      Nationaux</strong> intégrés au groupe national et épaulés par des joueurs d'expérience.
      Les Biterrois réalisent un excellent parcours sportif et terminent en tête de leur
      championnat de <strong>National 3</strong>, ce qui aurait dû leur permettre d'accéder au
      <strong>National 2</strong>. Cette accession est cependant refusée par la
      <strong>DNCG</strong>. Le club est finalement rétrogradé en <strong>Régional 1</strong>
      pour la saison <strong>2023-2024</strong>.
    </p>

    <figure class="inline-photo">
      <img src="/images/image-1-1.jpg" alt="Avant-match de National 3 Béziers-Onet le château (2022-2023)" />
      <figcaption>Avant-match de National 3 Béziers-Onet le château (2022-2023)</figcaption>
    </figure>

    <p>
      Depuis <strong>2024</strong>, l'<strong>AS Béziers Football</strong> évolue en
      <strong>Régional 1</strong>, loin des championnats nationaux. Le club s'appuie désormais
      sur la formation et le développement des jeunes talents du territoire biterrois. Cette
      politique porte ses fruits avec la présence régulière des équipes <strong>U17</strong> et
      <strong>U19</strong> dans les championnats nationaux, notamment une
      <strong>demi-finale</strong> du championnat de France <strong>U17</strong> lors de la
      saison <strong>2024-2025</strong>.
    </p>

    <figure class="inline-photo">
      <img src="/images/ASB-2526.jpg" alt="Avenir Sportif Béziers (2025-2026)" />
      <figcaption>Avenir Sportif Béziers (2025 - 2026)</figcaption>
    </figure>

    <p>
      Au cours de son histoire, le football biterrois a construit un palmarès modeste mais
      significatif. L'<strong>Avenir Sportif Béziers</strong> a notamment évolué une saison en
      <strong>Division 1</strong> et quarante saisons en <strong>Division 2</strong>. Le club
      compte également un <strong>titre de vice-champion de Division 2</strong> en
      <strong>1957</strong>, un <strong>quart de finale de la Coupe de France</strong> en
      <strong>1962</strong> et un <strong>titre de champion de CFA 2</strong> en
      <strong>2010</strong>.
    </p>

    <p>
      Dans une ville traditionnellement marquée par le rugby, le football a su trouver sa place
      et écrire sa propre histoire, alternant périodes de réussite et moments plus difficiles au
      gré des différentes entités qui se sont succédé. Chacun des clubs biterrois a contribué, à
      son époque, à préserver et à enrichir l'histoire du football à Béziers.
    </p>

    <p>
      Aujourd'hui, malgré son évolution au niveau régional, l'<strong>Avenir Sportif Béziers</strong>
      demeure l'héritière de cet héritage sportif. Fidèle à son identité et à son ancrage
      territorial, le club poursuit son développement à travers la formation des jeunes et
      l'ambition de retrouver, à terme, les championnats nationaux. Son histoire, forte de plus
      d'un siècle de passion et de résilience, continue ainsi de s'écrire.
    </p>

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

/* Bouton actif = page courante */
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
  margin-bottom: 1rem;
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

/* CARROUSEL */
.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 2.5rem 0 1rem;
}

.carousel-track {
  display: flex;
  gap: 3rem;
  flex: 1;
  justify-content: center;
}

.carousel-item {
  text-align: center;
  flex: 1;
  max-width: 260px;
}

.carousel-item img {
  width: 100%;
  max-height: 260px;
  object-fit: contain;
  transition: opacity 0.3s ease;
}

.carousel-caption {
  margin-top: 0.8rem;
  font-weight: 600;
}

.arrow {
  background: none;
  border: none;
  font-size: 2.5rem;
  color: #a83c3c;
  cursor: pointer;
  line-height: 1;
  padding: 0.5rem 1rem;
  flex-shrink: 0;
}

.arrow:hover {
  color: #8c2f2f;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: #ccc;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.2s ease;
}

.dot.active {
  background: #a83c3c;
}

/* PHOTO INLINE (une seule image) */
.inline-photo {
  margin: 1.5rem 0;
  text-align: center;
}

.inline-photo img {
  max-width: 100%;
  border-radius: 6px;
}

.inline-photo figcaption {
  margin-top: 0.6rem;
  font-style: italic;
  color: #555;
}

/* PAIRE DE PHOTOS CÔTE À CÔTE */
.photo-pair {
  display: flex;
  gap: 2rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.photo-pair .inline-photo {
  flex: 1;
  min-width: 280px;
  margin: 0;
}

.photo-pair .inline-photo img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  object-position: top center;
}

/* Variante : images affichées ENTIÈRES, sans rognage */
.photo-pair.full-image .inline-photo img {
  height: 420px;
  object-fit: contain;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
}

/* BLOC : TEXTE + PHOTO CÔTE À CÔTE (ordre = ordre dans le HTML) */
.text-photo-side {
  display: flex;
  gap: 2.5rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
  align-items: flex-start;
}

.text-photo-side .inline-photo {
  flex: 1;
  min-width: 280px;
  margin: 0;
}

.text-photo-side .text-photo-text {
  flex: 1;
  min-width: 280px;
}

.text-photo-side .text-photo-text p {
  margin-bottom: 1rem;
}

/* BLOC : TEXTE AU-DESSUS, PHOTO EN GRAND EN DESSOUS (empilé, plus de côte à côte) */
.text-photo-row {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1.5rem 0 2.5rem;
}

.text-photo-row .text-photo-text p {
  margin-bottom: 1rem;
}

.text-photo-row .inline-photo,
.text-photo-row .big-photo {
  margin: 0 auto;
  width: 100%;
  max-width: 900px;
}

.text-photo-row .inline-photo img,
.text-photo-row .big-photo img {
  width: 100%;
  max-height: 600px;
  object-fit: cover;
  border-radius: 8px;
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
  .carousel-track {
    flex-direction: column;
    align-items: center;
  }
  .carousel-item {
    margin: 0 auto;
    max-width: 220px;
    height: 260px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .carousel-item img {
    height: 200px;
    width: auto;
    max-width: 100%;
  }
  .photo-pair {
    flex-direction: column;
  }
  .text-photo-side {
    flex-direction: column;
  }
  .text-photo-row .inline-photo img,
  .text-photo-row .big-photo img {
    max-height: 400px;
  }

  .carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 2.5rem 0 1rem;
  overflow-anchor: none;
}

}
</style>