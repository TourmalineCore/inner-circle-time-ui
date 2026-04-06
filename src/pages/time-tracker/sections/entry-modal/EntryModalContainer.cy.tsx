import { EntryType } from "../../../../common/constants/entryType"
import { eventBus, EventBusType } from "../../event-bus"
import { ENTRY_TYPES_STRATEGY } from "./entry-types-strategy"
import { EntryModalContainer } from "./EntryModalContainer"
import { TaskEntryState } from "./sections/TaskEntry/state/TaskEntryState"
import { TaskEntryStateContext } from "./sections/TaskEntry/state/TaskEntryStateContext"
import { EntryModalState } from "./state/EntryModalState"
import { EntryModalStateContext } from "./state/EntryModalStateContext"

describe(`EntryModalContainer`, () => {
  describe(`Function Call`, functionCallTests)   
  describe(`Set Error`, setErrorTests)
  describe(`Reset Error`, resetErrorTests)
})

function functionCallTests() {
  it(`
  GIVEN opened task entry 
  WHEN click on submit button
  SHOULD trigger close entry modal and reload table events
  `, () => {
    cy
      .intercept(
        `POST`,
        `*/time/tracking/task-entries`,
        {
          statusCode: 200,
        },
      )
    
    mountComponent()

    cy
      .contains(`Add`)
      .click()

    cy
      .get(`@closeEntryModal`)
      .should(`have.been.calledOnce`)

    cy.get(`@eventBusTrigger`)
      .should(`be.calledWith`, EventBusType.ENTRIES_CHANGED)
      
    cy
      .get(`@resetCurrentEntry`)
      .should(`have.been.calledOnce`)
  })
}

function setErrorTests() {
  it(`
  GIVEN opened task entry 
  WHEN click on submit button
  AND server validation error will be returned
  SHOULD display error message
  `, () => {
    cy
      .intercept(
        `POST`,
        `*/time/tracking/task-entries`,
        {
          statusCode: 400,
          body: {
            detail: `Error message`,
          },
        },
      )
    
    mountComponent()

    cy
      .contains(`Add`)
      .click()

    cy.contains(`Error message`)
  })
}

function resetErrorTests() {
  let entryModalState: EntryModalState
    
  beforeEach(() => {
    entryModalState = new EntryModalState()
    entryModalState.setError({
      error: `Error message`,
    })
  })
    
  it(`
  GIVEN opened task entry 
  WHEN click on submit button
  AND server validation error will be returned
  SHOULD display error message
  `, () => {
    cy
      .intercept(
        `POST`,
        `*/time/tracking/task-entries`,
        {
          statusCode: 200,
        },
      )
    
    mountComponent({
      entryModalState,
    })

    cy.contains(`Error message`)

    cy
      .contains(`Add`)
      .click()

    cy.
      should(`not.contain`, `Error message`)
  })
}

function mountComponent({
  entryModalState = new EntryModalState(),
}: {
  entryModalState?: EntryModalState,
} = {}) {
  const taskEntryState = new TaskEntryState()

  taskEntryState.updateTaskEntryData({
    taskEntryData: {
      title: `Title`,
      taskId: `Task ID`,
      description: `Description`,
      projectId: 1,
    },
  })

  cy.spy(entryModalState, `resetCurrentEntry`)
    .as(`resetCurrentEntry`)

  cy.spy(entryModalState, `closeEntryModal`)
    .as(`closeEntryModal`)

  cy.spy(eventBus, `publish`)
    .as(`eventBusTrigger`)
        
  cy
    .mount(
      <EntryModalStateContext.Provider value={entryModalState}>
        <TaskEntryStateContext.Provider value={taskEntryState}>
          <EntryModalContainer
            entryStrategy={ENTRY_TYPES_STRATEGY[EntryType.TASK]}
            openDeleteModal={() => {}}
          />,
        </TaskEntryStateContext.Provider>
      </EntryModalStateContext.Provider>,
    )
}
