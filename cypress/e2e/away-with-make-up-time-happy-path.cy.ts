import { EntryType } from "../../src/common/constants/entryType"
import { TrackingPageActions } from "../pagesActions/TrackingPageActions"

describe(`Away With Make-up Time Entry Happy Path`, () => {
  const dateToDeleteTask = new Date(2025, 9, 20)
  const dateToDeleteAway = new Date(2025, 9, 13)

  beforeEach(`Set Date and Authorize and Cleanup`, () => {
    // set cypress default date
    // we use different years for different tests, which does not overlap
    cy.clock(new Date(2025, 9, 20), [
      `Date`,
    ])

    cy.authByApi()
    cy.removeTaskEntries({
      date: dateToDeleteTask,
    })
    cy.removeAwayWithMakeUpTimeEntries({
      date: dateToDeleteAway,
    })
  })

  afterEach(`Cleanup`, () => {
    cy.removeTaskEntries({
      date: dateToDeleteTask,
    })
    cy.removeAwayWithMakeUpTimeEntries({
      date: dateToDeleteAway,
    })
  })

  it(`
  GIVEN user was away for one hour
  AND plans to make-up this time on the next week
  WHEN user adds away with make-up time entry in the time tracker
  AND user did it as planned and was working on the task
  THEN user should see that everything has been successfully tracked in the time tracker
  `, () => {
    const awayReason = `I need to go to the hospital.`
    const absentStartTime = `13:00`
    const absentEndTime = `14:00`
    const makeUpStartTime = `17:00`
    const makeUpEndTime = `18:00`

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
      .type(awayReason)

    cy
      .getByData(`away-datepicker`)
      .find(`input`)
      .click()

    cy
      .get(`.react-datepicker__day--013`)
      .click()

    TrackingPageActions.getEntryModalStartTimeInput()
      .clear()
      .type(absentStartTime)
    
    TrackingPageActions.getEntryModalEndTimeInput()
      .clear()
      .type(absentEndTime)

    cy
      .getByData(`make-up-time-datepicker`)
      .click()

    cy
      .get(`.react-datepicker__day--020`)
      .click()
    
    TrackingPageActions.getEntryModalMakeUpStartTimeInput()
      .clear()
      .type(makeUpStartTime)
    
    TrackingPageActions.getEntryModalMakeUpEndTimeInput()
      .clear()
      .type(makeUpEndTime)

    TrackingPageActions.clickByEntryModalSubmitButton()

    cy.log(`Сheck that the Away cards exist`)

    cy
      .contains(`Back`)
      .click()

    cy
      .contains(`Away with make-up time`)
      .click()

    checkAwayWithMakeUpTimeEntryFields()

    cy
      .contains(`Next`)
      .click()

    cy.log(`Сheck that the Make-up time cards exist`)

    cy
      .contains(`Make-up time`)
      .click()

    checkAwayWithMakeUpTimeEntryFields()

    cy.log(`Add a Task Entry at the same time as make-up`)

    const {
      taskTitle,
    } = TrackingPageActions.addTaskEntry({
      startTime: `17:00`,
      endTime: `18:00`,
    })

    cy.log(`Сheck that the Task entry cards exist`)

    cy.contains(taskTitle)
    
    function checkAwayWithMakeUpTimeEntryFields() {
      TrackingPageActions
        .getEntryModalDescriptionInput()
        .should(`have.value`, awayReason)

      TrackingPageActions
        .getEntryModalStartTimeInput()
        .should(`have.value`, absentStartTime)
    
      TrackingPageActions
        .getEntryModalEndTimeInput()
        .should(`have.value`, absentEndTime)

      TrackingPageActions
        .getEntryModalMakeUpStartTimeInput()
        .should(`have.value`, makeUpStartTime)

      TrackingPageActions
        .getEntryModalMakeUpEndTimeInput()
        .should(`have.value`, makeUpEndTime)

      TrackingPageActions.clickByEntryModalCloseButton()
    }
  })
})
