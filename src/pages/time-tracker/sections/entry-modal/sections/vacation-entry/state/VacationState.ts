import { makeAutoObservable } from 'mobx'
import { VacationEntry } from '../../../../../types'

export const EMPTY_VACATION_ENTRY: VacationEntry = {
  period: {
    startDate: null,
    endDate: null,
  },
  isUnpaid: false,
}

export class VacationEntryState {
  private _vacationEntry: VacationEntry = {
    ...EMPTY_VACATION_ENTRY,
  } 
  
  constructor() {
    makeAutoObservable(this)
  }

  get vacationEntry() {
    return this._vacationEntry
  }

  initializeEntry({
    vacationEntry,
  }: {
    vacationEntry: VacationEntry,
  }) {
    this._vacationEntry = vacationEntry
  }

  updateVacationEntry({
    vacationEntry,
  }: {
    vacationEntry: Partial<VacationEntry>,
  }) {
    this._vacationEntry = {
      ...this._vacationEntry,
      ...vacationEntry, 
    }
  }
}
