<template>
    <div v-if="hasData" class="daymeteoContainer" >
        <div class="daymeteo__card">
            <p class="hours"><strong>00h - 06h</strong></p>
            <span class="day__icon">{{ getWeatherIcon(getWeatherCondition(meteoData.precipitation06)) }}</span>
            <p><strong>Temperatura: </strong>{{ meteoData.temp06 }} °C</p>
            <p><strong>Probabilidad de precipitación:</strong> {{ meteoData.precipitation06 }} %</p>
            <p><strong>Humedad:</strong> {{ meteoData.humidity06 }} %</p>
            <p><strong>Viento:</strong> {{ meteoData.wind06 }} km/h</p>
        </div>
        <div class="daymeteo__card">
            <p class="hours"><strong>06h - 12h</strong></p>
            <span class="day__icon">{{ getWeatherIcon(getWeatherCondition(meteoData.precipitation06)) }}</span>
            <p><strong>Temperatura:</strong> {{ meteoData.temp12 }} °C</p>
            <p><strong>Probabilidad de precipitación:</strong> {{ meteoData.precipitation12 }} %</p>
            <p><strong>Humedad:</strong> {{ meteoData.humidity12 }} %</p>
            <p><strong>Viento:</strong> {{ meteoData.wind12 }} km/h</p>
        </div>
        <div class="daymeteo__card">
            <p class="hours"><strong>12h - 18h</strong></p>
            <span class="day__icon">{{ getWeatherIcon(getWeatherCondition(meteoData.precipitation06)) }}</span>
            <p><strong>Temperatura:</strong> {{ meteoData.temp18 }} °C</p>
            <p><strong>Probabilidad de precipitación:</strong> {{ meteoData.precipitation18 }} %</p>
            <p><strong>Humedad:</strong> {{ meteoData.humidity18 }} %</p>
            <p><strong>Viento:</strong> {{ meteoData.wind18 }} km/h</p>
        </div>
        <div class="daymeteo__card">
            <p class="hours"><strong>18h - 24h</strong></p>
            <span class="day__icon">{{ getWeatherIcon(getWeatherCondition(meteoData.precipitation06)) }}</span>
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

// Function to determine weather condition
const getWeatherCondition = (precipitation) => {
    if (precipitation === 0 || precipitation < 20) return 'Soleado';
    if (precipitation < 40) return 'Parcialmente nublado';
    if (precipitation < 60) return 'Nublado';
    if (precipitation < 80) return 'Lluvia ligera';
    return 'Lluvia';
};

// Function to get weather icons
const getWeatherIcon = (condition) => {
  const iconMap = {
    'Soleado': '☀️',
    'Despejado': '☀️',
    'Parcialmente nublado': '⛅',
    'Nublado': '☁️',
    'Cubierto': '☁️',
    'Neblina': '🌫️',
    'Niebla': '🌫️',
    'Lluvia ligera': '🌦️',
    'Lluvia': '🌧️',
    'Lluvia fuerte': '⛈️',
    'Tormenta eléctrica': '⚡',
    'Nieve': '❄️',
    'Nieve ligera': '🌨️',
    'Nieve fuerte': '❄️',
    'Aguanieve': '🌨️',
    'Granizo': '🌨️',
    'Ventoso': '💨'
  };
  return iconMap[condition] || '🌤️';
};
 
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
  padding: 1rem;
  transition: transform 0.3s;
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

.daymeteo__card:hover {
  background: linear-gradient(to left, #446c97, #56c4d5);
  transform: scale(1.05);
}
.day__icon {   
  font-size: 2.5rem;
  margin-top: 0.5rem;
  display: inline-block;
}

.hours {
  font-size: 1.6rem;
}

.daymeteo__card:hover {
  transform: scale(1.05);
}
  </style>