import { ReactNode } from "react"
import { EntryType } from "../../../common/constants/entryType"

export type EntryStrategyFactory = (relatedEntryType?: EntryType) => EntryStrategy

class EntryStrategyRegistry {
  private factories = new Map<EntryType, EntryStrategyFactory>()
  
  public register({
    entryType,
    strategyFactory,
  }: {
    entryType: EntryType,
    strategyFactory: EntryStrategyFactory,
  }) {
    if (this.factories.has(entryType)) {
      throw new Error(`The strategy for the ${entryType} type has already been registered`)
    }

    this.factories.set(entryType, strategyFactory)
  }

  public create({
    entryType,
    relatedEntryType,
  }: {
    entryType: EntryType,
    relatedEntryType?: EntryType,
  }) {
    const strategyFactory = this.factories.get(entryType)

    if (!strategyFactory) {
      throw new Error(`Unsupported entry type: ${entryType}`)
    }

    return strategyFactory(relatedEntryType)
  }
}

export const entryStrategyRegistry = new EntryStrategyRegistry()

export type EntryStrategy = { 
  entryStateConstructor: any,
  StateContext: React.Context<any>,
  EntryContent: (props?: any) => ReactNode,
  validateOnClient: ({
    entryState,
  }: {
    entryState: any,
  }) => boolean,
  buildRequestData: ({
    entryState,
  }: {
    entryState: any,
  }) => unknown,
  initializeNewEntry: ({
    initialEntryData,
    entryState,
  }: {
    initialEntryData: any,
    entryState: any,
  }) => unknown,
  initializeExistingEntryAsync: ({
    entryId,
    entryState,
  }: {
    entryId: number,
    entryState: any,
  }) => Promise<unknown>,
  createEntryAsync: ({
    requestData,
  }: {
    requestData: any,
  }) => Promise<unknown>,
  updateEntryAsync: ({
    entryId,
    requestData,
  }: {
    entryId: number,
    requestData: any,
  }) => Promise<unknown>,
  loadProjectsAsync: ({
    entryState,
  }: {
    entryState: any,
  }) => Promise<unknown>,
  modalConfiguration: {
    label: string,
    hasDeleteButton: boolean,
    hasCopyButton: boolean,
  },
}
