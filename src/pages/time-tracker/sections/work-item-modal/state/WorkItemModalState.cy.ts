import { WorkItemModalState } from "./WorkItemModalState"

describe(`WorkItemModalState`, () => {
  describe(`Work Item Modal setters data`, settersTests)
})

function settersTests() {
  let workItemModalState: WorkItemModalState

  beforeEach(() => {
    workItemModalState = new WorkItemModalState()
  })

  it(`
  GIVEN a WorkItemModalState
  WHEN set work item data
  SHOULD display new values in the workItems object
  `, () => {
    const testDate = new Date(`2025-11-24`)
    
    workItemModalState.setTitle({
      title: `Task 1`,
    })

    workItemModalState.setTaskId({
      taskId: `#1fre33`,
    })

    workItemModalState.setDate({
      date: testDate,
    })
    
    workItemModalState.setStartTime({
      startTime: testDate,
    }) 
    
    workItemModalState.setEndTime({
      endTime: testDate,
    })

    expect(workItemModalState.workItemModalData.title)
      .to
      .eq(`Task 1`)

    expect(workItemModalState.workItemModalData.taskId)
      .to
      .eq(`#1fre33`)

    expect(workItemModalState.workItemModalData.date)
      .to
      .eq(testDate)

    expect(workItemModalState.workItemModalData.startTime)
      .to
      .eq(testDate)

    expect(workItemModalState.workItemModalData.endTime)
      .to
      .eq(testDate)
  })
}