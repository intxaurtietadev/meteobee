<template>
  <div class="weather-container">
    <div class="days-forecast">
      <div v-for="(day, index) in weekData" :key="index" class="day-card">
        <h2>
          <span class="weather-emoji">{{ getWeatherIcon(getWeatherCondition(day)) }}</span> 
          {{ getDayOfWeek(day.date) }}
        </h2>
        <div class="weather-info">
          <p class="temperature"><strong>Temperatura:</strong> {{ getAverageTemp(day) }}°C</p>
          <p class="condition"><strong>Condición:</strong> {{ getWeatherCondition(day) }}</p>
          <p class="precipitation"><strong>Precipitación:</strong> {{ day.precipitation || 0 }}%</p>
          <p class="snow"><strong>Cota de nieve:</strong> {{ day.snow || 0 }} m</p>
          <p class="speed"><strong>Viento:</strong> {{ day.wind || 0 }} km/h</p>
          <p class="uv"><strong>Indicé UV:</strong> {{ day.uv_index || 0 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useAPIdata } from "@/stores/APIdata.js";

const apiData = useAPIdata();

// Function to determine weather condition based on precipitation probability
const getWeatherCondition = (day) => {
  if (!day || day.precipitation === undefined) return 'Soleado';
  
  const precipitation = day.precipitation;
  
  if (precipitation === 0 || precipitation < 20) return 'Soleado';
  if (precipitation < 40) return 'Parcialmente nublado';
  if (precipitation < 60) return 'Nublado';
  if (precipitation < 80) return 'Lluvia ligera';
  return 'Lluvia';
};

// Computed property to transform meteoData into weekData format
const weekData = computed(() => {
  if (!apiData) return [];
  
  return [
    apiData.meteoData0,
    apiData.meteoData1,
    apiData.meteoData2,
    apiData.meteoData3,
    apiData.meteoData4,
    apiData.meteoData5,
    apiData.meteoData6
  ].filter(day => day && day.date); // Filter out any undefined data
});

// Function to get average temperature from min and max
const getAverageTemp = (day) => {
  if (!day || day.max_temp === undefined || day.min_temp === undefined) {
    return 'N/A';
  }
  return Math.round((day.max_temp + day.min_temp) / 2);
};

// Function to convert date to day of week
const getDayOfWeek = (dateString) => {
  if (!dateString) return 'Unknown';
  
  // Check if the date is already formatted as YYYY-MM-DD
  let date;
  if (typeof dateString === 'string' && dateString.includes('-')) {
    date = new Date(dateString);
  } else {
    // If it's a timestamp or different format, try to convert
    date = new Date(dateString);
  }
  
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return days[date.getDay()];
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

// Initialize on mount
onMounted(() => {
  console.log("Weather cards component mounted");
});
</script>

<style scoped>


.weather-container {
  text-align: center;
  color: white;
  padding: 20px;
  border-radius: 15px; 
  max-width: 2000px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.days-forecast {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.day-card {
  padding: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.day-card:hover {
  background: linear-gradient(to left, #446c97, #56c4d5);
  transform: scale(1.05);
}

.weather-info {
  margin-top: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
}

.weather-emoji {
  font-size: 24px;
  margin-right: 10px;
  display: inline-block;
}

h2 {
  margin-top: 0;
  margin-bottom: 10px;
}

p {
  margin: 8px 0;
}

@media (max-width: 480px) {
  .days-forecast {
    flex-direction: column;
    align-items: center;
  }

  .day-card {
    width: 90%;
    padding: 0.9375rem; /* 15px */
  }

  .weather-emoji {
    font-size: 1.25rem; /* 20px */
    margin-right: 0.5rem; /* 8px */
  }

  .weather-info {
    padding: 0.625rem; /* 10px */
  }

  h2 {
    font-size: 1.125rem; /* 18px */
  }

  p {
    font-size: 0.875rem; /* 14px */
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .days-forecast {
    flex-direction: column;
    align-items: center;
  }

  .day-card {
    width: 80%;
  }

  h2 {
    font-size: 1.25rem; /* 20px */
  }

  p {
    font-size: 0.9375rem; /* 15px */
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .days-forecast {
    flex-direction: column;
    align-items: center;
  }

  .day-card {
    width: 100%;
  }
}


</style>