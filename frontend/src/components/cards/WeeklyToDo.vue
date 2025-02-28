<template>
  <div class="consejos">
    <h2 class="consejos__titulo">Consejos para hoy</h2>
    <p v-if="loading" class="consejos__loading">Cargando datos...</p>
    <ul v-else class="consejos__lista">
      <li v-for="(consejo, index) in consejos" :key="index" class="consejos__item">
        {{ consejo }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useAPIdata } from '@/stores/APIdata';
import meteoBeeData from '../../../public/floracion.json'; // Asegúrate de importar tu JSON

const meteoStore = useAPIdata();
const loading = ref(true);

onMounted(async () => {
  await meteoStore.fetchWeatherData('41091'); // Reemplaza con el municipio del usuario
  loading.value = false;
});

// 📌 Consejos dinámicos basados en clima y flora
const consejos = computed(() => {
  const data = meteoStore.meteoData0; // Datos de hoy
  const region = meteoBeeData.meteobee_data.andalucia; // Suponiendo que la región es Andalucía

  let consejosArray = [];

  // 📌 1. Clima y recomendaciones generales
  if (data.precipitation > 50) {
    consejosArray.push("⚠️ Lluvias intensas, evita abrir la colmena hoy.");
  }
  if (data.wind > 30) {
    consejosArray.push("🌬️ Vientos fuertes, revisa la estabilidad de las colmenas.");
  }
  if (data.min_temp < 10) {
    consejosArray.push("❄️ Temperaturas bajas, reduce la apertura de la piquera.");
  }
  if (data.max_temp > 35) {
    consejosArray.push("🔥 Alta temperatura, asegúrate de que las colmenas tengan sombra y agua cerca.");
  }
  if (data.uv_index > 7) {
    consejosArray.push("☀️ Alto índice UV, usa protección al inspeccionar la colmena.");
  }

  // 📌 2. Flora melífera en floración
  const mesActual = new Date(data.date).getMonth() + 1; // Mes actual (1-12)
  region.plantas_meliferas.forEach(planta => {
    const [mesInicio, mesFin] = planta.periodo_floracion.split('-').map(m => 
      new Date(Date.parse(m + " 1, 2023")).getMonth() + 1
    );
    if (mesActual >= mesInicio && mesActual <= mesFin) {
      consejosArray.push(`🌼 ${planta.nombre_comun} está en floración. Buen momento para cosechar miel.`);
    }
  });

  return consejosArray;
});
</script>

<style scoped>
.consejos {
  background: var(--color-background);
  padding: var(--space-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.consejos__titulo {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.consejos__loading {
  color: var(--color-secondary);
  font-style: italic;
}

.consejos__lista {
  margin-top: var(--space-md);
  padding-left: var(--space-sm);
}

.consejos__item {
  background: var(--color-light);
  padding: var(--space-xs);
  border-radius: var(--border-radius);
  margin-bottom: var(--space-xs);
  font-size: var(--font-size-base);
}
</style>