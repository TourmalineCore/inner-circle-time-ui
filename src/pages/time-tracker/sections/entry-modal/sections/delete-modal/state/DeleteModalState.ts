import { makeAutoObservable } from 'mobx'

export class DeleteModalState {
  private _deletionReason = ``  
  private _isTriedToSubmit = false  

  constructor() {
    makeAutoObservable(this)
  }

  get deletionReason() {
    return this._deletionReason
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  get isDeletionReasonValid() {
    return this._deletionReason !== ``
  }

  get errors() {
    return {
      isDeletionReasonError: !this.isDeletionReasonValid && this._isTriedToSubmit,
    }
  }

  setDeletionReason({
    deletionReason,
  }: {
    deletionReason: string,
  }) {
    this._deletionReason = deletionReason
  }

  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }
}