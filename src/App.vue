<template>
  <div id="app" style="padding: 20px;">
    <BentoGrid rows="3" cols="4" gap="10px" customClass="custom-grid">
      <div v-for="(item, index) in items" :key="index">
        Celda {{ item }}
      </div>
    </BentoGrid>
  </div>
</template>

<script setup>
import BentoGrid from './components/BentoGrid.vue';

const items = Array.from({ length: 12 }, (_, i) => i + 1); // Genera números del 1 al 12
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}

.custom-grid {
  border: 2px solid #000;
  border-radius: 8px;
  overflow: hidden;
}
</style>