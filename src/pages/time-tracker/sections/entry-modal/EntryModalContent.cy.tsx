import { eventBus } from "../../event-bus"
import { EntryModalContent } from "./EntryModalContent"
import { EntryModalState } from "./state/EntryModalState"
import { EntryModalStateContext } from "./state/EntryModalStateContext"

describe(`EntryModalContent`, () => {   
  describe(`Event Call`, eventCallTests)
  describe(`Is Existing Modal Entry`, isExistingModalEntryTests)
  describe(`Is Disabled Types Select`, isDisabledTypesSelectTests)
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
    
    getEventBus()
      .should(`be.calledWith`, `ENTRY_MODAL:CLOSE`)

    getEventBus()
      .should(`be.calledWith`, `TABLE:RESET_ENTRY`)
  })

  it(`
  GIVEN opened entry modal
  WHEN click on delete button
  SHOULD trigger open delete modal event
  `, () => {
    mountComponent({
      isExistingEntry: true,
    })
    
    cy
      .getByData(`delete-button`)
      .click()
    
    getEventBus()
      .should(`be.calledWith`, `DELETE_MODAL:OPEN`)
  })

  it(`
  GIVEN opened entry modal
  WHEN click on copy button
  SHOULD trigger copy entry event 
  `, () => {
    mountComponent({
      isExistingEntry: true,
    })
    
    cy
      .getByData(`copy-button`)
      .click()
    
    getEventBus()
      .should(`be.calledWith`, `TABLE:COPY_ENTRY`)
  })
}

function isExistingModalEntryTests() {
  it(`
  GIVEN opened entry modal
  WHEN isExistingEntry = false
  SHOULD not display delete and copy buttons
  `, () => {
    mountComponent()
    
    cy
      .getByData(`delete-button`)
      .should(`not.exist`)

    cy
      .getByData(`copy-button`)
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

    cy
      .getByData(`delete-button`)
      .should(`exist`)

    cy
      .getByData(`copy-button`)
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

    cy.getByData(`type-select`)
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

    cy.getByData(`type-select`)
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

  cy.spy(eventBus, `trigger`)
    .as(`eventBusTrigger`)

  cy
    .mount(
      <EntryModalStateContext.Provider value={entryModalState}>
        <EntryModalContent 
          isDisabledTypesSelect={isDisabledTypesSelect}
          isExistingEntry={isExistingEntry}
          onSubmitEntry={() => {}}
          buttonLabel={``} />
      </EntryModalStateContext.Provider>,
    )
}

function getEventBus() {
  return cy.get(`@eventBusTrigger`)
}