context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/index.html')
  })

  it('successful login into App', () => {
    // https://on.cypress.io/type
    cy.get('#login').type('club@kin-ball.fr')
    cy.get('#password').type('test')
    cy.get('#btnLogin').click()

    cy.location('hash').should('include', 'home')
  })
})
