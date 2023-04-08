describe('Login spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('Login').click()

    cy.get('input[name="email"]').type('testUser@gmail.com')
    cy.get('input[name="password"]').type('Passpass1')

    cy.get('button[type="submit"]').click()



  })
})
