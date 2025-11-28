import { WorkEntryModalState } from "./state/WorkEntryModalState"
import { WorkEntryModalStateContext } from "./state/WorkEntryModalStateContext"
import { WorkEntryModalContainer } from "./WorkEntryModalContainer"

const ADDED_WORK_ENTRY_MODAL_DATA = {
  title: `Task name`,
  taskId: `1`,
  startTime: `2025-11-29T09:00:00`,
  endTime: `2025-11-29T11:45:00`,
}

describe(`WorkEntryModalContainer`, () => {
  beforeEach(() => {
 //
  })

  describe(`Initialization`, initializationTests)
})

function initializationTests() {
  it(`
  GIVEN a work entry
  WHEN open the corresponding modal
  SHOULD see details related to this work entry
  `, () => {
    cy.viewport(375, 768)

    cy
      .intercept(
        `POST`,
        `*/time/tracking/work-entries`,
        {
          statusCode: 200,
          body: ADDED_WORK_ENTRY_MODAL_DATA,
        },
      )
      .as(`addWorkEntry`)

    mountComponent()

    cy.getByData('title-input')
      .type(ADDED_WORK_ENTRY_MODAL_DATA.title)

    cy.getByData('task-id-input')
      .type(ADDED_WORK_ENTRY_MODAL_DATA.taskId)

    cy.getByData('task-id-input')
      .type(`2025-11-29`)

    cy.wait(`@addWorkEntry`)
  })

}

function mountComponent() {
  const workEntryModalState = new WorkEntryModalState()
  
  workEntryModalState.setDate({
    date: new Date(`2025-11-27T09:00:00`)
  })
  workEntryModalState.setEndTime({
    endTime: new Date(`2025-11-27T11:30:00`)
  })
  workEntryModalState.setStartTime({
    startTime: new Date(`2025-11-27T09:00:00`)
  })

  cy
    .mount(
      <WorkEntryModalStateContext.Provider value={workEntryModalState}>
        <WorkEntryModalContainer 
          onClose={() => {}}
        />,
      </WorkEntryModalStateContext.Provider>,
    )
}
