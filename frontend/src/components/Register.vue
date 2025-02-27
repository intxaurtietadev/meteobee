<template>
  <div class="register">
    <div class="register__container">
      <div class="register__header">
        <h2 class="register__title">Crear cuenta</h2>
        <p class="register__subtitle">Únete a Meteo Bee y mantén tus abejas felices</p>
      </div>

      <form class="register__form" @submit.prevent="handleRegister">
        <!-- Nombre -->
        <div class="register__form-group">
          <label for="name" class="register__label">Nombre completo</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="register__input"
            placeholder="Tu nombre"
            required
          />
        </div>

        <!-- Correo electrónico -->
        <div class="register__form-group">
          <label for="email" class="register__label">Correo electrónico</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="register__input"
            placeholder="usuario@ejemplo.com"
            required
          />
        </div>

      
        <!-- Provincia y Municipio -->
        <div class="register__form-group">
          <label for="provincia" class="register__label">Provincia</label>
          <select
            id="provincia"
            v-model="form.provincia"
            @change="handleProvinciaChange"
            class="register__input"
          >
            <option value="" disabled selected>Selecciona una provincia</option>
            <option v-for="provincia in provincias" :key="provincia.CP" :value="provincia.PROVINCIA">
              {{ provincia.PROVINCIA }}
            </option>
          </select>
        </div>

        <div class="register__form-group">
          <label for="municipio" class="register__label">Municipio</label>
          <select
            id="municipio"
            v-model="form.municipio"
            class="register__input"
            :disabled="!form.provincia"
          >
            <option value="" disabled selected>Selecciona un municipio</option>
            <option v-for="municipio in filteredMunicipios" :key="municipio.CP" :value="municipio.NOMBRE">
              {{ municipio.NOMBRE }}
            </option>
          </select>
        </div>

        <!-- Número de colmenas -->
        <div class="register__form-group">
          <label for="numColmenas" class="register__label">Número de colmenas</label>
          <input
            type="number"
            id="numColmenas"
            v-model="form.numColmenas"
            class="register__input"
            placeholder="Número de colmenas"
            required
          />
        </div>

        <!-- Especie de abeja -->
        <div class="register__form-group">
          <label for="especieAbeja" class="register__label">Especie de abeja</label>
          <select id="especieAbeja" v-model="form.especieAbeja" class="register__input">
            <option value="Apis mellifera">Abeja europea o de la miel (Apis mellifera)</option>
            <option value="Xylocopa violacea">Abeja carpintera (Xylocopa violacea)</option>
            <option value="Ceratina cyanea">Abeja de la madera (Ceratina cyanea)</option>
            <option value="Nomada spp.">Abejas cuco (Nomada spp.)</option>
            <option value="Osmia spp.">Abeja albañil (Osmia spp.)</option>
            <option value="Megachile spp.">Abeja corta hojas (Megachile spp.)</option>
            <option value="Andrena spp.">Abeja minadora (Andrena spp.)</option>
            <option value="Eucera spp.">Abeja de las orquídeas (Eucera spp.)</option>
          </select>
        </div>
          <!-- Contraseña -->
          <div class="register__form-group">
          <label for="password" class="register__label">Contraseña</label>
          <div class="register__password">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              class="register__input"
              :class="{ 'register__input--error': form.password && !validations.isPasswordValid }"
              placeholder="Crea una contraseña"
              required
            />
            <button
        type="button"
        class="register__toggle"
        @click="togglePasswordVisibility"
        :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
      >
        {{ showPassword ? '🙈' : '👁️' }}
      </button>
          </div>
          <p v-if="form.password && !validations.isPasswordValid" class="register__error">
            La contraseña debe tener al menos 8 caracteres
          </p>
        </div>

        <!-- Confirmar contraseña -->
        <div class="register__form-group">
          <label for="confirmPassword" class="register__label">Confirmar contraseña</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="confirmPassword"
            v-model="form.confirmPassword"
            class="register__input"
            :class="{ 'register__input--error': form.confirmPassword && !validations.doPasswordsMatch }"
            placeholder="Repite tu contraseña"
            required
          />
          <p v-if="form.confirmPassword && !validations.doPasswordsMatch" class="register__error">
            Las contraseñas no coinciden
          </p>
        </div>


        <!-- Mensaje de error -->
        <p v-if="errorMessage" class="register__error">{{ errorMessage }}</p>

        <!-- Botón de registro -->
        <button class="register__button" type="submit" :disabled="isLoading || !validations.isFormValid">
          {{ isLoading ? 'Registrando...' : 'Registrarse' }}
        </button>

        <!-- Enlace para iniciar sesión -->
        <p class="register__login">
          ¿Ya tienes una cuenta?
          <a href="#" class="register__link" @click.prevent="$emit('switchToLogin')">Inicia sesión aquí</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import provinciasData from '../assets/Provincias.json';
import municipiosData from '../assets/Municipios.json';

// Datos del formulario
const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  provincia: '',
  municipio: '',
  numColmenas: null,
  especieAbeja: 'Apis mellifera',
});

// Estados
const showPassword = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);
const router = useRouter();

// Datos de provincias y municipios
const provincias = ref([]);
const municipios = ref([]);

onMounted(() => {
  provincias.value = [...provinciasData].sort((a, b) => a.PROVINCIA.localeCompare(b.PROVINCIA, 'es'));
  municipios.value = [...municipiosData].sort((a, b) => a.NOMBRE.localeCompare(b.NOMBRE, 'es'));
});

// Filtrado de municipios
const filteredMunicipios = computed(() => {
  if (!form.value.provincia) return [];
  return municipios.value.filter((municipio) => municipio.PROVINCIA === form.value.provincia);
});

// Validaciones
const validations = computed(() => ({
  isEmailValid: /.+@.+\..+/.test(form.value.email),
  isPasswordValid: form.value.password.length >= 8,
  doPasswordsMatch: form.value.password === form.value.confirmPassword,
  isFormValid:
    form.value.name &&
    form.value.email &&
    form.value.password &&
    form.value.confirmPassword &&
    form.value.provincia &&
    validations.value.isEmailValid &&
    validations.value.isPasswordValid &&
    validations.value.doPasswordsMatch,
}));

// Funciones
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleProvinciaChange = () => {
  form.value.municipio = ''; // Resetear municipio al cambiar provincia
};

const handleRegister = async () => {
  errorMessage.value = '';
  if (!validations.value.isFormValid) {
    errorMessage.value = 'Por favor, completa todos los campos correctamente.';
    return;
  }

  isLoading.value = true;
  try {
    const usersResponse = await fetch('http://localhost:3000/users');
    const users = await usersResponse.json();
    const userExists = users.some((user) => user.email === form.value.email);

    if (userExists) {
      errorMessage.value = 'El correo electrónico ya está registrado.';
      return;
    }

    const newUser = { ...form.value };
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) throw new Error('Error al registrar el usuario.');

    // 🔹 Simular inicio de sesión guardando al usuario en localStorage
    localStorage.setItem('user', JSON.stringify(newUser));

    alert('✅ ¡Registro exitoso! Redirigiendo a tu perfil...');
    router.push('/profile');
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
  margin-top: calc(var(--space-xl) * 1.5);
  padding: var(--space-lg);
  background-color: var(--color-background);
}

.register__container {
  width: 100%;
  max-width: 28.125rem;
  background-color: var(--color-background);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  position: relative;
  transition: transform var(--transition-duration) ease, box-shadow var(--transition-duration) ease;
}

.register__container:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.register__header {
  text-align: center;
  padding: var(--space-xl) var(--space-md);
  background: linear-gradient(to right, var(--color-secondary), var(--color-accent));
  color: var(--color-text);
}

.register__title {
  margin: 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.5px;
}

.register__subtitle {
  margin: var(--space-xs) 0 0;
  font-size: var(--font-size-lg);
  opacity: 0.9;
  color: var(--color-text);
}

.register__form {
  padding: var(--space-xl) var(--space-lg);
}

.register__form-group {
  margin-bottom: var(--space-lg);
}

.register__label {
  display: block;
  margin-bottom: var(--space-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  font-size: var(--font-size-base);
}

.register__input {
  width: 100%;
  padding: var(--space-sm);
  border: 1px solid var(--color-secondary);
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
  color: var(--color-text);
  transition: border-color var(--transition-duration) ease, box-shadow var(--transition-duration) ease;
  background-color: var(--color-background);
}

.register__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(77, 108, 50, 0.1); /* Color primary con opacidad */
}

.register__input--error {
  border: 2px solid #e53e3e; /* Rojo para errores */
  background-color: #fff5f5; /* Fondo rojo claro */
}

.register__input--valid {
  border: 2px solid var(--color-primary);
  background-color: rgba(163, 213, 93, 0.1); /* Color tertiary con opacidad */
}

.register__password {
  position: relative;
}

.register__toggle {
  position: absolute;
  right: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  font-size: var(--font-size-lg);
  padding: var(--space-xs);
  transition: color var(--transition-duration) ease;
}

.register__toggle:hover {
  color: var(--color-primary);
}

.register__error {
  margin-top: var(--space-xs);
  font-size: var(--font-size-base);
  color: #e53e3e; /* Rojo para errores */
  text-align: left;
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
  transition: background-color var(--transition-duration) ease, transform 0.2s ease;
  font-size: var(--font-size-lg);
}

.register__button:hover {
  background-color: #3c5526; /* Un tono más oscuro de primary */
  transform: translateY(-2px);
}

.register__button:disabled {
  background-color: #cbd5e0; /* Gris para estado deshabilitado */
  cursor: not-allowed;
  transform: none;
}

.register__login {
  padding-top: var(--space-md);
  text-align: center;
  font-size: var(--font-size-base);
  color: var(--color-text);
}

.register__link {
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  transition: color var(--transition-duration) ease, text-decoration var(--transition-duration) ease;
}

.register__link:hover {
  text-decoration: underline;
  color: #3c5526; /* Un tono más oscuro de primary */
}

.register__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-background);
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 30rem) {
  .register {
    margin-top: var(--space-lg);
    padding: var(--space-md);
  }

  .register__container {
    border-radius: var(--border-radius);
  }

  .register__form {
    padding: var(--space-lg) var(--space-md);
  }

  .register__title {
    font-size: var(--font-size-lg);
  }

  .register__subtitle {
    font-size: var(--font-size-base);
  }
}
</style>