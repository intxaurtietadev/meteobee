<template>
  <div class="login-view">
    <div class="login-view__content">
      <Login v-if="activeTab === 'login'" @login="handleLogin" @switchToRegister="switchToRegister" />
      <Register v-else @switchToLogin="switchToLogin" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const activeTab = ref('login');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async (user) => {
  authStore.user = user;
  localStorage.setItem('user', JSON.stringify(user));
  router.push('/profile');
};

const switchToRegister = () => {
  activeTab.value = 'register';
};

const switchToLogin = () => {
  activeTab.value = 'login';
};
</script>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.login-view__content {
  width: 100%;
  max-width: 30rem;
}
</style>
