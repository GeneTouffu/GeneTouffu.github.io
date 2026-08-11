import { createWebHistory, createRouter } from 'vue-router'

import AboutView from '../views/AboutView.vue';
import BlogHomepageView from '../views/BlogHomepageView.vue';
import HomeView from '../views/HomeView.vue';
import ContactView from '../views/ContactView.vue';
import BlogView from '../views/BlogView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/blogs', component: BlogHomepageView },
  { path: '/blogs/:slug', component: BlogView },
  { path: '/contact', component: ContactView },
  { path: '/:pathMatch(.*)*', component: HomeView }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router