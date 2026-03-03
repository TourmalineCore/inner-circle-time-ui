import { EntryType } from "../../../../../../common/constants/entryType"
import { ENTRY_TYPES_STRATEGY } from "../../entry-types-strategy"
import { DeleteModalContainer } from "./DeleteModalContainer"
import { DeleteModalState } from "./state/DeleteModalState"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"

describe(`DeleteModalContent`, () => {   
  describe(`Close Delete Modal`, closeDeleteModalTests)
})

function closeDeleteModalTests() {
  it(`
  GIVEN opened delete entry modal
  WHEN click on close button
  SHOULD trigger onCloseDeleteModal function once 
  `, () => {
    mountComponent()

    cy
      .get(`.tc-modal__close-button`)
      .click()

    cy
      .get(`@onCloseDeleteModal`)
      .should(`be.calledOnce`)
  })
}

function mountComponent() {
  const deleteModalState = new DeleteModalState()

  const onCloseDeleteModal = cy
    .spy()
    .as(`onCloseDeleteModal`)

  cy
    .mount(
      <DeleteModalStateContext.Provider value={deleteModalState}>
        <DeleteModalContainer 
          id={1}
          label={ENTRY_TYPES_STRATEGY[EntryType.TASK].label}
          onCloseDeleteModal={onCloseDeleteModal}
          onCloseAllModals={() => {}}
        />,
      </DeleteModalStateContext.Provider>,
    )
}
