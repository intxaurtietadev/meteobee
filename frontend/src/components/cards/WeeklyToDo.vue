<template>
  <div class="daily-meteo">
    <h3>Tiempo Diario</h3>
    <p>{{ weatherData }}</p>
  </div>
</template>

<script setup>
const weatherData = 'Cargando...'; // Datos del tiempo (puedes obtenerlos de una API)
</script>

<style scoped>
.daily-meteo {
  text-align: center;
}
</style>