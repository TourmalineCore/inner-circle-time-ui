import { EntryType } from "@tourmalinecore/inner-circle-time-api-js-client"

export const TYPE_LABELS: Record<string, string> = {
  [EntryType.Task]: `Task`,
  [EntryType.Unwell]: `Unwell`,
  [EntryType.AwayWithMakeUpTime]: `Away With Make-Up Time`,
  [EntryType.SickLeave]: `Sick leave`,
  [EntryType.Vacation]: `Vacation`,
}

export const ALL_DAY_ENTRY_TYPES = [
  EntryType.SickLeave,
  EntryType.Vacation,
].map((value) => ({
  value,
  label: TYPE_LABELS[value],
}))

export const NON_ALL_DAY_ENTRY_TYPES = [
  EntryType.Task,
  EntryType.Unwell,
  EntryType.AwayWithMakeUpTime,
].map((value) => ({
  value,
  label: TYPE_LABELS[value],
}))

export const ENTRY_TYPES_ALLOWED_TO_OVERLAP_WITH_SICK_LEAVE_AND_VACATION = [
  EntryType.Task,
].map((value) => ({
  value,
  label: TYPE_LABELS[value],
}))
