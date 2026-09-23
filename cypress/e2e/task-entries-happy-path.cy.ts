import { WeekDay } from "../enums/weekDay"
import { TrackingPageActions } from "../pages-actions/trackingPageActions"

describe(`Task Entries Happy Path`, () => {
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
  })

  afterEach(`Cleanup`, () => {
    cy.removeTaskEntries({
      date: testDate,
    })
  })

  it(`
  GIVEN empty time tracker table
  WHEN user adds a new task entry
  AND user clicks on this task entry for update
  THEN user should see the updated task entry in the time tracking table
  `, () => {
    TrackingPageActions.visit()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`October 21 – 27`)
      .should(`be.visible`)

    TrackingPageActions.addTaskEntry()

    cy
      .getByData(`"task-entry-${WeekDay.MONDAY}-11:00-15:00"`)
      .click()

    TrackingPageActions
      .getEntryModalTitleInput()
      .clear()
      .type(`[E2E-SMOKE] Task 2`)

    TrackingPageActions.getEntryModalProjectSelect()
      .select(2)

    TrackingPageActions.getEntryModalTaskIdInput()
      .clear()
      .type(`#test2`)

    TrackingPageActions
      .getEntryModalDescriptionInput()
      .clear()
      .type(`Task 2 description`)

    TrackingPageActions
      .getEntryModalStartTimeInput()
      .clear()
      .type(`13:00`)
    
    TrackingPageActions
      .getEntryModalEndTimeInput()
      .clear()
      .type(`17:00`)

    TrackingPageActions.clickByEntryModalSubmitButton()

    cy.getByData(`metrics-tracked-time`)
      .should(`be.visible`, `4h 0m`)
      
    cy
      .getByData(`"task-entry-${WeekDay.MONDAY}-13:00-17:00"`)
      .click()

    TrackingPageActions
      .getEntryModalTaskIdInput()
      .should(`have.value`, `#test2`)

    TrackingPageActions
      .getEntryModalDescriptionInput()
      .should(`have.value`, `Task 2 description`)

    TrackingPageActions
      .getEntryModalStartTimeInput()
      .should(`have.value`, `13:00`)
    
    TrackingPageActions
      .getEntryModalEndTimeInput()
      .should(`have.value`, `17:00`)
  })
})
