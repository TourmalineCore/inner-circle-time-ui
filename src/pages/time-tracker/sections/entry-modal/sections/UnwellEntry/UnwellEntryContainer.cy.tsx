import { EntryType } from "../../../../../../common/constants/entryType"
import { EntryModal } from "../../EntryModal"

describe(`UnwellEntryContainer`, () => {   
  describe(`Request Tests`, RequestTests)
  describe(`Set Error`, setErrorTests)
})

function RequestTests() {
  it(`
  GIVEN opened unwell entry 
  WHEN click on submit button
  SHOULD send successful request
  `, () => {
    cy
      .intercept(
        `POST`,
        `*/time/tracking/unwell-entries`,
        {
          statusCode: 200,
        },
      )
      .as(`addUnwellEntry`)

    mountComponent()
    
    cy
      .contains(`Add`)
      .click()

    cy.wait(`@addUnwellEntry`)

    cy
      .get(`@handleTriggerReloadState`)
      .should(`be.calledOnce`)
  })
}

function setErrorTests() {
  it(`
  GIVEN opened unwell entry 
  WHEN click on submit button
  AND server validation error will be returned
  SHOULD display error message
  `, () => {
    cy
      .intercept(
        `POST`,
        `*/time/tracking/unwell-entries`,
        {
          statusCode: 400,
          body: {
            detail: `Error message`,
          },
        },
      )
    
    mountComponent()

    cy
      .contains(`Add`)
      .click()

    cy.contains(`Error message`)
  })
}

function mountComponent() {

  const handleTriggerReloadState = cy
    .spy()
    .as(`handleTriggerReloadState`)

  cy
    .mount(
      <EntryModal 
        currentEntry={{
          id: undefined,
          title: undefined,
          taskId: undefined,
          project: undefined,
          description: undefined,
          type: EntryType.UNWELL,
          date: new Date(`2025-11-27T09:00:00`),
          start: new Date(`2025-11-27T09:00:00`),
          end: new Date(`2025-11-27T11:30:00`),
        }}
        onClose={() => {}}
        handleTriggerReloadState={handleTriggerReloadState}
      />,
    )
}
