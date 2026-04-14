import { TrackedEntryDto } from "@tourmalinecore/inner-circle-time-api-js-client"
import { PersonalReportContent } from "./PersonalReportContent"
import { PersonalReportState } from "./state/PersonalReportState"
import { PersonalReportStateContext } from "./state/PersonalReportStateContext"
import { EntryType } from "../../common/constants/entryType"

describe(`PersonalReportContent`, () => {
  describe(`Initialization`, initializationTests)
})

function initializationTests() {
  it(`
  GIVEN one tracked entry
  WHEN render the component
  SHOULD see them
  `, () => {
    mountComponent({
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
      ],
      taskHours: 2,
      unwellHours: 4,
    })

    cy.contains(`10.04`)
    cy.contains(`10:00 - 12:00`)
    cy.contains(`ProjectOne`)
    cy.contains(`#32`)
    cy.contains(`TaskTitle`)
    cy.contains(`TaskDescription`)
    cy.contains(`Total tracked hours per period - 6`)
    cy.contains(`Total payable hours - 6`)
    cy.contains(`Task hours - 2`)
    cy.contains(`Unwell hours - 4`)
  })
}

function mountComponent({
  trackedEntries,
  taskHours,
  unwellHours,
}: {
  trackedEntries: TrackedEntryDto[],
  taskHours: number,
  unwellHours: number,
}) {
  const personalReportState = new PersonalReportState()

  personalReportState.initializePersonalReport({
    trackedEntries,
    taskHours,
    unwellHours,
  })

  cy.viewport(1366, 600)
  
  cy.mount(
    <PersonalReportStateContext.Provider value={personalReportState}>
      <PersonalReportContent />
    </PersonalReportStateContext.Provider>,
  )
}