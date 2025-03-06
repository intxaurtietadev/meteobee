<template>
  <div class="login">
    <div class="login__container">
      <div class="login__header">
        <div class="login__logo">
          <img src="../assets/img/logo.png" alt="Logo ApiClima" />
        </div>
        <h1 class="login__title">Meteo Bee</h1>
        <p class="login__subtitle">Meteorología para apicultores</p>
      </div>
      
      <form class="login__form" @submit.prevent="handleSubmit">
        <div class="login__form-group">
          <label for="email" class="login__label">
            <i class="login__icon login__icon--email"></i>
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="login__input"
            placeholder="usuario@ejemplo.com"
            required
          />
        </div>
        
        <div class="login__form-group">
          <label for="password" class="login__label">
            <i class="login__icon login__icon--password"></i>
            Contraseña
          </label>
          <div class="login__password">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="login__input"
              placeholder="Ingresa tu contraseña"
              required
            />
            <button 
              type="button" 
              class="login__password-toggle" 
              @click="showPassword = !showPassword"
              aria-label="Mostrar contraseña"
            >
              <i class="login__icon-eye" :class="showPassword ? 'login__icon-eye--hidden' : 'login__icon-eye--visible'"></i>
            </button>
          </div>
        </div>
        
        <div class="login__options">
          <div class="login__remember">
            <input type="checkbox" id="remember" v-model="remember" class="login__checkbox" />
            <label for="remember" class="login__remember-label">Recordarme</label>
          </div>
          <a href="#" class="login__forgot" @click.prevent="$emit('forgotPassword')">¿Olvidaste tu contraseña?</a>
        </div>
        
        <button type="submit" class="login__button" :class="{'login__button--loading': isLoading}" :disabled="isLoading">
          <span v-if="isLoading">Cargando...</span>
          <span v-else>Iniciar sesión</span>
        </button>
      </form>
      
      <p v-if="errorMessage" class="login__error">
        <i class="login__error-icon"></i>
        {{ errorMessage }}
      </p>
      
      <div class="login__footer">
        <p class="login__register">¿No tienes una cuenta? <a href="#" class="login__link" @click.prevent="$emit('switchToRegister')">Regístrate aquí</a>
        </p>
        <p class="login__weather-info">
          <i class="login__icon login__icon--weather"></i> 
          El clima y las abejas, en perfecta armonía
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['login', 'register', 'forgotPassword']);

const email = ref('');
const password = ref('');
const remember = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const handleSubmit = async () => {
  errorMessage.value = '';
  isLoading.value = true;
  
  try {
    // 🔗 Llamada al JSON Server para obtener usuarios
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) throw new Error('Error al obtener usuarios.');

    const users = await response.json();
    
    // 🔐 Verificar credenciales
    const user = users.find(u => u.email === email.value && u.password === password.value);

    if (user) {
      emit('login', { email: user.email, remember: remember.value });
    } else {
      errorMessage.value = 'Correo o contraseña incorrectos.';
    }
  } catch (err) {
    errorMessage.value = err.message || 'Error al iniciar sesión. Inténtalo de nuevo.';
  } finally {
    isLoading.value = false;
  }
};

</script>


<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: var(--font-family);
  height: 110vh;
}

.login__container {
  width: 100%;
  max-width: 28.125rem;
  background-color: rgba(230, 230, 230, 0.541); 
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  position: relative;
  font-family: var(--font-family);

}

.login__header {
  text-align: center;
  padding: var(--space-lg) var(--space-md) var(--space-md);
  background: linear-gradient(to right, var(--color-secondary), var(--color-accent));
  color: var(--color-text);
}

.login__logo {
  margin: 0 auto var(--space-sm);
  width: 5rem;
  height: 5rem;
}

.login__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.login__title {
  margin: 0 0 var(--space-xs);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.login__subtitle {
  margin: 0;
  font-size: var(--font-size-base);
  opacity: 0.8;
}

.login__form {
  padding: var(--space-lg) var(--space-lg) var(--space-sm);
}

.login__form-group {
  margin-bottom: var(--space-md);
  width: 90%;
}

.login__label {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-xs);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-base);
  color: var(--color-text);
}

.login__icon {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: var(--space-xs);
  border-radius: 50%;
}

.login__icon--email {
  background-color: var(--color-secondary);
}

.login__icon--password {
  background-color: var(--color-secondary);
}

.login__icon--weather {
  background-color: var(--color-tertiary);
  width: 1.125rem;
  height: 1.125rem;
}

.login__input {
  width: 100%;
  padding: var(--space-sm);
  border: 1px solid #e2e8f0;
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  transition: border-color var(--transition-duration);
}

.login__input:focus {
  outline: none;
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 0.125rem rgba(246, 184, 60, 0.2);
}

.login__password {
  position: relative;
}

.login__password-toggle {
  position: absolute;
  right: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #718096;
}

.login__icon-eye {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  background-color: #718096;
  border-radius: 50%;
}

.login__icon-eye--visible {
  background-color: #718096;
}

.login__icon-eye--hidden {
  background-color: #4a5568;
}

.login__options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
  font-size: var(--font-size-base);
}

.login__remember {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.login__checkbox {
  margin: 0;
}

.login__remember-label {
  cursor: pointer;
}

.login__forgot {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-duration);
}

.login__forgot:hover {
  text-decoration: underline;
  color: var(--color-tertiary);
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
  font-family: var(--font-family);
  cursor: pointer;
  transition: background-color var(--transition-duration);
}

.login__button:hover {
  background-color: #3c5526;
}

.login__button--loading {
  opacity: 0.8;
  cursor: not-allowed;
}

.login__button:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.login__error {
  margin: var(--space-sm) var(--space-lg);
  padding: var(--space-xs) var(--space-sm);
  background-color: #fee2e2;
  color: #b91c1c;
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
  display: flex;
  align-items: center;
}

.login__error-icon {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: var(--space-xs);
  background-color: #b91c1c;
  border-radius: 50%;
}

.login__footer {
  padding: var(--space-md) var(--space-lg) var(--space-lg);
  text-align: center;
  border-top: 1px solid #f0f0f0;
  color: var(--color-text);
  font-size: var(--font-size-base);
}

.login__register {
  margin-bottom: var(--space-xs);
}

.login__link {
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  transition: color var(--transition-duration);
}

.login__link:hover {
  text-decoration: underline;
  color: var(--color-tertiary);
}

.login__weather-info {
  margin-top: var(--space-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
  font-style: italic;
}

/* Responsividad para móviles */
@media (max-width: 30rem) {
  .login__container {
    border-radius: calc(var(--border-radius) * 0.75);
  }
  
  .login__form {
    padding: var(--space-md) var(--space-md) var(--space-xs);
  }
  
  .login__error, 
  .login__footer {
    padding-left: var(--space-md);
    padding-right: var(--space-md);
  }
  
  .login__options {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-xs);
  }
}
</style>