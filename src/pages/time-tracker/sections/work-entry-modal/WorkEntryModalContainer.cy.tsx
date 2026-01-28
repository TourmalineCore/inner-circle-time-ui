import { WorkEntryModalState } from "./state/WorkEntryModalState"
import { WorkEntryModalStateContext } from "./state/WorkEntryModalStateContext"
import { WorkEntryModalContainer } from "./WorkEntryModalContainer"

describe(`WorkEntryModalContainer`, () => {   
  describe(`On Close Modal`, onCloseModalTests)
  describe(`Set Error`, setErrorTests)
})

function onCloseModalTests() {
  let workEntryModalState: WorkEntryModalState

  beforeEach(() => {
    workEntryModalState = new WorkEntryModalState()

    workEntryModalState.setTitle({
      title: `Title`,
    })

    workEntryModalState.setTaskId({
      taskId: `TaskId`,
    })

    workEntryModalState.setDescription({
      description: `Description`,
    })

    setDateAndTime({
      workEntryModalState,
    })
  })

  it(`
  GIVEN opened work entry modal
  WHEN click on close button
  SHOULD trigger onClose function once 
  `, () => {
    mountComponent({
      workEntryModalState,
    })
    
    cy
      .get(`.tc-modal__close-button`)
      .click()

    cy
      .get(`@onClose`)
      .should(`be.calledOnce`)
  })

  it(`
  GIVEN opened work entry modal
  WHEN click on submit button
  AND send successful request
  SHOULD trigger onClose and handleTriggerReloadState functions once 
  `, () => {
    cy
      .intercept(
        `POST`,
        `*/time/tracking/work-entries`,
        {
          statusCode: 200,
        },
      )
      .as(`addWorkEntry`)

    mountComponent({
      workEntryModalState,
    })
    
    cy
      .contains(`Add Task`)
      .click()

    cy.wait(`@addWorkEntry`)

    cy
      .get(`@onClose`)
      .should(`be.calledOnce`)

    cy
      .get(`@handleTriggerReloadState`)
      .should(`be.calledOnce`)
  })
}

function setErrorTests() {
  let workEntryModalState: WorkEntryModalState

  beforeEach(() => {
    workEntryModalState = new WorkEntryModalState()

    setDateAndTime({
      workEntryModalState,
    })
  })

  it(`
  GIVEN opened work entry modal
  WHEN click on submit button
  AND there are invalid fields
  SHOULD display error message
  `, () => {
    mountComponent({
      workEntryModalState,
    })

    cy
      .contains(`Add Task`)
      .click()

    cy.contains(`Fill in all the fields`)
  })

  it(`
  GIVEN opened work entry modal
  WHEN click on submit button
  AND server validation error will be returned
  SHOULD display error message
  `, () => {
    cy
      .intercept(
        `POST`,
        `*/time/tracking/work-entries`,
        {
          statusCode: 400,
          body: {
            detail: `Error message`,
          },
        },
      )
      
    workEntryModalState.setTitle({
      title: `Task name`,
    })

    workEntryModalState.setTaskId({
      taskId: `1`,
    })
    
    workEntryModalState.setDescription({
      description: `Task description`,
    })
    
    mountComponent({
      workEntryModalState,
    })

    cy
      .contains(`Add Task`)
      .click()

    cy.contains(`Error message`)
  })
}

function mountComponent({
  workEntryModalState,
}: {
  workEntryModalState: WorkEntryModalState,
}) {
  const onClose = cy
    .spy()
    .as(`onClose`)

  const handleTriggerReloadState = cy
    .spy()
    .as(`handleTriggerReloadState`)

  cy
    .mount(
      <WorkEntryModalStateContext.Provider value={workEntryModalState}>
        <WorkEntryModalContainer 
          onClose={onClose}
          handleTriggerReloadState={handleTriggerReloadState}
        />
      </WorkEntryModalStateContext.Provider>,
    )
}

function setDateAndTime({
  workEntryModalState,
}: {
  workEntryModalState: WorkEntryModalState,
}) {
  workEntryModalState.setDate({
    date: new Date(`2025-11-27T09:00:00`),
  })
  workEntryModalState.setStartTime({
    startTime: new Date(`2025-11-27T09:00:00`),
  })
  workEntryModalState.setEndTime({
    endTime: new Date(`2025-11-27T11:30:00`),
  })
}
