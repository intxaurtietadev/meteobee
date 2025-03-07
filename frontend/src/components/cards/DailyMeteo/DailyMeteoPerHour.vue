<template>
    <div v-if="hasData" class="daymeteoContainer" >
        <div class="daymeteo__card">
            <p class="hours"><strong>00h - 06h</strong></p>
            <p><strong>Temperatura: </strong>{{ meteoData.temp06 }} °C</p>
            <p><strong>Probabilidad de precipitación:</strong> {{ meteoData.precipitation06 }} %</p>
            <p><strong>Humedad:</strong> {{ meteoData.humidity06 }} %</p>
            <p><strong>Viento:</strong> {{ meteoData.wind06 }} km/h</p>
        </div>
        <div class="daymeteo__card">
            <p class="hours"><strong>06h - 12h</strong></p>
            <p><strong>Temperatura:</strong> {{ meteoData.temp12 }} °C</p>
            <p><strong>Probabilidad de precipitación:</strong> {{ meteoData.precipitation12 }} %</p>
            <p><strong>Humedad:</strong> {{ meteoData.humidity12 }} %</p>
            <p><strong>Viento:</strong> {{ meteoData.wind12 }} km/h</p>
        </div>
        <div class="daymeteo__card">
            <p class="hours"><strong>12h - 18h</strong></p>
            <p><strong>Temperatura:</strong> {{ meteoData.temp18 }} °C</p>
            <p><strong>Probabilidad de precipitación:</strong> {{ meteoData.precipitation18 }} %</p>
            <p><strong>Humedad:</strong> {{ meteoData.humidity18 }} %</p>
            <p><strong>Viento:</strong> {{ meteoData.wind18 }} km/h</p>
        </div>
        <div class="daymeteo__card">
            <p class="hours"><strong>18h - 24h</strong></p>
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
  gap: var(--space-md);
}
.daymeteo__card {
    height: 50%;
    text-align: center;
    margin: 0 auto;
  padding: var(--space-sm);
  transition: transform var(--transition-duration);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--color-text);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius);
  margin-bottom: var(--space-xs);
  box-shadow: var(--box-shadow);
}

.daymeteo__card:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
}

.hours {
  font-size: var(--font-size-xl);
}

.daymeteo__card:hover {
  transform: scale(1.05);
}
  </style>