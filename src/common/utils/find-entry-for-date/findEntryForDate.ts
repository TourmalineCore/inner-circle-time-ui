import moment from "moment"
import { TrackedEntry } from "../../../pages/time-tracker/types"

export function findEntryForDate({
  entries,
  date,
}: {
  entries: TrackedEntry[],
  date: Date,
}) {
  return entries
    .find((entry) => moment(date)
      .isBetween(
        moment(entry.start),
        moment(entry.end),
        `day`,
        `[]`,
      ))
}