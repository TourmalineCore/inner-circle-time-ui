import { EntryType } from "../../src/common/constants/entryType"
import { TrackingPageActions } from "../pagesActions/TrackingPageActions"

describe(`Away With Make Up Time Entry Happy Path`, () => {
  const testDate = new Date(2024, 9, 21)

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
    cy.removeAwayWithMakeUpEntries({
      date: testDate,
    })
  })

  afterEach(`Cleanup`, () => {
    cy.removeTaskEntries({
      date: testDate,
    })
    cy.removeAwayWithMakeUpEntries({
      date: testDate,
    })
  })

  it(`
  GIVEN user was away for one hour
  AND plans to make up this time on the same day
  WHEN user adds away with make up time entry in the time tracker
  AND user did it as planned and was working on the task
  THEN user should see that everything has been successfully tracked in the time tracker
  `, () => {
    cy.intercept(
      `GET`, 
      `/api/time/tracking/entries?startDate=2024-10-21&endDate=2024-10-27`)
      .as(`getEntries`)
      
    TrackingPageActions.visit()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`October 21 – 27`)
      .should(`be.visible`)
    
    cy.log(`Add an Away with Make Up Time Entry`)
    
    TrackingPageActions.clickOnFirstTimeSlot()

    // Todo: after implemenation Away With Make Up Time Entry feature replace 3 to value from EntryType enum
    TrackingPageActions.selectEntryModalType({
      entryType: 3 as EntryType,
    })

    TrackingPageActions.getEntryModalDescriptionInput()
      .clear()
      .type(`I need to go to the hospital.`)

    TrackingPageActions.getEntryModalStartTimeInput()
      .clear()
      .type(`13:00`)
    
    TrackingPageActions.getEntryModalEndTimeInput()
      .clear()
      .type(`14:00`)
    
    cy
      .getByData(`entry-modal-make-up-start-time-input`)
      .clear()
      .type(`17:00`)
    
    cy
      .getByData(`entry-modal-make-up-end-time-input`)
      .clear()
      .type(`18:00`)

    TrackingPageActions.clickByEntryModalSubmitButton()

    cy.log(`Add a Task Entry at the same time as make up`)

    const {
      taskTitle,
    } = TrackingPageActions.addTaskEntry({
      startTime: `17:00`,
      endTime: `18:00`,
    })

    cy.wait(`@getEntries`)

    cy.log(`Сheck that the Away, Make up time and task entries cards exist`)

    cy.contains(`Away With Make-up time`)

    cy.contains(`Make-up time`)

    cy.contains(taskTitle)
  })
})
