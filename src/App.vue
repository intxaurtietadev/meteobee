<template>
  <div id="app">
    <Navbar @toggle-login="showLogin = !showLogin" />
    <router-view></router-view> <!-- Aquí se renderiza la vista correspondiente a la ruta -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';

const showLogin = ref(false);  // Estado para controlar si el login debe mostrarse
</script>
