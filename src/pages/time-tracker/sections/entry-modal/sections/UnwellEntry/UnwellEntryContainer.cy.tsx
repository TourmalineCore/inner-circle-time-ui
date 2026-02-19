import { EMPTY_UNWELL_ENTRY_DATA, UnwellEntryState } from "./state/UnwellEntryState"
import { UnwellEntryStateContext } from "./state/UnwellEntryStateContext"
import { UnwellEntryContainer } from "./UnwellEntryContainer"

describe(`UnwellEntryContainer`, () => {   
  describe(`Request Tests`, RequestTests)
  describe(`Set Error`, setErrorTests)
})

function RequestTests() {
  let unwellEntryState: UnwellEntryState

  beforeEach(() => {
    unwellEntryState = new UnwellEntryState()

    setDateAndTime({
      unwellEntryState,
    })
  })

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

    mountComponent({
      unwellEntryState,
    })
    
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
  let unwellEntryState: UnwellEntryState

  beforeEach(() => {
    unwellEntryState = new UnwellEntryState()

    setDateAndTime({
      unwellEntryState,
    })
  })

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
    
    mountComponent({
      unwellEntryState,
    })

    cy
      .contains(`Add`)
      .click()

    cy.contains(`Error message`)
  })
}

function mountComponent({
  unwellEntryState,
}: {
  unwellEntryState: UnwellEntryState,
}) {

  const handleTriggerReloadState = cy
    .spy()
    .as(`handleTriggerReloadState`)

  cy
    .mount(
      <UnwellEntryStateContext.Provider value={unwellEntryState}>
        <UnwellEntryContainer 
          handleTriggerReloadState={handleTriggerReloadState}
          unwellEntry={EMPTY_UNWELL_ENTRY_DATA} />
      </UnwellEntryStateContext.Provider>,
    )
}

function setDateAndTime({
  unwellEntryState,
}: {
  unwellEntryState: UnwellEntryState,
}) {
  unwellEntryState.setDate({
    date: new Date(`2025-11-27T09:00:00`),
  })
  unwellEntryState.setStartTime({
    startTime: new Date(`2025-11-27T09:00:00`),
  })
  unwellEntryState.setEndTime({
    endTime: new Date(`2025-11-27T11:30:00`),
  })
}
