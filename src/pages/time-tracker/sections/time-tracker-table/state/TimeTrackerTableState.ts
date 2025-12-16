import { makeAutoObservable } from 'mobx'
import { TimeTrackerTable, View } from '../../../types'
import moment from 'moment'

export class TimeTrackerTableState {
  private _tableData: TimeTrackerTable = {
    workEntries: [],
  }

  private _currentView: View | null = null

  private _viewStartDate: string | null = null

  private _viewEndDate: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  initialize({
    loadedData,
  }: {
    loadedData: TimeTrackerTable,
  }) {
    this._tableData = loadedData
  }

  get tableData() {
    return this._tableData
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

    this.setViewPeriod({
      date: new Date(),
    })
  }

  setViewPeriod({
    date,
  }: {
    date: Date,
  }) {
    this._viewStartDate = moment(date)
      .startOf(this._currentView)
      .format(`YYYY-MM-DD`)

    this._viewEndDate = moment(date)
      .endOf(this._currentView)
      .format(`YYYY-MM-DD`)
  }
}
