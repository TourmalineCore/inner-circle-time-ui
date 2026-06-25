import { EntryType } from "../../../../../common/constants/entryType"

export const ENTRY_TYPE_CONFIG = {
  [EntryType.TASK]: {
    className: `task`,
    title: null,
  },
  [EntryType.UNWELL]: {
    className: `unwell`,
    title: `Feeling unwell`,
  },
  [EntryType.AWAY_WITH_MAKE_UP_TIME]: {
    className: `away-with-make-up-time`,
    title: `Away with make-up time`,
  },
  [EntryType.MAKE_UP_TIME]: {
    className: `make-up-time`,
    title: `Make-up time`,
  },
}
