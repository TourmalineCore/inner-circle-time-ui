import { EventProps } from "react-big-calendar"
import { TrackedEntry } from "../../../../types"
import { EntryType } from "../../../../../../common/constants/entryType"
import { TaskEntryCardContent } from "./components/task-entry-card-content/TaskEntryCardContent"
import { UnwellEntryCardContent } from "./components/unwell-entry-card-content/UnwellEntryCardContent"
import { AwayWithMakeUpTimeEntryCardContent } from "./components/away-with-make-up-time-entry-card-content/AwayWithMakeUpTimeEntryCardContent"
import { MakeUpTimeEntryCardContent } from "./components/make-up-time-entry-card-content/MakeUpTimeEntryCardContent"
import { SickLeaveEntryCardContent } from "./components/sick-leave-entry-card-content/SickLeaveEntryCardContent"

export function EntryCardContent({
  event, 
}: EventProps<TrackedEntry>) {
  return (
    <>
      {renderEntryCardContent({
        event,
      })}
    </>
  )

  function renderEntryCardContent({
    event,
  }: {
    event: TrackedEntry,
  }) {
    switch (event.type) {
      case EntryType.TASK:
        return <TaskEntryCardContent
          title={event.title!}
          taskId={event.taskId!}
          projectName={event.project!.name}
          startTime={event.start}
          endTime={event.end}
        />
  
      case EntryType.UNWELL:
        return <UnwellEntryCardContent
          startTime={event.start}
          endTime={event.end}
        />
  
      case EntryType.AWAY_WITH_MAKE_UP_TIME:
        return <AwayWithMakeUpTimeEntryCardContent 
          startTime={event.start}
          endTime={event.end}
        />
  
      case EntryType.MAKE_UP_TIME:
        return <MakeUpTimeEntryCardContent
          startTime={event.start}
          endTime={event.end}
        />

      case EntryType.SICK_LEAVE:
        return <SickLeaveEntryCardContent />
  
      default:
        return null 
    }
  }
}