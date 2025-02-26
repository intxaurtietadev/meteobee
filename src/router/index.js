import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NewsView from '../views/NewsView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/noticias',
    name: 'Noticias',
    component: NewsView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;