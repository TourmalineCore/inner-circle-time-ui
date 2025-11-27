import { Views } from "react-big-calendar"
import { TimeTrackerTableState } from "./state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./state/TimeTrackerTableStateContext"
import { TimeTrackerTableContainer } from "./TimeTrackerTableContainer"

describe(`TimeTrackerTableContainer`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      `*/tracking/work-entries?startTime=2025-11-24T00:00:00&endTime=2025-11-30T23:59:59`,
      (req) => {
        req.alias = `getWorkEntries`
        req.reply({
          statusCode: 200,
        })
      },
    )
  })

  describe(`Initialization`, initializationTests)
})

function initializationTests() {
  it(`
  GIVEN desktop view
  WHEN render the component
  SHOULD see them
  `, () => {
    cy.viewport(1366, 768)

    mountComponent()

    cy.wait(`@getWorkEntries`)
  })
}

function mountComponent() {
  const timeTrackerState = new TimeTrackerTableState()

  timeTrackerState.setViewPeriod({
    date: new Date(2025-11-27),
    view: Views.WEEK,
  })
  
  cy
    .mount(
      <TimeTrackerStateContext.Provider value={timeTrackerState}>
        <TimeTrackerTableContainer 
          onOpenWorkItemModal={() => {}}
          setWorkItemModalDataTime={() => {}}
        />,
      </TimeTrackerStateContext.Provider>,
    )
}
