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
import { ref, onMounted } from 'vue';
// import { useAPIdata } from '@/stores/APIdata.js';

// const apiData = useAPIdata();
// apiData.fetchWeatherData();

// Reactive variables to store the advice
const advice = ref({
  precipitation: '',
  snow: '',
  max_temp: '',
  min_temp: '',
  max_humidity: '',
  min_humidity: '',
  wind: '',
  uv_index: ''
})

//Function to get the advice from the JSON file
const getAdvice = (parameter, value, adviceJSON) => {
  const adviceList = adviceJSON.advice[parameter]
  const adviceItem = adviceList.find(item => 
    value >= item.range.min && value <= item.range.max
  )
  console.log(adviceItem)
  return adviceItem ? adviceItem.advice: "No hay recomendación disponible."
}

//Fake API data
const apiData = {
  precipitation: 40,
  snow: 800,
  max_temp: 25,
  min_temp: 15,
  max_humidity: 75,
  min_humidity: 35,
  wind: 30,
  uv_index: 5
}

//Function to load the advice from the JSON file
const loadAdvice = async () => {

    const answer = await fetch('../advice.json')  
    const data = await answer.json()
    console.log(data)
    
    advice.value.precipitation = getAdvice('precipitation', apiData.precipitation, data)
    advice.value.snow = getAdvice('snow', apiData.snow, data)
    advice.value.max_temp = getAdvice('max_temp', apiData.max_temp, data)
    advice.value.min_temp = getAdvice('min_temp', apiData.min_temp, data)
    advice.value.max_humidity = getAdvice('max_humidity', apiData.max_humidity, data)
    advice.value.min_humidity = getAdvice('min_humidity', apiData.min_humidity, data)
    advice.value.wind = getAdvice('wind', apiData.wind, data)
    advice.value.uv_index = getAdvice('uv_index', apiData.uv_index, data)
  
}

onMounted(() => {
  loadAdvice()
})
</script>

<style scoped>
.daily-meteo {
  text-align: center;
}
</style>