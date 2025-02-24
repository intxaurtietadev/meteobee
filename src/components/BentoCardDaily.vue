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
        <p><strong>Precipitaciones:</strong> {{ advice.precipitacion }}</p>
        <p><strong>Nieve:</strong> {{ advice.cota_nieve }}</p>
        <p><strong>Temperatura:</strong> {{ advice.temperatura_maxima }} </p>
        <p><strong>Humedad:</strong> {{ advice.humedad_maxima }}</p>
        <p><strong>Viento:</strong> {{ advice.racha_max_viento }}</p>
        <p><strong>Índice UV:</strong> {{ advice.indice_uv }}</p>
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

const advice = ref({
  precipitacion: '',
  cota_nieve: '',
  temperatura_maxima: '',
  temperatura_minima: '',
  humedad_maxima: '',
  humedad_minima: '',
  racha_max_viento: '',
  indice_uv: ''
})

const getAdvice = (parametro, valor, adviceJSON) => {
  const adviceList = adviceJSON.recomendaciones[parametro]
  const adviceItem = adviceList.find(item => 
    valor >= item.rango.min && valor <= item.rango.max
  )
  console.log(adviceItem)
  return adviceItem ? adviceItem.recomendacion: "No hay recomendación disponible."
}

const apiData = {
  precipitacion: 40,
  cota_nieve: 800,
  temperatura_maxima: 25,
  temperatura_minima: 15,
  humedad_maxima: 75,
  humedad_minima: 35,
  racha_max_viento: 30,
  indice_uv: 5
}

const cargarAdvice = async () => {

    const respuesta = await fetch('../public/advice.json')  
    const data = await respuesta.json()
    console.log(data)
    
    advice.value.precipitacion = getAdvice('precipitacion', apiData.precipitacion, data)
    advice.value.cota_nieve = getAdvice('cota_nieve', apiData.cota_nieve, data)
    advice.value.temperatura_maxima = getAdvice('temperatura_maxima', apiData.temperatura_maxima, data)
    advice.value.temperatura_minima = getAdvice('temperatura_minima', apiData.temperatura_minima, data)
    advice.value.humedad_maxima = getAdvice('humedad_maxima', apiData.humedad_maxima, data)
    advice.value.humedad_minima = getAdvice('humedad_minima', apiData.humedad_minima, data)
    advice.value.racha_max_viento = getAdvice('racha_max_viento', apiData.racha_max_viento, data)
    advice.value.indice_uv = getAdvice('indice_uv', apiData.indice_uv, data)
  
}

onMounted(() => {
  cargarAdvice()
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