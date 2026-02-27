import { makeAutoObservable } from 'mobx'
import { UnwellEntryData } from '../../../../../types'

export const EMPTY_UNWELL_ENTRY_DATA: UnwellEntryData = {
  date: null,
  start: null,
  end: null,
}

export class UnwellEntryState {
  private _unwellEntryData: UnwellEntryData = {
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

  updateUnwellEntryData({
    unwellEntryData,
  }: {
    unwellEntryData: Partial<UnwellEntryData>,
  }) {
    this._unwellEntryData = {
      ...this.unwellEntryData,
      ...unwellEntryData, 
    }
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
