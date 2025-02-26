<template>
  <div>
    <!-- Selector de provincias -->
    <label for="selectProvincia">Selecciona una provincia:</label>
    <select id="selectProvincia">
      <option
        v-for="provincia in provincias"
        :key="provincia.CP"
        :value="provincia.CP"
        @click="provinciaSelected = provincia.PROVINCIA"
      >
        {{ provincia.PROVINCIA }}
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
const result = ref(null);
const response = ref(null);

const weatherData = ref(null);




// const fetchData = async () => {
//   try {
//     const proxyUrl = "https://cors-anywhere.herokuapp.com/";
//     const apiUrl = `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${encodeURIComponent(municipioSelected.value)}?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZ20ubmVyZWFAZ21haWwuY29tIiwianRpIjoiNTZjZDU1NTEtMjJhOS00Yzk0LWE1NDAtMTdmZDkxZjY5OGYyIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE3NDAwNTYwMTMsInVzZXJJZCI6IjU2Y2Q1NTUxLTIyYTktNGM5NC1hNTQwLTE3ZmQ5MWY2OThmMiIsInJvbGUiOiIifQ.Zw95iuaxZ6Ggso8KFtFURogSvIT17uCbKXlHsVtScKc`;
    
//     const response = await fetch(proxyUrl + apiUrl);
//     const data = await response.json();
//     result.value = data;
//   } catch (error) {
//     console.error("Error al obtener datos:", error);
//   }
// };




//Convertimos los json en arrays y los ordenamos alfabéticamente según el idioma ES
onMounted(() => {
  provincias.value = [...provinciasData].sort((a, b) =>
    a.PROVINCIA.localeCompare(b.PROVINCIA, "es")
  );
  municipios.value = [...municipiosData].sort((a, b) =>
    a.NOMBRE.localeCompare(b.NOMBRE, "es")
  );
});

// Filtramos los municipios en función de la provincia seleccionada
const filteredMunicipios = computed(() => {
  if (!provinciaSelected.value) return [];
  return municipios.value.filter(
    (municipio) => municipio.PROVINCIA === provinciaSelected.value
  );
});

// Función para que cuando se cambie la provincia se cambien los municipios
const handleProvinciaChange = (event) => {
  provinciaSelected.value = event.target.value;
};

watch(municipioSelected, async (newValue) => {
  if (newValue) {
    await fetchWeatherData(newValue);
  }
});


// Función para obtener el clima de AEMET
const fetchWeatherData = async (codigoMunicipio) => {
  weatherData.value = "Cargando...";

  try {
    const url = `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${codigoMunicipio}?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZ20ubmVyZWFAZ21haWwuY29tIiwianRpIjoiNTZjZDU1NTEtMjJhOS00Yzk0LWE1NDAtMTdmZDkxZjY5OGYyIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE3NDAwNTYwMTMsInVzZXJJZCI6IjU2Y2Q1NTUxLTIyYTktNGM5NC1hNTQwLTE3ZmQ5MWY2OThmMiIsInJvbGUiOiIifQ.Zw95iuaxZ6Ggso8KFtFURogSvIT17uCbKXlHsVtScKc`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.datos) {
      const weatherResponse = await fetch(data.datos);
      weatherData.value = await weatherResponse.json();
    } else {
      weatherData.value = "No se encontraron datos.";
    }
  } catch (error) {
    weatherData.value = "Error al obtener datos.";
    console.error(error);
  }
};


</script>



<style scoped>
.daily-meteo {
  text-align: center;
}
</style>