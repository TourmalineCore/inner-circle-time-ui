import { EMPTY_TASK_ENTRY_DATA, TaskEntryState } from "./state/TaskEntryState"
import { TaskEntryStateContext } from "./state/TaskEntryStateContext"
import { TaskEntryContainer } from "./TaskEntryContainer"

describe(`TaskEntryContainer`, () => {   
  describe(`Request Tests`, RequestTests)
  describe(`Set Error`, setErrorTests)
})

function RequestTests() {
  let taskEntryState: TaskEntryState

  beforeEach(() => {
    taskEntryState = new TaskEntryState()

    taskEntryState.setTitle({
      title: `Title`,
    })

    taskEntryState.setTaskId({
      taskId: `TaskId`,
    })

    taskEntryState.setDescription({
      description: `Description`,
    })

    setDateAndTime({
      taskEntryState,
    })
  })

  it(`
  GIVEN opened task entry 
  WHEN click on submit button
  SHOULD send successful request
  `, () => {
    cy
      .intercept(
        `POST`,
        `*/time/tracking/work-entries`,
        {
          statusCode: 200,
        },
      )
      .as(`addTaskEntry`)

    mountComponent({
      taskEntryState,
    })
    
    cy
      .contains(`Add Task`)
      .click()

    cy.wait(`@addTaskEntry`)

    cy
      .get(`@handleTriggerReloadState`)
      .should(`be.calledOnce`)
  })
}

function setErrorTests() {
  let taskEntryState: TaskEntryState

  beforeEach(() => {
    taskEntryState = new TaskEntryState()

    setDateAndTime({
      taskEntryState,
    })
  })

  it(`
  GIVEN opened task entry 
  WHEN click on submit button
  AND there are invalid fields
  SHOULD display error message
  `, () => {
    mountComponent({
      taskEntryState,
    })

    cy
      .contains(`Add Task`)
      .click()

    cy.contains(`Fill in all the fields`)
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
        `*/time/tracking/work-entries`,
        {
          statusCode: 400,
          body: {
            detail: `Error message`,
          },
        },
      )
      
    taskEntryState.setTitle({
      title: `Task name`,
    })

    taskEntryState.setTaskId({
      taskId: `1`,
    })
    
    taskEntryState.setDescription({
      description: `Task description`,
    })
    
    mountComponent({
      taskEntryState,
    })

    cy
      .contains(`Add Task`)
      .click()

    cy.contains(`Error message`)
  })
}

function mountComponent({
  taskEntryState,
}: {
  taskEntryState: TaskEntryState,
}) {

  const handleTriggerReloadState = cy
    .spy()
    .as(`handleTriggerReloadState`)

  cy
    .mount(
      <TaskEntryStateContext.Provider value={taskEntryState}>
        <TaskEntryContainer 
          handleTriggerReloadState={handleTriggerReloadState}
          taskEntryData={EMPTY_TASK_ENTRY_DATA} />
      </TaskEntryStateContext.Provider>,
    )
}

function setDateAndTime({
  taskEntryState,
}: {
  taskEntryState: TaskEntryState,
}) {
  taskEntryState.setDate({
    date: new Date(`2025-11-27T09:00:00`),
  })
  taskEntryState.setStartTime({
    startTime: new Date(`2025-11-27T09:00:00`),
  })
  taskEntryState.setEndTime({
    endTime: new Date(`2025-11-27T11:30:00`),
  })
}
