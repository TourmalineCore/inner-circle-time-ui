import { makeAutoObservable } from 'mobx'
import { WorkEntry } from '../../../types'

export const EMPTY_WORK_ENTRY_MODAL_DATA: WorkEntry = {
  id: 0,
  title: ``,
  date: new Date(),
  start: new Date(),
  end: new Date(),
}

export class WorkEntryModalState {
  private _workEntryModalData: WorkEntry = {
    ...EMPTY_WORK_ENTRY_MODAL_DATA,
  }

  constructor() {
    makeAutoObservable(this)
  }

  get workEntryModalData() {
    return this._workEntryModalData
  }

  setId({
    id,
  }: {
    id: number,
  }) {
    this._workEntryModalData.id = id
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
}
