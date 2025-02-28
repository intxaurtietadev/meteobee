<template>
    <div v-if="hasData" class="daymeteoContainer" >
        <p>{{ meteoData.date }}</p>
        <p><strong>Temperatura máx/min: </strong>{{ meteoData.min_temp }}/{{ meteoData.max_temp }} ºC</p>
        <p><strong>Humedad relativa(%):</strong> {{ meteoData.min_humidity }}/{{ meteoData.max_humidity }}</p>
        <p><strong>Cota de nieve: </strong>{{ meteoData.snow }} m</p>
        <p><strong>Índice UV: </strong>{{ meteoData.uv_index }}</p>
        <div class="daymeteo__card">
            <p><strong>00h - 06h</strong></p>
            <p><strong>Temperatura: </strong>{{ meteoData.temp06 }} °C</p>
            <p><strong>Probabilidad de precipitación:</strong> {{ meteoData.precipitation06 }} %</p>
            <p><strong>Humedad:</strong> {{ meteoData.humidity06 }} %</p>
            <p><strong>Viento:</strong> {{ meteoData.wind06 }} km/h</p>
        </div>
        <div class="daymeteo__card">
            <p><strong>06h - 12h</strong></p>
            <p><strong>Temperatura:</strong> {{ meteoData.temp12 }} °C</p>
            <p><strong>Probabilidad de precipitación:</strong> {{ meteoData.precipitation12 }} %</p>
            <p><strong>Humedad:</strong> {{ meteoData.humidity12 }} %</p>
            <p><strong>Viento:</strong> {{ meteoData.wind12 }} km/h</p>
        </div>
        <div class="daymeteo__card">
            <p><strong>12h - 18h</strong></p>
            <p><strong>Temperatura:</strong> {{ meteoData.temp18 }} °C</p>
            <p><strong>Probabilidad de precipitación:</strong> {{ meteoData.precipitation18 }} %</p>
            <p><strong>Humedad:</strong> {{ meteoData.humidity18 }} %</p>
            <p><strong>Viento:</strong> {{ meteoData.wind18 }} km/h</p>
        </div>
        <div class="daymeteo__card">
            <p><strong>18h - 24h</strong></p>
            <p><strong>Temperatura:</strong> {{ meteoData.temp24 }} °C</p>
            <p><strong>Probabilidad de precipitación:</strong> {{ meteoData.precipitation24 }} %</p>
            <p><strong>Humedad:</strong> {{ meteoData.humidity24 }} %</p>
            <p><strong>Viento:</strong> {{ meteoData.wind24 }} km/h</p>
        </div>
        
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