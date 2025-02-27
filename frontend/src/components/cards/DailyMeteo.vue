<template>
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
    <select id="selectMunicipio" v-model="municipioSelected">
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
  <p>El municipio seleccionado es: {{ municipioSelected }}</p>
  <button @click="downloadDailyMeteoJSON">Descargar DailyMeteo.json</button>
</template>



<script setup>
import { ref, computed, onMounted, watch } from "vue";
import provinciasData from "../../assets/Provincias.json";
import municipiosData from "../../assets/Municipios.json";

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

// Función para que cuando se cambie la provincia se cambien los municipios
const handleprovinciaChange = (event) => {
  provinciaSelected.value = event.target.value;
};

// Función para que cuando se cambie el municipio se ejectute la función que pide los datos a la API de AEMET
watch(municipioSelected, async (newValue) => {
  if (newValue) {
    await fetchWeatherData(newValue);
  }
});



//Esta función pide los datos del municipio seleccionado a la API de AEMET y los guarda en localStorage
const fetchWeatherData = async (codigoMunicipio) => {
  weatherData.value = "Cargando...";

  try {
    const url = `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${codigoMunicipio}?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZ20ubmVyZWFAZ21haWwuY29tIiwianRpIjoiNTZjZDU1NTEtMjJhOS00Yzk0LWE1NDAtMTdmZDkxZjY5OGYyIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE3NDAwNTYwMTMsInVzZXJJZCI6IjU2Y2Q1NTUxLTIyYTktNGM5NC1hNTQwLTE3ZmQ5MWY2OThmMiIsInJvbGUiOiIifQ.Zw95iuaxZ6Ggso8KFtFURogSvIT17uCbKXlHsVtScKc`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.estado === 200 && data.datos) {
      // Hacemos una segunda petición a la URL de "datos"
      const weatherResponse = await fetch(data.datos);
      const weatherJson = await weatherResponse.json();

      // Guardamos los datos en localStorage
      localStorage.setItem("DailyMeteo", JSON.stringify(weatherJson));

      // Actualizamos la variable reactiva para mostrar los datos en la UI
      weatherData.value = weatherJson;
    } else {
      weatherData.value = "No se encontraron datos.";
    }
  } catch (error) {
    weatherData.value = "Error al obtener datos.";
    console.error(error);
  }
};

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
</style>