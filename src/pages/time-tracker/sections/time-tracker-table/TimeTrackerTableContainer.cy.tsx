import { TimeTrackerTableState } from "./state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./state/TimeTrackerTableStateContext"
import { TimeTrackerTableContainer } from "./TimeTrackerTableContainer"

describe(`TimeTrackerTableContainer`, () => {
  beforeEach(() => {
    // set cypress default date
    cy.clock(new Date(2025, 10, 27), [
      `Date`,
    ])
  })

  describe(`Initialization`, initializationTests)
  describe(`Switch periods`, switchPeriodsTests)
})

function initializationTests() {
  it(`
  GIVEN mobile view
  WHEN render the component
  SHOULD send correct request
  `, () => {
    cy.viewport(375, 768)

    cy
      .intercept(
        `GET`,
        `*/time/tracking/work-entries?startTime=2025-11-27T00:00:00&endTime=2025-11-27T23:59:59`,
        {
          statusCode: 200,
        },
      )
      .as(`getWorkEntries`)

    mountComponent()

    cy.wait(`@getWorkEntries`)
  })

  it(`
  GIVEN desktop view
  WHEN render the component
  SHOULD send correct request
  `, () => {
    cy.viewport(1366, 1024)

    cy
      .intercept(
        `GET`,
        `*/time/tracking/work-entries?startTime=2025-11-24T00:00:00&endTime=2025-11-30T23:59:59`,
        {
          statusCode: 200,
        },
      )
      .as(`getWorkEntries`)

    mountComponent()

    cy.wait(`@getWorkEntries`)
  })
}

function switchPeriodsTests() {
  it(`
  GIVEN mobile view
  WHEN click next button
  SHOULD render next day
  AND send correct request
  `, () => {
    cy.viewport(375, 768)

    cy
      .intercept(
        `GET`,
        `*/time/tracking/work-entries?startTime=2025-11-28T00:00:00&endTime=2025-11-28T23:59:59`,
        {
          statusCode: 200,
        },
      )
      .as(`getNextDay`)
  
    mountComponent()

    cy.contains(`Thursday Nov 27`)

    cy
      .contains(`Next`)
      .click()

    cy.contains(`Friday Nov 28`)

    cy.wait(`@getNextDay`)
  }) 

  it(`
  GIVEN desktop view
  WHEN click back button
  SHOULD render previous week
  AND send correct request
  `, () => {
    cy.viewport(1366, 768)

    cy
      .intercept(
        `GET`,
        `*/time/tracking/work-entries?startTime=2025-11-17T00:00:00&endTime=2025-11-23T23:59:59`,
        {
          statusCode: 200,
        },
      )
      .as(`getPreviousDay`)
  
    mountComponent()

    cy.contains(`November 24 – 30`)

    cy
      .contains(`Back`)
      .click()

    cy.contains(`November 17 – 23`)

    cy.wait(`@getPreviousDay`)
  }) 
}

function mountComponent() {
  const timeTrackerState = new TimeTrackerTableState()
  
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
