import { AwayWithMakeUpTimeEntry } from "./features/AwayWithMakeUpTimeEntry"
import { TaskEntry } from "./features/TaskEntry"
import { TimeTrackerPage } from "./pages/TimeTrackerPage"

describe(`Away With Make Up Time Entry Happy Path`, () => {
  const testDate = new Date(2024, 9, 21)

  beforeEach(`Set Date and Authorize and Cleanup`, () => {
    // set cypress default date
    // we use different years for different tests, which does not overlap
    cy.clock(testDate, [
      `Date`,
    ])

    cy.authByApi()
    cy.removeTaskEntries(testDate)
    cy.removeAwayWithMakeUpEntries(testDate)
  })

  afterEach(`Cleanup`, () => {
    cy.removeTaskEntries(testDate)
    cy.removeAwayWithMakeUpEntries(testDate)
  })

  it(`
  GIVEN user was away for one hour from 13:00 to 14:00
  AND plans to make up this time from 17:00 to 18:00 on the same day
  WHEN user adds away with make up time entry in the time tracker
  AND user did it as planned and was working on the task from 17:00 to 18:00
  THEN user should see that everything has been successfully tracked in the time tracker
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

    AwayWithMakeUpTimeEntry.add()

    TaskEntry.add({
      startTime: `17:00`,
      endTime: `18:00`,
    })

    cy.wait(`@getEntries`)

    cy.contains(`Away With Make-up time`)

    cy.contains(`Make-up time`)

    cy.contains(`[E2E-SMOKE] Task 1`)
  })
})
