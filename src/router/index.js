import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue'; // Asegúrate de que ProfileView.vue existe
import { useAuthStore } from '../stores/auth';
import NewsView from '../views/NewsView.vue';
import GrantsView from '../views/GrantsView.vue';
import GrantsViewcopy from '../views/GrantsViewcopy.vue';

const routes = [
  {
    path: '/meteobee/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: false }, // No requiere autenticación
  },
  {
    path: '/meteobee/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false }, // No requiere autenticación
  },
  {
    path: '/meteobee/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true }, // Requiere autenticación
  },
  {
    path: '/meteobee/noticias',
    name: 'Noticias',
    component: NewsView,
  },
  {
  path: '/meteobee/ayudas',
  name: 'Ayudas',
  component: GrantsView,
},
{
  path: '/meteobee/copia',
  name: 'Copia',
  component: GrantsViewcopy,
}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protege las rutas que requieren autenticación
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.checkAuth(); // Verificar autenticación

  if (to.meta.requiresAuth && !authStore.user) {
    next('/login'); // Redireccionar al login si no está autenticado
  } else {
    next(); // Continuar la navegación
  }
});

export default router;
