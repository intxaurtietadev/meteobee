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

        <!-- Nuevos campos -->
        <div class="register__form-group">
          <label for="colmenas" class="register__label">Número de colmenas</label>
          <input
            type="number"
            id="colmenas"
            v-model.number="colmenas"
            class="register__input"
            placeholder="0"
            required
          />
        </div>

        <div class="register__form-group">
          <label class="register__label">Especies detectadas</label>
          <div v-for="species in beeSpecies" :key="species.value">
            <input
              type="checkbox"
              :value="species.value"
              v-model="selectedSpecies"
              class="register__checkbox"
            />
            <label class="register__checkbox-label">{{ species.label }}</label>
          </div>
        </div>

        <div class="register__form-group">
          <label for="selectprovincia">Selecciona una provincia:</label>
    <select id="selectprovincia">
      <option
        v-for="provincia in provinces"
        :key="provincia.CP"
        :value="provincia.CP"
        @click="selectedProvince = provincia.provincia"
      >
        {{ provincia.provincia }}
      </option>
    </select>
        </div>

        <div class="register__form-group">
          <label for="selectMunicipio">Selecciona un municipio:</label>
          <select 
  id="selectMunicipio" 
  v-model="selectedMunicipality" 
  :disabled="!selectedProvince" 
  required
>
  <option value="">Selecciona municipio</option>
  <option 
    v-for="municipio in filteredMunicipalities" 
    :key="municipio.CP" 
    :value="municipio.NOMBRE" 
  >
    {{ municipio.NOMBRE }}
  </option>
</select>
        </div>

        <p v-if="errorMessage" class="register__error">{{ errorMessage }}</p>

        <button
          class="register__button"
          type="submit"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Registrando...' : 'Registrarse' }}
        </button>

        <p class="register__login">
          ¿Ya tienes una cuenta? 
          <a 
            href="#" 
            class="register__link" 
            @click.prevent="$emit('switchToLogin')"
          >
            Inicia sesión aquí
          </a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Datos del formulario
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const colmenas = ref(0);
const selectedSpecies = ref([]);
const provinces = ref([]);
const municipalities = ref([]);
const selectedProvince = ref('');
const selectedMunicipality = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

// Especies de abejas
const beeSpecies = ref([
  { label: 'Abeja europea o de la miel (Apis mellifera)', value: 'Apis mellifera' },
  { label: 'Abeja carpintera (Xylocopa violacea)', value: 'Xylocopa violacea' },
  { label: 'Abeja de la madera (Ceratina cyanea)', value: 'Ceratina cyanea' },
  { label: 'Abejas cuco (Nomada spp.)', value: 'Nomada spp.' },
  { label: 'Abeja albañil (Osmia spp.)', value: 'Osmia spp.' },
  { label: 'Abeja corta hojas (Megachile spp.)', value: 'Megachile spp.' },
  { label: 'Abeja minadora (Andrena spp.)', value: 'Andrena spp.' },
  { label: 'Abeja de las orquídeas (Eucera spp.)', value: 'Eucera spp.' }
]);

// Cargar datos desde JSON
onMounted(async () => {
  try {
    // Asegúrate de que los JSON estén en la carpeta public/assets
    const provincesResponse = await fetch('/Provincias.json');
    provinces.value = await provincesResponse.json();

    const municipalitiesResponse = await fetch('/Municipios.json');
    municipalities.value = await municipalitiesResponse.json();
  } catch (error) {
    console.error('Error al cargar datos:', error);
    errorMessage.value = 'No se pudieron cargar los datos. Inténtalo más tarde.';
  }
});


// Municipios filtrados por provincia
const filteredMunicipalities = computed(() => {
  if (!selectedProvince.value) return [];
  
  // Encuentra el CP de la provincia seleccionada
  const selectedProvinceCP = provinces.value.find(p => 
    p.provincia === selectedProvince.value
  )?.CP.toString() || '';
  
  return municipalities.value.filter(m => 
    m.provincia === selectedProvince.value && 
    m.CP.startsWith(selectedProvinceCP)
  );
});

const handleRegister = async () => {
  errorMessage.value = '';
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden.';
    return;
  }

  // Encuentra el municipio seleccionado
  const selectedMunicipio = municipalities.value.find(m => 
    m.NOMBRE === selectedMunicipality.value
  );

  if (!selectedMunicipio) {
    errorMessage.value = 'Municipio no encontrado.';
    return;
  }

  const newUser = {
    name: name.value,
    email: email.value,
    password: password.value,
    colmenas: colmenas.value,
    species: selectedSpecies.value,
    province: selectedProvince.value, // Nombre de la provincia
    municipality: selectedMunicipality.value, // Nombre del municipio
    CP: selectedMunicipio.CP // CP del municipio
  };

  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json' // Asegura que el backend entienda JSON
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message || 'Error desconocido'}`);
    }

    alert('✅ ¡Registro exitoso!');
    router.push('/login');
  } catch (error) {
    errorMessage.value = error.message;
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
margin-top: 10rem;
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
  margin: var(--space-xs) 0;
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

.register__checkbox {
  margin-right: 0.5rem;
  vertical-align: middle;
}

.register__checkbox-label {
  display: inline-block;
  margin-bottom: 0.5rem;
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

.register__login {
  padding-top: var(--space-md);
  text-align: center;
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