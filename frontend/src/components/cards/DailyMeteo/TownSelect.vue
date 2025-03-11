<template>
    <div class="container__select">
      <span class="place">{{ apiData.muniSel || "Seleccione un municipio" }}, {{ apiData.provinciaSelected || "Seleccione una provincia" }}</span>
    <div>
      <!-- Province selector -->
      <label for="selectprovincia" >Selecciona una provincia:</label>
      <select id="selectprovincia" v-model="apiData.provinciaSelected" @change="handleprovinciaChange" >
        <option
          v-for="provincia in provincias"
          :key="provincia.CP"
          :value="provincia.provincia"
          @click="provinciaSelected = provincia.provincia"
          
        >
          {{ provincia.provincia }}
        </option>
      </select>
    </div>
  
    <div>
      <!-- Town selector -->
      <label for="selectMunicipio">Selecciona un municipio:</label>
      <select id="selectMunicipio" v-model="apiData.municipioSelected" @change="handleMunicipioChange">
        <option
          v-for="municipio in filteredMunicipios"
          :key="municipio.CP"
          :value="municipio.CP"
        >
          {{ municipio.NOMBRE }}
        </option>
      </select>
    </div>
  
    <!-- Test to verify if the municipality is selected correctly -->
    <!-- <p>El municipio seleccionado es: {{ apiData.municipioSelected }}</p> -->
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
  const meteoData = computed(() => apiData.meteoData0);
  
  // Reset weather data
  const resetMeteoData = () => {
    apiData.reset();
  };

  
  //Constants
  const provincias = ref([]);
  const municipios = ref([]);
  const provinciaSelected = ref(null);
  const municipioSelected = ref(apiData.municipioSelected || null);
  const weatherData = ref(null);
  
  
  
  
  // Convert JSON into arrays and sort them alphabetically in Spanish
  onMounted(() => {
    provincias.value = [...provinciasData].sort((a, b) =>
      a.provincia.localeCompare(b.provincia, "es")
    );
    municipios.value = [...municipiosData].sort((a, b) =>
      a.NOMBRE.localeCompare(b.NOMBRE, "es")
    );
    // Retrieve saved weather data from localStorage
    const savedData = localStorage.getItem("DailyMeteo");
    if (savedData) {
      weatherData.value = JSON.parse(savedData);
    };
  });
  
 // Filter municipalities based on the selected province
  const filteredMunicipios = computed(() => {
    if (!provinciaSelected.value) return [];
    return municipios.value.filter(
      (municipio) => municipio.provincia === provinciaSelected.value
    );
  });

// Computed property to store the name of the selected municipality
const municipioNombre = computed(() => {
  const selectedMunicipio = municipios.value.find(municipio => municipio.CP === apiData.municipioSelected);
  return selectedMunicipio ? selectedMunicipio.NOMBRE : '';
});


// Function to handle province change and reset municipality selection
const handleprovinciaChange = (event) => {
  provinciaSelected.value = event.target.value;
  apiData.muniSel = ''; // Limpiamos el nombre del municipio cuando cambia la provincia
  apiData.municipioSelected = null; // También puedes resetear el municipio seleccionado
};

// Function to handle municipality change and update the store with the municipality name
const handleMunicipioChange = (event) => {
  const selectedCP = event.target.value;
  apiData.municipioSelected = selectedCP; // Store the CP (postal code) for fetching data
  apiData.muniSel = municipioNombre.value; // Store the name of the municipality in the store
};


// Watcher to fetch weather data whenever the selected municipality changes
  watch(() => apiData.municipioSelected, (newValue) => {
  console.log(newValue);
  if (newValue) {
    apiData.fetchWeatherData(newValue);
  }
});




  
  
  
  //Esta función pide los datos del municipio seleccionado a la API de AEMET y los guarda en localStorage
  // const fetchWeatherData = async (codigoMunicipio) => {
  //   weatherData.value = "Cargando...";
  
  //   try {
  //     const url = `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${codigoMunicipio}?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZ20ubmVyZWFAZ21haWwuY29tIiwianRpIjoiNTZjZDU1NTEtMjJhOS00Yzk0LWE1NDAtMTdmZDkxZjY5OGYyIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE3NDAwNTYwMTMsInVzZXJJZCI6IjU2Y2Q1NTUxLTIyYTktNGM5NC1hNTQwLTE3ZmQ5MWY2OThmMiIsInJvbGUiOiIifQ.Zw95iuaxZ6Ggso8KFtFURogSvIT17uCbKXlHsVtScKc`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  
  //     if (data.estado === 200 && data.datos) {
  //       // Hacemos una segunda petición a la URL de "datos"
  //       const weatherResponse = await fetch(data.datos);
  //       const weatherJson = await weatherResponse.json();
  
  //       // Guardamos los datos en localStorage
  //       localStorage.setItem("DailyMeteo", JSON.stringify(weatherJson));
  
  //       // Actualizamos la variable reactiva para mostrar los datos en la UI
  //       weatherData.value = weatherJson;
  //     } else {
  //       weatherData.value = "No se encontraron datos.";
  //     }
  //   } catch (error) {
  //     weatherData.value = "Error al obtener datos.";
  //     console.error(error);
  //   }
  // };
  
  // const downloadDailyMeteoJSON = () => {
  //   // Obtener los datos de localStorage
  //   const dailyMeteoData = localStorage.getItem("DailyMeteo");
  
  //   if (!dailyMeteoData) {
  //     alert("No hay datos en localStorage.");
  //     return;
  //   }
  
  //   // Crear un blob con los datos en formato JSON
  //   const blob = new Blob([dailyMeteoData], { type: "application/json" });
  
  //   // Crear un enlace temporal para la descarga
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "DailyMeteo.json"; // Nombre del archivo a descargar
  //   document.body.appendChild(a);
  //   a.click();
  
  //   // Limpiar el objeto URL y eliminar el enlace temporal
  //   URL.revokeObjectURL(url);
  //   document.body.removeChild(a);
  // };
  
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
  padding: var(--space-sm);
  transition: transform var(--transition-duration);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
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
    padding: var(--space-xs);
    margin: var(--space-xs) 0;
    border-radius: var(--border-radius);
    border: none;
    background: var(--color-light);
    color: black;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
    cursor: pointer;
    transition: background var(--transition-duration);
  }
  
  .container__select:hover{
    background: linear-gradient(to right, #446c97, #56c4d5);
  }
  label {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
    display: block;
    margin-bottom: var(--space-xs);
  }
  
  .place {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-md);
  }
  
  
  </style>