import { EMPTY_WORK_ENTRY_MODAL_DATA, WorkEntryModalState } from "./WorkEntryModalState"

describe(`WorkEntryModalState`, () => {
  describe(`Initial Data`, initialTests)
  describe(`Setters Data`, settersTests)
  describe(`Reset Data`, resetTests)
  describe(`Validation`, validationTests)
  describe(`Save And Try To Submit`, saveAndTryToSubmitTests)
  describe(`Set Error`, setErrorTests)
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
  WHEN set id 
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
  WHEN set title 
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
  WHEN set taskId 
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
  GIVEN a state with default description
  WHEN set description 
  SHOULD return updated description
  `, () => {
    const description = `Task description`

    workEntryModalState.setDescription({
      description,
    })
    
    expect(workEntryModalState.workEntryModalData.description)
      .to
      .eq(description)
  })

  it(`
  GIVEN a state with default date
  WHEN set date 
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
  WHEN set startTime 
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
  WHEN set endTime 
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

    workEntryModalState.setDescription({
      description: `Task description`,
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

function validationTests() {
  let workEntryModalState: WorkEntryModalState

  beforeEach(() => {
    workEntryModalState = new WorkEntryModalState()
  })
  
  it(`
  GIVEN an empty title
  WHEN isValid is activated
  SHOULD return false and set title error to true
  `, () => {
    workEntryModalState.setIsTriedToSubmit()

    expect(workEntryModalState.isValid)
      .to
      .be
      .false
    expect(workEntryModalState.errors.isTitleError)
      .to
      .be
      .true
  })

  it(`
  GIVEN an empty taskId
  WHEN isValid is activated
  SHOULD return false and set taskId error to true
  `, () => {
    workEntryModalState.setIsTriedToSubmit()

    expect(workEntryModalState.isValid)
      .to
      .be
      .false
    expect(workEntryModalState.errors.isTaskIdError)
      .to
      .be
      .true
  })

  it(`
  GIVEN an empty description
  WHEN isValid is activated
  SHOULD return false and set description error to true
  `, () => {
    workEntryModalState.setIsTriedToSubmit()

    expect(workEntryModalState.isValid)
      .to
      .be
      .false
    expect(workEntryModalState.errors.isDescriptionError)
      .to
      .be
      .true
  })

  it(`
  GIVEN valid title, taskId, and description
  WHEN isValid is activated
  SHOULD return true and all errors should be false
  `, () => {
    workEntryModalState.setTitle({
      title: `Title`,
    })
    workEntryModalState.setTaskId({
      taskId: `TaskId`,
    })
    workEntryModalState.setDescription({
      description: `Description`,
    })
    
    workEntryModalState.setIsTriedToSubmit()

    expect(workEntryModalState.isValid)
      .to
      .be
      .true
    expect(workEntryModalState.errors)
      .to
      .deep
      .equal({
        isTitleError: false,
        isTaskIdError: false,
        isDescriptionError: false,
      })
  })
}

function saveAndTryToSubmitTests() {
  let workEntryModalState: WorkEntryModalState

  beforeEach(() => {
    workEntryModalState = new WorkEntryModalState()
  })
  
  it(`
  GIVEN initial isSaving = false
  WHEN trigger setIsSaving()
  SHOULD change value to true
  WHEN trigger resetIsSaving()
  SHOULD change value to false
  `, () => {
    expect(workEntryModalState.isSaving)
      .to
      .be
      .false

    workEntryModalState.setIsSaving()
    expect(workEntryModalState.isSaving)
      .to
      .be
      .true
    
    workEntryModalState.resetIsSaving()
    expect(workEntryModalState.isSaving)
      .to
      .be
      .false
  })

  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN trigger setIsTriedToSubmit()
  SHOULD change value to true
  WHEN trigger resetIsTriedToSubmit()
  SHOULD change value to false
  `, () => {
    expect(workEntryModalState.isTriedToSubmit)
      .to
      .be
      .false

    workEntryModalState.setIsTriedToSubmit()
    expect(workEntryModalState.isTriedToSubmit)
      .to
      .be
      .true

    workEntryModalState.resetIsTriedToSubmit()
    expect(workEntryModalState.isTriedToSubmit)
      .to
      .be
      .false
  })
}

function setErrorTests() {
  let workEntryModalState: WorkEntryModalState

  beforeEach(() => {
    workEntryModalState = new WorkEntryModalState()
  })
  
  it(`
  GIVEN initial error is empty
  WHEN call setError() with error message
  SHOULD set this error message
  WHEN trigger resetError()
  SHOULD reset to initial value
  `, () => {
    expect(workEntryModalState.error)
      .to
      .eq(``)

    workEntryModalState.setError({
      error: `Fill in all the fields`,
    })

    expect(workEntryModalState.error)
      .to
      .eq(`Fill in all the fields`)

    workEntryModalState.resetError()

    expect(workEntryModalState.error)
      .to
      .eq(``)
  })
}
