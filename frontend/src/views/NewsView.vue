<template>
    <div class="news">
      <h1 class="news__title">Últimas Noticias</h1>
      <div class="news__list">
        <NewsCard v-for="newsItem in news" :key="newsItem.id" :news="newsItem" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import NewsCard from '../components/cards/News.vue';
  
  // Array to store news
  const news = ref([]);
  
  const fetchNews = async () => {
      // Load JSON data
      const response = await fetch('/news.json');
      // Turn response into .json
      const data = await response.json();
      news.value = data.news;
  };
  
  onMounted(fetchNews);
  </script>
  
  <style scoped>
  .news {
    padding-top: 7rem;
    max-width: 60rem;
    margin: auto;
    font-family: var(--font-family);
  }
  
  .news__title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .news__list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  </style>