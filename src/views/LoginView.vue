<template>
    <div class="login">
      <Login />
    </div>
  </template>
  
  <script setup>
  import Login from '../components/Login.vue';
  
  </script>
  
  <style scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--color-background);
    font-family: var(--font-family);
  }
  </style>
  