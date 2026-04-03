import { EntryType } from "../../../../../../common/constants/entryType"
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
    
    cy
      .get(`@closeDeleteModal`)
      .should(`have.been.calledOnce`)
  })
}

function mountComponent() {
  const deleteModalState = new DeleteModalState()

  const closeDeleteModal = cy
    .spy()
    .as(`closeDeleteModal`)
      
  cy
    .mount(
      <DeleteModalStateContext.Provider value={deleteModalState}>
        <DeleteModalContent 
          label={ENTRY_TYPES_STRATEGY[EntryType.TASK].label}
          onSubmitDeletionReason={() => {}}
          closeDeleteModal={closeDeleteModal}
        />,
      </DeleteModalStateContext.Provider>,
    )
}
