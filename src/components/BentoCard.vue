<template>
  <div
    class="card"
    :class="{ 'card--active': isActive }"
    :style="{ backgroundColor: bgColor }"
    data-swapy-item
  >
    <img v-if="img" :src="img" alt="Card image" class="card__image" />
    <h3 class="card__title">{{ title }}</h3>
    <p class="card__description">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  bgColor: String,
  img: String,
  isActive: Boolean, // Prop opcional para estado activo
});
</script>

<style scoped>
/* Bloque principal */
.card {
  border-radius: 1rem; /* 16px */
  box-shadow: 0 0.625rem 0.9375rem rgba(0, 0, 0, 0.1); /* 10px 15px */
  padding: 1.5rem; /* 24px */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Modificador: Estado activo */
.card--active {
  cursor: grabbing; /* Cambia el cursor cuando se está arrastrando */
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2); /* Sombra más pronunciada */
}

/* Hover */
.card:hover {
  transform: scale(1.05);
}

/* Elemento: Imagen */
.card__image {
  width: 6.25rem; /* 100px */
  height: 6.25rem; /* 100px */
  margin-bottom: 1rem; /* 16px */
  object-fit: contain;
  border-radius: 0.75rem; /* 12px */
}

/* Elemento: Título */
.card__title {
  font-size: 1.25rem; /* 20px */
  font-weight: bold;
  margin-bottom: 0.5rem; /* 8px */
}

/* Elemento: Descripción */
.card__description {
  font-size: 1rem; /* 16px */
  color: #4a4a4a;
}
</style>