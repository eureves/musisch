// https://on.cypress.io/api

describe('Sanity test', () => {
  it('', () => {
    cy.visit('/')
    cy.contains('#header a:first-child', 'Music')
  })
})
