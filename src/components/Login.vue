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
      router.push('/'); // Redireccionar a la página principal después del login
    } catch (err) {
      error.value = err.message;
    }
  };
  </script>
  
  <style scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--color-background);
    font-family: var(--font-family);
  }
  
  .login__container {
    background-color: var(--color-light);
    padding: var(--space-xl);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    max-width: 400px;
    width: 100%;
  }
  
  .login__title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
    text-align: center;
  }
  
  .login__form-group {
    margin-bottom: var(--space-md);
  }
  
  .login__label {
    display: block;
    font-size: var(--font-size-base);
    color: var(--color-text);
    margin-bottom: var(--space-xs);
  }
  
  .login__input {
    width: 100%;
    padding: var(--space-sm);
    border: 1px solid var(--color-primary);
    border-radius: var(--border-radius);
    font-size: var(--font-size-base);
    color: var(--color-text);
    transition: border-color var(--transition-duration);
  }
  
  .login__input:focus {
    border-color: var(--color-secondary);
    outline: none;
  }
  
  .login__button {
    width: 100%;
    padding: var(--space-sm);
    background-color: var(--color-primary);
    color: var(--color-background);
    border: none;
    border-radius: var(--border-radius);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
    cursor: pointer;
    transition: background-color var(--transition-duration);
  }
  
  .login__button:hover {
    background-color: var(--color-tertiary);
  }
  
  .login__error {
    color: red;
    font-size: var(--font-size-base);
    text-align: center;
    margin-top: var(--space-md);
  }
  </style>