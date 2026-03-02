import { makeAutoObservable } from 'mobx'

export class DeleteModalState {
  private _deletionReason = ``  

  constructor() {
    makeAutoObservable(this)
  }

  get deletionReason() {
    return this._deletionReason
  }

  setDeletionReason({
    deletionReason,
  }: {
    deletionReason: string,
  }) {
    this._deletionReason = deletionReason
  }
}
