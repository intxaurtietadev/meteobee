<template>
  <div class="home-grid" ref="container">
    <!-- Tarjeta 1: DailyMeteo -->
    <BentoCard class="home-grid__card home-grid__card--daily-meteo" style="padding:0" :routeName="'DailyMeteo'">
      <DailyMeteo />
    </BentoCard>

    <!-- Tarjeta 2: DailyToDo -->
    <BentoCard class="home-grid__card home-grid__card--weekly-meteo" :routeName="'WeeklyMeteo'">
      <DailyToDo />
    </BentoCard>

    <!-- Tarjeta 3: WeeklyMeteo -->
    <BentoCard class="home-grid__card home-grid__card--daily-todo" :routeName="'DailyToDo'" >
      <WeeklyMeteo />
    </BentoCard>

    <!-- Tarjeta 6: Floracion -->
    <BentoCard class="home-grid__card home-grid__card--floracion" :routeName="'ToDoFloracion'">
      <WeeklyToDo />
    </BentoCard>

    <!-- Tarjeta 5: HoneyProduction -->
    <BentoCard class="home-grid__card home-grid__card--honey-production" :routeName="'HoneyProduction'">
      <HoneyGraph />
    </BentoCard>

  </div>
</template>

<script setup>
import BentoCard from './BentoCard.vue'; // Import BentoCard
import DailyMeteo from './cards/DailyMeteo/DailyMeteo.vue';
import WeeklyMeteo from './cards/WeeklyMeteo.vue';
import DailyToDo from './cards/DailyToDo.vue';
import WeeklyToDo from './cards/WeeklyToDo.vue';
import { useRouter } from 'vue-router';
import HoneyGraph from "./cards/HoneyGraph.vue";

const router = useRouter(); 

const gotToDailyRec = () => {
  router.push('/recomendacionesdiarias'); 
};

</script>

<style scoped>
.home-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto auto auto;
  grid-template-areas:
    "daily-meteo daily-meteo weekly-meteo"
    "daily-meteo daily-meteo weekly-meteo"
    "daily-todo daily-todo daily-todo"
    "floracion honey-production honey-production";
  gap: var(--space-md);
  padding: var(--space-lg); 
  margin: 0 auto;
  margin-top: var(--space-lg);
  width: 90%;
  max-width: 100rem;
  font-family: var(--font-family);
  color: var(--color-text);

}

/* Bloque: Tarjeta */
.home-grid__card {
  position: relative;
  border-radius: var(--border-radius);
  background: var(--color-box-background);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borde sutil */
  box-shadow: var(--box-shadow);
  transition: transform var(--transition-duration) ease, box-shadow var(--transition-duration) ease;
  overflow: hidden; /* Para contener efectos de borde */
}

/* Efecto de borde brillante animado */
.home-grid__card::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  z-index: -1;
  transform: translateX(-100%);
  pointer-events: none;
}

.home-grid__card:hover::after {
  animation: borderGlow 2s ease infinite;
}

@keyframes borderGlow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Efecto de hover */
.home-grid__card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* Modificadores para cada tarjeta */
.home-grid__card--daily-meteo {
  grid-area: daily-meteo;
  background: linear-gradient(to right, #446c97, #56c4d5);
}

.home-grid__card--weekly-meteo {
  grid-area: weekly-meteo;
  background-image: linear-gradient(rgba(255, 255, 255, 0.247), rgba(255, 255, 255, 0.205)),
  url('../assets/img/background-user.png');;
}

.home-grid__card--daily-todo {
  grid-area: daily-todo;
  background: linear-gradient(to right, #446c97, #56c4d5);
  cursor: pointer; /* Indicar que es clickeable */
}


.home-grid__card--honey-production {
  grid-area: honey-production;
  background-color: var(--color-light); /* --color-light con transparencia */
}

.home-grid__card--floracion {
  grid-area: floracion;
  background-image: linear-gradient(rgba(255, 255, 255, 0.247), rgba(255, 255, 255, 0.205)),
  url('../assets/img/background-user.png');
}

/* Efecto especial para la tarjeta clickeable */
.home-grid__card--daily-todo::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.3s ease, transform 0.5s ease;
}

.home-grid__card--daily-todo:hover::before {
  opacity: 1;
  transform: scale(2);
}

/* Estilos adicionales para el contenido de las tarjetas */
.home-grid__card h2 {
  color: var(--color-text);
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-sm);
}

.home-grid__card p {
  color: rgba(51, 51, 51, 0.8); /* --color-text con transparencia */
  font-size: var(--font-size-base);
}

/* Animación al cargar las tarjetas */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.home-grid__card {
  animation: fadeIn 0.5s ease-in-out;
}

@media (max-width: 1024px) {
  .home-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      "daily-meteo"
      "weekly-meteo"
      "daily-todo"
      "floracion"
      "honey-production";
    padding: var(--space-md);
  }
}

/* Tablets pequeñas y móviles grandes (≤768px) */
@media (max-width: 768px) {

  .home-grid__card {
    min-height: 18rem;
  }

  .home-grid__card h2 {
    font-size: var(--font-size-lg);
  }

  .home-grid__card p {
    font-size: var(--font-size-sm);
  }
}

/* Móviles pequeños (≤480px) */
@media (max-width: 480px) {
  .home-grid {
    gap: var(--space-sm);
  }

  .home-grid__card {
    padding: var(--space-sm);
  }

  .home-grid__card h2 {
    font-size: var(--font-size-base);
  }

  .home-grid__card p {
    font-size: var(--font-size-xs);
  }
}


</style>