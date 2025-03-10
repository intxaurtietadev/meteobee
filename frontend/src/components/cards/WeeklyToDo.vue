<template>
  <div class="consejos">
    <h2 class="consejos__titulo">Floración Melífera</h2>
    <p v-if="loading" class="consejos__loading">Cargando datos...</p>
    <ul v-else class="consejos__lista">
      <li v-for="(consejo, index) in consejos" :key="index" class="consejos__item">
        {{ consejo }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useAPIdata } from '@/stores/APIdata'; // Importa el store
import meteoBeeData from '../../../public/floracion.json'; // Asegúrate de que la ruta sea correcta

const apiData = useAPIdata(); // Accede al store
const loading = ref(true);

// Obtener la provincia seleccionada del store
const provinciaSelected = computed(() => apiData.provinciaSelected);

// Consejos basados en el JSON de floración
const consejos = computed(() => {
  if (!provinciaSelected.value) {
    console.log("❌ No hay provincia seleccionada.");
    return ["❌ No hay provincia seleccionada."];
  }

  const selectedProvince = provinciaSelected.value.toLowerCase();
  console.log("Provincia seleccionada:", selectedProvince);

  // Verificar si la provincia existe en el JSON
  const region = meteoBeeData.meteobee_data[selectedProvince];
  if (!region) {
    console.error(`❌ No hay datos disponibles para la provincia: ${selectedProvince}`);
    return [`❌ Este mes no hay flora melifera en floracion en: ${selectedProvince}`];
  }

  console.log("Datos de la región encontrados:", region);

  const mesActual = new Date().getMonth() + 1; // Mes actual (1-12)
  console.log("Mes actual:", mesActual);

  let consejosArray = [];

  // Análisis de flora melífera
  region.plantas_meliferas.forEach(planta => {
    console.log("Procesando planta:", planta.nombre_comun);
    if (planta.floracion.includes(mesActual)) {
      const mensajeBase = `🌼 ${planta.nombre_comun} en flor: 
        Néctar ${planta.nectar} | Polen ${planta.polen} (${planta.color_polen}) 
        → ${planta.produccion_miel}`;

      consejosArray.push(mensajeBase);

      // Recomendaciones específicas
      if (planta.nectar === 'Alta') {
        consejosArray.push(` 🍯 Coloca colmenas cerca de ${planta.nombre_comun} para máxima producción`);
      }
      if (planta.polen === 'Alta') {
        consejosArray.push(` 🌼 Ideal para colectar polen ${planta.color_polen}`);
      }
    } else {
      console.log(`La planta ${planta.nombre_comun} no está en floración este mes.`);
    }
  });

  console.log("Consejos generados:", consejosArray);

  if (consejosArray.length === 0) {
    console.log("⚠️ No hay plantas en floración para este mes.");
    return [`⚠️ No hay plantas en floración para este mes en ${selectedProvince}.`];
  }

  return consejosArray;
});

// Simular carga inicial
watch(provinciaSelected, () => {
  console.log("Cambio detectado en provinciaSelected:", provinciaSelected.value);
  loading.value = false;
});
</script>

<style scoped>
.consejos__item {
  background: var(--color-light);
  padding: 1rem;
  border-radius: var(--border-radius);
  margin: 0.5rem 0;
  font-size: var(--font-size-base);
  line-height: 1.4;
}
.consejos__item:hover {
  background: linear-gradient(to right, #f6b83c, #f5e55c);
  transform: scale(1.05);
}
.consejos__item:before {
  color: var(--color-primary);
  font-weight: bold;
  margin-right: 0.5rem;
}

li{
  list-style-type: none;
}
</style>