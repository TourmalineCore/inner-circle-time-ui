import { makeAutoObservable } from 'mobx'
import { SickLeaveEntry } from '../../../../../types'

export const EMPTY_SICK_LEAVE_ENTRY: SickLeaveEntry = {
  period: {
    startDate: null,
    endDate: null,
  },
}

export class SickLeaveEntryState {
  private _sickLeaveEntry: SickLeaveEntry = {
    ...EMPTY_SICK_LEAVE_ENTRY,
  } 
  
  constructor() {
    makeAutoObservable(this)
  }

  get sickLeaveEntry() {
    return this._sickLeaveEntry
  }

  initializeEntry({
    sickLeaveEntry,
  }: {
    sickLeaveEntry: SickLeaveEntry,
  }) {
    this._sickLeaveEntry = sickLeaveEntry
  }

  updateSickLeaveEntry({
    sickLeaveEntry,
  }: {
    sickLeaveEntry: Partial<SickLeaveEntry>,
  }) {
    this._sickLeaveEntry = {
      ...this._sickLeaveEntry,
      ...sickLeaveEntry, 
    }
  }
}
