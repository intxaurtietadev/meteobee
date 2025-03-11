import { mount } from 'cypress/vue';
import { createPinia, setActivePinia } from 'pinia';
import { useAPIdata } from "@/stores/APIdata.js";
import TownSelect from '@/components/cards/DailyMeteo/TownSelect.vue';

describe('Provincia y Municipio Component Tests', () => {
  
  let pinia;  
  let APIdata;

  beforeEach(() => {

    pinia = createPinia();
    setActivePinia(pinia);

    // 🔹 Accedemos al store y lo inicializamos
    APIdata = useAPIdata();

    mount(TownSelect, {
      global: {
        plugins: [createPinia()]
      }
    });
  });

  it('should render the province and town select elements', () => {
    cy.get('#selectprovincia').should('exist');
    cy.get('#selectMunicipio').should('exist');
  });

  it('should update municipality list when a province is selected', () => {
    cy.get('#selectprovincia').should('have.descendants', 'option');
    cy.get('#selectprovincia').select('Burgos');

    cy.get('#selectMunicipio').should('contain', 'Altable');
    cy.get('#selectMunicipio').should('contain', 'Arija');
  });

  it('should update the store with the selected municipality', () => {
    cy.get('#selectprovincia').should('have.descendants', 'option');
    cy.get('#selectprovincia').select('Burgos');
    cy.get('#selectMunicipio').select('Arija');

    // 🔹 Esperamos a que apiData esté definido antes de verificarlo
    cy.window().should((win) => {
      cy.wait(5000);
      expect(win.apiData).to.have.property('municipioSelected');
      expect(win.apiData.municipioSelected).to.equal('09025');
      expect(win.apiData.muniSel).to.equal('Arija');
    });
  });

  it('should reset data when reset button is clicked', () => {
    cy.get('#selectprovincia').should('have.descendants', 'option');
    cy.get('#selectprovincia').select('Burgos');
    cy.get('#selectMunicipio').select('09025');

      
    cy.window().should((win) => {
      expect(win.apiData).to.have.property('municipioSelected');
      expect(win.apiData.municipioSelected).to.equal('09025');
      expect(win.apiData.muniSel).to.equal('Arija');
    });

    cy.get('button').contains('BOTON RESET METEODATA').click();

    cy.window().should((win) => {
      expect(win.apiData.municipioSelected).to.be.null;
      expect(win.apiData.muniSel).to.be.empty;
    });
  });
});
