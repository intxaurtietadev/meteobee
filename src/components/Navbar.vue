<template>
  <nav class="navbar">
    <div class="navbar__logo">MiSitio</div>
    <div class="navbar__menu-toggle" @click="toggleMenu">
      <!-- Ícono de hamburguesa (SVG) -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-list"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
        />
      </svg>
    </div>
    <ul class="navbar__nav-links" :class="{ 'navbar__nav-links--open': isOpen }">
      <li><a href="#home">Inicio</a></li>
      <li><a href="#proyectos">Proyectos</a></li>
      <li><a href="#blog">Blog</a></li>
      <li><a href="#about">Acerca de</a></li>
    </ul>
  </nav>
  <div class="navbar__user">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isOpen: false, // Estado inicial cerrado
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style>
/* Estilo básico para el nav */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) var(--space-lg);
  position: fixed;
  width: 80%;
  top: 0;
  left: 0;
  color: var(--color-text);
  z-index: 1000;
  background-color: var(--color-background);
  font-family: var(--font-family);
}

.navbar__logo {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.navbar__nav-links {
  list-style: none;
  display: flex;
  gap: var(--space-md);
  transition: transform var(--transition-duration) ease;
}

.navbar__nav-links a {
  color: var(--color-text);
  text-decoration: none;
}

/*user*/ 


/* Estilos del menú hamburguesa */
.navbar__menu-toggle {
  display: none; /* Ocultar en desktop */
  cursor: pointer;
}

.navbar__menu-toggle svg {
  width: 24px;
  height: 24px;
  fill: var(--color-text); /* Color del ícono */
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
  }

  .navbar__nav-links--open {
    transform: translateY(0); /* Mostrar el menú */
    opacity: 1;
    visibility: visible;
  }

  .navbar__nav-links li {
    padding: var(--space-sm) 0;
  }
}
</style>