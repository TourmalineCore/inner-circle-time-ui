import { makeAutoObservable } from 'mobx'
import { TimeTrackerTable, View } from '../../../types'
import moment from 'moment'
import { Views } from 'react-big-calendar'

export class TimeTrackerTableState {
  private _tableData: TimeTrackerTable = {
    workEntries: [],
  }

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
}
