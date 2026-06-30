import { ReactNode } from "react"
import { EntryType } from "../../../../../common/constants/entryType"
import { AWAY_WITH_MAKE_UP_TIME_ENTRY_STRATEGY } from "./entry-strategies/awayWithMakeUpTimeEntryStrategy"
import { TASK_ENTRY_STRATEGY } from "./entry-strategies/taskEntryStrategy"
import { UNWELL_ENTRY_STRATEGY } from "./entry-strategies/unwellEntryStrategy"

export const ENTRY_TYPES_STRATEGY: Record<number, EntryStrategy> = {
  [EntryType.TASK]: TASK_ENTRY_STRATEGY,
  [EntryType.UNWELL]: UNWELL_ENTRY_STRATEGY,
  [EntryType.AWAY_WITH_MAKE_UP_TIME]: AWAY_WITH_MAKE_UP_TIME_ENTRY_STRATEGY,
}

export type EntryStrategy = { 
  entryStateConstructor: any,
  StateContext: React.Context<any>,
  EntryContent (): ReactNode,
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
    id,
    requestData,
  }: {
    id: number,
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
