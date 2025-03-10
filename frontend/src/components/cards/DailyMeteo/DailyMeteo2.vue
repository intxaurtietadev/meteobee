<template>
    <div v-if="hasData" class="daymeteoContainer" >
        <!-- <p>{{ apiData.municipioSelected }}</p> -->
         <span class="date">{{ formattedDate }}</span>
        <span class="day__icon">{{ getWeatherIcon(getWeatherCondition()) }} </span>
        
        <p><strong>Temperatura min/max: </strong>{{ meteoData.min_temp }}/{{ meteoData.max_temp }} ºC</p>
        <p><strong>Probabilidad de precipitación: </strong>{{ meteoData.precipitation }} %</p>
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

// Format the date
const formattedDate = computed(() => {
  if (!meteoData.value.date) return "";

  // Convert the date string into a Date object
  const date1 = new Date(meteoData.value.date);

  //  Options for the date format
  const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };

  // Get the formatted date
    const formatted = date1.toLocaleDateString("es-ES", options);

  // Capitalize the first letter and return the formatted date
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
});

const getWeatherCondition = () => {
  const precipitation = meteoData.value.precipitation;
  
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
    'Lluvia ligera': '🌦️',
    'Lluvia': '🌧️',
  };
  return iconMap[condition] || '🌤️';
};

 
  </script>
  
  <style scoped>
  .daymeteoContainer {
    width: 50%;
    text-align: center;
    margin: 0 auto;
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--color-text);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.daymeteoContainerg:hover {
  transform: scale(1.05);
}

.day__icon {   
  font-size: 2.5rem;
  margin-top: var(--space-xs);
  display: inline-block;
}

.date {
  font-size: var(--font-size-xl);
  font-weight: bold;
}
  </style>