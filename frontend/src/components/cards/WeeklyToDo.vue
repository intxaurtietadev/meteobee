<template>
  <section class="floracion">
    <h2 class="floracion__title">Floración en tu región</h2>
    
    <div v-if="!provinciaSelected || !municipioSelected" class="floracion__message">
      <p>Selecciona una provincia y un municipio para ver la floración.</p>
    </div>
    
    <ul v-else class="floracion__list">
      <li v-for="flor in floracionesFiltradas" :key="flor.id" class="floracion__item">
        <h3 class="floracion__item-title">{{ flor.nombre }}</h3>
        <p class="floracion__item-description">{{ flor.descripcion }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import floracionesData from '@/floracion.json';
import { useAPIdata } from '@/stores/APIdata.js';

const apiData = useAPIdata();
const provinciaSelected = computed(() => apiData.provinciaSelected);
const municipioSelected = computed(() => apiData.municipioSelected);

const floracionesFiltradas = computed(() => {
  if (!provinciaSelected.value || !municipioSelected.value) return [];
  return floracionesData.filter(flor => 
    flor.provincia === provinciaSelected.value && 
    flor.municipio === municipioSelected.value
  );
});
</script>

<style scoped>
.floracion {
  background: var(--color-box-background);
  padding: var(--space-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  text-align: center;
}

.floracion__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.floracion__message {
  font-size: var(--font-size-base);
  color: var(--color-text);
  padding: var(--space-md);
  background: var(--color-light);
  border-radius: var(--border-radius);
}

.floracion__list {
  list-style: none;
  padding: 0;
  margin-top: var(--space-md);
}

.floracion__item {
  background: var(--color-background);
  padding: var(--space-md);
  margin-bottom: var(--space-sm);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  text-align: left;
}

.floracion__item-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-secondary);
}

.floracion__item-description {
  font-size: var(--font-size-base);
  color: var(--color-text);
}
</style>
