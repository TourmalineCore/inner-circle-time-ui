import { EntryType } from "../../src/common/constants/entryType"
import { TrackingPageActions } from "../pagesActions/TrackingPageActions"

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
      date:testDate,
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
    cy.intercept(
      `GET`, 
      `/api/time/tracking/entries?startDate=2023-10-23&endDate=2023-10-29`)
      .as(`getEntries`)
      
    TrackingPageActions.visit()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`October 23 – 29`)
      .should(`be.visible`)

    TrackingPageActions.clickOnFirstTimeSlot()
        
    TrackingPageActions
      .selectEntryModalType({
        entryType: EntryType.UNWELL,
      })

    TrackingPageActions
      .getEntryModalStartTimeInput()
      .clear()
      .type(`04:00`)
    
    TrackingPageActions
      .getEntryModalEndTimeInput() 
      .clear()
      .type(`05:00`)

    TrackingPageActions.clickByEntryModalSubmitButton()

    clickByFeelingUnwellCard()

    TrackingPageActions
      .getEntryModalStartTimeInput()
      .clear()
      .type(`06:00`)
    
    TrackingPageActions
      .getEntryModalEndTimeInput()
      .clear()
      .type(`07:00`)

    TrackingPageActions.clickByEntryModalSubmitButton()

    cy.wait(`@getEntries`)

    // figure out why the pipeline test is failing
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)

    clickByFeelingUnwellCard()

    TrackingPageActions
      .getEntryModalStartTimeInput()
      .should(`have.value`, `06:00`)
    
    TrackingPageActions
      .getEntryModalEndTimeInput()
      .should(`have.value`, `07:00`)
  })
})

function clickByFeelingUnwellCard() {
  return cy
    .contains(`Feeling unwell`)
    .click()
}
