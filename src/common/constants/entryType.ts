export enum EntryType {
  TASK = 1,
  UNWELL = 2,
  AWAY_WITH_MAKE_UP_TIME = 3,
  MAKE_UP_TIME = 4,
  SICK_LEAVE = 5,
  VACATION = 6
}

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
  value: value as number,
  label: TYPE_LABELS[value],
}))

export const NON_ALL_DAY_ENTRY_TYPES = [
  EntryType.TASK,
  EntryType.UNWELL,
  EntryType.AWAY_WITH_MAKE_UP_TIME,
].map((value) => ({
  value: value as number,
  label: TYPE_LABELS[value],
}))

export const ENTRY_TYPES_ALLOWED_TO_OVERLAP_WITH_SICK_LEAVE_AND_VACATION = [
  EntryType.TASK,
].map((value) => ({
  value: value as number,
  label: TYPE_LABELS[value],
}))
