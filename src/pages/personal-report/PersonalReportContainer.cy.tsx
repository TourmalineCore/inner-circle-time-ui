import { EntryType } from "../../common/constants/entryType"
import { PersonalReportContainer } from "./PersonalReportContainer"
import { PersonalReportState } from "./state/PersonalReportState"
import { PersonalReportStateContext } from "./state/PersonalReportStateContext"

const EMPLOYEES = {
  employees: [
    {
      id: 1,
      fullName: `Ivanov Ivan Ivanovich`,
    },
    {
      id: 2,
      fullName: `Pertrov Petr Petrovich`,
    },
  ],
}

const PERSONAL_REPORT = {
  trackedEntries: [
    {
      id: 1,
      trackedHoursPerDay: 2,
      startTime: `2026-04-10 10:00:00`,
      endTime: `2026-04-10 12:00:00`,
      hours: 2,
      entryType: EntryType.TASK,
      project: {
        id: 1,
        name: `ProjectOne`,
      },
      task: {
        id: `#32`,
        title: `TaskTitle`,
      },
      description: `TaskDescription`,
    },
    {
      id: 2,
      trackedHoursPerDay: 4,
      startTime: `2026-04-09 10:00:00`,
      endTime: `2026-04-09 14:00:00`,
      hours: 4,
      entryType: EntryType.UNWELL,
      project: null!,
      task: null!,
      description: null,
    },
  ],
  taskHours: 2,
  unwellHours: 4,
}

describe(`PersonalReportContainer`, () => {
  beforeEach(() => {
    cy.viewport(1024, 600)

    // set cypress default date
    cy.clock(new Date(2026, 3, 26), [
      `Date`,
    ])

    cy.intercept(
      `GET`,
      `**/reporting/employees`,
      {
        statusCode: 200,
        body: EMPLOYEES,
      },
    )
      .as(`getEmployees`)

    mountComponent()
    
    cy.wait(`@getEmployees`)
  })

  describe(`Change Employees`, changeEmployeesTests)
  describe(`Month Change`, monthChangeTests)
})

function changeEmployeesTests() {
  it(`
  GIVEN personal report
  WHEN change employee
  SHOULD send request with correct employeeId
  `, () => { 
    cy.intercept(
      `GET`,
      `**/reporting/personal-report?employeeId=1&year=2026&month=4`,
      {
        statusCode: 200,
        body: PERSONAL_REPORT, 
      },
    ) 
      .as(`getPersonalReport`)

    cy
      .getByData(`employee-select`)
      .select(`1`)

    cy.wait(`@getPersonalReport`)

    cy.contains(`Ivanov Ivan Ivanovich`)

    cy.contains(`ProjectOne`)
  })
}

function monthChangeTests() {
  it(`
  GIVEN personal report
  WHEN change month
  SHOULD send request with correct month and year
  `, () => {
    cy.intercept(
      `GET`,
      `**/reporting/personal-report?employeeId=1&year=2026&month=2`,
      {
        statusCode: 200,
        body: PERSONAL_REPORT, 
      },
    ) 
      .as(`getPersonalReport`)

    cy
      .getByData(`employee-select`)
      .select(`1`)
    
    cy
      .getByData(`date-picker-select`)
      .click()

    cy
      .contains(`Feb`)
      .click()

    cy.wait(`@getPersonalReport`)
  })
}

function mountComponent() {
  const personalReportState = new PersonalReportState()
  
  cy.mount(
    <PersonalReportStateContext.Provider value={personalReportState}>
      <PersonalReportContainer />
    </PersonalReportStateContext.Provider>,
  )
}