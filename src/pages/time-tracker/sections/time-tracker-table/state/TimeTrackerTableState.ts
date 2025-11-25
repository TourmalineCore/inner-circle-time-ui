import { makeAutoObservable } from 'mobx'
import { WorkItem } from '../../../types'

export class TimeTrackerTableState {
  private _workItems: WorkItem[] = []

  constructor() {
    makeAutoObservable(this)
  }

  initialize({
    loadedWorkItems,
  }: {
    loadedWorkItems: WorkItem[],
  }) {
    this._workItems = loadedWorkItems
  }

  get workItems() {
    return this._workItems
  }
}
