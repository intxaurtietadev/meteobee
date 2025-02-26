<template>
    <div
      class="card"
      :style="{ backgroundColor: bgColor }"
      data-swapy-item
    >
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
  defineProps({
    title: String,
    description: String,
    bgColor: String,
    img: String,
  });
  import { ref, onMounted } from 'vue'

// 
const advice = ref({
  precipitation: '',
  snow: '',
  max_temp: '',
  min_temp: '',
  max_humidity: '',
  min_humidity: '',
  snow: '',
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

    const answer = await fetch('../public/advice.json')  
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
  .card {
    border-radius: 1rem; /* 16px */
    box-shadow: 0 0.625rem 0.9375rem rgba(0, 0, 0, 0.1); /* 10px 15px */
    padding: 1.5rem; /* 24px */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease;
    cursor: grab; /* Cambia el cursor al arrastrar */
  }
  
  .card:active {
    cursor: grabbing; /* Cambia el cursor cuando se está arrastrando */
  }
  
  .card:hover {
    transform: scale(1.05);
  }
  
  .card-img {
    width: 6.25rem; /* 100px */
    height: 6.25rem; /* 100px */
    margin-bottom: 1rem; /* 16px */
    object-fit: contain;
    border-radius: 0.75rem; /* 12px */
  }
  
  .card-title {
    font-size: 1.25rem; /* 20px */
    font-weight: bold;
    margin-bottom: 0.5rem; /* 8px */
  }
  
  .card-description {
    font-size: 1rem; /* 16px */
    color: #4a4a4a;
  }
  </style>