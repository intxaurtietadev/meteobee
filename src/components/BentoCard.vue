<template>
  <div
    class="card"
    :class="{ 'card--active': isActive }"
    :style="{ backgroundColor: bgColor }"
  >
    <!-- Slot para contenido personalizado -->
    <slot>
      <!-- Contenido por defecto -->
      <img v-if="img" :src="img" alt="Card image" class="card__image" />
      <h3 class="card__title">{{ title }}</h3>
      <p class="card__description">{{ description }}</p>
    </slot>
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
/* Estilos base para todas las tarjetas */
.card {
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform var(--transition-duration) ease, box-shadow var(--transition-duration) ease;
}

.card--active {
  cursor: grabbing;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
}

.card:hover {
  transform: scale(1.05);
}

.card__image {
  width: 6.25rem;
  height: 6.25rem;
  margin-bottom: var(--space-sm);
  object-fit: contain;
  border-radius: var(--border-radius);
}

.card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-xs);
}

.card__description {
  font-size: var(--font-size-base);
  color: var(--color-text);
}
</style>