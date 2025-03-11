import { mountWithPinia } from 'cypress/support/commands'  
import TownSelect from '@/components/TownSelect.vue'

describe('Provincia y Municipio Component Tests', () => {

  mountWithPinia(TownSelect)

    // Simula los datos de las provincias y municipios
    const provinciasMock = [
      { provincia: 'Madrid', CP: '28000' },
      { provincia: 'Barcelona', CP: '08000' }
    ];
  
    const municipiosMock = [
      { NOMBRE: 'Madrid Capital', CP: '28001', provincia: 'Madrid' },
      { NOMBRE: 'Alcalá de Henares', CP: '28801', provincia: 'Madrid' },
      { NOMBRE: 'Barcelona Capital', CP: '08001', provincia: 'Barcelona' },
      { NOMBRE: 'Badalona', CP: '08911', provincia: 'Barcelona' }
    ];
  
    beforeEach(() => {
      // Antes de cada prueba, visitamos la página donde se encuentra el componente
      cy.visit('/'); // Ajusta la URL a donde esté tu componente
      cy.window().then((win) => {
        // Poner los mocks de los datos directamente en el window object
        win.provinciasData = provinciasMock;
        win.municipiosData = municipiosMock;
      });
    });
  
    it('should render the province and town select elements', () => {
      // Verifica que los selectores estén presentes en la página
      cy.get('#selectprovincia').should('exist');
      cy.get('#selectMunicipio').should('exist');
    });
  
    it('should update municipality list when a province is selected', () => {
      // Seleccionamos una provincia (Madrid)
      cy.get('#selectprovincia').select('Madrid');
  
      // Verifica que el municipio "Madrid Capital" está presente en el select de municipios
      cy.get('#selectMunicipio').should('contain', 'Madrid Capital');
      cy.get('#selectMunicipio').should('contain', 'Alcalá de Henares');
      
      // Verifica que los municipios de Barcelona no estén presentes
      cy.get('#selectMunicipio').should('not.contain', 'Barcelona Capital');
      cy.get('#selectMunicipio').should('not.contain', 'Badalona');
    });
  
    it('should update the store with the selected municipality', () => {
      // Simulamos la selección de una provincia
      cy.get('#selectprovincia').select('Madrid');
      
      // Seleccionamos un municipio de la lista filtrada
      cy.get('#selectMunicipio').select('28001'); // Seleccionamos "Madrid Capital"
      
      // Verifica que el municipio se actualiza correctamente en la store (apiData.municipioSelected)
      cy.window().then((win) => {
        expect(win.apiData.municipioSelected).to.equal('28001'); // El CP de Madrid Capital
      });
      
      // Verifica que el nombre del municipio se guarda correctamente (apiData.muniSel)
      cy.window().then((win) => {
        expect(win.apiData.muniSel).to.equal('Madrid Capital');
      });
    });
  
    it('should reset data when reset button is clicked', () => {
      // Seleccionamos una provincia
      cy.get('#selectprovincia').select('Madrid');
      
      // Seleccionamos un municipio
      cy.get('#selectMunicipio').select('28001'); // Seleccionamos "Madrid Capital"
      
      // Verifica que el municipio está seleccionado
      cy.window().then((win) => {
        expect(win.apiData.municipioSelected).to.equal('28001');
        expect(win.apiData.muniSel).to.equal('Madrid Capital');
      });
      
      // Hacemos clic en el botón de reset
      cy.get('button').contains('BOTON RESET METEODATA').click();
      
      // Verifica que los datos se resetean
      cy.window().then((win) => {
        expect(win.apiData.municipioSelected).to.be.null;
        expect(win.apiData.muniSel).to.be.empty;
      });
    });
  
  });