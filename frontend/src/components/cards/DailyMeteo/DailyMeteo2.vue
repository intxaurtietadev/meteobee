<template>
    <div v-if="hasData" class="daymeteoContainer" >
        <p>{{ apiData.municipioSelected }}</p>
        <p>{{ meteoData.date }}</p>
        <p><strong>Temperatura min/max: </strong>{{ meteoData.min_temp }}/{{ meteoData.max_temp }} ºC</p>
        <p><strong>Humedad relativa min/max:</strong> {{ meteoData.min_humidity }}/{{ meteoData.max_humidity }} %</p>
        <p><strong>Cota de nieve: </strong>{{ meteoData.snow }} m</p>
        <p><strong>Índice UV: </strong>{{ meteoData.uv_index }}</p>
    
      </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { useAPIdata } from '@/stores/APIdata.js';
  
  const apiData = useAPIdata();
  const meteoData = computed(() => apiData.meteoData0);

  //Check if meteoData has a value
  const hasData = computed(() => {
  if (!meteoData.value) return false; 

  //Check if any value is different from 0
  return Object.values(meteoData.value).some(value => value !== 0);
});
 
  </script>
  
  <style scoped>
  .daymeteoContainer {
    width: 50%;
    text-align: center;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.daymeteo__card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}
  </style>