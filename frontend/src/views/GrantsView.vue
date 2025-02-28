<template>
    <div class="grants-view">
      <h1>Ayudas y subvenciones</h1>
      <Grants />
    </div>
  </template>
  
  <script setup>
  import Grants from '../components/cards/Grants.vue';
  </script>
  
  <style scoped>
  .grants-view {
    padding: var(--space-lg);
    text-align: center;
  }
  
  h1 {
    font-size: var(--font-size-xl);
    color: var(--color-text);
    margin-top: var(--space-xl);
    margin-bottom: var(--space-lg);
    font-family: 'popins', sans-serif;
  }
  </style>