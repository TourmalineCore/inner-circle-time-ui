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

  constructor() {
    makeAutoObservable(this)
  }

  get unwellEntryData() {
    return this._unwellEntryData
  }

  initializeNewEntry({
    unwellEntry,
  }:{
    unwellEntry: UnwellEntryData,
  }) {
    this._unwellEntryData = {
      ...EMPTY_UNWELL_ENTRY_DATA,
      ...unwellEntry,
    }
  }

  initializeExistingEntry({
    unwellEntry,
  }: {
    unwellEntry: UnwellEntryData,
  }) {
    this._unwellEntryData = unwellEntry
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
}
