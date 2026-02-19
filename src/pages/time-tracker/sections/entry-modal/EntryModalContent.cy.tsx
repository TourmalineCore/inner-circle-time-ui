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
  GIVEN opened  entry modal
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
            onClose={onClose}
          />
        </TaskEntryStateContext.Provider>
      </EntryModalStateContext.Provider>,
    )
}