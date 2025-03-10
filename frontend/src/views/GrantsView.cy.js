import GrantsView from './GrantsView.vue'

describe('<GrantsView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(GrantsView)
  })
})