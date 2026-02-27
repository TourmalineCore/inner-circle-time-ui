import { EntryType } from "../../../../../../common/constants/entryType"
import { TaskEntryData } from "../../../../types"
import { EntryModal } from "../../EntryModal"
import { TaskEntryState } from "./state/TaskEntryState"

describe(`TaskEntryContainer`, () => {   
  describe(`Request Tests`, RequestTests)
  describe(`Set Error`, setErrorTests)
})

function RequestTests() {
  it(`
  GIVEN opened task entry 
  WHEN click on submit button
  SHOULD send successful request
  `, () => {
    cy
      .intercept(
        `POST`,
        `*/time/tracking/task-entries`,
        {
          statusCode: 200,
        },
      )
      .as(`addTaskEntry`)

    mountComponent({
      title: `Test title`,
      taskId: `Test taskId`,
      description: `Test description`,
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
  it(`
  GIVEN opened task entry 
  WHEN click on submit button
  AND there are invalid fields
  SHOULD display error message
  `, () => {
    mountComponent()

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
        `*/time/tracking/task-entries`,
        {
          statusCode: 400,
          body: {
            detail: `Error message`,
          },
        },
      )
    
    mountComponent({
      title: `Test title`,
      taskId: `Test taskId`,
      description: `Test description`,
    })

    cy
      .contains(`Add Task`)
      .click()

    cy.contains(`Error message`)
  })
}

function mountComponent({
  title,
  taskId,
  description,
}: Partial<TaskEntryData> = {}) {
  const handleTriggerReloadState = cy
    .spy()
    .as(`handleTriggerReloadState`)

  cy
    .mount(
      <EntryModal 
        currentEntry={{
          id: undefined,
          title,
          taskId,
          project: undefined,
          description,
          type: EntryType.TASK,
          date: new Date(`2025-11-27T09:00:00`),
          start: new Date(`2025-11-27T09:00:00`),
          end: new Date(`2025-11-27T11:30:00`),
        }}
        onClose={() => {}}
        handleTriggerReloadState={handleTriggerReloadState}
      />,
    )
}
