import { makeAutoObservable } from 'mobx'
import { TimeTrackerTable } from '../../../types'
import moment from 'moment'

export class TimeTrackerTableState {
  private _tableData: TimeTrackerTable = {
    entries: [],
    allDayEntries: [],
  }

  // isoWeek is necessary so that moment returns the date starting from Monday, not Sunday.
  private _viewStartDate = moment(new Date())
    .startOf(`isoWeek`) 
    .format(`YYYY-MM-DD`)

  private _viewEndDate = moment(new Date())
    .endOf(`isoWeek`) 
    .format(`YYYY-MM-DD`)

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

  get viewStartDate() {
    return this._viewStartDate
  }

  get viewEndDate() {
    return this._viewEndDate
  }

  setViewPeriod({
    date,
  }: {
    date: Date,
  }) {
    this._viewStartDate = moment(date)
      // isoWeek is necessary so that moment returns the date starting from Monday, not Sunday.
      .startOf(`isoWeek`) 
      .format(`YYYY-MM-DD`)

    this._viewEndDate = moment(date)
      .endOf(`isoWeek`) 
      .format(`YYYY-MM-DD`)
  }
}
