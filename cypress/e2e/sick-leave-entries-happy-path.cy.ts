import { EntryType } from "../../src/common/constants/entryType"
import { WeekDay } from "../enums/weekDay"
import { TrackingPageActions } from "../pages-actions/trackingPageActions"

describe(`Sick Leave Entry Happy Path`, () => {
  const testDate = new Date(2021, 6, 5)

  beforeEach(`Set Date and Authorize and Cleanup`, () => {
    // set cypress default date
    // we use different years for different tests, which does not overlap
    cy.clock(testDate, [
      `Date`,
    ])

    cy.authByApi()
    cy.removeSickLeaveEntries({
      date: testDate,
    })
  })

  afterEach(`Cleanup`, () => {
    cy.removeSickLeaveEntries({
      date: testDate,
    })
  })

  it(`
  GIVEN user has a sick leave from Monday to Friday
  AND user wants to track this sick leave in the time tracker
  WHEN user adds the sick leave period from Monday to Friday in the time tracker
  AND open existing sick leave and extends it until next Monday after the doctor's visit
  THEN user should see 8-day sick leave in the time tracker
  `, () => {
    TrackingPageActions.visit()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`July 05 – 11`)
      .should(`be.visible`)
    
    cy.log(`Add a Sick Leave Entry from Monday to Friday`)

    TrackingPageActions.getAllDayButton({
      weekDay: WeekDay.MONDAY,
    })
      .click()

    TrackingPageActions.selectEntryModalType({
      entryType: EntryType.SICK_LEAVE,
    })

    TrackingPageActions
      .getEntryModalEndDateDatepicker()
      .click()

    cy
      .get(`.react-datepicker__day--009`)
      .click()

    TrackingPageActions.clickByEntryModalSubmitButton()

    cy.log(`Verify that the sick leave has been created for 5 days.`)

    TrackingPageActions.getSickLeaveCard()
      .should(`have.length`, 5)

    TrackingPageActions.getAllDayButton({
      weekDay: WeekDay.FRIDAY,
    })
      .click()

    cy.log(`Verify that when the sick leave entry is opened, all data is displayed correctly.`)

    TrackingPageActions.getEntryModalStartDateDatepicker()
      .should(`have.value`, `05.07`)

    TrackingPageActions.getEntryModalEndDateDatepicker()
      .should(`have.value`, `09.07`)

    cy.log(`Update existing Sick Leave Entry`)

    TrackingPageActions
      .getEntryModalEndDateDatepicker()
      .click()

    cy
      .get(`.react-datepicker__day--012`)
      .click()

    TrackingPageActions.clickByEntryModalSubmitButton()

    cy.log(`Check that the sick leave is displayed correctly in the time tracker for this and next week.`)

    TrackingPageActions.getSickLeaveCard()
      .should(`have.length`, 7)

    cy
      .contains(`Next`)
      .click()
    
    TrackingPageActions.getSickLeaveCard()
      .should(`have.length`, 1)
  })
})
