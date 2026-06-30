import { makeAutoObservable } from 'mobx'
import { EntryType } from '../../../../../common/constants/entryType'
import { TrackedEntry } from '../../../types'

export class EntryModalState {
  private _currentEntry: TrackedEntry | null = null
  
  private _isCopyMode = false
  private _isOpenModal = false
    
  private _type = EntryType.TASK
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

  get type() {
    return this._type
  }

  get error() {
    return this._error
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
    this.openEntryModal()
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

  openEntryModal() {
    this._isOpenModal = true
  }

  closeEntryModal() {
    this._isOpenModal = false
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
