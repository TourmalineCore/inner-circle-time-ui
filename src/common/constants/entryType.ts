import type { EntryType as ApiEntryType } from "@tourmalinecore/inner-circle-time-api-js-client"

export type EntryType = ApiEntryType

export const EntryType = {
  TASK: `Task`,
  UNWELL: `Unwell`,
  AWAY_WITH_MAKE_UP_TIME: `AwayWithMakeUpTime`,
  MAKE_UP_TIME: `MakeUpTime`,
  SICK_LEAVE: `SickLeave`,
  VACATION: `Vacation`,
} satisfies Record<string, ApiEntryType>

export const TYPE_LABELS: Record<string, string> = {
  [EntryType.TASK]: `Task`,
  [EntryType.UNWELL]: `Unwell`,
  [EntryType.AWAY_WITH_MAKE_UP_TIME]: `Away With Make-Up Time`,
  [EntryType.SICK_LEAVE]: `Sick leave`,
  [EntryType.VACATION]: `Vacation`,
}

export const ALL_DAY_ENTRY_TYPES = [
  EntryType.SICK_LEAVE,
  EntryType.VACATION,
].map((value) => ({
  value,
  label: TYPE_LABELS[value],
}))

export const NON_ALL_DAY_ENTRY_TYPES = [
  EntryType.TASK,
  EntryType.UNWELL,
  EntryType.AWAY_WITH_MAKE_UP_TIME,
].map((value) => ({
  value,
  label: TYPE_LABELS[value],
}))

export const ENTRY_TYPES_ALLOWED_TO_OVERLAP_WITH_SICK_LEAVE_AND_VACATION = [
  EntryType.TASK,
].map((value) => ({
  value,
  label: TYPE_LABELS[value],
}))
