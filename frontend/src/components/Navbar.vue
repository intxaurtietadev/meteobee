<template>
  <nav class="navbar">
    <div class="navbar__logo">
      <div><img src="../assets/img/logo.png" alt="" width="60" height="60">
      </div>
      <div>Meteobee</div>
      </div>
    <div class="navbar__menu-toggle" @click="toggleMenu">
      <!-- Ícono de hamburguesa (SVG) -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="navbar__menu-icon"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
        />
      </svg>
    </div>
    <ul class="navbar__nav-links" :class="{ 'navbar__nav-links--open': isOpen }">
      <li class="navbar__nav-item"><router-link to="/" class="navbar__link">Inicio</router-link></li>
      <li class="navbar__nav-item"><router-link to="/ayudas" class="navbar__link">Subvenciones</router-link></li>
      <li class="navbar__nav-item"><router-link to="/noticias" class="navbar__link">Noticias</router-link></li>
    </ul>
    <!-- Ícono de usuario, redirigir al login -->
    <div class="navbar__user" @click="handleUserClick"> <!-- Aquí redirigimos a la página de login -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="navbar__user-icon"
        viewBox="0 0 16 16"
      >
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
        <path
          fill-rule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
        />
      </svg>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  name: "NavBar",
  data() {
    return {
      isOpen: false,
      auth: useAuthStore(),
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    handleUserClick() {
      if (this.auth.user.id) {
        this.$router.push('/profile')
      } else {
        this.$router.push('/login')
      }
    }
  }
}

</script>

<style>
/* Estilo básico para el nav (Block) */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) var(--space-lg);
  position: fixed;
  width: 80%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: var(--color-text);
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.801);/* --color-primary con transparencia */
  font-family: var(--font-family);
  font-size: var(--font-size-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

/* Elementos del navbar */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.navbar__nav-links {
  list-style: none;
  display: flex;
  gap: var(--space-md);
  transition: transform var(--transition-duration) ease;
  margin-right: 4rem;

}

.navbar__link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: var(--font-weight-normal);
  transition: color var(--transition-duration) ease;
}

.navbar__link:hover {
  color: var(--color-primary);
}

/* Ícono de usuario */
.navbar__user {
  display: flex;
  align-items: center;
}

.navbar__user-icon {
  width: 24px;
  height: 24px;
  fill: var(--color-primary); /* Color del ícono */
  cursor: pointer;
}

/* Menú hamburguesa */
.navbar__menu-toggle {
  display: none; /* Ocultar en desktop */
  cursor: pointer;
}

.navbar__menu-icon {
  width: 24px;
  height: 24px;
  fill: var(--color-primary); /* Color del ícono */
}

/* Modificador para el menú abierto */
.navbar__nav-links--open {
  transform: translateY(0); /* Mostrar el menú */
  opacity: 1;
  visibility: visible;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar__menu-toggle {
    display: block; /* Mostrar el menú hamburguesa en móviles */
  }

  .navbar__nav-links {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    flex-direction: column;
    align-items: center;
    transform: translateY(-100%); /* Ocultar el menú por defecto */
    padding: var(--space-sm) 0;
    margin: 0;
    opacity: 0;
    visibility: hidden;
    transition: transform var(--transition-duration) ease, opacity var(--transition-duration) ease, visibility var(--transition-duration) ease;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    background-color: rgba(230, 230, 230, 0.87);
  }

  .navbar__nav-links--open {
    transform: translateY(0); /* Mostrar el menú */
    opacity: 1;
    visibility: visible;
  }

  .navbar__nav-item {
    padding: var(--space-sm) 0;
  }
}
</style>