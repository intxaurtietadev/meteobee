<template>
  <div class="login">
    <Login @login="handleLogin" />
  </div>
</template>

<script setup>
import Login from '../components/Login.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async (user) => {
  authStore.user = user; // 🔐 Guardar usuario en el store
  localStorage.setItem('user', JSON.stringify(user)); // 💾 Persistir en localStorage
  router.push('/profile'); // 🚀 Redirigir al perfil
};
</script>

<style scoped>

</style>
