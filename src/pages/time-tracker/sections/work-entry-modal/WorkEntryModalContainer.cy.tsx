import { WorkEntryModalState } from "./state/WorkEntryModalState"
import { WorkEntryModalStateContext } from "./state/WorkEntryModalStateContext"
import { WorkEntryModalContainer } from "./WorkEntryModalContainer"

const ADDED_WORK_ENTRY_MODAL_DATA = {
  title: `Task name`,
  taskId: `1`,
  startTime: `2025-11-16T10:00:00`,
  endTime: `2025-11-16T11:45:00`,
}

describe(`WorkEntryModalContainer`, () => {
  describe(`Add Work Entry`, addWorkEntryTests)
  describe(`On Close Modal`, onCloseModalTests)
})

function addWorkEntryTests() {
  it(`
  GIVEN an empty work entry
  WHEN fill work entry field
  AND click 'Add Task' button
  SHOULD send correct payload to API
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

    mountComponent()

    cy
      .getByData(`title-input`)
      .type(ADDED_WORK_ENTRY_MODAL_DATA.title)

    cy
      .getByData(`task-id-input`)
      .type(ADDED_WORK_ENTRY_MODAL_DATA.taskId)

    cy
      .get(`.work-entry-modal__date-field`)
      .click()
      
    cy
      .contains(`16`)
      .click()

    cy
      .getByData(`start-time-input`)
      .clear()
      .type(`10:00`)
    
    cy
      .getByData(`end-time-input`)
      .clear()
      .type(`11:45`)

    cy
      .contains(`Add Task`)
      .click()

    cy
      .wait(`@addWorkEntry`)
      .its(`request.body`)
      .should(`deep.equal`, ADDED_WORK_ENTRY_MODAL_DATA)
  })

}

function onCloseModalTests() {
  it(`
  GIVEN opened work entry modal
  WHEN click on close button
  SHOULD trigger onClose function once 
  `, () => {
    mountComponent()
    
    cy
      .get(`.tc-modal__close-button`)
      .click()

    cy
      .get(`@onClose`)
      .should(`be.calledOnce`)
  })
}

function mountComponent() {
  const workEntryModalState = new WorkEntryModalState()

  const onClose = cy
    .spy()
    .as(`onClose`)
  
  workEntryModalState.setDate({
    date: new Date(`2025-11-27T09:00:00`),
  })
  workEntryModalState.setStartTime({
    startTime: new Date(`2025-11-27T09:00:00`),
  })
  workEntryModalState.setEndTime({
    endTime: new Date(`2025-11-27T11:30:00`),
  })

  cy
    .mount(
      <WorkEntryModalStateContext.Provider value={workEntryModalState}>
        <WorkEntryModalContainer 
          onClose={onClose}
        />,
      </WorkEntryModalStateContext.Provider>,
    )
}
