import { TrackingPageActions } from "../pages-actions/trackingPageActions"

describe(`Metrics Happy Path`, () => {
  const firstTestDate = new Date(2026, 8, 7)
  const secondTestDate = new Date(2026, 8, 8)

  beforeEach(`Set Date and Authorize and Cleanup`, () => {
    // set cypress default date
    // we use different years for different tests, which does not overlap
    cy.clock(firstTestDate, [
      `Date`,
    ])

    cy.authByApi()
    cy.removeUnwellEntries({
      date: firstTestDate,
    })
    cy.removeTaskEntries({
      date: firstTestDate,
    })
    cy.removeTaskEntries({
      date: secondTestDate,
    })
  })

  afterEach(`Cleanup`, () => {
    cy.removeUnwellEntries({
      date: firstTestDate,
    })
    cy.removeTaskEntries({
      date: firstTestDate,
    })
    cy.removeTaskEntries({
      date: secondTestDate,
    })
  })

  it(`
  GIVEN empty time tracker table
  WHEN user adds a new unwell entry from 8 a.m. to 12 p.m. on Monday
  AND user adds a new task entry from 1 p.m. to 5 p.m. on Monday
  AND on Tuesday, users only tracked a stand-up from 8 a.m. to 8:20 a.m.
  THEN user should see tracked time to be 8.33
  `, () => {      
    TrackingPageActions.visit()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`September 07 – 13`)
      .should(`be.visible`)

    TrackingPageActions.addUnwellEntry()
    
    TrackingPageActions.addTaskEntry({
      startTime: `13:00`,
      endTime: `17:00`,
    })

    TrackingPageActions.addTaskEntry({
      startTime: `08:00`,
      endTime: `08:20`,
      date: `08`,
    })

    cy.getByData(`metrics-tracked-hours`)
      .should(`be.visible`, 8.33)
  })
})