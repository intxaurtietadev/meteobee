<template>
  <div class="weather-container">
    <div class="selected-day">
      <h2>
        <span class="weather-emoji">{{ getWeatherIcon(selectedDay.condition) }}</span> 
        {{ getDayOfWeek(selectedDay.date) }}
      </h2>
      <div class="weather-info">
        <div class="weather-detail">
          <p class="temperature"><strong>Temperatura:</strong> {{ selectedDay.temp }}°C</p>
          <p class="condition"><strong>Condición:</strong> {{ selectedDay.condition }}</p>
        </div>
        <div class="weather-detail">
          <p class="precipitation"><strong>Precipitación:</strong> {{ selectedDay.precipitation }}%</p>
          <p class="snow"><strong>Cota de nieve:</strong> {{ selectedDay.snow }} mm</p>
        </div>
        <div class="weather-detail">
          <p class="speed"><strong>Viento:</strong> {{ selectedDay.wind }} km/h</p>
          <p class="uv"><strong>Indicé UV:</strong> {{ selectedDay.uv_index }}</p>
        </div>
      </div>
    </div>
    <div class="week-forecast">
      <div v-for="(day, index) in weekData" :key="index" class="day-card" @click="selectDay(day)">
        <span class="day-icon">{{ getWeatherIcon(getWeatherCondition(day)) }}</span>
        <p>{{ getDayOfWeek(day.date) }}</p>
        <p>{{ getAverageTemp(day) }}°C</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useAPIdata } from "@/stores/APIdata.js";

const apiData = useAPIdata();

// Define the selected day as a reactive reference with default values
const selectedDay = ref({
  date: new Date().toISOString().split('T')[0],
  temp: 22,
  condition: "'Soleado",
  precipitation: 0,
  snow: 0,
  wind: 5,
  uv_index: 4
});

// Function to determine weather condition based on precipitation probability
const getWeatherCondition = (day) => {
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
  
  const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  return days[date.getDay()];
};

// Function to select a day
const selectDay = (day) => {
  if (!day) return;
  
  selectedDay.value = {
    date: day.date,
    temp: getAverageTemp(day),
    condition: getWeatherCondition(day),
    precipitation: day.precipitation || 1,
    snow: day.snow || 0,
    wind: day.wind || 0,
    uv_index: day.uv_index || 0
  };
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

// Watch for any changes in the apiData store
watch(() => [
  apiData.meteoData0,
  apiData.meteoData1,
  apiData.meteoData2,
  apiData.meteoData3,
  apiData.meteoData4,
  apiData.meteoData5,
  apiData.meteoData6
], ([newData0]) => {
  if (newData0 && newData0.date) {
    selectDay(newData0);
  }
}, { deep: true, immediate: true });

// Watch for changes in the municipioSelected value 
watch(() => apiData.meteoData0, (newData) => {
  console.log("Weather data updated:", newData);
  if (newData && newData.date) {
    selectDay(newData);
  }
});

// Initialize on mount
onMounted(() => {
  // If we already have data in the store, select the first day
  if (apiData.meteoData0 && apiData.meteoData0.date) {
    selectDay(apiData.meteoData0);
  }
});
</script>

<style scoped>
.weather-container {
  text-align: center;
  background: linear-gradient(to right, #2c3e50, #4ca1af);
  color: white;
  padding: 20px;
  border-radius: 15px; 
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}
.selected-day {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.weather-info {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 15px;
}
.weather-detail {
  margin: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 8px;
}
.week-forecast {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}
.day-card {
  padding: 15px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 80px;
}
.day-card:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
}
.weather-emoji, .day-icon {
  font-size: 24px;
  margin-bottom: 5px;
  display: inline-block;
}
.day-icon {
  display: block;
  font-size: 32px;
  margin-bottom: 8px;
}
</style>