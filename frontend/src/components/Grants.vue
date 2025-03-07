<template>

  <div class="grants">
    <div class="grants__card">
      <img :src="grants.image" alt="logotipo" class="grants__image" />
      <div class="grants__text">
        <h2 class="grants__title">{{ grants.title }}</h2>
        <p class="grants__date"><b>Fecha de publicación: </b>{{ grants.date }}</p>
        <p class="grants__description"><b>Descripción: </b>{{ grants.description }}</p>
        <p class="grants__amount"><b>Dotación presupuestaria: </b>{{ grants.grantAmount }}</p>
        <p class="grants__agency"><b>Entidad: </b>{{ grants.agency }}</p>
        <a :href="grants.Link" target="_blank">Ver más</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  grants: Object,
});
</script>

<style scoped>
.grants {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grants__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.grants__text {}

.grants__card:hover {
  transform: scale(1.02);
}

.grants__title {
  font-size: 1.5rem;
  margin: 0.6rem 0;
}

.grants__date {
  font-size: 1rem;
}

.grants__description {
  font-size: 1rem;
  line-height: 1.5;
}

.grants__image {
  width: 13rem;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}
</style>
