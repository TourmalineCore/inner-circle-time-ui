import { WorkItemModalState } from "./WorkItemModalState"

describe(`WorkItemModalState`, () => {
  describe(`Setters Data`, settersTests)
})

function settersTests() {
  let workItemModalState: WorkItemModalState

  beforeEach(() => {
    workItemModalState = new WorkItemModalState()
  })

  it(`
  GIVEN a state with default title
  WHEN setting title 
  SHOULD return updated title
  `, () => {
    const title = `Task 1`

    workItemModalState.setTitle({
      title,
    })

    expect(workItemModalState.workItemModalData.title)
      .to
      .eq(title)

  })

  it(`
  GIVEN a state with default taskId
  WHEN setting taskId 
  SHOULD return updated taskId
  `, () => {
    const taskId = `#1fre33`

    workItemModalState.setTaskId({
      taskId,
    })
    
    expect(workItemModalState.workItemModalData.taskId)
      .to
      .eq(taskId)
  })

  it(`
  GIVEN a state with default date
  WHEN setting date 
  SHOULD return updated date
  `, () => {
    const date = new Date(`2025-11-24`)

    workItemModalState.setDate({
      date,
    })
    
    expect(workItemModalState.workItemModalData.date)
      .to
      .eq(date)
  })

  it(`
  GIVEN a state with default startTime
  WHEN setting startTime 
  SHOULD return updated startTime
  `, () => {
    const startTime = new Date(`2025-11-24`)

    workItemModalState.setStartTime({
      startTime: startTime,
    }) 
    
    expect(workItemModalState.workItemModalData.start)
      .to
      .eq(startTime)
  })

  it(`
  GIVEN a state with default endTime
  WHEN setting endTime 
  SHOULD return updated endTime
  `, () => {
    const endTime = new Date(`2025-11-24`)
    
    workItemModalState.setEndTime({
      endTime,
    })

    expect(workItemModalState.workItemModalData.end)
      .to
      .eq(endTime)
  })
}