import { EventProps } from "react-big-calendar"
import { TrackedEntry } from "../../../../types"
import { ENTRY_TYPE_CONFIG } from "../../entry-type-config"

export function EntryContent({
  event, 
}: EventProps<TrackedEntry>) {
  const title = ENTRY_TYPE_CONFIG [event.type!].title || event.title

  return (
    <>
      <div>{event.project?.name}</div>
      <div>{event.taskId ? event.taskId : ``} {title}</div>
    </>
  )
}