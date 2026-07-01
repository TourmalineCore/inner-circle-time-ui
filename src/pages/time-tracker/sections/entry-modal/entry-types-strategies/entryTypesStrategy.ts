import { ReactNode } from "react"
import { EntryType } from "../../../../../common/constants/entryType"
import { AwayWithMakeUpTimeEntryStrategy } from "./entry-strategies/awayWithMakeUpTimeEntryStrategy"
import { TaskEntryStrategy } from "./entry-strategies/taskEntryStrategy"
import { UnwellEntryStrategy } from "./entry-strategies/unwellEntryStrategy"
import { MakeUpTimeEntryStrategy } from "./entry-strategies/makeUpTimeEntryStrategy"
export class EntryTypesStrategy {
  static create({
    entryType,
    relatedEntryType,
  }: {
    entryType: EntryType,
    relatedEntryType?: EntryType,
  }) {
    switch (entryType) {
      case EntryType.TASK:
        return new TaskEntryStrategy()

      case EntryType.UNWELL:
        return new UnwellEntryStrategy()

      case EntryType.AWAY_WITH_MAKE_UP_TIME:
        return new AwayWithMakeUpTimeEntryStrategy()
        
      case EntryType.MAKE_UP_TIME:
        return new MakeUpTimeEntryStrategy({
          relatedEntryType: relatedEntryType!,
        })

      default:
        throw new Error(`Unsupported entry type: ${entryType}`)
    }
  }
}

export type EntryStrategy = { 
  entryType: EntryType,
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
  initializeNewEntry:({
    startTime,
    endTime,
    entryState,
  }: {
    startTime: Date,
    endTime: Date,
    entryState: any,
  }) => unknown,
  initializeExistingEntryAsync:({
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
