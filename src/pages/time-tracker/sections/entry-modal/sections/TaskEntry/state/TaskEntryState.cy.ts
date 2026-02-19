import { EMPTY_TASK_ENTRY_DATA, TaskEntryState } from "./TaskEntryState"

describe(`TaskEntryState`, () => {
  describe(`Initial Data`, initialTests)
  describe(`Setters Data`, settersTests)
  describe(`Reset Data`, resetTests)
  describe(`Validation`, validationTests)
  describe(`Save And Try To Submit`, saveAndTryToSubmitTests)
  describe(`Set Error`, setErrorTests)
})

function initialTests() {
  let taskEntryState: TaskEntryState

  beforeEach(() => {
    taskEntryState = new TaskEntryState()
  })

  it(`
  GIVEN a new TaskEntryState
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(taskEntryState.taskEntryData)
      .to
      .deep
      .eq(EMPTY_TASK_ENTRY_DATA) 
  })
}

function settersTests() {
  let taskEntryState: TaskEntryState

  beforeEach(() => {
    taskEntryState = new TaskEntryState()
  })

  it(`
  GIVEN a state with default id
  WHEN set id 
  SHOULD return updated id
  `, () => {
    const id = 1

    taskEntryState.setId({
      id,
    })

    expect(taskEntryState.taskEntryData.id)
      .to
      .eq(id)
  })

  it(`
  GIVEN a state with default projectId
  WHEN set projectId 
  SHOULD return updated projectId
  `, () => {
    const projectId = 1

    taskEntryState.setProjectId({
      projectId,
    })

    expect(taskEntryState.taskEntryData.projectId)
      .to
      .eq(projectId)
  })

  it(`
  GIVEN a state with default projects
  WHEN set projects 
  SHOULD return updated projects
  `, () => {
    const projects = [
      {
        id: 1,
        name: `ProjectOne`,
      },
    ]

    taskEntryState.setProjects({
      projects,
    })

    expect(taskEntryState.projects)
      .to
      .deep
      .eq(projects)
  })

  it(`
  GIVEN a state with default title
  WHEN set title 
  SHOULD return updated title
  `, () => {
    const title = `Task 1`

    taskEntryState.setTitle({
      title,
    })

    expect(taskEntryState.taskEntryData.title)
      .to
      .eq(title)
  })

  it(`
  GIVEN a state with default taskId
  WHEN set taskId 
  SHOULD return updated taskId
  `, () => {
    const taskId = `#1fre33`

    taskEntryState.setTaskId({
      taskId,
    })
    
    expect(taskEntryState.taskEntryData.taskId)
      .to
      .eq(taskId)
  })

  it(`
  GIVEN a state with default description
  WHEN set description 
  SHOULD return updated description
  `, () => {
    const description = `Task description`

    taskEntryState.setDescription({
      description,
    })
    
    expect(taskEntryState.taskEntryData.description)
      .to
      .eq(description)
  })

  it(`
  GIVEN a state with default date
  WHEN set date 
  SHOULD return updated date
  `, () => {
    const date = new Date(`2025-11-24`)

    taskEntryState.setDate({
      date,
    })
    
    expect(taskEntryState.taskEntryData.date)
      .to
      .eq(date)
  })

  it(`
  GIVEN a state with default startTime
  WHEN set startTime 
  SHOULD return updated startTime
  `, () => {
    const startTime = new Date(`2025-11-24`)

    taskEntryState.setStartTime({
      startTime: startTime,
    }) 
    
    expect(taskEntryState.taskEntryData.start)
      .to
      .eq(startTime)
  })

  it(`
  GIVEN a state with default endTime
  WHEN set endTime 
  SHOULD return updated endTime
  `, () => {
    const endTime = new Date(`2025-11-24`)
    
    taskEntryState.setEndTime({
      endTime,
    })

    expect(taskEntryState.taskEntryData.end)
      .to
      .eq(endTime)
  })
}

function resetTests() {
  let taskEntryState: TaskEntryState

  beforeEach(() => {
    taskEntryState = new TaskEntryState()

    taskEntryState.setId({
      id: 1,
    })

    taskEntryState.setTitle({
      title: `Title`,
    })

    taskEntryState.setTaskId({
      taskId: `1`,
    })

    taskEntryState.setDescription({
      description: `Task description`,
    })

    taskEntryState.setDate({
      date: new Date(`2025-11-27T09:00:00`),
    })

    taskEntryState.setStartTime({
      startTime: new Date(`2025-11-27T09:00:00`),
    })

    taskEntryState.setEndTime({
      endTime: new Date(`2025-11-27T11:30:00`),
    })
  })
}

function validationTests() {
  let taskEntryState: TaskEntryState

  beforeEach(() => {
    taskEntryState = new TaskEntryState()
  })
  
  it(`
  GIVEN an empty title
  WHEN isValid is activated
  SHOULD return false and set title error to true
  `, () => {
    taskEntryState.setIsTriedToSubmit()

    expect(taskEntryState.isValid)
      .to
      .be
      .false
    expect(taskEntryState.errors.isTitleError)
      .to
      .be
      .true
  })

  it(`
  GIVEN an empty taskId
  WHEN isValid is activated
  SHOULD return false and set taskId error to true
  `, () => {
    taskEntryState.setIsTriedToSubmit()

    expect(taskEntryState.isValid)
      .to
      .be
      .false
    expect(taskEntryState.errors.isTaskIdError)
      .to
      .be
      .true
  })

  it(`
  GIVEN an empty description
  WHEN isValid is activated
  SHOULD return false and set description error to true
  `, () => {
    taskEntryState.setIsTriedToSubmit()

    expect(taskEntryState.isValid)
      .to
      .be
      .false
    expect(taskEntryState.errors.isDescriptionError)
      .to
      .be
      .true
  })

  it(`
  GIVEN valid title, taskId, and description
  WHEN isValid is activated
  SHOULD return true and all errors should be false
  `, () => {
    taskEntryState.setTitle({
      title: `Title`,
    })
    taskEntryState.setTaskId({
      taskId: `TaskId`,
    })
    taskEntryState.setDescription({
      description: `Description`,
    })
    
    taskEntryState.setIsTriedToSubmit()

    expect(taskEntryState.isValid)
      .to
      .be
      .true
    expect(taskEntryState.errors)
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
  let taskEntryState: TaskEntryState

  beforeEach(() => {
    taskEntryState = new TaskEntryState()
  })
  
  it(`
  GIVEN initial isSaving = false
  WHEN trigger setIsSaving()
  SHOULD change value to true
  WHEN trigger resetIsSaving()
  SHOULD change value to false
  `, () => {
    expect(taskEntryState.isSaving)
      .to
      .be
      .false

    taskEntryState.setIsSaving()
    expect(taskEntryState.isSaving)
      .to
      .be
      .true
    
    taskEntryState.resetIsSaving()
    expect(taskEntryState.isSaving)
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
    expect(taskEntryState.isTriedToSubmit)
      .to
      .be
      .false

    taskEntryState.setIsTriedToSubmit()
    expect(taskEntryState.isTriedToSubmit)
      .to
      .be
      .true

    taskEntryState.resetIsTriedToSubmit()
    expect(taskEntryState.isTriedToSubmit)
      .to
      .be
      .false
  })
}

function setErrorTests() {
  let taskEntryState: TaskEntryState

  beforeEach(() => {
    taskEntryState = new TaskEntryState()
  })
  
  it(`
  GIVEN initial error is empty
  WHEN call setError() with error message
  SHOULD set this error message
  WHEN trigger resetError()
  SHOULD reset to initial value
  `, () => {
    expect(taskEntryState.error)
      .to
      .eq(``)

    taskEntryState.setError({
      error: `Fill in all the fields`,
    })

    expect(taskEntryState.error)
      .to
      .eq(`Fill in all the fields`)

    taskEntryState.resetError()

    expect(taskEntryState.error)
      .to
      .eq(``)
  })
}
