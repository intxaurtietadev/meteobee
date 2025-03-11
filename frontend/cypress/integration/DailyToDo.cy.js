import { mount } from 'cypress/vue';
import { createPinia, setActivePinia } from 'pinia';
import { useAPIdata } from "@/stores/APIdata.js";
import DailyToDo from '@/components/cards/DailyToDo.vue';

describe('DailyToDo Component Tests', () => {
  let apiData;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    apiData = useAPIdata();

    cy.intercept('GET', '/advice.json', {
        fixture: 'advice.json' 
      });

    mount(DailyToDo, {
      global: {
        plugins: [pinia]
      }
    });
  });

  it('should render the component correctly', () => {
    cy.get('.daily__advice').should('exist');
    cy.contains('h3', 'Recomendaciones diarias').should('be.visible');
  });

  it('should not display advice blocks when no meteoData is available', () => {
    cy.get('.advice-block').should('not.exist');
  });

  it('should display advice blocks when meteoData is available', () => {
    // Simulamos datos meteorológicos en el store
    apiData.meteoData0 = {
        precipitation: 20,
        precipitation06: 50,
        precipitation12: 50,
        precipitation18: 30,
        precipitation24: 0,
        snow: 0,
        max_temp: 20,
        min_temp: 15,
        temp06: 15,
        temp12: 20,
        temp18: 20,
        temp24: 15,
        max_humidity: 60,
        min_humidity: 30,
        humidity06: 30,
        humidity12: 40,
        humidity18: 50,
        humidity24: 60,
        wind: 0,
        wind06: 10,
        wind12: 10,
        wind18: 0,
        wind24: 0,
        uv_index: 2
    };

    // Esperamos a que el componente actualice los datos
    cy.wait(500);

    // Verificamos que los bloques de recomendaciones existen
    cy.get('.advice-block').should('have.length.at.least', 2);
    cy.contains('h4', 'Precipitaciones').should('exist');
    cy.contains('h4', 'Nieve').should('exist');
    cy.contains('h4', 'Temperatura').should('exist');
    cy.contains('h4', 'Humedad').should('exist');
    cy.contains('h4', 'Viento').should('exist');
    cy.contains('h4', 'Índice UV').should('exist');
  });

  it('should correctly update advice when meteoData changes', () => {
    // Establecemos los datos meteorológicos iniciales
    apiData.meteoData0 = {
        precipitation: 20,
        precipitation06: 50,
        precipitation12: 50,
        precipitation18: 30,
        precipitation24: 0,
        snow: 0,
        max_temp: 20,
        min_temp: 15,
        temp06: 15,
        temp12: 20,
        temp18: 20,
        temp24: 15,
        max_humidity: 60,
        min_humidity: 30,
        humidity06: 30,
        humidity12: 40,
        humidity18: 50,
        humidity24: 60,
        wind: 0,
        wind06: 10,
        wind12: 10,
        wind18: 0,
        wind24: 0,
        uv_index: 2
    };

    cy.wait(500);

    // Comprobamos que los valores iniciales están en pantalla
    cy.contains('h4', 'Precipitaciones').should('exist');
    cy.contains('h4', 'Temperatura').should('exist');

    // Cambiamos los valores del store
    apiData.meteoData0 = {
        precipitation: 50,
        precipitation06: 20,
        precipitation12: 20,
        precipitation18: 20,
        precipitation24: 50,
        snow: 0,
        max_temp: 32,
        min_temp: 26,
        temp06: 26,
        temp12: 28,
        temp18: 32,
        temp24: 26,
        max_humidity: 90,
        min_humidity: 70,
        humidity06: 70,
        humidity12: 70,
        humidity18: 90,
        humidity24: 90,
        wind: 0,
        wind06: 8,
        wind12: 15,
        wind18: 15,
        wind24: 0,
        uv_index: 3
    };

    cy.wait(500);

    // Comprobamos que los valores han cambiado correctamente
    cy.contains('h4', 'Nieve').should('exist');
    cy.contains('h4', 'Índice UV').should('exist');
  });
});