import { makeAutoObservable } from 'mobx'
import { TimeTrackerTable, TrackedEntry, View } from '../../../types'
import moment from 'moment'
import { Views } from 'react-big-calendar'

export class TimeTrackerTableState {
  private _tableData: TimeTrackerTable = {
    entries: [],
  }

  private _currentEntry: TrackedEntry | null = null

  private _isCopyMode = false

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

  get isCopyMode() {
    return this._isCopyMode
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

  createNewEntry({
    start,
    end,
  }: {
    start: Date,
    end: Date,
  }) {
    this._currentEntry = {
      date: start,
      start,
      end,
    }
  }

  createCopyEntry({
    entry,
    start,
    end,
  }: {
    entry: TrackedEntry,
    start: Date,
    end: Date,
  }) {
    this._currentEntry = {
      ...entry,
      date: start,
      start,
      end,
    }
  }

  openEntry({
    entry,
  }: {
    entry: TrackedEntry,
  }) {
    this._currentEntry = entry
  }

  copyCurrentEntry() {
    this._currentEntry = {
      ...this._currentEntry!,
      id: undefined,
    }

    this._isCopyMode = true
  }

  resetCurrentEntry() {
    this._currentEntry = null
  }

  resetIsCopyMode() {
    this._isCopyMode = false
  }
}
