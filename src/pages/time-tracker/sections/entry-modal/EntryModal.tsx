import { useEffect, useMemo} from "react"
import { TaskEntryState } from "./sections/TaskEntry/state/TaskEntryState"
import { TaskEntryStateContext } from "./sections/TaskEntry/state/TaskEntryStateContext"
import { TaskEntryContainer } from "./sections/TaskEntry/TaskEntryContainer"
import { EntryModalContent } from "./EntryModalContent"
import { EntryModalStateContext } from "./state/EntryModalStateContext"
import { EntryModalState } from "./state/EntryModalState"
import { TrackedEntry } from "../../types"
import { EntryType } from "../../../../common/constants/entryType"

export function EntryModal({
  currentEntry,
  onClose,
  handleTriggerReloadState,
}: {
  currentEntry: TrackedEntry,
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
    if (currentEntry.type) {
      entryModalState.setType({
        type: currentEntry.type,
      })
    }
  }, [])

  const {
    type,
  } = entryModalState
  
  return (
    <EntryModalStateContext.Provider value={entryModalState}>
      <TaskEntryStateContext.Provider value={taskEntryState}>
        <EntryModalContent
          onClose={onClose}
        >        
          {type == EntryType.TASK && <TaskEntryContainer 
            taskEntryData={{
              id: currentEntry?.id,
              date: currentEntry.date,
              start: currentEntry.start,
              end: currentEntry.end,
              title: currentEntry.title || ``,
              projectId: currentEntry.project?.id || 0,
              taskId: currentEntry.taskId || ``,
              description: currentEntry.description || ``,
            }}
            handleTriggerReloadState={handleTriggerReloadState}
          />
          }
        </EntryModalContent>
      </TaskEntryStateContext.Provider>
    </EntryModalStateContext.Provider>
  )
}