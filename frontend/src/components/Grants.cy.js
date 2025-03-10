import Grants from './Grants.vue'

describe('<Grants />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Grants)
  })
})