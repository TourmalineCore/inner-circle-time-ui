import { TimeTrackerTableState } from "./state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./state/TimeTrackerTableStateContext"
import { TimeTrackerTableContainer } from "./TimeTrackerTableContainer"

const PROJECTS = [
  {
    id: 1,
    name: `ProjectOne`,
  },
  {
    id: 2,
    name: `ProjectTwo`,
  },
]

describe(`TimeTrackerTableContainer`, () => {
  beforeEach(() => {
    // set cypress default date
    cy.clock(new Date(2025, 10, 27), [
      `Date`,
    ])
  })

  describe(`Switch periods`, switchPeriodsTests)
})

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
        `*/time/tracking/work-entries/projects?startDate=2025-11-28&endDate=2025-11-28`,
        {
          statusCode: 200,
          body: {
            projects: PROJECTS,
          },
        },
      )
      .as(`getProjectsNextDay`)

    cy
      .intercept(
        `GET`,
        `*/time/tracking/work-entries?startDate=2025-11-28&endDate=2025-11-28`,
        {
          statusCode: 200,
          body: [],
        },
      )
      .as(`getNextDay`)
  
    mountComponent()

    cy.contains(`Thursday Nov 27`)

    cy
      .contains(`Next`)
      .click()

    cy.contains(`Friday Nov 28`)

    cy.wait(`@getProjectsNextDay`)
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
        `*/time/tracking/work-entries/projects?startDate=2025-11-17&endDate=2025-11-23`,
        {
          statusCode: 200,
          body: {
            projects: PROJECTS,
          },
        },
      )
      .as(`getProjectsPreviousDay`)

    cy
      .intercept(
        `GET`,
        `*/time/tracking/work-entries?startDate=2025-11-17&endDate=2025-11-23`,
        {
          statusCode: 200,
          body: [],
        },
      )
      .as(`getPreviousDay`)
  
    mountComponent()

    cy.contains(`November 24 – 30`)

    cy
      .contains(`Back`)
      .click()

    cy.contains(`November 17 – 23`)

    cy.wait(`@getProjectsPreviousDay`)
    cy.wait(`@getPreviousDay`)
  }) 
}

function mountComponent() {
  const timeTrackerState = new TimeTrackerTableState()
  
  cy
    .mount(
      <TimeTrackerStateContext.Provider value={timeTrackerState}>
        <TimeTrackerTableContainer 
          onOpenWorkEntryModal={() => {}}
          setWorkEntryModalDataTime={() => {}}
          setWorkEntryModalData={() => {}}
          triggerReloadState={false}
        />
      </TimeTrackerStateContext.Provider>,
    )
}
