// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })ç

import { mount } from '@cypress/vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

export const mountWithPinia = (component) => {
  const pinia = createPinia();  // Crear una nueva instancia de Pinia
  const app = createApp(component);
  app.use(pinia);  // Usamos Pinia como plugin en la app Vue

  // Montamos el componente con Pinia
  return mount(component, {
    global: {
      plugins: [pinia],  // Usamos Pinia como plugin en el contexto global
    },
  });
};
