<template>
    <div v-if="hasData" class="daymeteoContainer" >
        <!-- <p>{{ apiData.municipioSelected }}</p> -->
         <span class="date">{{ formattedDate }}</span>
        <span class="day__icon">{{ getWeatherIcon(getWeatherCondition()) }} </span>
        
        <p><strong>Temperatura min/max: </strong>{{ meteoData.min_temp }}/{{ meteoData.max_temp }} ºC</p>
        <p><strong>Probabilidad de precipitación: </strong>{{ maxPrecipitation }} %</p>
        <p><strong>Humedad relativa min/max:</strong> {{ meteoData.min_humidity }}/{{ meteoData.max_humidity }} %</p>
        <p><strong>Cota de nieve: </strong>{{ meteoData.snow !== 0 ? meteoData.snow + ' m' : '-'}} </p>
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

// Get the highest precipitation value
const maxPrecipitation = computed(() => {
  if (!meteoData.value) return 0;

  const { precipitation06, precipitation12, precipitation18, precipitation24 } = meteoData.value;

  return Math.max(precipitation06, precipitation12, precipitation18, precipitation24);
});


// Get weather condition based on the average precipitation
const getWeatherCondition = () => {
  const precipitation = maxPrecipitation.value;
  
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
  width: 50%;
  text-align: center;
  margin: 0 auto;
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: transform 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  background-color: var(--color-box-background);
  margin-bottom: 20px;
}

.daymeteoContainer:hover {
  background: linear-gradient(to left, #446c97, #56c4d5);
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