import { DeleteModalContainer } from "./DeleteModalContainer"
import { DeleteModalState } from "./state/DeleteModalState"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"

describe(`DeleteModalContainer`, () => {   
  describe(`Delete Entry`, deleteEntryTests)
  describe(`Validate on Client`, validateOnClientTests)
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
     
    mountComponent({
      deletionReason: softDeleteRequest.deletionReason,
    })

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

function validateOnClientTests() {
  it(`
  GIVEN opened submitted task entry 
  WHEN deletion reason is not specified
  AND WHEN delete button is clicked
  SHOULD show error message
  `, () => {
    mountComponent()

    cy
      .getByData(`delete-entry-button`)
      .click()

    cy
      .getByData(`delete-reason`)
      .should(`have.class`, `error`)

    cy.contains(`Fill in the reason`)
  })
}

function mountComponent({
  deletionReason = ``,
}:{
  deletionReason?: string,
} = {} ){
  const deleteModalState = new DeleteModalState()
  deleteModalState.setDeletionReason({
    deletionReason,
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
