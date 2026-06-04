import { EntryType } from "../../src/common/constants/entryType"
import { TaskEntry } from "./features/TaskEntry"
import { TimeTrackerPage } from "./pages/TimeTrackerPage"

describe(`Away With Make Up Time Entry Happy Path`, () => {
  const testDate = new Date(2024, 9, 21)

  beforeEach(`Set Date and Authorize and Cleanup`, () => {
    // set cypress default date
    // we use different years for different tests, which does not overlap
    cy.clock(testDate, [
      `Date`,
    ])

    cy.authByApi()
    cy.removeTaskEntries(testDate)
    cy.removeAwayWithMakeUpEntries(testDate)
  })

  afterEach(`Cleanup`, () => {
    cy.removeTaskEntries(testDate)
    cy.removeAwayWithMakeUpEntries(testDate)
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
      
    TimeTrackerPage.visit()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`October 21 – 27`)
      .should(`be.visible`)
    
    cy.log(`Add an Away with Make Up Time Entry`)
    
    TimeTrackerPage.clickOnFirstTimeSlot()

    // Todo: after implemenation away with make up time feature replace 3 to value from EntryType enum
    TimeTrackerPage.selectEntryType({
      entryType: 3 as EntryType,
    })

    cy
      .getByData(`description-input`)
      .clear()
      .type(`I need to go to the hospital.`)

    cy
      .getByData(`start-time-input`)
      .clear()
      .type(`13:00`)
    
    cy
      .getByData(`end-time-input`)
      .clear()
      .type(`14:00`)
    
    cy
      .getByData(`make-up-time-start-time-input`)
      .clear()
      .type(`17:00`)
    
    cy
      .getByData(`make-up-time-end-time-input`)
      .clear()
      .type(`18:00`)

    TimeTrackerPage.clickBySubmitButton()

    cy.log(`Add a Task Entry at the same time as make up`)

    const {
      taskTitle,
    } = TaskEntry.add({
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
