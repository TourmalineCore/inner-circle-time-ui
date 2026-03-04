import { TaskEntry } from "./features/TaskEntry"
import { TimeTrackerPage } from "./pages/TimeTrackerPage"

describe(`Copy Entries Happy Path`, () => {
  const testDate = new Date(2027, 9, 27)

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
  WHEN add a new task entry
  SHOULD see it in the time tracker table
  THEN click on this task entry
  AND click on copy button
  AND click on a free time slot 
  SHOULD see copied card with filled data
  `, () => {
    TimeTrackerPage.visit()

    TimeTrackerPage.clickOnTimeSlot()

    // Waiting for the table to be displayed in the desktop version
    cy.contains(`October 25 – 31`)
      .should(`be.visible`)

    TaskEntry.fill()

    TaskEntry.copy()

    TimeTrackerPage.clickOnTimeSlot()

    TaskEntry.checkAfterCopy()
  })
})
