context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/sikb-front/index.html')
  })

  it('successful login into App', () => {
    cy.get('#login').type('club@kin-ball.fr')
    cy.get('#password').type('test')
    cy.get('#btnLogin').click()

    cy.location('hash').should('include', 'home')
  })
})
