import { EventProps } from "react-big-calendar"
import { TrackedEntry } from "../../../../types"
import { EntryType } from "../../../../../../common/constants/entryType"

export function EntryContent({
  event, 
}: EventProps<TrackedEntry>) {
  const title = {
    [EntryType.TASK]: event.title,
    [EntryType.UNWELL]: `Feeling unwell`,
    [EntryType.AWAY_WITH_MAKE_UP_TIME]: `Away with make-up time`,
    [EntryType.MAKE_UP_TIME]: `Make-up time`,
  }

  return (
    <>
      <div>{event.project?.name}</div>
      <div>{event.taskId ? event.taskId : ``} {title[event.type!]}</div>
    </>
  )
}