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
  padding: 10px 20px;
  background-color: #4d6c32;
  position: fixed;
  width: 80%;
  top: 0;
  left: 0;
  color: white;
  z-index: 1000;
}

.navbar__logo {
  font-size: 1.2rem;
  font-weight: bold;
}

.navbar__nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  transition: transform 0.3s ease;
}

.navbar__nav-links a {
  color: white;
  text-decoration: none;
}

/* Estilos del menú hamburguesa */
.navbar__menu-toggle {
  display: none; /* Ocultar en desktop */
  cursor: pointer;
}

.navbar__menu-toggle svg {
  width: 24px;
  height: 24px;
  fill: white; /* Color del ícono */
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
    background: #4d6c32;
    flex-direction: column;
    align-items: center;
    transform: translateY(-100%); /* Ocultar el menú por defecto */
    padding: 10px 0;
    margin: 0;
    opacity: 0;
    visibility: hidden;
    transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
  }

  .navbar__nav-links--open {
    transform: translateY(0); /* Mostrar el menú */
    opacity: 1;
    visibility: visible;
  }

  .navbar__nav-links li {
    padding: 10px 0;
  }
}
</style>