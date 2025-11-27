import { makeAutoObservable } from 'mobx'
import { View, WorkItem } from '../../../types'
import moment from 'moment'

export class TimeTrackerTableState {
  private _workItems: WorkItem[] = []

  private _currentView: View | null = null

  private _viewStartDate: string | null = null

  private _viewEndDate: string | null = null

  constructor() {
    makeAutoObservable(this)

    this.setViewPeriod({
      date: new Date(),
    })
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
    view: View,
  }) {
    this._currentView = view
  }

  setViewPeriod({
    date,
  }: {
    date: Date,
  }) {
    this._viewStartDate = moment(date)
      .startOf(this._currentView)
      .format(`YYYY-MM-DDTHH:mm:ss`)

    this._viewEndDate = moment(date)
      .endOf(this._currentView)
      .format(`YYYY-MM-DDTHH:mm:ss`)
  }
}
