import { makeAutoObservable } from 'mobx'
import { UnwellEntryData } from '../../../../../types'

export const EMPTY_UNWELL_ENTRY: UnwellEntryData = {
  id: undefined,
  date: undefined,
  start: undefined,
  end: undefined,
}

export class UnwellEntryState {
  private _unwellEntryData: UnwellEntryData = EMPTY_UNWELL_ENTRY

  constructor() {
    makeAutoObservable(this)
  }

  get unwellEntryData() {
    return this._unwellEntryData
  }

  updateUnwellEntryData({
    unwellEntryData,
  }: {
    unwellEntryData: UnwellEntryData,
  }) {
    this._unwellEntryData = {
      ...this.unwellEntryData,
      ...unwellEntryData, 
    }
  }
}
