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
  WHEN navigate between days within the same week
  SHOULD send request to get data only once
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
      .as(`getProjects`)

    cy
      .intercept(
        `GET`,
        `*/time/tracking/entries?startDate=2025-11-24&endDate=2025-11-30`,
        {
          statusCode: 200,
          body: [],
        },
      )
      .as(`getEntries`)

    mountComponent()

    cy.wait(`@getProjects`)

    cy.wait(`@getEntries`)

    cy.contains(`Thursday Nov 27`)

    cy
      .contains(`Next`)
      .click()

    cy
      .contains(`Friday Nov 28`)

    cy
      .contains(`Next`)
      .click()
      
    cy.contains(`Saturday Nov 29`)

    cy.get(`@getProjects.all`)
      .should(`have.length`, 1)

    cy.get(`@getEntries.all`)
      .should(`have.length`, 1)
  })

  it(`
  GIVEN mobile view
  WHEN navigate to the next week
  SHOULD send requests with the next week dates
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
      .as(`getProjectsCurrentWeek`)

    cy
      .intercept(
        `GET`,
        `*/time/tracking/entries?startDate=2025-11-24&endDate=2025-11-30`,
        {
          statusCode: 200,
          body: [],
        },
      )
      .as(`getEntriesCurrentWeek`)

    cy
      .intercept(
        `GET`,
        `*/time/tracking/task-entries/projects?startDate=2025-12-01&endDate=2025-12-07`,
        {
          statusCode: 200,
          body: {
            projects: PROJECTS, 
          },
        },
      )
      .as(`getProjectsNextWeek`)

    cy
      .intercept(
        `GET`,
        `*/time/tracking/entries?startDate=2025-12-01&endDate=2025-12-07`,
        {
          statusCode: 200,
          body: [],
        },
      )
      .as(`getEntriesNextWeek`)

    mountComponent()

    cy.wait(`@getProjectsCurrentWeek`)

    cy.wait(`@getEntriesCurrentWeek`)

    for (let i = 0; i < 4; i++) {
      cy
        .contains(`Next`)
        .click()
    }

    cy.contains(`Monday Dec 01`)

    cy.wait(`@getProjectsNextWeek`)
      
    cy.wait(`@getEntriesNextWeek`)
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
      .as(`getEntriesPreviousWeek`)
  
    mountComponent()

    cy.contains(`November 24 – 30`)

    cy
      .contains(`Back`)
      .click()

    cy.contains(`November 17 – 23`)

    cy.wait(`@getProjectsPreviousWeek`)
    cy.wait(`@getEntriesPreviousWeek`)
  })
}

function viewportResizeTests() {
  it(`
  GIVEN component is mounted in desktop view
  WHEN user clicks on back button
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
      .as(`getEntriesForNov24to30`)

    mountComponent()

    cy.contains(`November 24 – 30`)

    cy.wait(`@getEntriesForNov24to30`)

    cy
      .contains(`Back`)
      .click()

    cy.contains(`November 17 – 23`)

    cy
      .get(`@getEntriesForNov24to30.all`)
      .should(`have.length`, 1)

    cy.viewport(1024, 768)

    // A pause is necessary, without it, the test may falsely pass
    // if the bug returns, since the request will not have time to go away before verification
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200)

    cy
      .get(`@getEntriesForNov24to30.all`)
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
