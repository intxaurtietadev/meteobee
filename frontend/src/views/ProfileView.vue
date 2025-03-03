<template>
  <div class="profile">
    <div class="profile__container">
      <h1 class="profile__title">Perfil de Usuario</h1>
      <p class="profile__welcome">Bienvenido, <strong>{{ user.name }}</strong>!</p>

      <div class="profile__info">
        <div class="profile__avatar">
          <img :src="avatarUrl" alt="Avatar de usuario" class="profile__avatar-img" />
        </div>
        <div class="profile__details">
          <p class="profile__field"><strong>Email:</strong> {{ user.email }}</p>
          <p class="profile__field"><strong>Provincia:</strong> {{ user.provincia }}</p>
          <p class="profile__field"><strong>Municipio:</strong> {{ user.municipio }}</p>
          <p class="profile__field"><strong>Colmenas:</strong> {{ user.numColmenas }}</p>
          <p class="profile__field"><strong>Especie:</strong> {{ user.especieAbeja }}</p>
        </div>
      </div>

      <button class="profile__button profile__button--logout" @click="logout">Cerrar sesión</button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const avatarUrl = computed(() => user.value.avatar || '/default-avatar.png');

const logout = () => {
  authStore.logout();
};
</script>

<style scoped>
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--color-background);
  font-family: var(--font-family);
}

.profile__container {
  background: white;
  padding: var(--space-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  width: 90%;
  max-width: 500px;
  text-align: center;
}

.profile__title {
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  margin-bottom: var(--space-sm);
  font-weight: var(--font-weight-bold);
}

.profile__welcome {
  font-size: var(--font-size-lg);
  color: var(--color-text);
  margin-bottom: var(--space-md);
}

.profile__info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile__avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: var(--space-sm);
  border: 3px solid var(--color-tertiary);
}

.profile__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile__details {
  text-align: left;
  width: 100%;
}

.profile__field {
  font-size: var(--font-size-base);
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.profile__button {
  margin-top: var(--space-md);
  background: var(--color-secondary);
  color: var(--color-text);
  border: none;
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background var(--transition-duration);
}

.profile__button--logout {
  background: var(--color-accent);
  color: white;
}

.profile__button--logout:hover {
  background: var(--color-light);
}
</style>
