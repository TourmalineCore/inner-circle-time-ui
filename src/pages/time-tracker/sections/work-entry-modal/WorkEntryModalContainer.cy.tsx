import { WorkEntryModalState } from "./state/WorkEntryModalState"
import { WorkEntryModalStateContext } from "./state/WorkEntryModalStateContext"
import { WorkEntryModalContainer } from "./WorkEntryModalContainer"

const ADDED_WORK_ENTRY_MODAL_DATA = {
  title: `Task name`,
  taskId: `1`,
  startTime: `2025-11-16T10:00:00`,
  endTime: `2025-11-16T11:45:00`,
}

const UPDATED_WORK_ENTRY_MODAL_DATA = {
  title: `New task name`,
  taskId: `2`,
  startTime: `2025-11-27T11:00:00`,
  endTime: `2025-11-27T12:00:00`,
}

describe(`WorkEntryModalContainer`, () => {
  describe(`Add Work Entry`, addWorkEntryTests)
  describe(`Update Work Entry`, updateWorkEntryTests)
  describe(`On Close Modal`, onCloseModalTests)
})

function addWorkEntryTests() {
  let workEntryModalState: WorkEntryModalState

  beforeEach(() => {
    workEntryModalState = new WorkEntryModalState()

    workEntryModalState.setDate({
      date: new Date(`2025-11-27T09:00:00`),
    })
    workEntryModalState.setStartTime({
      startTime: new Date(`2025-11-27T09:00:00`),
    })
    workEntryModalState.setEndTime({
      endTime: new Date(`2025-11-27T11:30:00`),
    })
  })

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

    mountComponent({
      workEntryModalState,
    })

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

function updateWorkEntryTests() {
  let workEntryModalState: WorkEntryModalState

  beforeEach(() => {
    workEntryModalState = new WorkEntryModalState()

    workEntryModalState.setId({
      id: 1,
    })

    workEntryModalState.setTitle({
      title: `Task name`,
    })

    workEntryModalState.setTaskId({
      taskId: `1`,
    })
    
    workEntryModalState.setDate({
      date: new Date(`2025-11-27T09:00:00`),
    })
    workEntryModalState.setStartTime({
      startTime: new Date(`2025-11-27T09:00:00`),
    })
    workEntryModalState.setEndTime({
      endTime: new Date(`2025-11-27T11:30:00`),
    })
  })

  it(`
  GIVEN a work entry
  WHEN update data
  AND click 'Update Task' button
  SHOULD send correct updated payload to API
  `, () => {
    cy
      .intercept(
        `POST`,
        `*/time/tracking/work-entries/1`,
        {
          statusCode: 200,
        },
      )
      .as(`updateWorkEntry`)

    mountComponent({
      workEntryModalState,
    })

    cy
      .getByData(`title-input`)
      .clear()
      .type(UPDATED_WORK_ENTRY_MODAL_DATA.title)

    cy
      .getByData(`task-id-input`)
      .clear()
      .type(UPDATED_WORK_ENTRY_MODAL_DATA.taskId)

    cy
      .getByData(`start-time-input`)
      .clear()
      .type(`11:00`)
    
    cy
      .getByData(`end-time-input`)
      .clear()
      .type(`12:00`)

    cy
      .contains(`Update Task`)
      .click()

    cy
      .wait(`@updateWorkEntry`)
      .its(`request.body`)
      .should(`deep.equal`, UPDATED_WORK_ENTRY_MODAL_DATA)
  })

}

function onCloseModalTests() {
  let workEntryModalState: WorkEntryModalState

  beforeEach(() => {
    workEntryModalState = new WorkEntryModalState()
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
  SHOULD trigger onClose function once 
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

  cy
    .mount(
      <WorkEntryModalStateContext.Provider value={workEntryModalState}>
        <WorkEntryModalContainer 
          onClose={onClose}
        />
      </WorkEntryModalStateContext.Provider>,
    )
}
