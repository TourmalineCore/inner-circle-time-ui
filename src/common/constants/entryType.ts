export enum EntryType {
  TASK = 1,
  UNWELL = 2,
  AWAY_WITH_MAKE_UP_TIME = 3,
  MAKE_UP_TIME = 4,
}

export const TYPE_LABELS: Record<string, string> = {
  [EntryType.TASK]: `Task`,
  [EntryType.UNWELL]: `Unwell`,
  [EntryType.AWAY_WITH_MAKE_UP_TIME]: `Away With Make-Up Time`,
}

export const TYPES = Object.values(EntryType)
  // MAKE_UP_TIME is always part of another entry, so it should not be available for selection in select
  .filter(value => typeof value === `number` && value !== EntryType.MAKE_UP_TIME)
  .map(value => ({
    value: value as number,
    label: TYPE_LABELS[value as EntryType],
  }))