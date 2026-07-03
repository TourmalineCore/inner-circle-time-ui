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
  it(`
  GIVEN a new TaskEntryState
  WHEN initialize
  SHOULD have default values
  `, () => {
    const taskEntryState = new TaskEntryState()

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

    const taskEntryForInitialization = {
      date: newDate,
      start: newDate,
      end: newDate,
    }

    const {
      taskEntryState,
    } = createState({
      taskEntryForInitialization,
    })

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

    const taskEntryForInitialization = {
      title: `Task #1`,
      date: newDate,
      taskId: `#1`,
      description: `Task Description`,
      projectId: 3,
      start: newDate,
      end: newDate,
    }

    const {
      taskEntryState,
    } = createState({
      taskEntryForInitialization,
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

    const {
      taskEntryState,
    } = createState({
      taskEntryForInitialization,
    })
    
    expect(taskEntryState.taskEntryData)
      .to
      .deep
      .eq(taskEntryForInitialization) 
  })
}

function settersTests() {
  it(`
  GIVEN a state with default projects
  WHEN set projects 
  SHOULD return updated projects
  `, () => {
    const taskEntryState = new TaskEntryState()
    
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
  GIVEN valid title, taskId, projectId and description
  WHEN isValid is activated
  SHOULD return true and all errors should be false
  `, () => {
    const taskEntryForInitialization = {
      title: `Title`,
      taskId: `TaskId`,
      description: `Description`,
      projectId: 1,
    }

    const {
      taskEntryState,
    } = createState({
      taskEntryForInitialization,
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
  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN trigger setIsTriedToSubmit()
  SHOULD change value to true
  `, () => {
    const taskEntryState = new TaskEntryState()

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

function createState({
  taskEntryForInitialization,
}: {
  taskEntryForInitialization: unknown,
} = {
  taskEntryForInitialization: {},
}) {
  const taskEntryState = new TaskEntryState()

  taskEntryState.initializeEntry({
    taskEntry: taskEntryForInitialization as TaskEntryData,
  })

  return {
    taskEntryState,
  }
}
