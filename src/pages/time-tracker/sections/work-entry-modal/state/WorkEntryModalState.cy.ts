import { EMPTY_WORK_ENTRY_MODAL_DATA, WorkEntryModalState } from "./WorkEntryModalState"

describe(`WorkEntryModalState`, () => {
  describe(`Initial Data`, initialTests)
  describe(`Setters Data`, settersTests)
  describe(`Reset Data`, resetTests)
})

function initialTests() {
  let workEntryModalState: WorkEntryModalState

  beforeEach(() => {
    workEntryModalState = new WorkEntryModalState()
  })

  it(`
  GIVEN a new WorkEntryModalState
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(workEntryModalState.workEntryModalData)
      .to
      .deep
      .eq(EMPTY_WORK_ENTRY_MODAL_DATA) 
  })
}

function settersTests() {
  let workEntryModalState: WorkEntryModalState

  beforeEach(() => {
    workEntryModalState = new WorkEntryModalState()
  })

  it(`
  GIVEN a state with default id
  WHEN setting id 
  SHOULD return updated id
  `, () => {
    const id = 1

    workEntryModalState.setId({
      id,
    })

    expect(workEntryModalState.workEntryModalData.id)
      .to
      .eq(id)
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

function resetTests() {
  let workEntryModalState: WorkEntryModalState

  beforeEach(() => {
    workEntryModalState = new WorkEntryModalState()

    workEntryModalState.setId({
      id: 1,
    })

    workEntryModalState.setTitle({
      title: `Title`,
    })

    workEntryModalState.setTaskId({
      taskId: `1`,
    })

    workEntryModalState.setDate({
      date: new Date(`2025-11-27T09:00:00`),
    })

    workEntryModalState.setStartTime({
      startTime: new Date(`2025-11-27T09:00:00`),
    })

    workEntryModalState.setEndTime({
      endTime: new Date(`2025-11-27T11:30:00`),
    })
  })

  it(`
  GIVEN a state with filled data
  WHEN reset data 
  SHOULD return to default value state
  `, () => {
    workEntryModalState.reset()

    expect(workEntryModalState.workEntryModalData)
      .to
      .deep
      .eq(EMPTY_WORK_ENTRY_MODAL_DATA)
  })
}