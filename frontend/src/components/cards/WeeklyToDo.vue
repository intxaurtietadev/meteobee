<template>
  <div class="consejos">
    <h2 class="consejos__titulo">Consejos apícolas</h2>
    <p v-if="loading" class="consejos__loading">Analizando datos...</p>

    <!-- Mostrar la provincia seleccionada -->
    <p v-if="provinciaSelected" class="consejos__provincia">
      Provincia seleccionada: {{ provinciaSelected }}
    </p>
    
    <ul v-else class="consejos__lista">
      <li v-for="(consejo, index) in consejos" :key="index" class="consejos__item">
        {{ consejo }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { useAPIdata } from '@/stores/APIdata'; // Accedemos al store donde se almacena la provincia
import meteoBeeData from '../../../public/floracion.json';

const meteoStore = useAPIdata();
const loading = ref(true);

// Obtenemos la provincia seleccionada desde el store
const provinciaSelected = computed(() => meteoStore.provinciaSelected);

onMounted(async () => {
  if (provinciaSelected.value) {
    await meteoStore.fetchWeatherData('41091');  // Cargar datos para el municipio
    loading.value = false;
  }
});

const consejos = computed(() => {
  if (loading.value) return [];

  const data = meteoStore.meteoData0;
  const region = meteoBeeData.meteobee_data[provinciaSelected.value.toLowerCase()] || {};
  const mesActual = new Date(data.date).getMonth() + 1;
  let consejosArray = [];

  // Clima y manejo de colmenas
  if (data.precipitation > 50) {
    consejosArray.push("⚠️ Lluvias intensas: Evita manipular las colmenas");
  }
  if (data.wind > 30) {
    consejosArray.push("🌬️ Vientos fuertes: Asegura las tapas de las colmenas");
  }
  if (data.min_temp < 10) {
    consejosArray.push("❄️ Frío extremo: Reduce la entrada de la colmena");
  }

  // Análisis de flora melífera
  if (region.plantas_meliferas) {
    region.plantas_meliferas.forEach(planta => {
      if (planta.floracion.includes(mesActual)) {
        const mensajeBase = `🌼 ${planta.nombre_comun} en flor: 
          Néctar ${planta.nectar} | Polen ${planta.polen} (${planta.color_polen}) 
          → ${planta.produccion_miel}`;
        
        consejosArray.push(mensajeBase);

        // Recomendaciones específicas
        if (planta.nectar === 'Alto') {
          consejosArray.push(`. 🍯 Coloca colmenas cerca de ${planta.nombre_comun} para máxima producción`);
        }
        if (planta.polen === 'Alto') {
          consejosArray.push(`. 🌼 Ideal para colectar polen ${planta.color_polen}`);
        }
        if (data.uv_index > 7 && planta.nectar === 'Alto') {
          consejosArray.push(`. ☀️ Prioriza sombra para preservar el néctar de ${planta.nombre_comun}`);
        }
      }
    });
  }

  return consejosArray;
});
</script>

<style scoped>
.consejos__item {
  background: var(--color-light);
  padding: 1rem;
  border-radius: 8px;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.consejos__item:before {
  content: "•";
  color: var(--color-primary);
  font-weight: bold;
  margin-right: 0.5rem;
}

/* Estilo para mostrar la provincia seleccionada */
.consejos__provincia {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--color-primary);
}
</style>
