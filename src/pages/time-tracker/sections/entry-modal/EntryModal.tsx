import { useEffect, useMemo} from "react"
import { TaskEntryState } from "./sections/TaskEntry/state/TaskEntryState"
import { TaskEntryStateContext } from "./sections/TaskEntry/state/TaskEntryStateContext"
import { TaskEntryContainer } from "./sections/TaskEntry/TaskEntryContainer"
import { EntryModalContent } from "./EntryModalContent"
import { EntryModalStateContext } from "./state/EntryModalStateContext"
import { EntryModalState } from "./state/EntryModalState"
import { TrackedEntry } from "../../types"

export function EntryModal({
  openedEntryData,
  onClose,
  handleTriggerReloadState,
}: {
  openedEntryData: TrackedEntry,
  onClose: () => unknown,
  handleTriggerReloadState: () => unknown,
}) {
  const entryModalState = useMemo(
    () => new EntryModalState(),
    [],
  )
    
  const taskEntryState = useMemo(
    () => new TaskEntryState(),
    [],
  )

  useEffect(() => {
    if (openedEntryData.type) {
      entryModalState.setType({
        type: openedEntryData.type,
      })
    }
  }, [])
  
  return (
    <EntryModalStateContext.Provider value={entryModalState}>
      <TaskEntryStateContext.Provider value={taskEntryState}>
        <EntryModalContent
          onClose={onClose}
        >        
          <TaskEntryContainer 
            taskEntryData={{
              id: openedEntryData?.id,
              date: openedEntryData.date,
              start: openedEntryData.start,
              end: openedEntryData.end,
              title: openedEntryData.title || ``,
              projectId: openedEntryData.project?.id || 0,
              taskId: openedEntryData.taskId || ``,
              description: openedEntryData.description || ``,
            }}
            handleTriggerReloadState={handleTriggerReloadState}
          />
        </EntryModalContent>
      </TaskEntryStateContext.Provider>
    </EntryModalStateContext.Provider>
  )
}