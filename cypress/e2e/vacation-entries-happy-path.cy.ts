import { EntryType } from "../../src/common/constants/entryType"
import { WeekDay } from "../enums/weekDay"
import { TrackingPageActions } from "../pages-actions/trackingPageActions"

describe(`Vacation Entry Happy Path`, () => {
  const rescheduledVacationStartDate = new Date(2020, 6, 6)

  beforeEach(`Set Date and Authorize and Cleanup`, () => {
    // set cypress default date
    // we use different years for different tests, which does not overlap
    cy.clock(new Date(2020, 5, 15), [
      `Date`,
    ])

    cy.authByApi()
    cy.removeVacationEntries({
      date: rescheduledVacationStartDate,
    })
  })

  afterEach(`Cleanup`, () => {
    cy.removeVacationEntries({
      date: rescheduledVacationStartDate,
    })
  })

  it(`
  GIVEN user has a 14-day paid vacation already planned and tracked in the time tracker
  AND user wants to reschedule this vacation for the next month
  WHEN user opens the existing vacation
  AND changes vacation dates
  THEN user should see the rescheduled vacation
  `, () => {
    TrackingPageActions.visit()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`June 15 – 21`)
      .should(`be.visible`)
    
    cy.log(`Add a Vacation Entry from June 15th to 28th`)

    TrackingPageActions
      .getAllDayButton({
        weekDay: WeekDay.MONDAY,
      })
      .click()

    TrackingPageActions.selectEntryModalType({
      entryType: EntryType.VACATION,
    })

    TrackingPageActions
      .getEntryModalEndDateDatepicker()
      .click()

    cy
      .get(`.react-datepicker__day--028`)
      .click()

    TrackingPageActions.clickByEntryModalSubmitButton()

    cy.log(`Verify that when the vacation entry is opened, all data is displayed correctly`)

    TrackingPageActions
      .getAllDayButton({
        weekDay: WeekDay.FRIDAY,
      })
      .click()

    TrackingPageActions.getEntryModalStartDateDatepicker()
      .should(`have.value`, `15.06`)

    TrackingPageActions.getEntryModalEndDateDatepicker()
      .should(`have.value`, `28.06`)

    cy.log(`Reschedule existing Vacation Entry`)

    TrackingPageActions.getEntryModalStartDateDatepicker()
      .click()

    TrackingPageActions.goToNextDatepickerMonth()

    cy
      .get(`.react-datepicker__day--006`)
      .click()

    TrackingPageActions
      .getEntryModalEndDateDatepicker()
      .click()

    TrackingPageActions.goToNextDatepickerMonth()

    cy
      .get(`.react-datepicker__day--019`)
      .click()

    TrackingPageActions.clickByEntryModalSubmitButton()

    cy.log(`Navigate three weeks forward in the time tracker to verify that the vacation is create for the new dates`)

    TrackingPageActions.goToNextTimeTrackerPeriod()
    TrackingPageActions.goToNextTimeTrackerPeriod()
    TrackingPageActions.goToNextTimeTrackerPeriod()

    cy.log(`Check that the vacation entry is displayed correctly for the period from 6 July to 12 July`)

    cy
      .contains(`July 06 – 12`)
      .should(`be.visible`)
        
    TrackingPageActions.getVacationEntryCard()
      .should(`have.length`, 7)

    cy.log(`Check that the vacation entry is displayed correctly for the period from 13 July to 19 July`)

    TrackingPageActions.goToNextTimeTrackerPeriod()
    
    cy
      .contains(`July 13 – 19`)
      .should(`be.visible`)

    TrackingPageActions.getVacationEntryCard()
      .should(`have.length`, 7)
  })
})
