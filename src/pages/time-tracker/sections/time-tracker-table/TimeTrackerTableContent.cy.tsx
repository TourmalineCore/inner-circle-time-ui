import { TimeTrackerTableState } from "./state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./state/TimeTrackerTableStateContext"
import { TimeTrackerTableContent } from "./TimeTrackerTableContent"

describe(`TimeTrackerTableContent`, () => {
  beforeEach(() => {
    // set cypress default date
    cy.clock(new Date(2025, 10, 27), [
      `Date`,
    ])
  })

  describe(`Copy Mode`, copyModeTests)
  describe(`Function Call`, functionCallTests)
})

function copyModeTests() {
  it(`
  GIVEN time tracker table
  WHEN isCopyMode equal false
  SHOULD not see copy alert
  `, () => {
    mountComponent()

    cy.getByData(`copy-alert`)
      .should(`not.exist`)
  })
  
  it(`
  GIVEN time tracker table
  WHEN isCopyMode equal true
  SHOULD see copy alert
  `, () => {
    mountComponent({
      isCopyMode: true,
    })

    cy.getByData(`copy-alert`)
      .should(`exist`)
  }) 
}

function functionCallTests() {
  it(`
  GIVEN time tracker table
  WHEN click on free time slot
  SHOULD trigger open modal entry
  `, () => {
    mountComponent()

    // Waiting for the table to be displayed in the desktop version
    cy
      .contains(`November 24 – 30`)
      .should(`be.visible`)

    cy.get(`.rbc-day-slot`)
      .find(`.rbc-timeslot-group`)
      .first()
      .find(`.rbc-time-slot`)
      .first()
      .scrollIntoView()
      .click({
        force: true, 
      })

    cy.get(`@createNewEntry`)
      .should(`have.been.calledOnce`)
  }) 
}

function mountComponent({
  isCopyMode = false,
}: {
  isCopyMode?: boolean,
} = {}) {
  cy.viewport(1366, 768)
      
  const timeTrackerState = new TimeTrackerTableState()
    
  const createNewEntry = cy.spy()
    .as(`createNewEntry`)
    
  cy
    .mount(
      <TimeTrackerStateContext.Provider value={timeTrackerState}>
        <TimeTrackerTableContent
          isCopyMode={isCopyMode}
          createCopyEntry={() => {}}
          createNewEntry={createNewEntry}
          openEntry={() => {}}
          resetIsCopyMode={() => {}}
        />
      </TimeTrackerStateContext.Provider>,
    )
}
