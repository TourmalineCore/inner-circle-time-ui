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
  describe(`Viewport resize`, viewportResizeTests)
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
        `*/time/tracking/task-entries/projects?startDate=2025-11-24&endDate=2025-11-30`,
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
        `*/time/tracking/entries?startDate=2025-11-24&endDate=2025-11-30`,
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
        `*/time/tracking/task-entries/projects?startDate=2025-11-17&endDate=2025-11-23`,
        {
          statusCode: 200,
          body: {
            projects: PROJECTS,
          },
        },
      )
      .as(`getProjectsPreviousWeek`)

    cy
      .intercept(
        `GET`,
        `*/time/tracking/entries?startDate=2025-11-17&endDate=2025-11-23`,
        {
          statusCode: 200,
          body: [],
        },
      )
      .as(`getPreviousWeek`)
  
    mountComponent()

    cy.contains(`November 24 – 30`)

    cy
      .contains(`Back`)
      .click()

    cy.contains(`November 17 – 23`)

    cy.wait(`@getProjectsPreviousWeek`)
    cy.wait(`@getPreviousWeek`)
  })
}

function viewportResizeTests() {
  it(`
  GIVEN component is mounted in desktop view
  WHEN user click by back button
  AND viewport is resized to tablet
  SHOULD not send API requests with incorrect dates when viewport is resized
  `, () => {
    cy.viewport(1366, 768)

    cy
      .intercept( 
        `GET`,
        `*/time/tracking/entries?startDate=2025-11-24&endDate=2025-11-30`,
        {
          statusCode: 200,
          body: [],
        },
      )
      .as(`getCorrectWeekEntries`)

    mountComponent()

    cy.contains(`November 24 – 30`)

    cy.wait(`@getCorrectWeekEntries`)

    cy
      .contains(`Back`)
      .click()

    cy.contains(`November 17 – 23`)

    cy
      .get(`@getCorrectWeekEntries.all`)
      .should(`have.length`, 1)

    cy.viewport(1024, 768)

    // Pause for UI stabilization after resizing
    // eslint-disable-next-line cypress/no-unnecessary-waiting

    cy.wait(200)

    cy
      .get(`@getCorrectWeekEntries.all`)
      .should(`have.length`, 1)
  })
}

function mountComponent() {
  const timeTrackerState = new TimeTrackerTableState()
  
  cy
    .mount(
      <TimeTrackerStateContext.Provider value={timeTrackerState}>
        <TimeTrackerTableContainer
          isCopyMode={false}
          createCopyEntry={() => {}}
          createNewNonAllDayEntry={() => {}}
          createNewAllDayEntry={() => {}}
          openEntry={() => {}}
          resetIsCopyMode={() => {}}
        />
      </TimeTrackerStateContext.Provider>,
    )
}
