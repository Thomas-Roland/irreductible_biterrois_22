import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Groupe from '../views/Groupe.vue'
import Organigramme from '../views/Organigramme.vue'
import Album from '../views/Album.vue'
import Contact from '../views/Contact.vue'
import MuseeDeLasb from '../views/Album.vue'
import Palmares from '../views/Palmares.vue'
import Maillots from '../views/Maillots.vue'
import Projet from '../views/Projet.vue'

const routes = [
  { path: '/', component: Accueil },
  { path: '/groupe', component: Groupe },
  { path: '/organigramme', component: Organigramme },
  { path: '/album', component: Album },
  { path: '/contact', component: Contact },
  { path: '/musee-de-lasb', component: MuseeDeLasb },
  { path: '/palmares', component: Palmares },
  { path: '/maillots', component: Maillots },
  { path: '/projet', component: Projet },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router