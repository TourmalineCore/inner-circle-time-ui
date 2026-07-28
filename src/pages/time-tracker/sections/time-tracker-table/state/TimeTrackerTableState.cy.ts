import { Views } from "react-big-calendar"
import { TimeTrackerTableState } from "./TimeTrackerTableState"

describe(`TimeTrackerTableState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`View Configuration`, viewTests)
})

function initializationTests() {
  it(`
  GIVEN a new TimeTrackerTableState
  WHEN initialize state
  SHOULD return default values
  `, () => {
    const timeTrackerTableState = new TimeTrackerTableState()
    
    expect(timeTrackerTableState.tableData.entries)
      .to
      .deep
      .eq([])

    expect(timeTrackerTableState.tableData.allDayEntries)
      .to
      .deep
      .eq([])

    expect(timeTrackerTableState.viewStartDate)
      .to
      .be
      .null

    expect(timeTrackerTableState.viewEndDate)
      .to
      .be
      .null
  })
}

function viewTests() {
  let timeTrackerTableState: TimeTrackerTableState

  beforeEach(() => {
    timeTrackerTableState = new TimeTrackerTableState()
  })

  it(`
  GIVEN a state with no view period set
  WHEN set view period to week
  SHOULD return correctly viewStartDate and viewEndDate
  `, () => {
    timeTrackerTableState.setViewPeriod({
      date: new Date(`2025-12-25`),
      view: Views.WEEK, 
    })

    expect(timeTrackerTableState.viewStartDate)
      .to
      .eq(`2025-12-22`)

    expect(timeTrackerTableState.viewEndDate)
      .to
      .eq(`2025-12-28`)
  })

  it(`
  GIVEN a state with no view period set
  WHEN set view period to day
  SHOULD return correctly viewStartDate and viewEndDate
  `, () => {
    timeTrackerTableState.setViewPeriod({
      date: new Date(`2025-12-25`),
      view: Views.DAY, 
    })

    expect(timeTrackerTableState.viewStartDate)
      .to
      .eq(`2025-12-25`)

    expect(timeTrackerTableState.viewEndDate)
      .to
      .eq(`2025-12-25`)
  })
}