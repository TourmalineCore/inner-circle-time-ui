import { ReactNode } from "react"
import { EntryType } from "@tourmalinecore/inner-circle-time-api-js-client"
import { AwayWithMakeUpTimeEntryStrategy } from "./entry-strategies/awayWithMakeUpTimeEntryStrategy"
import { TaskEntryStrategy } from "./entry-strategies/taskEntryStrategy"
import { UnwellEntryStrategy } from "./entry-strategies/unwellEntryStrategy"
import { MakeUpTimeEntryStrategy } from "./entry-strategies/makeUpTimeEntryStrategy"
import { SickLeaveEntryStrategy } from "./entry-strategies/sickLeaveEntryStrategy"
import { VacationEntryStrategy } from "./entry-strategies/vacationEntryStrategy"

export class EntryTypesStrategy {
  static create({
    entryType,
    relatedEntryType,
  }: {
    entryType: EntryType,
    relatedEntryType?: EntryType,
  }) {
    switch (entryType) {
      case EntryType.Task:
        return new TaskEntryStrategy()

      case EntryType.Unwell:
        return new UnwellEntryStrategy()

      case EntryType.AwayWithMakeUpTime:
        return new AwayWithMakeUpTimeEntryStrategy()
        
      case EntryType.MakeUpTime:
        return new MakeUpTimeEntryStrategy({
          relatedEntryType: relatedEntryType!,
        })

      case EntryType.SickLeave:
        return new SickLeaveEntryStrategy()

      case EntryType.Vacation:
        return new VacationEntryStrategy()

      default:
        throw new Error(`Unsupported entry type: ${entryType}`)
    }
  }
}

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
