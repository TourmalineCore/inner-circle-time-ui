import { Views } from "react-big-calendar"
import { TimeTrackerTable } from "../../../types"
import { TimeTrackerTableState } from "./TimeTrackerTableState"

describe(`TimeTrackerTableState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Entries Management`, entriesTests)
  describe(`View Configuration`, viewTests)
  describe(`Copy Current Entry`, copyCurrentEntryTests)
  describe(`Reset Is Copy Mode`, resetIsCopyModeTests)
})

const ENTRIES_FOR_INITIALIZATION: TimeTrackerTable = {
  entries: [
    {
      id: 1,
      title: `Task 1`,
      taskId: `#2fre1`,
      project: {
        id: 1,
        name: `ProjectOne`,
      },
      description: `Task description`,
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
    
    expect(timeTrackerTableState.tableData.entries)
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

function entriesTests() {
  let timeTrackerTableState: TimeTrackerTableState

  beforeEach(() => {
    timeTrackerTableState = new TimeTrackerTableState()
  })

  it(`
  GIVEN an empty state
  WHEN initialize with one entry
  SHOULD return one entry
  `, () => {
    timeTrackerTableState.initialize({
      loadedData: ENTRIES_FOR_INITIALIZATION,
    })

    expect(timeTrackerTableState.tableData)
      .to
      .deep
      .eq(ENTRIES_FOR_INITIALIZATION)
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

function copyCurrentEntryTests() {
  let timeTrackerTableState: TimeTrackerTableState

  const testCurrentEntry = {
    id: 1,
    title: `Test Entry`,
    taskId: `Test TaskId`,
    date: new Date(2026, 3, 11),
    start: new Date(2026, 3, 11),
    end: new Date(2026, 3, 11),
  }

  beforeEach(() => {
    timeTrackerTableState = new TimeTrackerTableState()

    timeTrackerTableState.openEntry({
      entry: testCurrentEntry,
    })
  })

  it(`
  GIVEN a state filled current entry
  WHEN copy current entry
  SHOULD copy current entry without Id and isCopyMode will have the value true
  `, () => {
    expect(timeTrackerTableState.isCopyMode).false

    timeTrackerTableState.copyCurrentEntry()

    expect(timeTrackerTableState.currentEntry)
      .to
      .deep
      .eq({
        ...testCurrentEntry,
        id: undefined,
      })

    expect(timeTrackerTableState.isCopyMode).true
  })
}

function resetIsCopyModeTests() {
  let timeTrackerTableState: TimeTrackerTableState

  beforeEach(() => {
    timeTrackerTableState = new TimeTrackerTableState()

    timeTrackerTableState.copyCurrentEntry()
  })

  it(`
  GIVEN a state with isCopyMode equal true
  WHEN reset isCopyMode
  SHOULD return isCopyMode equal to false
  `, () => {
    expect(timeTrackerTableState.isCopyMode).true

    timeTrackerTableState.resetIsCopyMode()

    expect(timeTrackerTableState.isCopyMode).false
  })
}