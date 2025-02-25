<template>
  <div class="grid-container" ref="container">
    <!-- Tarjeta 1: DailyMeteo -->
    <BentoCard class="card1" :routeName="'DailyMeteo'">
      <DailyMeteo />
    </BentoCard>

    <!-- Tarjeta 2: WeeklyMeteo -->
    <BentoCard class="card2" :routeName="'WeeklyMeteo'">
      <WeeklyMeteo />
    </BentoCard>

    <!-- Tarjeta 3: DailyToDo -->
    <BentoCard class="card3" :routeName="'DailyToDo'">
      <DailyToDo />
    </BentoCard>

    <!-- Tarjeta 4: WeeklyToDo -->
    <BentoCard class="card4" :routeName="'WeeklyToDo'">
      <WeeklyToDo />
    </BentoCard>

    <!-- Tarjeta 5: HoneyProduction -->
    <BentoCard class="card5" :routeName="'HoneyProduction'">
      <HoneyProduction />
    </BentoCard>

    <!-- Tarjeta 6: News -->
    <BentoCard class="card6" :routeName="'News'">
      <News />
    </BentoCard>
  </div>
</template>

<script setup>
import BentoCard from './BentoCard.vue'; // Importa BentoCard
import DailyMeteo from './cards/DailyMeteo.vue';
import WeeklyMeteo from './cards/WeeklyMeteo.vue';
import DailyToDo from './cards/DailyToDo.vue';
import WeeklyToDo from './cards/WeeklyToDo.vue';
import HoneyProduction from './cards/HoneyProduction.vue';
import News from './cards/News.vue';
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "card1 card2 card2"
    "card1 card3 card4"
    "card5 card5 card6";
  gap: var(--space-md);
  padding: var(--space-lg);
  max-width: 75rem;
  margin: 0 auto;
  margin-top: var(--space-xl);
  font-family: var(--font-family);
}

/* Posicionamiento de las tarjetas en el grid */
.card1 {
  grid-area: card1;
}

.card2 {
  grid-area: card2;
}

.card3 {
  grid-area: card3;
}

.card4 {
  grid-area: card4;
}

.card5 {
  grid-area: card5;
}

.card6 {
  grid-area: card6;
}
</style>