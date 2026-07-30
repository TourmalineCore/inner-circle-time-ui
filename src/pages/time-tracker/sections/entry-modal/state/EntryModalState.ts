import { makeAutoObservable } from 'mobx'
import { ALL_DAY_ENTRY_TYPES, ENTRY_TYPES_ALLOWED_TO_OVERLAP_WITH_SICK_LEAVE_AND_VACATION , EntryType, NON_ALL_DAY_ENTRY_TYPES, TYPE_LABELS } from '../../../../../common/constants/entryType'
import { TrackedEntry } from '../../../types'

export class EntryModalState {
  private _currentEntry: TrackedEntry | null = null
  
  private _isCopyMode = false
  private _isOpenModal = false
    
  private _type = EntryType.TASK
  private _availableEntryTypes: { 
    value: number,
    label: string,
  }[] = []

  private _error = ``  

  constructor() {
    makeAutoObservable(this)
  }

  get currentEntry() {
    return this._currentEntry
  }

  get isOpenModal() {
    return this._isOpenModal
  }

  get isCopyMode() {
    return this._isCopyMode
  }

  get availableEntryTypes() {
    return this._availableEntryTypes
  }

  get type() {
    return this._type
  }

  get error() {
    return this._error
  }

  createNewNonAllDayEntry({
    allDayEntryType,
    start,
    end,
  }: {
    allDayEntryType?: EntryType,
    start: Date,
    end: Date,
  }) {
    this._currentEntry = {
      date: start,
      start,
      end,
    }

    this.setAvailableEntryTypes({
      isAllDayEntryType: false,
      allDayEntryType,
    })

    this._type = NON_ALL_DAY_ENTRY_TYPES[0].value

    this.openEntryModal()
  }

  createNewAllDayEntry({
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

    this.setAvailableEntryTypes({
      isAllDayEntryType: true,
    })

    this._type = ALL_DAY_ENTRY_TYPES[0].value

    this.openEntryModal()
  }

  createCopyEntry({
    start,
    end,
  }: {
    start: Date,
    end: Date,
  }) {
    this._currentEntry = {
      ...this._currentEntry,
      date: start,
      start,
      end,
    }
    this.openEntryModal()
  }

  openEntry({
    entry,
  }: {
    entry: TrackedEntry,
  }) {
    this._currentEntry = entry
    this._type = entry.type!

    this._availableEntryTypes = [
      {
        value: entry?.relatedEntryType || entry.type!,
        label: TYPE_LABELS[entry?.relatedEntryType || entry.type!],
      },
    ]
    
    this.openEntryModal()
  }

  copyCurrentEntry() {
    this._currentEntry = {
      ...this._currentEntry!,
      id: undefined,
    }

    this._isCopyMode = true
  }

  resetIsCopyMode() {
    this._isCopyMode = false
  }

  openEntryModal() {
    this._isOpenModal = true
  }

  closeEntryModal() {
    this._isOpenModal = false
  }

  private setAvailableEntryTypes({
    isAllDayEntryType,
    allDayEntryType,
  }: {
    isAllDayEntryType: boolean,
    allDayEntryType?: EntryType,
  }) {
    if (isAllDayEntryType) {
      this._availableEntryTypes = ALL_DAY_ENTRY_TYPES
      return
    }

    if (allDayEntryType === EntryType.SICK_LEAVE || allDayEntryType === EntryType.VACATION) {
      this._availableEntryTypes = ENTRY_TYPES_ALLOWED_TO_OVERLAP_WITH_SICK_LEAVE_AND_VACATION 
      return
    }

    this._availableEntryTypes = NON_ALL_DAY_ENTRY_TYPES
  }

  setType({
    type,
  }: {
    type: EntryType,
  }) {
    this._type = type
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
