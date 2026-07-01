import { TrackingPageActions } from "../../../../../../../cypress/pagesActions/TrackingPageActions"
import { EntryType } from "../../../../../../common/constants/entryType"
import { EntryTypesStrategy } from "../../entry-types-strategies/entryTypesStrategy"
import { EntryModalContainer } from "../../EntryModalContainer"
import { EntryModalState } from "../../state/EntryModalState"
import { EntryModalStateContext } from "../../state/EntryModalStateContext"
import { TaskEntryState } from "../TaskEntry/state/TaskEntryState"
import { TaskEntryStateContext } from "../TaskEntry/state/TaskEntryStateContext"

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

    TrackingPageActions.clickByEntryModalSubmitButton()

    cy.contains(`Fill in all the fields`)
  })
}

function mountComponent() {
  const entryModalState = new EntryModalState()
  const taskEntryState = new TaskEntryState()

  const entryStrategy = EntryTypesStrategy.create({
    entryType: EntryType.TASK,
  }) 

  cy
    .mount(
      <EntryModalStateContext.Provider value={entryModalState}>
        <TaskEntryStateContext.Provider value={taskEntryState}>
          <EntryModalContainer 
            entryStrategy={entryStrategy}
            openDeleteModal={() => {}}
          />,
        </TaskEntryStateContext.Provider>
      </EntryModalStateContext.Provider>,
    )
}
