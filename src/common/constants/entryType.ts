export enum EntryType {
  TASK = 1,
}

export const TYPE_LABELS: Record<EntryType, string> = {
  [EntryType.TASK]: `Task`,
}

export const TYPES = Object.values(EntryType)
  .filter(value => typeof value === `number`)
  .map(value => ({
    value: value as number,
    label: TYPE_LABELS[value as EntryType],
  }))