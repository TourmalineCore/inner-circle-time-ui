import { makeAutoObservable } from 'mobx'
import { TaskEntry } from '../../../../../types'
import { ProjectDto } from '../../../../../../../../api'

export const EMPTY_TASK_ENTRY_DATA: TaskEntry = {
  title: ``,
  date: null,
  taskId: ``,
  description: ``,
  projectId: 0,
  start: null,
  end: null,
}

export class TaskEntryState {
  private _taskEntryData: TaskEntry = {
    ...EMPTY_TASK_ENTRY_DATA,
  }

  private _projects: ProjectDto[] = []

  private _isSaving = false    
  private _isTriedToSubmit = false  
  private _error = ``  

  constructor() {
    makeAutoObservable(this)
  }

  get taskEntryData() {
    return this._taskEntryData
  }

  get projects() {
    return this._projects
  }

  get isSaving() {
    return this._isSaving
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  get isTitleValid() {
    return this._taskEntryData.title !== ``
  }

  get isTaskIdValid() {
    return this._taskEntryData.taskId !== ``
  }

  get isDescriptionValid() {
    return this._taskEntryData.description !== ``
  }
  
  get isValid() {
    return (
      this.isTitleValid &&
      this.isTaskIdValid &&
      this.isDescriptionValid
    )
  }

  get errors() {
    return {
      isTitleError: !this.isTitleValid && this._isTriedToSubmit,
      isTaskIdError: !this.isTaskIdValid && this._isTriedToSubmit,
      isDescriptionError: !this.isDescriptionValid && this._isTriedToSubmit,
    }
  }

  get error() {
    return this._error
  }
  
  setId({
    id,
  }: {
    id: number,
  }) {
    this._taskEntryData.id = id
  }

  setProjectId({
    projectId,
  }: {
    projectId: number,
  }) {
    this._taskEntryData.projectId = projectId
  }

  setProjects({
    projects,
  }: {
    projects: ProjectDto[],
  }) {
    this._projects = projects
  }

  setTitle({
    title,
  }: {
    title: string,
  }) {
    this._taskEntryData.title = title
  }

  setTaskId({
    taskId,
  }: {
    taskId: string,
  }) {
    this._taskEntryData.taskId = taskId
  }

  setDescription({
    description,
  }: {
    description: string,
  }) {
    this._taskEntryData.description = description
  }

  setDate({
    date,
  }: {
    date: Date,
  }) {
    this._taskEntryData.date = date
  }

  setStartTime({
    startTime,
  }: {
    startTime: Date,
  }) {
    this._taskEntryData.start = startTime
  }

  setEndTime({
    endTime,
  }: {
    endTime: Date,
  }) {
    this._taskEntryData.end = endTime
  }

  reset() {
    this._taskEntryData = structuredClone(EMPTY_TASK_ENTRY_DATA)
  }

  setIsSaving() {
    this._isSaving = true
  }

  resetIsSaving() {
    this._isSaving = false
  }

  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }

  resetIsTriedToSubmit() {
    this._isTriedToSubmit = false
  }

  setError({
    error,
  }: {
    error: string,
  }) {
    this._error = error
  }

  resetError() {
    this._error = ``
  }
}
