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
  private _relatedEntryType: EntryType

  constructor({
    relatedEntryType,
  }: {
    relatedEntryType: EntryType,
  }) {
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
      isRelatedEntryFieldsDisabled: true,
    })
  }

  async initializeExistingEntryAsync({
    entryId,
    entryState,
  }: {
    entryId: number,
    entryState: any,
  }) {
    return this._relatedEntryStrategy.initializeExistingEntryAsync({
      entryId,
      entryState,
    })
  }

  async updateEntryAsync({
    entryId,
    requestData,
  }:{
    entryId: number,
    requestData: unknown,
  }) {
    return this._relatedEntryStrategy.updateEntryAsync({
      entryId,
      requestData,
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