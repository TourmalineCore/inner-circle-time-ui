import { TrackingPageActions } from "../../../../../cypress/pagesActions/TrackingPageActions"
import { EntryModalContent } from "./EntryModalContent"
import { EntryModalState } from "./state/EntryModalState"
import { EntryModalStateContext } from "./state/EntryModalStateContext"

describe(`EntryModalContent`, () => {   
  describe(`Function Call`, functionCallTests)
  describe(`Is Existing Modal Entry`, isExistingModalEntryTests)
  describe(`Is Disabled Types Select`, isDisabledTypesSelectTests)
})

function functionCallTests() {
  it(`
  GIVEN opened entry modal
  WHEN click on close button
  SHOULD trigger close entry modal and reset current entry methods 
  `, () => {
    mountComponent()
    
    TrackingPageActions.clickByEntryModalCloseButton()
      
    cy
      .get(`@resetCurrentEntry`)
      .should(`have.been.calledOnce`)

    cy
      .get(`@closeEntryModal`)
      .should(`have.been.calledOnce`)
  })

  it(`
  GIVEN opened entry modal
  WHEN click on delete button
  SHOULD trigger open delete modal function
  `, () => {
    mountComponent({
      isExistingEntry: true,
    })
    
    TrackingPageActions.getEntryModalDeleteButton()
      .click()
    
    cy
      .get(`@openDeleteModal`)
      .should(`have.been.calledOnce`)
  })

  it(`
  GIVEN opened entry modal
  WHEN click on copy button
  SHOULD trigger copy current entry method 
  `, () => {
    mountComponent({
      isExistingEntry: true,
    })
    
    TrackingPageActions.getEntryModalCopyButton()
      .click()
    
    cy
      .get(`@copyCurrentEntry`)
      .should(`have.been.calledOnce`)
  })
}

function isExistingModalEntryTests() {
  it(`
  GIVEN opened entry modal
  WHEN isExistingEntry = false
  SHOULD not display delete and copy buttons
  `, () => {
    mountComponent()
    
    TrackingPageActions.getEntryModalDeleteButton()
      .should(`not.exist`)

    TrackingPageActions.getEntryModalCopyButton()
      .should(`not.exist`)
  })

  it(`
  GIVEN opened entry modal
  WHEN isExistingEntry = true
  SHOULD display delete and copy buttons
  `, () => {
    mountComponent({
      isExistingEntry: true,
    })

    TrackingPageActions.getEntryModalDeleteButton()
      .should(`exist`)

    TrackingPageActions.getEntryModalCopyButton()
      .should(`exist`)
  })
}

function isDisabledTypesSelectTests() {
  it(`
  GIVEN opened entry modal
  WHEN isDisabledTypesSelect = false
  SHOULD not disable type select
  `, () => {
    mountComponent()

    TrackingPageActions.getEntryModalTypeSelect()
      .should(`not.be.disabled`)
  })

  it(`
  GIVEN opened entry modal
  WHEN isDisabledTypesSelect = true
  SHOULD disable type select
  `, () => {
    mountComponent({
      isDisabledTypesSelect: true,
    })

    TrackingPageActions.getEntryModalTypeSelect()
      .should(`be.disabled`)
  })
}

function mountComponent({
  isDisabledTypesSelect = false,
  isExistingEntry = false,
}: {
  isDisabledTypesSelect?: boolean,
  isExistingEntry?: boolean,
} = {}) {
  const entryModalState = new EntryModalState()

  const openDeleteModal = cy
    .spy()
    .as(`openDeleteModal`)

  cy.spy(entryModalState, `resetCurrentEntry`)
    .as(`resetCurrentEntry`)

  cy.spy(entryModalState, `closeEntryModal`)
    .as(`closeEntryModal`)

  cy.spy(entryModalState, `copyCurrentEntry`)
    .as(`copyCurrentEntry`)

  cy
    .mount(
      <EntryModalStateContext.Provider value={entryModalState}>
        <EntryModalContent 
          isDisabledTypesSelect={isDisabledTypesSelect}
          isExistingEntry={isExistingEntry}
          onSubmitEntry={() => {}}
          buttonLabel={``}
          openDeleteModal={openDeleteModal}
        />
      </EntryModalStateContext.Provider>,
    )
}