<template>
    <div>
      <h3>Recomendaciones para apicultores</h3>
      <div v-if="advice">
        <p>Recomendación para la probabilidad de precipitación: {{ advice.precipitation }}</p>
        <p>Recomendación para la cota de nieve: {{ advice.snow }}</p>
        <p>Recomendación para la temperatura máxima: {{ advice.max_temp }}</p>
        <p>Recomendación para la temperatura mínima: {{ advice.min_temp }}</p>
        <p>Recomendación para la humedad máxima: {{ advice.max_humidity }}</p>
        <p>Recomendación para la humedad mínima: {{ advice.min_humidity }}</p>
        <p>Recomendación para la racha máxima de viento: {{ advice.wind }}</p>
        <p>Recomendación para el índice UV: {{ advice.uv_index }}</p>
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue'

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

const getAdvice = (parameter, value, dbJSON) => {
  const adviceList = dbJSON.advice[parameter]

  const adviceItem = adviceList.find(item => 
    value >= item.range.min && value <= item.range.max
  )

  return adviceItem ? adviceItem.advice : "No hay recomendación disponible."
}

// Fake API data
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

const cargarAdvice = async () => {
    const respuesta = await fetch('/db.json')  
    const data = await response.json()

    console.log("Datos cargados:", data)

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
  cargarAdvice()
})
  </script>