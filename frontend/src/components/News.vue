<template>
  <div class="news">
    <div class="news__card">
      <img v-if="news.image" :src="news.image" alt="Noticia" class="news__image" />
      <h2 class="news__title">{{ news.title }}</h2>
      <p class="news__date">{{ news.date }}</p>
      <p class="news__description">{{ news.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

//Receive the news object from the parent component
const props = defineProps({
  news: Object 
});
</script>

<style scoped>
.news {
  display: flex;
  justify-content: center;
  align-items: center;
}
.news__card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  background-color: rgba(255, 255, 255, 0.801);/* --color-primary con transparencia */;
}
.news__card:hover {
  transform: scale(1.02);
}
.news__image {
  width: 100%;
  border-radius: 8px;
}
.news__title {
  font-size: 1.5rem;
  margin: 0.6rem 0;
}
.news__date {
  font-size: 1rem;
  color: gray;
}
.news__description {
  font-size: 1rem;
  line-height: 1.5;
}

/* Estilos específicos para cuando está en la Home */
.no-style .news__card {
  border: none;
  box-shadow: none;
  transition: none;
  color: white;
}

.no-style .news__card .news__image {
  /* width: 50% */
}

.no-style .news__card:hover {
  transform: none;
}
</style>