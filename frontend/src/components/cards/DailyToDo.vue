<template>
  <div class="daily-meteo">
      <!-- <img v-if="img" :src="img" alt="Card image" class="card-img" /> -->
      <h3 class="card-title">Recomendaciones diarias</h3>
      <!-- <p class="card-description">{{ description }}</p> -->
      <div v-if="advice">
        <p><strong>Precipitaciones:</strong> {{ advice.precipitation }}</p>
        <p><strong>Nieve:</strong> {{ advice.snow }}</p>
        <p><strong>Temperatura:</strong> {{ advice.max_temp }} </p>
        <p><strong>Humedad:</strong> {{ advice.max_humidity }}</p>
        <p><strong>Viento:</strong> {{ advice.wind }}</p>
        <p><strong>Índice UV:</strong> {{ advice.uv_index }}</p>
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
  max_temp: '',
  min_temp: '',
  max_humidity: '',
  min_humidity: '',
  wind: '',
  uv_index: ''
});

// Function to find the advice for a given parameter and value
const getAdvice = (parameter, value, adviceJSON) => {
  const adviceList = adviceJSON.advice[parameter];
  const adviceItem = adviceList.find(item => 
    value >= item.range.min && value <= item.range.max
  );
  return adviceItem ? adviceItem.advice : "No hay recomendación disponible.";
};

// Function to load the advice from the JSON file
const loadAdvice = async () => {
    const response = await fetch('/advice.json');
    const data = await response.json();

    if (!meteoData.value) return;
    
    // Stores the advice for each parameter in the advice object
    advice.value.precipitation = getAdvice('precipitation', meteoData.value.precipitation, data);
    advice.value.snow = getAdvice('snow', meteoData.value.snow, data);
    advice.value.max_temp = getAdvice('max_temp', meteoData.value.max_temp, data);
    advice.value.min_temp = getAdvice('min_temp', meteoData.value.min_temp, data);
    advice.value.max_humidity = getAdvice('max_humidity', meteoData.value.max_humidity, data);
    advice.value.min_humidity = getAdvice('min_humidity', meteoData.value.min_humidity, data);
    advice.value.wind = getAdvice('wind', meteoData.value.wind, data);
    advice.value.uv_index = getAdvice('uv_index', meteoData.value.uv_index, data);
  
};

// Watches if meteoData changes and loads the advice
watch(meteoData, (newData) => {
  if (newData) {
    loadAdvice();
  }
}, { immediate: true });

</script>

<style scoped>
.daily-meteo {
  text-align: center;
}
</style>