import { EntryType } from "../../../../../../common/constants/entryType"
import { ENTRY_TYPES_STRATEGY } from "../../entry-types-strategy"
import { EntryModalContainer } from "../../EntryModalContainer"
import { EntryModalState } from "../../state/EntryModalState"
import { EntryModalStateContext } from "../../state/EntryModalStateContext"
import { TaskEntryState } from "./state/TaskEntryState"
import { TaskEntryStateContext } from "./state/TaskEntryStateContext"

describe(`TaskEntry`, () => {   
  describe(`Client validation`, clientValidation)
})

function clientValidation() {
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
}

function mountComponent() {
  const entryModalState = new EntryModalState()
  const taskEntryState = new TaskEntryState()

  cy
    .mount(
      <EntryModalStateContext.Provider value={entryModalState}>
        <TaskEntryStateContext.Provider value={taskEntryState}>
          <EntryModalContainer 
            entryStrategy={ENTRY_TYPES_STRATEGY[EntryType.TASK]}
          />,
        </TaskEntryStateContext.Provider>
      </EntryModalStateContext.Provider>,
    )
}
