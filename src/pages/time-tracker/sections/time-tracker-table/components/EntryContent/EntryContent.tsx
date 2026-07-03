import { EventProps } from "react-big-calendar"
import { TrackedEntry } from "../../../../types"
import { ENTRY_CARD_CONFIG } from "../../../../../../common/constants/entryType"

export function EntryContent({
  event, 
}: EventProps<TrackedEntry>) {
  const title = ENTRY_CARD_CONFIG[event.type!].cardTitle || event.title

  return (
    <>
      <div>{event.project?.name}</div>
      <div>{event.taskId ? event.taskId : ``} {title}</div>
    </>
  )
}