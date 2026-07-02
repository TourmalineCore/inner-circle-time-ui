import { TaskEntryData } from "../../../../../types"
import { EMPTY_TASK_ENTRY_DATA, TaskEntryState } from "./TaskEntryState"

describe(`TaskEntryState`, () => {
  describe(`Initial Data`, initialTests)
  describe(`Initialization Data`, initializationTests)
  describe(`Setters Data`, settersTests)
  describe(`Validation`, validationTests)
  describe(`Try To Submit`, tryToSubmitTests)
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

function initializationTests() {
  it(`
  GIVEN a new TaskEntryState
  WHEN initializeEntry called with partial data (only date, start, end) as if the user is creating a new task entry
  SHOULD return taskEntryData with recieved data but the remaining fields must be default
  `, () => {
    const newDate = new Date()

    const taskEntryState = new TaskEntryState()

    const taskEntryForInitialization = {
      date: newDate,
      start: newDate,
      end: newDate,
    }

    taskEntryState.initializeEntry({
      taskEntry: taskEntryForInitialization as TaskEntryData,
    })

    expect(taskEntryState.taskEntryData)
      .to
      .deep
      .eq({
        ...EMPTY_TASK_ENTRY_DATA,
        ...taskEntryForInitialization,
      }) 
  })

  it(`
  GIVEN a new TaskEntryState
  WHEN initializeEntry called with all data as if the user is creating a copy task entry
  SHOULD return taskEntryData with recieved data
  `, () => {
    const newDate = new Date()

    const taskEntryState = new TaskEntryState()

    const taskEntryForInitialization = {
      title: `Task #1`,
      date: newDate,
      taskId: `#1`,
      description: `Task Description`,
      projectId: 3,
      start: newDate,
      end: newDate,
    }

    taskEntryState.initializeEntry({
      taskEntry: taskEntryForInitialization,
    })

    expect(taskEntryState.taskEntryData)
      .to
      .deep
      .eq(taskEntryForInitialization) 
  })

  it(`
  GIVEN a new TaskEntryState
  WHEN initializeEntry called as if the user open existing task entry
  SHOULD return taskEntryData with the received data
  `, () => {
    const newDate = new Date()

    const taskEntryForInitialization = {
      id: 1,
      title: `Task #1`,
      date: newDate,
      taskId: `#1`,
      description: `Task Description`,
      projectId: 3,
      start: newDate,
      end: newDate,
    }

    const taskEntryState = new TaskEntryState()

    taskEntryState.initializeEntry({
      taskEntry: taskEntryForInitialization,
    })
    
    expect(taskEntryState.taskEntryData)
      .to
      .deep
      .eq(taskEntryForInitialization) 
  })
}

function settersTests() {
  let taskEntryState: TaskEntryState

  beforeEach(() => {
    taskEntryState = new TaskEntryState()
  })

  it(`
  GIVEN a state with default data
  WHEN update unwell entry data 
  SHOULD return updated data
  `, () => {
    const id = 1
    const projectId = 1
    const title = `Task 1`
    const taskId = `#1fre33`
    const description = `Task description`
    const testDate = new Date(`2025-11-24`)

    taskEntryState.updateTaskEntryData({
      taskEntryData: {
        id,
        projectId,
        title,
        taskId,
        description,
        date: testDate,
        start: testDate,
        end: testDate,
      },
    })

    expect(taskEntryState.taskEntryData.id)
      .to
      .eq(id)

    expect(taskEntryState.taskEntryData.projectId)
      .to
      .eq(projectId)

    expect(taskEntryState.taskEntryData.title)
      .to
      .eq(title)

    expect(taskEntryState.taskEntryData.taskId)
      .to
      .eq(taskId)

    expect(taskEntryState.taskEntryData.description)
      .to
      .eq(description)

    expect(taskEntryState.taskEntryData.start)
      .to
      .eq(testDate)

    expect(taskEntryState.taskEntryData.end)
      .to
      .eq(testDate)
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
    const id = 1
    const projectId = 1
    const date = new Date(`2025-11-24`)

    taskEntryState.updateTaskEntryData({
      taskEntryData: {
        id,
        projectId,
        title: `Title`,
        taskId: `TaskId`,
        description: `Description`,
        date,
        start: date,
        end: date,
      },
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
        isProjectIdError: false,
      })
  })
}

function tryToSubmitTests() {
  let taskEntryState: TaskEntryState

  beforeEach(() => {
    taskEntryState = new TaskEntryState()
  })

  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN trigger setIsTriedToSubmit()
  SHOULD change value to true
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
  })
}
