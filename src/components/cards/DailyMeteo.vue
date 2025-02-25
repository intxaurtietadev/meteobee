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
import { ref, computed, onMounted } from "vue";
import provinciasData from "../../assets/Provincias.json";
import municipiosData from "../../assets/Municipios.json";

//Constantes
const provincias = ref([]);
const municipios = ref([]);
const provinciaSelected = ref(null);
const municipioSelected = ref(null);

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
</script>



<style scoped>
.daily-meteo {
  text-align: center;
}
</style>