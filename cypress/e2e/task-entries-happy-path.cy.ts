import { TimeTrackerPage } from "./pages/TimeTrackerPage"

describe(`Task Entries Happy Path`, () => {
  beforeEach(`Set Date and Authorize and Cleanup`, () => {
    // set cypress default date
    cy.clock(new Date(2025, 9, 27), [
      `Date`,
    ])

    cy.authByApi()
    cy.removeEntries()
  })

  afterEach(`Cleanup`, () => {
    cy.removeEntries()
  })

  it(`
  GIVEN empty time tracker table
  WHEN add a new task entry
  SHOULD see it in the time tracker table
  THEN click on this work entry
  AND update data in it 
  SHOULD see correct data in the time tracker table
  `, () => {
    TimeTrackerPage.visit()

    cy.contains(`October 27 – November 02`)
      .should(`be.visible`)

    TimeTrackerPage.addTaskEntry()

    TimeTrackerPage.updateTaskEntry()

    TimeTrackerPage.checkTaskEntryAfterUpdate()
  })
})
