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
    <BentoCard class="card3" :routeName="'DailyToDo'" @click="gotToDailyRec">
      <DailyToDo />
    </BentoCard>

    <!-- Tarjeta 4: WeeklyToDo -->
    <BentoCard class="card4" :routeName="'WeeklyToDo'">
      <WeeklyToDo />
    </BentoCard>

    <!-- Tarjeta 5: HoneyProduction -->
    <BentoCard class="card5 no-style" :routeName="'HoneyProduction'">
      <News v-if="firstNews" :news="firstNews" />
    </BentoCard>

    <!-- Tarjeta 6: News -->
    <BentoCard class="card6" :routeName="'News'">
      <HoneyProduction />
    </BentoCard>
  </div>
</template>

<script setup>
import BentoCard from './BentoCard.vue'; // Import BentoCard
import DailyMeteo from './cards/DailyMeteo.vue';
import WeeklyMeteo from './cards/WeeklyMeteo.vue';
import DailyToDo from './cards/DailyToDo.vue';
import WeeklyToDo from './cards/WeeklyToDo.vue';
import HoneyProduction from './cards/HoneyProduction.vue';
import News from './cards/News.vue';
import { useRouter } from 'vue-router';

const router = useRouter(); 

const gotToDailyRec = () => {
  router.push('/recomendacionesdiarias'); 
};

// // Load news from JSON file
// import { ref, onMounted, computed } from 'vue';
// const news = ref([]);

// const fetchNews = async () => {
//   // Load JSON data
//     const response = await fetch('/news.json');
//   // Turn response into .json
//     news.value = await response.json();
  
// };

// // Get the first news item
// const firstNews = computed(() => (news.value.length > 0 ? news.value[0] : null));

// onMounted(fetchNews);
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
  background-color: var(--color-secondary);
}

.card2 {
  grid-area: card2;
  background-color: var(--color-tertiary);
}

.card3 {
  grid-area: card3;
  background-color: var(--color-accent);
}

.card4 {
  grid-area: card4;
  background-color: var(--color-light);
}

.card5 {
  grid-area: card5;
  background-color: var(--color-primary)
}

.card6 {
  grid-area: card6;
  background-color: var(--color-secondary);
}

.news__card {
  border: 0px;
  color: white;
}
</style>