import { DeleteModalContainer } from "./DeleteModalContainer"
import { DeleteModalState } from "./state/DeleteModalState"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"

describe(`DeleteModalContainer`, () => {   
  describe(`Delete Entry`, deleteEntryTests)
})

function deleteEntryTests() {
  it(`
  GIVEN opened submitted task entry 
  WHEN click delete button
  SHOULD send delete request 
  `, () => {
    const softDeleteRequest = {
      deletionReason: `Wrong date`,
    }

    cy
      .intercept(
        `DELETE`,
        `*/time/tracking/entries/1/soft-delete`,
        {
          statusCode: 200,
          body: softDeleteRequest,
        },
      )
      .as(`softDeleteEntry`)
     
    mountComponent()

    cy
      .getByData(`delete-entry-button`)
      .click()

    cy
      .wait(`@softDeleteEntry`)
      .its(`request.body`)
      .should(`deep.equal`, softDeleteRequest)

    cy
      .get(`@onCloseAllModals`)
      .should(`be.calledOnce`)
  })
}

function mountComponent() {
  const deleteModalState = new DeleteModalState()
  deleteModalState.setDeletionReason({
    deletionReason: `Wrong date`,
  })

  const onCloseAllModals = cy
    .spy()
    .as(`onCloseAllModals`)

  cy
    .mount(
      <DeleteModalStateContext.Provider value={deleteModalState}>
        <DeleteModalContainer 
          onCloseDeleteModal={() => {}}
          onCloseAllModals={onCloseAllModals}
          id={1}
        />,
      </DeleteModalStateContext.Provider>,
    )
}
