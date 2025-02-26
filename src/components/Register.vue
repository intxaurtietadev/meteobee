<template>
    <div class="register">
      <div class="register__container">
        <div class="register__header">
          <h2 class="register__title">Crear cuenta</h2>
          <p class="register__subtitle">Únete a Meteo Bee y mantén tus abejas felices</p>
        </div>
  
        <form class="register__form" @submit.prevent="handleRegister">
          <div class="register__form-group">
            <label for="name" class="register__label">Nombre completo</label>
            <input
              type="text"
              id="name"
              v-model="name"
              class="register__input"
              placeholder="Tu nombre"
              required
            />
          </div>
  
          <div class="register__form-group">
            <label for="email" class="register__label">Correo electrónico</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="register__input"
              placeholder="usuario@ejemplo.com"
              required
            />
          </div>
  
          <div class="register__form-group">
            <label for="password" class="register__label">Contraseña</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="register__input"
              placeholder="Crea una contraseña"
              required
            />
          </div>
  
          <div class="register__form-group">
            <label for="confirmPassword" class="register__label">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              class="register__input"
              placeholder="Repite tu contraseña"
              required
            />
          </div>
  
          <p v-if="errorMessage" class="register__error">{{ errorMessage }}</p>
  
          <button class="register__button" type="submit" :disabled="isLoading">
            {{ isLoading ? 'Registrando...' : 'Registrarse' }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const errorMessage = ref('');
  const isLoading = ref(false);
  const router = useRouter();
  
  const handleRegister = async () => {
    errorMessage.value = '';
    if (password.value !== confirmPassword.value) {
      errorMessage.value = 'Las contraseñas no coinciden.';
      return;
    }
  
    isLoading.value = true;
    try {
      const usersResponse = await fetch('http://localhost:3000/users');
      const users = await usersResponse.json();
      const userExists = users.some((user) => user.email === email.value);
  
      if (userExists) {
        errorMessage.value = 'El correo electrónico ya está registrado.';
        return;
      }
  
      const newUser = { name: name.value, email: email.value, password: password.value };
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) throw new Error('Error al registrar el usuario.');
  
      const user = await response.json();
      console.log('Usuario registrado:', user);
      alert('✅ ¡Registro exitoso! Ahora puedes iniciar sesión.');
      router.push('/login');
    } catch (error) {
      errorMessage.value = error.message || 'Ocurrió un error al registrarse.';
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .register {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-family: var(--font-family);
    height: 100vh;
  }
  
  .register__container {
    width: 100%;
    max-width: 28.125rem;
    background-color: var(--color-background);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow: hidden;
    position: relative;
  }
  
  .register__header {
    text-align: center;
    padding: var(--space-lg) var(--space-md);
    background: linear-gradient(to right, var(--color-secondary), var(--color-accent));
    color: var(--color-text);
  }
  
  .register__title {
    margin: 0;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
  }
  
  .register__subtitle {
    margin: var(--space-xs) 0 0;
    font-size: var(--font-size-base);
    opacity: 0.8;
  }
  
  .register__form {
    padding: var(--space-lg) var(--space-lg) var(--space-sm);
  }
  
  .register__form-group {
    margin-bottom: var(--space-md);
  }
  
  .register__label {
    display: block;
    margin-bottom: var(--space-xs);
    font-weight: var(--font-weight-bold);
  }
  
  .register__input {
    width: 100%;
    padding: var(--space-sm);
    border: 1px solid #e2e8f0;
    border-radius: var(--border-radius);
    font-size: var(--font-size-base);
  }
  
  .register__input:focus {
    outline: none;
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 0.125rem rgba(246, 184, 60, 0.2);
  }
  
  .register__button {
    width: 100%;
    padding: var(--space-sm);
    background-color: var(--color-primary);
    color: var(--color-background);
    border: none;
    border-radius: var(--border-radius);
    font-weight: var(--font-weight-bold);
    cursor: pointer;
    transition: background-color var(--transition-duration);
  }
  
  .register__button:hover {
    background-color: #3c5526;
  }
  
  .register__button:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
  
  .register__error {
    margin: var(--space-sm) var(--space-lg);
    padding: var(--space-xs) var(--space-sm);
    background-color: #fee2e2;
    color: #b91c1c;
    border-radius: var(--border-radius);
    text-align: center;
  }
  
  .register__error-icon {
    width: 1rem;
    height: 1rem;
    margin-right: var(--space-xs);
    background-color: #b91c1c;
    border-radius: 50%;
  }
  
  .register__footer {
    padding: var(--space-md) var(--space-lg) var(--space-lg);
    text-align: center;
    border-top: 1px solid #f0f0f0;
  }
  
  .register__link {
    color: var(--color-primary);
    font-weight: var(--font-weight-bold);
    text-decoration: none;
    transition: color var(--transition-duration);
  }
  
  .register__link:hover {
    text-decoration: underline;
    color: var(--color-tertiary);
  }
  
  @media (max-width: 30rem) {
    .register__container {
      border-radius: calc(var(--border-radius) * 0.75);
    }
  
    .register__form {
      padding: var(--space-md);
    }
  }
  </style>
  