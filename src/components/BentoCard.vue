<template>
    <div
      class="card"
      :style="{ backgroundColor: bgColor }"
      data-swapy-item
    >
      <img v-if="img" :src="img" alt="Card image" class="card-img" />
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    description: String,
    bgColor: String,
    img: String,
  });
  </script>
  
  <style scoped>
  .card {
    border-radius: 1rem; /* 16px */
    box-shadow: 0 0.625rem 0.9375rem rgba(0, 0, 0, 0.1); /* 10px 15px */
    padding: 1.5rem; /* 24px */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease;
    cursor: grab; /* Cambia el cursor al arrastrar */
  }
  
  .card:active {
    cursor: grabbing; /* Cambia el cursor cuando se está arrastrando */
  }
  
  .card:hover {
    transform: scale(1.05);
  }
  
  .card-img {
    width: 6.25rem; /* 100px */
    height: 6.25rem; /* 100px */
    margin-bottom: 1rem; /* 16px */
    object-fit: contain;
    border-radius: 0.75rem; /* 12px */
  }
  
  .card-title {
    font-size: 1.25rem; /* 20px */
    font-weight: bold;
    margin-bottom: 0.5rem; /* 8px */
  }
  
  .card-description {
    font-size: 1rem; /* 16px */
    color: #4a4a4a;
  }
  </style>