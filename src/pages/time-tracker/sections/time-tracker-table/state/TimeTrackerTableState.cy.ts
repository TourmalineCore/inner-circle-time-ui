import { TimeTrackerTableState } from "./TimeTrackerTableState"
import moment from "moment"

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
      .eq(moment(new Date())
        .startOf(`isoWeek`) 
        .format(`YYYY-MM-DD`))

    expect(timeTrackerTableState.viewEndDate)
      .to
      .be
      .eq(moment(new Date())
        .endOf(`isoWeek`) 
        .format(`YYYY-MM-DD`))
  })
}

function viewTests() {
  let timeTrackerTableState: TimeTrackerTableState

  beforeEach(() => {
    timeTrackerTableState = new TimeTrackerTableState()
  })

  it(`
  GIVEN a state with no view period set
  WHEN setViewPeriod is called with date 2025-12-25
  THEN viewStartDate should equal 2025-12-22 and viewEndDate should equal 2025-12-28
  `, () => {
    timeTrackerTableState.setViewPeriod({
      date: new Date(`2025-12-25`),
    })

    expect(timeTrackerTableState.viewStartDate)
      .to
      .eq(`2025-12-22`)

    expect(timeTrackerTableState.viewEndDate)
      .to
      .eq(`2025-12-28`)
  })
}