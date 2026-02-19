import { makeAutoObservable } from 'mobx'
import { EntryType } from '../../../../../common/constants/entryType'

export class EntryModalState {
  private _type = EntryType.TASK

  constructor() {
    makeAutoObservable(this)
  }

  get type() {
    return this._type
  }

  setType({
    type,
  }: {
    type: EntryType,
  }) {
    this._type = type
  }
}
