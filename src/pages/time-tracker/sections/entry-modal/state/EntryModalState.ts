import { makeAutoObservable } from 'mobx'
import { EntryType } from '../../../../../common/constants/entryType'

export class EntryModalState {
  private _type = EntryType.TASK
  private _error = ``  

  constructor() {
    makeAutoObservable(this)
  }

  get type() {
    return this._type
  }

  get error() {
    return this._error
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
