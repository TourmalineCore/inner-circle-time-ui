import { WorkItem } from "../../../types"
import {TimeTrackerTableState } from "./TimeTrackerTableState"

describe(`TimeTrackerTableState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Time Tracker Data`, timeTrackerTableEditDataTests)
})

const WORK_ITEMS_FOR_INITIALIZATION: WorkItem[] = [
  {
    id: 1,
    title: `Task 1`,
    taskId: `#2fre1`,
    date: new Date(`2025-11-24`),
    startTime: new Date(`2025-11-24T09:00:00`),
    endTime: new Date(`2025-11-24T09:30:00`),
  },
]

function initializationTests() {
  const timeTrackerTableState = new TimeTrackerTableState()
  
  it(`  
  GIVEN a TimeTrackerTableState
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(timeTrackerTableState.workItems)
      .to
      .deep
      .eq([])
  })
}

function timeTrackerTableEditDataTests() {
  let timeTrackerTableState: TimeTrackerTableState

  beforeEach(() => {
    timeTrackerTableState = new TimeTrackerTableState()

    timeTrackerTableState.initialize({
      loadedWorkItems: WORK_ITEMS_FOR_INITIALIZATION,
    })
  })

  it(`
  GIVEN a TimeTrackerTableState
  WHEN set work items data
  SHOULD display new values in the workItems object
  `, () => {
    expect(timeTrackerTableState.workItems)
      .to
      .deep
      .eq(WORK_ITEMS_FOR_INITIALIZATION)
  })
}
