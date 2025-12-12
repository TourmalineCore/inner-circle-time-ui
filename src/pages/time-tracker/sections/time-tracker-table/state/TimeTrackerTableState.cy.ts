import { Views } from "react-big-calendar"
import { TimeTrackerTable } from "../../../types"
import { TimeTrackerTableState } from "./TimeTrackerTableState"

describe(`TimeTrackerTableState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Work Entries Management`, workEntriesTests)
  describe(`View Configuration`, viewTests)
})

const WORK_ENTRIES_FOR_INITIALIZATION: TimeTrackerTable = {
  workEntries: [
    {
      id: 1,
      title: `Task 1`,
      taskId: `#2fre1`,
      date: new Date(`2025-11-24`),
      start: new Date(`2025-11-24T09:00:00`),
      end: new Date(`2025-11-24T09:30:00`),
    },
  ],
}

function initializationTests() {
  it(`
  GIVEN a new TimeTrackerTableState
  WHEN initialize state
  SHOULD return default values
  `, () => {
    const timeTrackerTableState = new TimeTrackerTableState()
    
    expect(timeTrackerTableState.tableData.workEntries)
      .to
      .deep
      .eq([])

    expect(timeTrackerTableState.currentView)
      .to
      .be
      .null

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

function workEntriesTests() {
  let timeTrackerTableState: TimeTrackerTableState

  beforeEach(() => {
    timeTrackerTableState = new TimeTrackerTableState()
  })

  it(`
  GIVEN an empty state
  WHEN initialize with one work entry
  SHOULD return one work entry
  `, () => {
    timeTrackerTableState.initialize({
      loadedData: WORK_ENTRIES_FOR_INITIALIZATION,
    })

    expect(timeTrackerTableState.tableData)
      .to
      .deep
      .eq(WORK_ENTRIES_FOR_INITIALIZATION)
  })
}

function viewTests() {
  let timeTrackerTableState: TimeTrackerTableState

  beforeEach(() => {
    timeTrackerTableState = new TimeTrackerTableState()
  })

  it(`
  GIVEN a state with no view set
  WHEN set current view to day
  SHOULD return currentView equal to the day
  `, () => {
    timeTrackerTableState.setCurrentView({
      view: Views.DAY, 
    })

    expect(timeTrackerTableState.currentView)
      .to
      .eq(Views.DAY)
  })

  it(`
  GIVEN week view is set
  AND current date is 2025-11-27
  WHEN set view period
  SHOULD return correct viewStartDate equal to the start date of the week
  AND viewEndDate equal to the end date of the week
  `, () => {
    timeTrackerTableState.setCurrentView({
      view: Views.WEEK, 
    })

    timeTrackerTableState.setViewPeriod({
      date: new Date(`2025-11-27`), 
    })

    expect(timeTrackerTableState.viewStartDate)
      .to
      .eq(`2025-11-23T00:00:00`)

    expect(timeTrackerTableState.viewEndDate)
      .to
      .eq(`2025-11-29T23:59:59`)
  })

  it(`
  GIVEN day view is set
  AND current date is 2025-11-23
  WHEN set view period
  SHOULD return the correct viewStartDate and viewEndDate equal to the current day
  `, () => {
    timeTrackerTableState.setCurrentView({
      view: Views.DAY, 
    })

    timeTrackerTableState.setViewPeriod({
      date: new Date(`2025-11-23`), 
    })

    expect(timeTrackerTableState.viewStartDate)
      .to
      .eq(`2025-11-23T00:00:00`)

    expect(timeTrackerTableState.viewEndDate)
      .to
      .eq(`2025-11-23T23:59:59`)
  })
}