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
      snow: 5,
      uv_index: 8,
      min_temp: 10,
      max_temp: 20,
      min_humidity: 30,
      max_humidity: 60,
      wind: 15,
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
      snow: 0,
      uv_index: 3,
      min_temp: 5,
      max_temp: 15,
      min_humidity: 40,
      max_humidity: 70,
      precipitation: 100,
      wind: 0
    };

    cy.wait(500);

    // Comprobamos que los valores iniciales están en pantalla
    cy.contains('h4', 'Precipitaciones').should('exist');
    cy.contains('h4', 'Temperatura').should('exist');

    // Cambiamos los valores del store
    apiData.meteoData0 = {
      snow: 8,
      uv_index: 9,
      min_temp: 2,
      max_temp: 12,
      min_humidity: 20,
      max_humidity: 50,
      precipitation: 5,
      wind: 20
    };

    cy.wait(500);

    // Comprobamos que los valores han cambiado correctamente
    cy.contains('h4', 'Nieve').should('exist');
    cy.contains('h4', 'Índice UV').should('exist');
  });
});