<template>
    <div>
      <h3>Recomendaciones para apicultores</h3>
<div>
        <p>{{ apiData.meteoData0.date }}</p> 
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { onMounted, watch } from 'vue';
  import { useAPIdata } from '@/stores/APIdata.js';
  import { storeToRefs } from 'pinia';


const apiData = useAPIdata();


//   const apiData = ref({});
  const municipio = 48020;

  
onMounted(() => apiData.fetchWeatherData(municipio));


  </script>