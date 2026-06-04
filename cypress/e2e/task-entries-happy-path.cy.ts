import { TaskEntry } from "./features/TaskEntry"
import { TimeTrackerPage } from "./pages/TimeTrackerPage"

describe(`Task Entries Happy Path`, () => {
  const testDate = new Date(2024, 9, 21)

  beforeEach(`Set Date and Authorize and Cleanup`, () => {
    // set cypress default date
    // we use different years for different tests, which does not overlap
    cy.clock(testDate, [
      `Date`,
    ])

    cy.authByApi()
    cy.removeTaskEntries(testDate)
  })

  afterEach(`Cleanup`, () => {
    cy.removeTaskEntries(testDate)
  })

  it(`
  GIVEN empty time tracker table
  WHEN user adds a new task entry
  AND user clicks on this task entry for update
  THEN user should see the updated task entry in the time tracking table
  `, () => {
    cy.intercept(
      `GET`, 
      `/api/time/tracking/entries?startDate=2024-10-21&endDate=2024-10-27`)
      .as(`getEntries`)
      
    TimeTrackerPage.visit()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`October 21 – 27`)
      .should(`be.visible`)

    TaskEntry.add()

    TaskEntry.update()

    cy.wait(`@getEntries`)

    TaskEntry.checkAfterUpdate()
  })
})
