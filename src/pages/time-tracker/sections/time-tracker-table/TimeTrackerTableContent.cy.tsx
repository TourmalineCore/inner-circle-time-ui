import { eventBus, EventBusType } from "../../event-bus"
import { TimeTrackerTableState } from "./state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./state/TimeTrackerTableStateContext"
import { TimeTrackerTableContainer } from "./TimeTrackerTableContainer"

describe(`TimeTrackerTableContent`, () => {
  beforeEach(() => {
    // set cypress default date
    cy.clock(new Date(2025, 10, 27), [
      `Date`,
    ])
  })

  describe(`Event Call`, eventCallTests)
})

function eventCallTests() {
  it(`
  GIVEN time tracker table
  WHEN click on free time slot
  SHOULD trigger open modal entry
  `, () => {
    cy.viewport(1366, 768)

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

    cy.get(`@eventBusTrigger`)
      .should(`be.calledWith`, EventBusType.ENTRY_MODAL_OPEN)
  }) 
}

function mountComponent() {
  const timeTrackerState = new TimeTrackerTableState()
  
  cy.spy(eventBus, `trigger`)
    .as(`eventBusTrigger`)
    
  cy
    .mount(
      <TimeTrackerStateContext.Provider value={timeTrackerState}>
        <TimeTrackerTableContainer />
      </TimeTrackerStateContext.Provider>,
    )
}
