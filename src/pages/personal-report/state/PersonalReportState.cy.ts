import { EntryType } from "../../../common/constants/entryType"
import { PersonalReportState } from "./PersonalReportState"

describe(`PersonalReportState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Total Hours`, totalHoursTests)
})

const INITIALIZE_PERSONAL_REPORT = {
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

function initializationTests() {
  let personalReportState: PersonalReportState

  beforeEach(() => {
    personalReportState = new PersonalReportState()
  })

  it(`
  GIVEN initial state with default values
  WHEN ask for them
  SHOULD return default values
  `, () => {
    expect(personalReportState.personalReportData.trackedEntries)
      .to
      .deep
      .eq([])
    
    expect(personalReportState.personalReportData.taskHours)
      .to
      .eq(0)

    expect(personalReportState.personalReportData.unwellHours)
      .to
      .eq(0)
      
    expect(personalReportState.selectedEmployeeId)
      .to
      .eq(0)

    expect(personalReportState.employees)
      .to
      .deep
      .eq([])
  })
  
  it(`
  GIVEN personal report state
  WHEN initialize different entry
  SHOULD return a correctly converted personal report data
  `, () => {
    personalReportState.initializePersonalReport(INITIALIZE_PERSONAL_REPORT)

    expect(personalReportState.personalReportData.trackedEntries[0])
      .to
      .deep
      .equal({
        id: 1,
        date: `10.04`,
        trackedHoursPerDay: 2,
        hours: 2,
        time: `10:00 - 12:00`,
        entryType: `Task`,
        project: `ProjectOne`,
        taskId: `#32`,
        taskTitle: `TaskTitle`,
        description: `TaskDescription`,
      })

    expect(personalReportState.personalReportData.trackedEntries[1])
      .to
      .deep
      .equal({
        id: 2,
        date: `9.04`,
        trackedHoursPerDay: 4,
        hours: 4,
        time: `10:00 - 14:00`,
        entryType: `Unwell`,
        project: `-`,
        taskId: `-`,
        taskTitle: `-`,
        description: `-`,
      })

    expect(personalReportState.personalReportData.taskHours)
      .to
      .equal(2)

    expect(personalReportState.personalReportData.unwellHours)
      .to
      .equal(4)
  })
}

function totalHoursTests() {
  let personalReportState: PersonalReportState

  beforeEach(() => {
    personalReportState = new PersonalReportState()
    
    personalReportState.initializePersonalReport(INITIALIZE_PERSONAL_REPORT)
  })

  it(`
  GIVEN personal report state with initialized personal report data
  WHEN get total hours
  SHOULD return correct total hours
  `, () => {
    expect(personalReportState.totalHours)
      .to
      .deep
      .equal({
        totalTrackedHoursPerMonth: 6,
        totalPayableHours: 6,
      })
  })
}