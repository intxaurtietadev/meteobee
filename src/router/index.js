import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import Login from '@/views/LoginView.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
  { path: '/', component: HomeView, meta: { requiresAuth: true } }, // Ruta protegida
  { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

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