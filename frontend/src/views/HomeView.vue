<template>
  <div class="home-view">
    <BentoGrid />
  </div>
</template>

<script setup>
import BentoGrid from '../components/BentoGrid.vue';
</script>

<style scoped>
.home-view {    
  padding: var(--space-lg);
  margin: 0 auto;
  text-align: center;
  background-image: linear-gradient(rgba(255, 255, 255, 0.247), rgba(255, 255, 255, 0.205)),
                    url('../assets/img/background-user-2.png');
  background-position: center; 
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed; 
  overflow-x: hidden; /* Evita scroll horizontal */
  
}


@media (max-width: 1024px) {
  .home-view {
    padding: var(--space-md);
    background-attachment: scroll; /* Para mejor rendimiento en tablets */
  }

  .home-view h1 {
    font-size: var(--font-size-lg);
    margin-top: var(--space-lg);
    margin-bottom: var(--space-md);
  }
}

/* Tablets pequeñas y móviles grandes (≤768px) */
@media (max-width: 768px) {
  .home-view {
    padding: var(--space-sm);
    background-size: contain;
  }

}

/* Móviles pequeños (≤480px) */
@media (max-width: 480px) {
  .home-view {
    padding: var(--space-xs);
    background-size: cover;
    text-align: left;
  }

}

</style>

