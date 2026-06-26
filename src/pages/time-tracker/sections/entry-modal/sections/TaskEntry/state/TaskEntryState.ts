import { makeAutoObservable } from 'mobx'
import { TaskEntryData } from '../../../../../types'
import { ProjectDto } from '@tourmalinecore/inner-circle-time-api-js-client'

export const EMPTY_TASK_ENTRY_DATA: TaskEntryData = {
  title: ``,
  taskId: ``,
  description: ``,
  projectId: ``,
  date: null,
  start: null,
  end: null,
}

export class TaskEntryState {
  private _taskEntryData: TaskEntryData = EMPTY_TASK_ENTRY_DATA

  private _projects: ProjectDto[] = []

  private _isSaving = false    
  private _isTriedToSubmit = false  

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
  
  get isProjectIdValid() {
    return this._taskEntryData.projectId !== ``
  }
  
  get isValid() {
    return (
      this.isTitleValid &&
      this.isTaskIdValid &&
      this.isDescriptionValid &&
      this.isProjectIdValid 
    )
  }

  get errors() {
    return {
      isTitleError: !this.isTitleValid && this._isTriedToSubmit,
      isTaskIdError: !this.isTaskIdValid && this._isTriedToSubmit,
      isDescriptionError: !this.isDescriptionValid && this._isTriedToSubmit,
      isProjectIdError: !this.isProjectIdValid && this._isTriedToSubmit,
    }
  }

  updateTaskEntryData({
    taskEntryData,
  }: {
    taskEntryData: Partial<TaskEntryData>,
  }) {
    this._taskEntryData = {
      ...this.taskEntryData,
      ...taskEntryData, 
    }
  }

  setProjects({
    projects,
  }: {
    projects: ProjectDto[],
  }) {
    this._projects = projects
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
}
