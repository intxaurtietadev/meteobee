import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref({
    id: null,
    name: '',
    email: '',
    password: '',
    provincia: '',
    municipio: '',
    numColmenas: 0,
    especieAbeja: '',
    avatar: ''
  }); // Estado inicial con valores predeterminados

  const router = useRouter();

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/users?email=' + email);
      const users = await response.json();
  
      console.log('Respuesta del servidor:', users); // <-- Inspecciona la respuesta
  
      if (users.length > 0 && users[0].password === password) {
        const userData = users[0];
  
        // Mapear los datos del servidor a los nombres esperados
        user.value = {
          id: userData.id,
          name: userData.name || '',
          email: userData.email || '',
          password: userData.password || '',
          provincia: userData.province || '', // Mapear "province" a "provincia"
          municipio: userData.municipality || '', // Mapear "municipality" a "municipio"
          numColmenas: userData.colmenas || 0, // Mapear "colmenas" a "numColmenas"
          especieAbeja: Array.isArray(userData.species) ? userData.species.join(', ') : '', // Convertir array a string
          avatar: userData.avatar || ''
        };
  
        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(user.value));
  
        // Redirigir al perfil
        router.push('/profile');
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err.message); // <-- Muestra errores en la consola
      throw new Error('Error al iniciar sesión: ' + err.message);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    user.value = {
      id: null,
      name: '',
      email: '',
      password: '',
      provincia: '',
      municipio: '',
      numColmenas: 0,
      especieAbeja: '',
      avatar: ''
    };
    localStorage.removeItem('user'); // Eliminar del localStorage
    router.push('/login'); // Redireccionar al login
  };

  // Función para verificar la autenticación al cargar la app
  const checkAuth = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = {
        ...user.value,
        ...JSON.parse(storedUser)
      };
    }
  };

  return { user, login, logout, checkAuth };
});