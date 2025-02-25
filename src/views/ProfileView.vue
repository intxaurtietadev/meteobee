<template>
    <div class="profile-view">
      <h1>Perfil de Usuario</h1>
      <p>Bienvenido, {{ user.name }}!</p>
      <button @click="logout">Cerrar sesión</button>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/stores/auth';
  
  const authStore = useAuthStore();
  const user = authStore.user;
  
  const logout = () => {
    authStore.logout(); // Cerrar sesión
  };
  </script>
  
  <style scoped>
  /* Estilos de perfil */
  </style>
  