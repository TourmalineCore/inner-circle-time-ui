import { Views } from "react-big-calendar"
import { WorkItem } from "../../../types"
import { TimeTrackerTableState } from "./TimeTrackerTableState"

describe(`TimeTrackerTableState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Time Tracker Table Data`, timeTrackerTableEditDataTests)
})

const WORK_ITEMS_FOR_INITIALIZATION: WorkItem[] = [
  {
    id: 1,
    title: `Task 1`,
    taskId: `#2fre1`,
    date: new Date(`2025-11-24`),
    start: new Date(`2025-11-24T09:00:00`),
    end: new Date(`2025-11-24T09:30:00`),
  },
]

function initializationTests() {
  const timeTrackerTableState = new TimeTrackerTableState()
  
  it(`  
  GIVEN initial state with default data
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(timeTrackerTableState.workItems)
      .to
      .deep
      .eq([])

    expect(timeTrackerTableState.currentView)
      .to
      .be
      .eq(Views.WEEK)

    expect(timeTrackerTableState.viewStartDate)
      .to
      .be
      .eq(null)

    expect(timeTrackerTableState.viewEndDate)
      .to
      .be
      .eq(null)
  })
}

function timeTrackerTableEditDataTests() {
  let timeTrackerTableState: TimeTrackerTableState

  beforeEach(() => {
    timeTrackerTableState = new TimeTrackerTableState()
  })

  it(`
  GIVEN one workItems
  WHEN initialize it
  SHOULD return one workItems
  `, () => {
    timeTrackerTableState.initialize({
      loadedWorkItems: WORK_ITEMS_FOR_INITIALIZATION,
    })

    expect(timeTrackerTableState.workItems)
      .to
      .deep
      .eq(WORK_ITEMS_FOR_INITIALIZATION)
  })

  it(`
  GIVEN view type day
  WHEN try get currentTime
  SHOULD return current day equal day
  `, () => {
    timeTrackerTableState.setCurrentView({
      view: `day`,
    })

    expect(timeTrackerTableState.currentView)
      .to
      .be
      .eq(Views.DAY)
  })

  it(`
  GIVEN 
  WHEN 
  SHOULD set new value in viewStartDate and viewEndDate
  `, () => {
    timeTrackerTableState.setViewPeriod({
      date: new Date(`2025-11-27`),
      view: `week`,
    })

    expect(timeTrackerTableState.viewStartDate)
      .to
      .be
      .eq(`2025-11-23T00:00:00`)
      
    expect(timeTrackerTableState.viewEndDate)
      .to
      .be
      .eq(`2025-11-29T23:59:59`)
  })
}
