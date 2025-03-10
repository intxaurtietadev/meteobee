<template>
  <div class="container__select">
    <!-- Selector de provincias -->
    <label for="selectprovincia">Selecciona una provincia:</label>
    <select id="selectprovincia" v-model="apiData.provinciaSelected">
      <option
        v-for="provincia in provincias"
        :key="provincia.CP"
        :value="provincia.provincia"
      >
        {{ provincia.provincia }}
      </option>
    </select>

    <!-- Selector de municipios -->
    <label for="selectMunicipio">Selecciona un municipio:</label>
    <select id="selectMunicipio" v-model="apiData.municipioSelected">
      <option
        v-for="municipio in filteredMunicipios"
        :key="municipio.CP"
        :value="municipio.CP"
      >
        {{ municipio.NOMBRE }}
      </option>
    </select>

    <!-- Prueba de que el municipio se selecciona bien -->
    <p>El municipio seleccionado es: {{ apiData.municipioSelected }}</p>
    <button @click="resetMeteoData()">BOTON RESET METEODATA</button>
  </div>
</template>
  
  
  
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import provinciasData from "../../../assets/Provincias.json";
import municipiosData from "../../../assets/Municipios.json";
import { useAPIdata } from '@/stores/APIdata.js';

const apiData = useAPIdata();

// Función para resetear los datos meteorológicos
const resetMeteoData = () => {
  apiData.reset();
};

// Constantes
const provincias = ref([]);
const municipios = ref([]);

// Convertimos los JSON en arrays y los ordenamos alfabéticamente según el idioma ES
onMounted(() => {
  provincias.value = [...provinciasData].sort((a, b) =>
    a.provincia.localeCompare(b.provincia, "es")
  );
  municipios.value = [...municipiosData].sort((a, b) =>
    a.NOMBRE.localeCompare(b.NOMBRE, "es")
  );

  // Obtenemos los datos guardados en localStorage
  const savedData = localStorage.getItem("DailyMeteo");
  if (savedData) {
    weatherData.value = JSON.parse(savedData);
  }
});

// Filtramos los municipios en función de la provincia seleccionada
const filteredMunicipios = computed(() => {
  if (!apiData.provinciaSelected) return [];
  return municipios.value.filter(
    (municipio) => municipio.provincia === apiData.provinciaSelected
  );
});

// Función para que cuando se cambie el municipio se ejecute la función que pide los datos a la API de AEMET
watch(() => apiData.municipioSelected, async (newValue) => {
  if (newValue) {
    await apiData.fetchWeatherData(newValue);
  }
});
</script>
  

  <style scoped>
  .daily-meteo {
  text-align: center;
  }
  /* Main container */
  .container__select {
  width: 40%;
  text-align: center;
  margin: 0 auto;
  padding: 1rem;
  transition: transform 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--color-text);
  background-color: var(--color-box-background);
  border-radius: var(--border-radius);
  margin-bottom: 20px;
  box-shadow: var(--box-shadow);
  }
  
  .container__select:hover {
  transform: scale(1.05);
}
  
  /* Select */
  select {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    border: none;
    background: rgba(255, 255, 255, 0.3);
    color: black;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  select:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  
  label {
    font-size: 18px;
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
  

  </style>