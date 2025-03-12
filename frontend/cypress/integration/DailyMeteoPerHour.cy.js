import { mount } from 'cypress/vue';
import { createPinia, setActivePinia } from 'pinia';
import { useAPIdata } from "@/stores/APIdata.js";
import DailyMeteoPerHour from '@/components/cards/DailyMeteo/DailyMeteoPerHour.vue';

describe('DayMeteo Component', () => {
    beforeEach(() => {

        const pinia = createPinia();
        setActivePinia(pinia);
        apiData = useAPIdata();

      // Intercept the API request and mock weather data
      cy.intercept('GET', '/api/meteoData', {
        statusCode: 200,
        body: {
          precipitation06: 10,
          temp06: 15,
          humidity06: 80,
          wind06: 10,
          precipitation12: 30,
          temp12: 20,
          humidity12: 70,
          wind12: 15,
          precipitation18: 50,
          temp18: 25,
          humidity18: 60,
          wind18: 20,
          precipitation24: 90,
          temp24: 18,
          humidity24: 75,
          wind24: 25,
        }
      }).as('getMeteoData');
  
      // Mount the component before running the tests
      cy.mount(DailyMeteoPerHour); // Make sure to import the component if needed
      cy.wait('@getMeteoData'); // Wait for the API request to complete
    });
  
    it('should render the component correctly when data is available', () => {
      // Ensure the main container exists
      cy.get('.daymeteoContainer').should('exist');
  
      // Check that all four time range cards are rendered
      cy.get('.daymeteo__card').should('have.length', 4);
  
      // Verify that the correct weather data is displayed
      cy.contains('00:00 - 06:00');
      cy.contains('Temperature: 15 °C');
      cy.contains('Precipitation probability: 10 %');
      cy.contains('Humidity: 80 %');
      cy.contains('Wind: 10 km/h');
  
      cy.contains('06:00 - 12:00');
      cy.contains('Temperature: 20 °C');
      cy.contains('Precipitation probability: 30 %');
      cy.contains('Humidity: 70 %');
      cy.contains('Wind: 15 km/h');
  
      cy.contains('12:00 - 18:00');
      cy.contains('Temperature: 25 °C');
      cy.contains('Precipitation probability: 50 %');
      cy.contains('Humidity: 60 %');
      cy.contains('Wind: 20 km/h');
  
      cy.contains('18:00 - 24:00');
      cy.contains('Temperature: 18 °C');
      cy.contains('Precipitation probability: 90 %');
      cy.contains('Humidity: 75 %');
      cy.contains('Wind: 25 km/h');
    });
  
    it('should display correct weather icons based on precipitation', () => {
      // Check that the correct weather icons are displayed based on precipitation levels
      cy.get('.daymeteo__card').eq(0).find('.day__icon').should('contain', '☀️'); // Sunny
      cy.get('.daymeteo__card').eq(1).find('.day__icon').should('contain', '⛅'); // Partly cloudy
      cy.get('.daymeteo__card').eq(2).find('.day__icon').should('contain', '☁️'); // Cloudy
      cy.get('.daymeteo__card').eq(3).find('.day__icon').should('contain', '🌧️'); // Rain
    });
  
    it('should not render the component when data is empty', () => {
      // Intercept API request with empty data
      cy.intercept('GET', '/api/meteoData', { statusCode: 200, body: {} }).as('getEmptyMeteoData');
  
      // Mount the component again with empty data
      cy.mount(DayMeteo);
      cy.wait('@getEmptyMeteoData');
  
      // The component should not be displayed when there is no data
      cy.get('.daymeteoContainer').should('not.exist');
    });
  });