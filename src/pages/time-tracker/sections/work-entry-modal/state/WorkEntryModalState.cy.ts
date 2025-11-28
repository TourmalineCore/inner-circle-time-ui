import { WorkEntryModalState } from "./WorkEntryModalState"

describe(`WorkEntryModalState`, () => {
  describe(`Setters Data`, settersTests)
})

function settersTests() {
  let workEntryModalState: WorkEntryModalState

  beforeEach(() => {
    workEntryModalState = new WorkEntryModalState()
  })

  it(`
  GIVEN a state with default title
  WHEN setting title 
  SHOULD return updated title
  `, () => {
    const title = `Task 1`

    workEntryModalState.setTitle({
      title,
    })

    expect(workEntryModalState.workEntryModalData.title)
      .to
      .eq(title)

  })

  it(`
  GIVEN a state with default taskId
  WHEN setting taskId 
  SHOULD return updated taskId
  `, () => {
    const taskId = `#1fre33`

    workEntryModalState.setTaskId({
      taskId,
    })
    
    expect(workEntryModalState.workEntryModalData.taskId)
      .to
      .eq(taskId)
  })

  it(`
  GIVEN a state with default date
  WHEN setting date 
  SHOULD return updated date
  `, () => {
    const date = new Date(`2025-11-24`)

    workEntryModalState.setDate({
      date,
    })
    
    expect(workEntryModalState.workEntryModalData.date)
      .to
      .eq(date)
  })

  it(`
  GIVEN a state with default startTime
  WHEN setting startTime 
  SHOULD return updated startTime
  `, () => {
    const startTime = new Date(`2025-11-24`)

    workEntryModalState.setStartTime({
      startTime: startTime,
    }) 
    
    expect(workEntryModalState.workEntryModalData.start)
      .to
      .eq(startTime)
  })

  it(`
  GIVEN a state with default endTime
  WHEN setting endTime 
  SHOULD return updated endTime
  `, () => {
    const endTime = new Date(`2025-11-24`)
    
    workEntryModalState.setEndTime({
      endTime,
    })

    expect(workEntryModalState.workEntryModalData.end)
      .to
      .eq(endTime)
  })
}