import { MonthPicker } from "./MonthPicker"

describe(`MonthPicker`, () => {
  it(`
  GIVEN month picker component 
  WHEN mount
  SHOULD render month picker component
  `, () => {
    mountComponent()

    cy
      .getByData(`month-picker`)
      .should(`exist`)
  })

  it(`
  GIVEN month picker component 
  WHEN select next year
  SHOULD render correct date
  `, () => {
    mountComponent()

    cy
      .getByData(`month-picker`)
      .click()

    cy
      .get(`[aria-label="Next Year"]`)
      .click()

    cy
      .contains(`Jan`)
      .click()

    cy
      .get(`@onChange`)
      .should(`have.been.calledOnce`)
  })
})

function mountComponent() {
  const onChange = cy.spy()
    .as(`onChange`)

  cy.mount(
    <MonthPicker
      selectedMonth={new Date(`2023-08-1`)}
      onChange={onChange}
    />,
  )
}