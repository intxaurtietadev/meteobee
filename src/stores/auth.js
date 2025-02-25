// src/stores/auth.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null); // Estado del usuario autenticado
  const router = useRouter();

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/users?email=' + email);
      const users = await response.json();

      if (users.length > 0 && users[0].password === password) {
        user.value = users[0]; // Guardar el usuario autenticado
        localStorage.setItem('user', JSON.stringify(user.value)); // Guardar en localStorage
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (err) {
      throw new Error('Error al iniciar sesión');
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    user.value = null;
    localStorage.removeItem('user'); // Eliminar del localStorage
    router.push('/login'); // Redireccionar al login
  };

  // Función para verificar la autenticación al cargar la app
  const checkAuth = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  };

  return { user, login, logout, checkAuth };
});