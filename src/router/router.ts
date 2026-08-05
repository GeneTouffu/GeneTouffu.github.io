import { createWebHistory, createRouter } from 'vue-router'

import AboutView from '../views/AboutView.vue';
import BlogHomepageView from '../views/BlogHomepageView.vue';
import HomeView from '../views/HomeView.vue';
import ContactView from '../views/ContactView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/blog', component: BlogHomepageView },
  { path: '/contact', component: ContactView }
]

const router = createRouter({
  // Note: We're using createMemoryHistory() here for compatibility
  //       with the Playground. In a real application you'd usually
  //       use createWebHistory() or createWebHashHistory() instead,
  //       tying the route to the browser URL. See the documentation
  //       for more information about history modes.
  history: createWebHistory(),
  routes,
})

export default router