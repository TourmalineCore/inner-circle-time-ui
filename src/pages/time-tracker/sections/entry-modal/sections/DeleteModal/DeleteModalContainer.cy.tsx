import { EntryType } from "../../../../../../common/constants/entryType"
import { eventBus, EventBusType } from "../../../../event-bus"
import { ENTRY_TYPES_STRATEGY } from "../../entry-types-strategy"
import { DeleteModalContainer } from "./DeleteModalContainer"
import { DeleteModalState } from "./state/DeleteModalState"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"

describe(`DeleteModalContainer`, () => {   
  describe(`Request`, requestTests)
  describe(`Validate on Client`, validateOnClientTests)
})

function requestTests() {
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

    getEventBus()
      .should(`be.calledWith`, EventBusType.DELETE_MODAL_CLOSE)

    getEventBus()
      .should(`be.calledWith`, EventBusType.ENTRY_MODAL_CLOSE) 

    getEventBus()
      .should(`be.calledWith`, EventBusType.TABLE_RELOAD_ENTRIES)
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
} = {}){
  const deleteModalState = new DeleteModalState()
  
  deleteModalState.setDeletionReason({
    deletionReason,
  })

  cy.spy(eventBus, `trigger`)
    .as(`eventBusTrigger`)

  cy
    .mount(
      <DeleteModalStateContext.Provider value={deleteModalState}>
        <DeleteModalContainer 
          id={1}
          label={ENTRY_TYPES_STRATEGY[EntryType.TASK].label}
        />,
      </DeleteModalStateContext.Provider>,
    )
}

function getEventBus() {
  return cy.get(`@eventBusTrigger`)
}
