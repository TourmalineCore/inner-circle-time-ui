import { EntryType } from "../../../../../../common/constants/entryType"
import { eventBus } from "../../../../event-bus"
import { ENTRY_TYPES_STRATEGY } from "../../entry-types-strategy"
import { DeleteModalContent } from "./DeleteModalContent"
import { DeleteModalState } from "./state/DeleteModalState"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"

describe(`DeleteModalContent`, () => {   
  describe(`Event Call`, eventCallTests)
})

function eventCallTests() {
  it(`
  GIVEN opened entry modal
  WHEN click on close button
  SHOULD trigger close and reset entry events 
  `, () => {
    mountComponent()
    
    cy
      .get(`.tc-modal__close-button`)
      .click()
    
    cy.get(`@eventBusTrigger`)
      .should(`be.calledWith`, `DELETE_MODAL:CLOSE`)
  })
}

function mountComponent() {
  const deleteModalState = new DeleteModalState()

  cy.spy(eventBus, `trigger`)
    .as(`eventBusTrigger`)
      
  cy
    .mount(
      <DeleteModalStateContext.Provider value={deleteModalState}>
        <DeleteModalContent 
          label={ENTRY_TYPES_STRATEGY[EntryType.TASK].label}
          onSubmitDeletionReason={() => {}}
        />,
      </DeleteModalStateContext.Provider>,
    )
}
