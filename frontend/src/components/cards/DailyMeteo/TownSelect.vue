<template>
    <div class="container__select">
    <div>
      <!-- Selector de provincias -->
      <label for="selectprovincia">Selecciona una provincia:</label>
      <select id="selectprovincia">
        <option
          v-for="provincia in provincias"
          :key="provincia.CP"
          :value="provincia.CP"
          @click="provinciaSelected = provincia.provincia"
        >
          {{ provincia.provincia }}
        </option>
      </select>
    </div>
  
    <div>
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
    </div>
  
    <!-- Prueba de que el municipio se selecciona bien -->
    <p>El municipio seleccionado es: {{ apiData.municipioSelected }}</p>
    <!-- <button @click="downloadDailyMeteoJSON">Descargar DailyMeteo.json</button> -->
     <button @click="resetMeteoData()">BOTON RESET METEODATA</button>
     <!-- <DailyMeteo2 /> -->
    </div>
  </template>
  
  
  
  <script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import provinciasData from "../../../assets/Provincias.json";
  import municipiosData from "../../../assets/Municipios.json";
  import { useAPIdata } from '@/stores/APIdata.js';
  
  const apiData = useAPIdata();
  
  const resetMeteoData = () => {
    apiData.reset();
  };
  
  //Constantes
  const provincias = ref([]);
  const municipios = ref([]);
  const provinciaSelected = ref(null);
  const municipioSelected = ref(null);
  const weatherData = ref(null);
  
  
  
  
  //Convertimos los json en arrays y los ordenamos alfabéticamente según el idioma ES
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
    };
  });
  
  // Filtramos los municipios en función de la provincia seleccionada
  const filteredMunicipios = computed(() => {
    if (!provinciaSelected.value) return [];
    return municipios.value.filter(
      (municipio) => municipio.provincia === provinciaSelected.value
    );
  });

  const muniSel = computed(() => {
  const selectedMunicipio = municipios.value.find(municipio => municipio.CP === municipioSelected.value);
  return selectedMunicipio ? selectedMunicipio.NOMBRE : '';
});
  
  // Función para que cuando se cambie la provincia se cambien los municipios
  const handleprovinciaChange = (event) => {
    provinciaSelected.value = event.target.value;
  };
  
  // Función para que cuando se cambie el municipio se ejectute la función que pide los datos a la API de AEMET
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
  background-color: var(--color-tertiary);
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