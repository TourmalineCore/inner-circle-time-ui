import { TimeTrackerPage } from "./pages/TimeTrackerPage"

describe(`Work Entries Happy Path`, () => {
  beforeEach(`Set Date and Authorize and Cleanup`, () => {
    // set cypress default date
    cy.clock(new Date(2025, 9, 27), [
      `Date`,
    ])

    cy.authByApi()
    cy.removeWorkEntries()
  })

  afterEach(`Cleanup`, () => {
    cy.removeWorkEntries()
  })

  it(`
  GIVEN empty time tracker table
  WHEN add a new work entry
  SHOULD see it in the time tracker table
  THEN click on this work entry
  AND update data in it 
  SHOULD see correct data in the time tracker table
  `, () => {
    TimeTrackerPage.visit()

    cy.intercept(`/api/time/tracking/work-entries?startDate=2025-10-27&endDate=2025-10-27`, {
      statusCode: 200,
    })
      .as(`getWorkEntries`)

    cy.wait(`@getWorkEntries`)

    TimeTrackerPage.addWorkEntry()

    TimeTrackerPage.updateWorkEntry()

    TimeTrackerPage.checkWorkEntryAfterUpdate()
  })
})
