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

export const ENTRY_CARD_CONFIG = {
  [EntryType.TASK]: {
    className: `task`,
    cardTitle: null,
  },
  [EntryType.UNWELL]: {
    className: `unwell`,
    cardTitle: `Feeling unwell`,
  },
  [EntryType.AWAY_WITH_MAKE_UP_TIME]: {
    className: `away-with-make-up-time`,
    cardTitle: `Away with make-up time`,
  },
  [EntryType.MAKE_UP_TIME]: {
    className: `make-up-time`,
    cardTitle: `Make-up time`,
  },
}

export const TYPES = Object.values(EntryType)
  // MAKE_UP_TIME is always part of another entry, so it should not be available for selection in select
  .filter(value => typeof value === `number` && value !== EntryType.MAKE_UP_TIME)
  .map(value => ({
    value: value as number,
    label: TYPE_LABELS[value as EntryType],
  }))