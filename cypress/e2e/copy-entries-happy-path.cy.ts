import { TaskEntry } from "./features/TaskEntry"
import { TimeTrackerPage } from "./pages/TimeTrackerPage"

describe(`Copy Entries Happy Path`, () => {
  const testDate = new Date(2022, 9, 24)

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
  AND user clicks on this task entry for copy
  AND user clicks on a free time slot 
  THEN user should see the copied card with filled data
  `, () => {
    cy.intercept(
      `GET`, 
      `/api/time/tracking/entries?startDate=2022-10-24&endDate=2022-10-30`)
      .as(`getEntries`)
      
    TimeTrackerPage.visit()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`October 24 – 30`)
      .should(`be.visible`)

    TaskEntry.add()

    cy.wait(`@getEntries`)

    TaskEntry.copy()

    TimeTrackerPage.clickOnFirstTimeSlot()

    TaskEntry.checkAfterCopy()
  })
})
