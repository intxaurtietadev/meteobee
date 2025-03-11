import TownSelect from './TownSelect.vue'

describe('<TownSelect />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(TownSelect)
  })
})