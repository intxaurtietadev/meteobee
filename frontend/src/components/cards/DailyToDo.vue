<template>
  <div class="daily__advice">
      <!-- <img v-if="img" :src="img" alt="Card image" class="card-img" /> -->
      <h3 class="card-title">Recomendaciones diarias</h3>
      <!-- <p class="card-description">{{ description }}</p> -->
      <div class="daily__advice__p" v-if="advice">
        <h4>Precipitaciones:</h4> <span>{{ advice.precipitation }}</span>
        <h4>Nieve:</h4> <span>{{ advice.snow }}</span>
        <h4>Temperatura:</h4> <span>{{ advice.temp }} </span>
        <h4>Humedad:</h4> <span>{{ advice.humidity }}</span>
        <h4>Viento:</h4> <span>{{ advice.wind }}</span>
        <h4>Índice UV:</h4> <span>{{ advice.uv_index }}</span>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useAPIdata } from '@/stores/APIdata.js';

const apiData = useAPIdata();
const meteoData = computed(() => apiData.meteoData0);

// Advice object to store the received advice
const advice = ref({
  precipitation: '',
  snow: '',
  temp: '',
  humidity: '',
  wind: '',
  uv_index: ''
});

// Function to get the time range based on the current hour
const getTimeRange = () => {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 6) return '06';   
  if (hour >= 6 && hour < 12) return '12';  
  if (hour >= 12 && hour < 18) return '18'; 
  return '24';                              
};


// Function to find the advice for a given parameter and value
const getAdvice = (parameter, value, adviceJSON) => {
  const adviceList = adviceJSON.advice[parameter];
  const adviceItem = adviceList.find(item => 
    value >= item.range.min && value <= item.range.max
  );
  return adviceItem ? adviceItem.advice : "No hay recomendación disponible.";
};

//Function to find the advice for temperature based on min and max values
const getTemperatureAdvice = (minTemp, maxTemp, adviceJSON) => {
  const adviceList = adviceJSON.advice["temperature_combined"];
  
  const adviceItem = adviceList.find(item => 
    minTemp >= item.range.max_min[0] && minTemp <= item.range.max_min[1] &&
    maxTemp >= item.range.max_max[0] && maxTemp <= item.range.max_max[1]
  );

  return adviceItem ? adviceItem.advice : "No hay recomendación disponible.";
};

// Function to find the advice for humidity based on min and max values
const getHumidityAdvice = (minHumidity, maxHumidity, adviceJSON) => {
  const adviceList = adviceJSON.advice["humidity_combined"];

  const adviceItem = adviceList.find(item => 
  minHumidity >= item.range.minima_min && minHumidity <= item.range.minima_max &&
  maxHumidity >= item.range.maxima_min && maxHumidity <= item.range.maxima_max
);

  return adviceItem ? adviceItem.advice : "No hay recomendación disponible.";
};

// Function to load the advice from the JSON file
const loadAdvice = async () => {
    const response = await fetch('/advice.json');
    const data = await response.json();

    if (!meteoData.value) return;

    const timeRange = getTimeRange();

    // Select the key for the specific time range
    const precipitationKey = `precipitation${timeRange}`;
    const tempKey = `temp${timeRange}`;
    const windKey = `wind${timeRange}`;

    // Stores the advice for each parameter in the advice object
    advice.value.snow = getAdvice('snow', meteoData.value.snow, data);
    advice.value.uv_index = getAdvice('uv_index', meteoData.value.uv_index, data);

    advice.value.precipitation = getAdvice('precipitation', meteoData.value[precipitationKey], data);
    advice.value.wind = getAdvice('wind', meteoData.value[windKey], data);

    advice.value.temp = getTemperatureAdvice(meteoData.value.min_temp, meteoData.value.max_temp, data);
    advice.value.humidity = getHumidityAdvice(meteoData.value.min_humidity, meteoData.value.max_humidity, data);
  
};


// Watches if meteoData changes and loads the advice
watch(meteoData, (newData) => {
  if (!newData) return;

  // Verify if all meteoData0 values are 0
  const allZero = Object.values(newData).every(value => value === 0);

  // If all values are 0, set advice to empty strings
  if (allZero) {
    advice.value = {
      precipitation: '',
      snow: '',
      temp: '',
      humidity: '',
      wind: '',
      uv_index: ''
    };
  } else {
    loadAdvice(); //If values are not 0, load the advice
  }
}, { immediate: true });
</script>

<style scoped>
.daily__advice {
  text-align: center;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  justify-content: center;  
  align-items: center;
  
}

.daily__advice__p {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}

h3 {
  font-size: 1.8rem;
}

span {
  padding-bottom: 1rem;
}

/* h4{
  font-size: 1.3rem;

}

p {
  font-size: 1.1rem;
} */
</style>