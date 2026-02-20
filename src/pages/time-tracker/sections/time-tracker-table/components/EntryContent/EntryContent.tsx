import { EventProps } from "react-big-calendar"
import { TrackedEntry } from "../../../../types"
import { EntryType } from "../../../../../../common/constants/entryType"

export function EntryContent({
  event, 
}: EventProps<TrackedEntry>) {
  const title = {
    [EntryType.TASK]: event.title,
    [EntryType.UNWELL]: `Feeling unwell` ,
  }

  return (
    <>
      <div>{event.project?.name}</div>
      <div>{event.taskId ? event.taskId : ``} {title[event.type!]}</div>
    </>
  )
}