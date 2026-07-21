import { TrackingPageActions } from "../../../../../cypress/pagesActions/TrackingPageActions"
import { EntryType } from "../../../../common/constants/entryType"
import { EntryModalContent } from "./EntryModalContent"
import { EntryModalState } from "./state/EntryModalState"
import { EntryModalStateContext } from "./state/EntryModalStateContext"

describe(`EntryModalContent`, () => {   
  describe(`Function Call`, functionCallTests)
  describe(`Is Existing Modal Entry`, isExistingModalEntryTests)
  describe(`Is Disabled Types Select`, isDisabledTypesSelectTests)
  describe(`Button visibility`, buttonVisibilityTests)
  describe(`Entry types select options`, entryTypesSelectOptionsTests)
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

function buttonVisibilityTests() {
  it(`
  GIVEN opened entry modal
  WHEN hasDeleteButton = true
  AND hasCopyButton = true
  SHOULD render delete and copy buttons
  `, () => {
    mountComponent({
      isExistingEntry: true,
    })

    TrackingPageActions.getEntryModalCopyButton()
      .should(`exist`)

    TrackingPageActions.getEntryModalDeleteButton()
      .should(`exist`)
  })

  it(`
  GIVEN opened entry modal
  WHEN hasDeleteButton = false
  AND hasCopyButton = false
  SHOULD not render delete and copy buttons
  `, () => {
    mountComponent({
      hasDeleteButton: false,
      hasCopyButton: false,
      isExistingEntry: true,
    })

    TrackingPageActions.getEntryModalCopyButton()
      .should(`not.exist`)

    TrackingPageActions.getEntryModalDeleteButton()
      .should(`not.exist`)
  })
}

function entryTypesSelectOptionsTests() {
  it(`
  GIVEN entry modal is open
  WHEN isAllDayEntryType = true
  THEN select options should contain only all-day entry type values
  `, () => {
    mountComponent({
      isAllDayEntryType: true,
    })

    TrackingPageActions.getEntryModalTypeSelect()
      .find(`option`)
      .then((options) => {
        const values = Cypress._.map(options, `value`)
    
        expect(values)
          .to
          .deep
          .eq([
            EntryType.SICK_LEAVE,
          ].map(String))
      })
  })

  it(`
  GIVEN entry modal is opened
  WHEN isAllDayEntryType = false
  THEN select options should contain only non-all-day entry type values
  `, () => {
    mountComponent()

    TrackingPageActions.getEntryModalTypeSelect()
      .find(`option`)
      .then((options) => {
        const values = Cypress._.map(options, `value`)
    
        expect(values)
          .to
          .deep
          .eq([
            EntryType.TASK,
            EntryType.UNWELL,
            EntryType.AWAY_WITH_MAKE_UP_TIME,
          ].map(String))
      })
  })
}

function mountComponent({
  hasDeleteButton = true,
  hasCopyButton = true,
  isDisabledTypesSelect = false,
  isExistingEntry = false,
  isAllDayEntryType = false,
}: {
  hasDeleteButton?: boolean,
  hasCopyButton?: boolean,
  isDisabledTypesSelect?: boolean,
  isExistingEntry?: boolean,
  isAllDayEntryType?: boolean,
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
          hasDeleteButton={hasDeleteButton}
          hasCopyButton={hasCopyButton}
          isAllDayEntryType={isAllDayEntryType}
          openDeleteModal={openDeleteModal}
        />
      </EntryModalStateContext.Provider>,
    )
}