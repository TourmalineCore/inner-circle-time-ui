import { makeAutoObservable } from 'mobx'
import { WorkEntryModal } from '../../../types'
import { Project } from '../../../../../../api'

export const EMPTY_WORK_ENTRY_MODAL_DATA: WorkEntryModal = {
  title: ``,
  date: null,
  taskId: ``,
  description: ``,
  projectId: 0,
  start: null,
  end: null,
}

export class WorkEntryModalState {
  private _workEntryModalData: WorkEntryModal = {
    ...EMPTY_WORK_ENTRY_MODAL_DATA,
  }

  private _projects: Project[] = []

  private _isSaving = false    
  private _isTriedToSubmit = false  
  private _error = ``  

  constructor() {
    makeAutoObservable(this)
  }

  get workEntryModalData() {
    return this._workEntryModalData
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
    return this._workEntryModalData.title !== ``
  }

  get isTaskIdValid() {
    return this._workEntryModalData.taskId !== ``
  }

  get isDescriptionValid() {
    return this._workEntryModalData.description !== ``
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
    this._workEntryModalData.id = id
  }

  setProjectId({
    projectId,
  }: {
    projectId: number,
  }) {
    this._workEntryModalData.projectId = projectId
  }

  setProjects({
    projects,
  }: {
    projects: Project[],
  }) {
    this._projects = projects
  }

  setTitle({
    title,
  }: {
    title: string,
  }) {
    this._workEntryModalData.title = title
  }

  setTaskId({
    taskId,
  }: {
    taskId: string,
  }) {
    this._workEntryModalData.taskId = taskId
  }

  setDescription({
    description,
  }: {
    description: string,
  }) {
    this._workEntryModalData.description = description
  }

  setDate({
    date,
  }: {
    date: Date,
  }) {
    this._workEntryModalData.date = date
  }

  setStartTime({
    startTime,
  }: {
    startTime: Date,
  }) {
    this._workEntryModalData.start = startTime
  }

  setEndTime({
    endTime,
  }: {
    endTime: Date,
  }) {
    this._workEntryModalData.end = endTime
  }

  reset() {
    this._workEntryModalData = structuredClone(EMPTY_WORK_ENTRY_MODAL_DATA)
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
