<template>
  <div class="login">
    <div class="login__container">
      <h2 class="login__title">Iniciar sesión</h2>
      <form class="login__form" @submit.prevent="handleLogin">
        <div class="login__form-group">
          <label for="email" class="login__label">Correo electrónico</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="login__input"
            required
          />
        </div>
        <div class="login__form-group">
          <label for="password" class="login__label">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="login__input"
            required
          />
        </div>
        <button type="submit" class="login__button">Iniciar sesión</button>
      </form>
      <p v-if="error" class="login__error">{{ error }}</p>
      <button @click="$emit('close-login')" class="login__close-btn">Cerrar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);
    // Redirigir al perfil o a la página principal
    router.push('/profile'); // O a '/' si prefieres la página principal
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>
/* Aquí van tus estilos del login */
</style>
