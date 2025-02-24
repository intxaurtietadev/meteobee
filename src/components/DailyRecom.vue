<template>
    <div>
      <h3>Recomendaciones para apicultores</h3>
      <div v-if="advice">
        <p>Recomendación para la probabilidad de precipitación: {{ advice.precipitacion }}</p>
        <p>Recomendación para la cota de nieve: {{ advice.cota_nieve }}</p>
        <p>Recomendación para la temperatura máxima: {{ advice.temperatura_maxima }}</p>
        <p>Recomendación para la temperatura mínima: {{ advice.temperatura_minima }}</p>
        <p>Recomendación para la humedad máxima: {{ advice.humedad_maxima }}</p>
        <p>Recomendación para la humedad mínima: {{ advice.humedad_minima }}</p>
        <p>Recomendación para la racha máxima de viento: {{ advice.racha_max_viento }}</p>
        <p>Recomendación para el índice UV: {{ advice.indice_uv }}</p>
      </div>
    </div>
  </template>

<script setup>
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