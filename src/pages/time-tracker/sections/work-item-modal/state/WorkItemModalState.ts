import { makeAutoObservable } from 'mobx'
import { WorkItem } from '../../../types'

const EMPTY_WORK_ITEM_MODAL_DATA: WorkItem = {
  id: 0,
  title: ``,
  date: new Date(),
  startTime: new Date(),
  endTime: new Date(),
}

export class WorkItemModalState {
  private _workItemModalData: WorkItem = {
    ...EMPTY_WORK_ITEM_MODAL_DATA,
  }

  constructor() {
    makeAutoObservable(this)
  }

  get workItemModalData() {
    return this._workItemModalData
  }

  setTitle({
    title,
  }: {
    title: string,
  }) {
    this._workItemModalData.title = title
  }

  setTaskId({
    taskId,
  }: {
    taskId: string,
  }) {
    this._workItemModalData.taskId = taskId
  }

  setDate({
    date,
  }: {
    date: Date,
  }) {
    this._workItemModalData.date = date
  }

  setStartTime({
    startTime,
  }: {
    startTime: Date,
  }) {
    this._workItemModalData.startTime = startTime
  }

  setEndTime({
    endTime,
  }: {
    endTime: Date,
  }) {
    this._workItemModalData.endTime = endTime
  }
}
