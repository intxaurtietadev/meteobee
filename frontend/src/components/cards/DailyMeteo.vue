<template>
  <div>
    <!-- Selector for provinces -->
    <label for="selectProvince" >Selecciona una provincia:</label>
    <select id="selectProvince">
      <option
        v-for="province in provinces"
        :key="province.CP"
        :value="province.CP"
        @click="selectedProvince = province.province"
      >
        {{ province.province }}
      </option>
    </select>
  </div>

  <div>
    <!-- Selector for municipalitys -->
    <label for="selectMunicipality">Selecciona un municipio:</label>
    <select id="selectMunicipality" v-model="selectedMunicipality">
      <option
        v-for="municipality in filteredMunicipalitys"
        :key="municipality.CP"
        :value="municipality.CP"
      >
        {{ municipality.NAME }}
      </option>
    </select>
  </div>

  <!-- Test that municipality is correct -->
  <p>El municipio seleccionado es: {{ selectedMunicipality }}</p>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import provincesData from "../../assets/Provinces.json";
import municipalitysData from "../../assets/Municipalitys.json";

//Constats
const provinces = ref([]);
const municipalitys = ref([]);
const selectedProvince = ref(null);
const selectedMunicipality = ref(null);

//We convert the json into arrays and sort them alphabetically according to language ES
onMounted(() => {
  provinces.value = [...provincesData].sort((a, b) =>
    a.province.localeCompare(b.province, "es")
  );
  municipalitys.value = [...municipalitysData].sort((a, b) =>
    a.NAME.localeCompare(b.NAME, "es")
  );
});

// We filter the minicipalitys according the selected province
const filteredMunicipalitys = computed(() => {
  if (!selectedProvince.value) return [];
  return municipalitys.value.filter(
    (municipality) => municipality.province === selectedProvince.value
  );
});

// This is for the monicipalitiys to be changed everytime the province is changed
const handleProvinceChange = (event) => {
  selectedProvince.value = event.target.value;
};
</script>



<style scoped>
.daily-meteo {
  text-align: center;
}
</style>