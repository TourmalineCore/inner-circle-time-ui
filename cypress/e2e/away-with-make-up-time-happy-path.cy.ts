import { EntryType } from "../../src/common/constants/entryType"
import { TrackingPageActions } from "../pagesActions/TrackingPageActions"

describe(`Away With Make-up Time Entry Happy Path`, () => {
  const testDate = new Date(2025, 9, 20)

  beforeEach(`Set Date and Authorize and Cleanup`, () => {
    // set cypress default date
    // we use different years for different tests, which does not overlap
    cy.clock(testDate, [
      `Date`,
    ])

    cy.authByApi()
    cy.removeTaskEntries({
      date: testDate,
    })
    cy.removeAwayWithMakeUpTimeEntries({
      date: testDate,
    })
  })

  afterEach(`Cleanup`, () => {
    cy.removeTaskEntries({
      date: testDate,
    })
    cy.removeAwayWithMakeUpTimeEntries({
      date: testDate,
    })
  })

  it(`
  GIVEN user was away for one hour
  AND plans to make-up this time on the same day
  WHEN user adds away with make-up time entry in the time tracker
  AND user did it as planned and was working on the task
  THEN user should see that everything has been successfully tracked in the time tracker
  `, () => {      
    TrackingPageActions.visit()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`October 20 – 26`)
      .should(`be.visible`)
    
    cy.log(`Add an Away with Make-up Time Entry`)
    
    TrackingPageActions.clickOnFirstTimeSlot()

    TrackingPageActions.selectEntryModalType({
      entryType: EntryType.AWAY_WITH_MAKE_UP_TIME,
    })

    TrackingPageActions.getEntryModalDescriptionInput()
      .type(`I need to go to the hospital.`)

    TrackingPageActions.getEntryModalStartTimeInput()
      .clear()
      .type(`13:00`)
    
    TrackingPageActions.getEntryModalEndTimeInput()
      .clear()
      .type(`14:00`)

    cy
      .getByData(`make-up-time-datepicker`)
      .click()

    cy
      .get(`.react-datepicker__day--020`)
      .click()
    
    TrackingPageActions.getEntryModalMakeUpStartTimeInput()
      .clear()
      .type(`17:00`)
    
    TrackingPageActions.getEntryModalMakeUpEndTimeInput()
      .clear()
      .type(`18:00`)

    TrackingPageActions.clickByEntryModalSubmitButton()

    cy.log(`Сheck that the Away and make-up time cards exist`)

    cy.contains(`Away with make-up time`)

    cy.contains(`Make-up time`)

    cy.log(`Add a Task Entry at the same time as make-up`)

    const {
      taskTitle,
    } = TrackingPageActions.addTaskEntry({
      startTime: `17:00`,
      endTime: `18:00`,
    })

    cy.log(`Сheck that the Task entry cards exist`)

    cy.contains(taskTitle)
  })
})
