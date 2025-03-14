import BentoGrid from './BentoGrid.vue'

describe('<BentoGrid />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(BentoGrid)
  })
})