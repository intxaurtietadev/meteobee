<template>
  <div id="app">
    <Navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'; 
import {  RouterView } from 'vue-router'
</script>

<style>

</style>