<template>
  <div id="app">
    <Navbar @toggle-login="showLogin = !showLogin" />
    <Login v-if="showLogin" @close-login="showLogin = false" />
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Login from '@/components/Login.vue';

const showLogin = ref(false);  // Estado para controlar si el login debe mostrarse
</script>
