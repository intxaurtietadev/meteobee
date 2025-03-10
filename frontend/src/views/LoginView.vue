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
import { useAuthStore } from '../stores/auth';

const activeTab = ref('login');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async (userData) => {
  try {
    await authStore.login(userData); // Llama al método `login` del store con los datos completos
    router.push('/profile'); // Redirige al perfil
  } catch (err) {
    alert(err.message);
  }
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
  min-height: 110vh;
  background-image: linear-gradient(rgba(255, 255, 255, 0.247), rgba(255, 255, 255, 0.205)),
  url('../assets/img/background-user.png');
}

.login-view__content {
  width: 100%;
  max-width: 30rem;
}
</style>