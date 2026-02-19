import { makeAutoObservable } from 'mobx'
import { UnwellEntry } from '../../../../../types'

export const EMPTY_UNWELL_ENTRY_DATA: UnwellEntry = {
  date: null,
  start: null,
  end: null,
}

export class UnwellEntryState {
  private _unwellEntryData: UnwellEntry = {
    ...EMPTY_UNWELL_ENTRY_DATA,
  }

  private _error = ``  

  constructor() {
    makeAutoObservable(this)
  }

  get unwellEntryData() {
    return this._unwellEntryData
  }

  get error() {
    return this._error
  }
  
  setId({
    id,
  }: {
    id: number,
  }) {
    this._unwellEntryData.id = id
  }

  setDate({
    date,
  }: {
    date: Date,
  }) {
    this._unwellEntryData.date = date
  }

  setStartTime({
    startTime,
  }: {
    startTime: Date,
  }) {
    this._unwellEntryData.start = startTime
  }

  setEndTime({
    endTime,
  }: {
    endTime: Date,
  }) {
    this._unwellEntryData.end = endTime
  }

  setError({
    error,
  }: {
    error: string,
  }) {
    this._error = error
  }

  resetError() {
    this._error = ``
  }
}
