<template>
  <main>
  <div class="grants">
    <h1 class="grants__title">Ayudas y subvenciones</h1>
    <div class="grants__list">
      <GrantsCard v-for="grant in grants" :key="grant.id" :grants="grant" />
    </div>
  </div>
</main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import GrantsCard from '../components/Grantscopy.vue';

const grants = ref([]);

const fetchGrants = async () => {
  const response = await fetch('http://localhost:3000/grants');
  if (!response.ok) throw new Error('Error al obtener usuarios.');
  const data = await response.json();
  grants.value = data;
};

onMounted(fetchGrants);
</script>

<style scoped>
main{  background-image: linear-gradient(rgba(255, 255, 255, 0.247), rgba(255, 255, 255, 0.205)),
  url('../assets/img/background-user-2.png');
}
.grants {
  padding-top: 7rem;
  max-width: 60rem;
  margin: auto;
  font-family: var(--font-family);
}

.grants__title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
}

.grants__list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>

