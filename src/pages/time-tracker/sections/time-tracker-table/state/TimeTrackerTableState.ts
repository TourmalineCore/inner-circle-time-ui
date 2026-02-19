import { makeAutoObservable } from 'mobx'
import { TimeTrackerTable, TrackedEntry, View } from '../../../types'
import moment from 'moment'
import { Views } from 'react-big-calendar'

export class TimeTrackerTableState {
  private _tableData: TimeTrackerTable = {
    entries: [],
  }

  private _currentEntry: TrackedEntry | null = null

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

  get currentEntry() {
    return this._currentEntry
  }

  get viewStartDate() {
    return this._viewStartDate
  }

  get viewEndDate() {
    return this._viewEndDate
  }

  setViewPeriod({
    date,
    view,
  }: {
    date: Date,
    view: View,
  }) {
    this._viewStartDate = moment(date)
      // isoWeek is necessary so that moment returns the date starting from Monday, not Sunday.
      .startOf(view === Views.WEEK ? `isoWeek` : view) 
      .format(`YYYY-MM-DD`)

    this._viewEndDate = moment(date)
      .endOf(view === Views.WEEK ? `isoWeek` : view) 
      .format(`YYYY-MM-DD`)
  }

  setCurrentEntry({
    entry,
  }: {
    entry: TrackedEntry,
  }) {
    this._currentEntry = entry
  }
}
