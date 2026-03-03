import { EntryType } from "../../../../common/constants/entryType"
import { ENTRY_TYPES_STRATEGY } from "./entry-types-strategy"
import { EntryModalContainer } from "./EntryModalContainer"
import { TaskEntryState } from "./sections/TaskEntry/state/TaskEntryState"
import { TaskEntryStateContext } from "./sections/TaskEntry/state/TaskEntryStateContext"
import { EntryModalState } from "./state/EntryModalState"
import { EntryModalStateContext } from "./state/EntryModalStateContext"

describe(`EntryModalContainer`, () => {   
  describe(`Set Error`, setErrorTests)
  describe(`Reset Error`, resetErrorTests)
  describe(`Delete Button Display`, deleteButtonTests)
})

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

function deleteButtonTests() {
  it(`
  GIVEN opened task entry 
  WHEN it is not submitted
  SHOULD not display delete button
  `, () => {
    mountComponent()

    cy
      .getByData(`delete-button`)
      .should(`not.exist`)
  })

  it(`
  GIVEN opened task entry 
  WHEN was already submitted
  SHOULD display delete button
  `, () => {
    mountComponent({
      id: 1,
    })

    cy
      .getByData(`delete-button`)
      .should(`exist`)
  })
}

function mountComponent({
  entryModalState = new EntryModalState(),
  id,
}: {
  entryModalState?: EntryModalState,
  id?: number,
} = {}) {
  const taskEntryState = new TaskEntryState()

  taskEntryState.updateTaskEntryData({
    taskEntryData: {
      title: `Title`,
      taskId: `Task ID`,
      description: `Description`,
    },
  })
  
  cy
    .mount(
      <EntryModalStateContext.Provider value={entryModalState}>
        <TaskEntryStateContext.Provider value={taskEntryState}>
          <EntryModalContainer 
            onCloseEntryModal={() => {}}
            handleTriggerReloadState={() => {}}
            entryStrategy={ENTRY_TYPES_STRATEGY[EntryType.TASK]}
            onOpenDeleteModal={() => {}}
            id={id}
          />,
        </TaskEntryStateContext.Provider>
      </EntryModalStateContext.Provider>,
    )
}
