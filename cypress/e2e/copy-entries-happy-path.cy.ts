import { WeekDay } from "../enums/weekDay"
import { TrackingPageActions } from "../pages-actions/trackingPageActions"

describe(`Copy Entries Happy Path`, () => {
  const testDate = new Date(2022, 9, 24)

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
  AND user clicks on this task entry for copy
  AND user clicks on a free time slot 
  THEN user should see the copied card with filled data
  `, () => {
    TrackingPageActions.visit()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`October 24 – 30`)
      .should(`be.visible`)

    const {
      taskTitle,
      taskDescription,
      taskId,
    } = TrackingPageActions.addTaskEntry()

    cy.log(`Copying the created task`)
    
    cy.getByData(`"task-entry-${WeekDay.MONDAY}-11:00-15:00"`)
      .click()
      
    TrackingPageActions.getEntryModalCopyButton()
      .click()

    TrackingPageActions
      .getCopyAlert()
      .should(`exist`)

    cy.log(`Check that the open entry card contains the copied fields`)

    TrackingPageActions.clickOnTimeSlot({
      weekDay: WeekDay.TUESDAY,
      time: `14:00`,
    })

    TrackingPageActions
      .getEntryModalTitleInput()
      .should(`have.value`, taskTitle)

    TrackingPageActions
      .getEntryModalProjectSelect()
      .should(`have.value`, 1)

    TrackingPageActions
      .getEntryModalTaskIdInput()
      .should(`have.value`, taskId)

    TrackingPageActions
      .getEntryModalDescriptionInput()
      .should(`have.value`, taskDescription)

    TrackingPageActions.clickByEntryModalCloseButton()

    TrackingPageActions
      .getCopyAlert()
      .should(`not.exist`)
  })
})
