<template>
    <div class="home-view">
      <h1>Welcome to MeteoBee</h1>
      <BentoGrid />
    </div>
  </template>
  
  <script setup>
  import BentoGrid from '../components/BentoGrid.vue';
  </script>
  
  <style scoped>
  .home-view {
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