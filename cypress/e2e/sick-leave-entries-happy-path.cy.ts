import { EntryType } from "../../src/common/constants/entryType"
import { TrackingPageActions } from "../pagesActions/TrackingPageActions"

describe(`Sick Leave Entry Happy Path`, () => {
  const dateToDeleteFirstSickLeave = new Date(2021, 6, 5)
  const dateToDeleteSecondSickLeave = new Date(2025, 6, 12)

  beforeEach(`Set Date and Authorize and Cleanup`, () => {
    // set cypress default date
    // we use different years for different tests, which does not overlap
    cy.clock(new Date(2021, 6, 5), [
      `Date`,
    ])

    cy.authByApi()
    cy.removeSickLeaveEntries({
      date: dateToDeleteFirstSickLeave,
    })
    cy.removeSickLeaveEntries({
      date: dateToDeleteSecondSickLeave,
    })
  })

  afterEach(`Cleanup`, () => {
    cy.removeSickLeaveEntries({
      date: dateToDeleteFirstSickLeave,
    })
    cy.removeSickLeaveEntries({
      date: dateToDeleteSecondSickLeave,
    })
  })

  it(`
  GIVEN user has a sick leave from Monday to Friday
  AND user wants to track this sick leave in the time tracker
  WHEN user adds the sick leave period from Monday to Friday in the time tracker
  AND extends it until next Monday after the doctor's visit
  THEN user should see sick leave for 8 days in the time tracker
  `, () => {
    TrackingPageActions.visit()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`July 05 – 11`)
      .should(`be.visible`)
    
    cy.log(`Add a Sick Leave Entry from Monday to Friday`)

    TrackingPageActions.getAllDayButton()
      .first()
      .click()

    TrackingPageActions.selectEntryModalType({
      entryType: EntryType.SICK_LEAVE,
    })

    TrackingPageActions
      .getEntryModalEndDateDatepicker()
      .click()

    cy
      .get(`.react-datepicker__day--09`)
      .click()

    TrackingPageActions.clickByEntryModalSubmitButton()

    cy.log(`Check that the sick leave has been created for 5 days`)

    cy.contains(`Sick Leave`)
      .should(`have.length`, 5)

    TrackingPageActions.getAllDayButton()

      .first()
      .click()

    cy.log(`Check that when opening the sick leave, the data in it is displayed correctly`)

    TrackingPageActions.getEntryModalStartDateDatepicker()
      .should(`have.value`, `10.06`)

    TrackingPageActions.getEntryModalEndDateDatepicker()
      .should(`have.value`, `12.06`)

    cy.log(`Update existing Sick Leave Entry`)

    TrackingPageActions
      .getEntryModalEndDateDatepicker()
      .click()

    cy
      .get(`.react-datepicker__day--12`)
      .click()

    TrackingPageActions.clickByEntryModalSubmitButton()

    cy.log(`Check that the sick leave has been created for 7 days this week and for 1 day next week`)

    cy.contains(`Sick Leave`)
      .should(`have.length`, 7)

    cy
      .contains(`Next`)
      .click()
    
    cy.contains(`Sick Leave`)
      .should(`have.length`, 1)
  })
})
