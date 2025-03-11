import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { mount } from '@cypress/vue';
import TownSelect from '../../src/components/TownSelect.vue';  // Ajusta la ruta al componente

beforeEach(() => {
  const pinia = createPinia();  // Crea una nueva instancia de Pinia

  // Crea la instancia de Vue
  const app = createApp(TownSelect);

  app.use(pinia);  // Usa Pinia en la app Vue

  // Monta el componente dentro de Cypress
  mount(TownSelect, {
    global: {
      plugins: [pinia],  // Usamos Pinia como plugin en el contexto global
    },
  });
});