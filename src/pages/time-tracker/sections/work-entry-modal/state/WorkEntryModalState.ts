import { makeAutoObservable } from 'mobx'
import { WorkEntry } from '../../../types'

const EMPTY_WORK_ENTRY_MODAL_DATA: WorkEntry = {
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
}
