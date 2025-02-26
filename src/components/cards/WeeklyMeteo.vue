<template>
   <div class="weather-container">
    <div class="selected-day">
      <h2>
        <span class="weather-emoji">{{ getWeatherIcon(selectedDay.condition) }}</span> 
        {{ selectedDay.day }}
      </h2>
      <div class="weather-info">
        <div class="weather-detail">
          <p class="temperature"><strong>Temperature:</strong> {{ selectedDay.temp }}°C</p>
          <p class="condition"><strong>Condition:</strong> {{ selectedDay.condition }}</p>
        </div>
        <div class="weather-detail">
          <p class="precipitation"><strong>Precipitation:</strong> {{ selectedDay.precipitation }}%</p>
          <p class="snow"><strong>Snow:</strong> {{ selectedDay.snow }} mm</p>
        </div>
        <div class="weather-detail">
          <p class="speed"><strong>Wind Speed:</strong> {{ selectedDay.wind }} km/h</p>
          <p class="uv"><strong>UV Index:</strong> {{ selectedDay.uv_index }}</p>
        </div>
      </div>
    </div>
    <div class="week-forecast">
      <div v-for="(day, index) in weekData" :key="index" class="day-card" @click="selectDay(day)">
        <span class="day-icon">{{ getWeatherIcon(day.condition) }}</span>
        <p>{{ day.day }}</p>
        <p>{{ day.temp }}°C</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Define the selected day as a reactive reference
const selectedDay = ref({
  day: "Monday",
  temp: 22,
  condition: "Sunny",
  precipitation: 0,
  snow: 0,
  wind: 5,
  uv_index: 4
});

// Define the week data
const weekData = ref([
  { day: 'Monday', temp: 22, condition: 'Cloudy', precipitation: 10, snow: 0, wind: 5, uv_index: 4 },
  { day: 'Tuesday', temp: 18, condition: 'Rainy', precipitation: 80, snow: 0, wind: 8, uv_index: 2 },
  { day: 'Wednesday', temp: 15, condition: 'Partly Cloudy', precipitation: 20, snow: 0, wind: 6, uv_index: 3 },
  { day: 'Thursday', temp: 16, condition: 'Sunny', precipitation: 0, snow: 0, wind: 3, uv_index: 6 },
  { day: 'Friday', temp: 20, condition: 'Partly Cloudy', precipitation: 30, snow: 0, wind: 7, uv_index: 4 },
  { day: 'Saturday', temp: 17, condition: 'Cloudy', precipitation: 40, snow: 0, wind: 5, uv_index: 3 },
  { day: 'Sunday', temp: 12, condition: 'Cloudy', precipitation: 60, snow: 0, wind: 10, uv_index: 2 },
]);

// Function to select a day
const selectDay = (day) => {
  selectedDay.value = day;
};

// Function to get weather icons
const getWeatherIcon = (condition) => {
  const iconMap = {
    'Sunny': '☀️',
    'Clear': '☀️',
    'Partly Cloudy': '⛅',
    'Cloudy': '☁️',
    'Overcast': '☁️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Light Rain': '🌦️',
    'Rain': '🌧️',
    'Heavy Rain': '⛈️',
    'Thunderstorm': '⚡',
    'Snow': '❄️',
    'Light Snow': '🌨️',
    'Heavy Snow': '❄️',
    'Sleet': '🌨️',
    'Hail': '🌨️',
    'Windy': '💨'
  };
  return iconMap[condition] || '🌤️';
};
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