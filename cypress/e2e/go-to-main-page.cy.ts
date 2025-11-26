describe(`Go to the main page after authorization`, () => {
  beforeEach(`Authorize`, () => {
    cy.authByApi()
  })

  it(`
  GIVEN authorized user
  WHEN goes to the website
  THEN get to the main page
  `, () => {
    cy.visit(`/`)
        
    cy.contains(`Employees`)
  })
})
