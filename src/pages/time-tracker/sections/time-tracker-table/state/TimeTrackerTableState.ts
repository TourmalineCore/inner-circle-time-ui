import { makeAutoObservable } from 'mobx'
import { WorkItem } from '../../../types'
import moment from 'moment'

export class TimeTrackerTableState {
  private _workItems: WorkItem[] = []

  private _currentView: 'day' | 'week' = `week`

  private _viewStartDate: string | null = null

  private _viewEndDate: string | null = null

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

  get currentView() {
    return this._currentView
  }

  get viewStartDate() {
    return this._viewStartDate
  }

  get viewEndDate() {
    return this._viewEndDate
  }

  setCurrentView({
    view,
  }: {
    view: 'day' | 'week',
  }) {
    this._currentView = view
  }

  setViewPeriod({
    date,
    view,
  }: {
    date: Date,
    view: 'day' | 'week',
  }) {
    this._viewStartDate = moment(date)
      .startOf(view)
      .format(`YYYY-MM-DDTHH:mm:ss`)

    this._viewEndDate = moment(date)
      .endOf(view)
      .format(`YYYY-MM-DDTHH:mm:ss`)
  }
}
