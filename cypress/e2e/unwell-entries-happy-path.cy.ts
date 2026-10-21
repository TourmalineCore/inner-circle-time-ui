import { WeekDay } from "../enums/weekDay"
import { TrackingPageActions } from "../pages-actions/trackingPageActions"

describe(`Unwell Entries Happy Path`, () => {
  const testDate = new Date(2023, 9, 23)

  beforeEach(`Set Date and Authorize and Cleanup`, () => {
    // set cypress default date
    // we use different years for different tests, which does not overlap
    cy.clock(testDate, [
      `Date`,
    ])

    cy.authByApi()
    cy.removeUnwellEntries({
      date: testDate,
    })
  })

  afterEach(`Cleanup`, () => {
    cy.removeUnwellEntries({
      date: testDate,
    })
  })

  it(`
  GIVEN empty time tracker table
  WHEN user adds a new unwell entry
  AND user clicks on this unwell entry for update
  THEN user should see the updated unwell entry in the time tracking table
  `, () => {
    TrackingPageActions.visit()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`October 23 – 29`)
      .should(`be.visible`)

    TrackingPageActions.addUnwellEntry({
      startTime: `13:00`,
      endTime: `14:00`,
    })

    // the modal loads the entry and then fills the inputs with it,
    // so typing before the entry is loaded is overwritten with the old values
    cy
      .intercept({
        method: `GET`,
        pathname: `**/tracking/unwell-entries/*`,
      })
      .as(`getUnwellEntry`)

    cy
      .getByData(`"unwell-entry-${WeekDay.MONDAY}-13:00-14:00"`)
      .click()

    cy.wait(`@getUnwellEntry`)

    TrackingPageActions
      .getEntryModalStartTimeInput()
      .clear()
      .type(`14:00`)
    
    TrackingPageActions
      .getEntryModalEndTimeInput()
      .clear()
      .type(`17:00`)

    cy
      .intercept({
        method: `GET`,
        pathname: `**/tracking/entries`,
      })
      .as(`getEntries`)

    TrackingPageActions.clickByEntryModalSubmitButton()

    cy.wait(`@getEntries`)

    cy
      .getByData(`"unwell-entry-${WeekDay.MONDAY}-14:00-17:00"`)
      .click()

    cy.wait(`@getUnwellEntry`)

    TrackingPageActions
      .getEntryModalStartTimeInput()
      .should(`have.value`, `14:00`)
    
    TrackingPageActions
      .getEntryModalEndTimeInput()
      .should(`have.value`, `17:00`)
  })
})
