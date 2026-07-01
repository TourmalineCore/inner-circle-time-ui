import { EntryStrategy } from "../entryTypesStrategy"
import { AwayWithMakeUpTimeEntryStrategy } from "./awayWithMakeUpTimeEntryStrategy"
import { EntryType } from "../../../../../../common/constants/entryType"

export class MakeUpTimeEntryStrategy implements EntryStrategy {
  readonly modalConfiguration = {
    label: ``,
    hasCopyButton: false,
    hasDeleteButton: false,
  }
  
  private _relatedEntryStrategy: EntryStrategy
  private _relatedEntryId: number
  private _relatedEntryType: EntryType

  constructor({
    relatedEntryId,
    relatedEntryType,
  }: {
    relatedEntryId: number,
    relatedEntryType: EntryType,
  }) {
    this._relatedEntryId = relatedEntryId
    this._relatedEntryType = relatedEntryType
    this._relatedEntryStrategy = this.selectStrategy()
  }

  private selectStrategy() {
    switch (this._relatedEntryType) {
      case EntryType.AWAY_WITH_MAKE_UP_TIME:
        return new AwayWithMakeUpTimeEntryStrategy()
      
      default:
        throw new Error(`Unsupported related entry type: ${this._relatedEntryType}`)
    }
  }

  get entryStateConstructor() {
    return this._relatedEntryStrategy.entryStateConstructor
  }

  get StateContext() {
    return this._relatedEntryStrategy.StateContext
  }

  get entryType() {
    return this._relatedEntryStrategy.entryType
  }

  get EntryContent() {
    return () => this._relatedEntryStrategy.EntryContent({
      isAwayFieldsDisabled: true,
    })
  }

  validateOnClient({
    entryState, 
  }: { 
    entryState: any,
  }) {
    return this._relatedEntryStrategy.validateOnClient({
      entryState,
    })
  }

  buildRequestData({
    entryState, 
  }: { 
    entryState: any,
  }) {
    return this._relatedEntryStrategy.buildRequestData({
      entryState,
    })
  }

  async initializeExistingEntryAsync({
    entryState,
  }: {
    entryState: any,
  }) {
    return this._relatedEntryStrategy.initializeExistingEntryAsync({
      entryId: this._relatedEntryId,
      entryState,
    })
  }

  async updateEntryAsync({
    requestData,
  }:{
    requestData: unknown,
  }) {
    return this._relatedEntryStrategy.updateEntryAsync({
      id: this._relatedEntryId,
      requestData,
    })
  }

  async createEntryAsync() {
    return
  }

  initializeNewEntry() {
    return
  }

  async loadProjectsAsync() {
    return
  }
}