import { ReactNode } from "react"
import { TrackedEntry } from "../../types"
import { TASK_ENTRY_STRATEGY } from "./sections/TaskEntry/strategy"
import { UNWELL_ENTRY_STRATEGY } from "./sections/UnwellEntry/strategy"
import { EntryType } from "../../../../common/constants/entryType"

export const ENTRY_TYPES_STRATEGY: Record<EntryType, EntryStrategy> = {
  [EntryType.TASK]: TASK_ENTRY_STRATEGY,
  [EntryType.UNWELL]: UNWELL_ENTRY_STRATEGY,
}

export type EntryStrategy = { 
  entryStateConstructor: any,
  StateContext: React.Context<any>,
  setEntryData: ({
    entryData,
    entryState,
  }: {
    entryData: TrackedEntry,
    entryState: any,
  }) => unknown,
  EntryContent: ReactNode,
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
  finally: ({
    entryState,
  }: {
    entryState: any,
  }) => unknown,
  buttonLabels: {
    create: string,
    update: string,
  },
}
