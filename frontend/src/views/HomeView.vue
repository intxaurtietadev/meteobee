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
  margin: 0;
  text-align: center;
  background-image: linear-gradient(rgba(255, 255, 255, 0.247), rgba(255, 255, 255, 0.205)),
                    url('../assets/img/background-user-2.png');
  background-position: center; 
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed; 
  overflow-x: hidden; /* Evita scroll horizontal */
}


h1 {
  font-size: var(--font-size-xl);
  color: var(--color-text);
  margin-top: var(--space-xl);
  margin-bottom: var(--space-lg);
  font-family: 'popins', sans-serif;
}
</style>

