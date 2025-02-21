<template>
    <div :class="['bento-grid', customClass]" :style="gridStyle">
      <slot />
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  // Props
  const props = defineProps({
    rows: {
      type: Number,
      default: 2, // Número de filas por defecto
      validator: (value) => value > 0,
    },
    cols: {
      type: Number,
      default: 2, // Número de columnas por defecto
      validator: (value) => value > 0,
    },
    gap: {
      type: String,
      default: '16px', // Espaciado entre celdas
    },
    customClass: {
      type: String,
      default: '', // Clase personalizada opcional
    },
  });
  
  // Calcular estilo dinámico para la cuadrícula
  const gridStyle = computed(() => ({
    display: 'grid',
    gridTemplateRows: `repeat(${props.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
    gap: props.gap,
  }));
  </script>
  
  <style scoped>
  .bento-grid {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  
  .bento-grid > * {
    border: 1px solid #ccc; /* Estilo visual para las celdas */
    box-sizing: border-box;
    padding: 8px;
    text-align: center;
  }
  </style>