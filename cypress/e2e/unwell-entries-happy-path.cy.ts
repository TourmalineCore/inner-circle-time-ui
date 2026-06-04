import { UnwellEntry } from "./features/UnwellEntry"
import { TimeTrackerPage } from "./pages/TimeTrackerPage"

describe(`Unwell Entries Happy Path`, () => {
  const testDate = new Date(2023, 9, 23)

  beforeEach(`Set Date and Authorize and Cleanup`, () => {
    // set cypress default date
    // we use different years for different tests, which does not overlap
    cy.clock(testDate, [
      `Date`,
    ])

    cy.authByApi()
    cy.removeUnwellEntries(testDate)
  })

  afterEach(`Cleanup`, () => {
    cy.removeUnwellEntries(testDate)
  })

  it(`
  GIVEN empty time tracker table
  WHEN user adds a new unwell entry
  AND user clicks on this unwell entry for update
  THEN user should see the updated unwell entry in the time tracking table
  `, () => {
    cy.intercept(
      `GET`, 
      `/api/time/tracking/entries?startDate=2023-10-23&endDate=2023-10-29`)
      .as(`getEntries`)
      
    TimeTrackerPage.visit()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`October 23 – 29`)
      .should(`be.visible`)

    UnwellEntry.add()

    UnwellEntry.update()

    cy.wait(`@getEntries`)

    // figure out why the pipeline test is failing
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)

    UnwellEntry.checkAfterUpdate()
  })
})
