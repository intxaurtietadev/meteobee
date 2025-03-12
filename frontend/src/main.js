import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate'

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist)   


app.use(pinia);
app.use(router); 


import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
authStore.checkAuth() // <-- Recupera el usuario si estaba logueado


app.mount('#app');