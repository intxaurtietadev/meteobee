<template>
  <div class="consejos">
    <h2 class="consejos__titulo">Consejos apícolas</h2>
    <p v-if="loading" class="consejos__loading">Cargando datos...</p>
    <ul v-else class="consejos__lista">
      <li v-for="(consejo, index) in consejos" :key="index" class="consejos__item">
        {{ consejo }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import meteoBeeData from '../../../public/floracion.json';

const loading = ref(true);
const provinciaSelected = ref(null);

// Simula la selección de una provincia (esto puede venir desde un selector externo)
onMounted(() => {
  // Ejemplo: Establece la provincia seleccionada manualmente o desde un selector
  provinciaSelected.value = "malaga"; // Cambia esto según la provincia seleccionada
  loading.value = false;
});

// Consejos basados en el JSON de floración
const consejos = computed(() => {
  if (!provinciaSelected.value) {
    return ["❌ No hay provincia seleccionada."];
  }

  const selectedProvince = provinciaSelected.value.toLowerCase();
  const region = meteoBeeData.meteobee_data[selectedProvince];

  if (!region) {
    return [`❌ No hay datos disponibles para la provincia: ${selectedProvince}`];
  }

  const mesActual = new Date().getMonth() + 1; // Mes actual (1-12)
  let consejosArray = [];

  // Análisis de flora melífera
  region.plantas_meliferas.forEach(planta => {
    if (planta.floracion.includes(mesActual)) {
      const mensajeBase = `🌼 ${planta.nombre_comun} en flor: 
        Néctar ${planta.nectar} | Polen ${planta.polen} (${planta.color_polen}) 
        → ${planta.produccion_miel}`;

      consejosArray.push(mensajeBase);

      // Recomendaciones específicas
      if (planta.nectar === 'Alta') {
        consejosArray.push(`. 🍯 Coloca colmenas cerca de ${planta.nombre_comun} para máxima producción`);
      }
      if (planta.polen === 'Alta') {
        consejosArray.push(`. 🌼 Ideal para colectar polen ${planta.color_polen}`);
      }
    }
  });

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
</style>