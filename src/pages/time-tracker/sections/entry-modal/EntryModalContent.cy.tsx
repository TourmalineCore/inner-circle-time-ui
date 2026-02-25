import { EntryModalContent } from "./EntryModalContent"
import { TaskEntryState } from "./sections/TaskEntry/state/TaskEntryState"
import { TaskEntryStateContext } from "./sections/TaskEntry/state/TaskEntryStateContext"
import { EntryModalState } from "./state/EntryModalState"
import { EntryModalStateContext } from "./state/EntryModalStateContext"

describe(`EntryModalContainer`, () => {   
  describe(`On Close Modal`, onCloseModalTests)
})

function onCloseModalTests() {
  it(`
  GIVEN opened entry modal
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

  it(`
  GIVEN opened entry modal
  WHEN isExistingEntry = false
  SHOULD not disabled type select
  `, () => {
    mountComponent()
    
    cy.getByData(`type-select`)
      .should(`not.be.disabled`)
  })

  it(`
  GIVEN opened entry modal
  WHEN isExistingEntry = true
  SHOULD disabled type select
  `, () => {
    mountComponent({
      isExistingEntry: true,
    })
    
    cy.getByData(`type-select`)
      .should(`be.disabled`)
  })
}

function mountComponent({
  isExistingEntry = false,
}: {
  isExistingEntry?: boolean,
} = {}) {
  const entryModalState = new EntryModalState()
  const taskEntryState = new TaskEntryState()
  const onClose = cy
    .spy()
    .as(`onClose`)

  cy
    .mount(
      <EntryModalStateContext.Provider value={entryModalState}>
        <TaskEntryStateContext.Provider value={taskEntryState}>
          <EntryModalContent 
            isExistingEntry={isExistingEntry}
            onClose={onClose}
          />
        </TaskEntryStateContext.Provider>
      </EntryModalStateContext.Provider>,
    )
}