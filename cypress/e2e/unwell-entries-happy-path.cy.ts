import { TimeTrackerPage } from "./pages/TimeTrackerPage"

describe(`Unwell Entries Happy Path`, () => {
  beforeEach(`Set Date and Authorize and Cleanup`, () => {
    // set cypress default date
    // we use different years for different tests, which does not overlap
    cy.clock(new Date(2026, 9, 27), [
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
  WHEN add a new unwell entry
  SHOULD see it in the time tracker table
  THEN click on this unwell entry
  AND update data in it 
  SHOULD see correct data in the time tracker table
  `, () => {
    TimeTrackerPage.visit()

    // Waiting for the table to be displayed in the desktop version
    cy.contains(`October 26 – November 01`)
      .should(`be.visible`)

    TimeTrackerPage.addUnwellEntry()

    TimeTrackerPage.updateUnwellEntry()

    TimeTrackerPage.checkUnwellEntryAfterUpdate()
  })
})
