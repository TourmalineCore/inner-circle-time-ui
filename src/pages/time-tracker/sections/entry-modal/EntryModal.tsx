import { useEffect, useMemo} from "react"
import { TaskEntryState } from "./sections/TaskEntry/state/TaskEntryState"
import { TaskEntryStateContext } from "./sections/TaskEntry/state/TaskEntryStateContext"
import { TaskEntryContainer } from "./sections/TaskEntry/TaskEntryContainer"
import { EntryModalContent } from "./EntryModalContent"
import { EntryModalStateContext } from "./state/EntryModalStateContext"
import { EntryModalState } from "./state/EntryModalState"
import { TrackedEntry } from "../../types"
import { EntryType } from "../../../../common/constants/entryType"
import { UnwellEntryContainer } from "./sections/UnwellEntry/UnwellEntryContainer"
import { UnwellEntryStateContext } from "./sections/UnwellEntry/state/UnwellEntryStateContext"
import { UnwellEntryState } from "./sections/UnwellEntry/state/UnwellEntryState"
import { observer } from "mobx-react-lite"

export const EntryModal = observer(({
  currentEntry,
  onClose,
  handleTriggerReloadState,
}: {
  currentEntry: TrackedEntry,
  onClose: () => unknown,
  handleTriggerReloadState: () => unknown,
}) => {
  const entryModalState = useMemo(
    () => new EntryModalState(),
    [],
  )
    
  const taskEntryState = useMemo(
    () => new TaskEntryState(),
    [],
  )

  const unwellEntryState = useMemo(
    () => new UnwellEntryState(),
    [],
  )

  const {
    type,
  } = entryModalState

  useEffect(() => {
    if (currentEntry.type) {
      entryModalState.setType({
        type: currentEntry.type,
      })
    }
  }, [])
  
  return (
    <EntryModalStateContext.Provider value={entryModalState}>
      <UnwellEntryStateContext.Provider value={unwellEntryState}>
        <TaskEntryStateContext.Provider value={taskEntryState}>
          <EntryModalContent
            onClose={onClose}
            isExistingEntry={currentEntry.type !== undefined}
          >        
            {type == EntryType.TASK && <TaskEntryContainer 
              taskEntry={{
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
            {type == EntryType.UNWELL && <UnwellEntryContainer 
              unwellEntry={{
                id: currentEntry?.id,
                date: currentEntry.date,
                start: currentEntry.start,
                end: currentEntry.end,
              }}
              handleTriggerReloadState={handleTriggerReloadState}
            />
            }
          </EntryModalContent>
        </TaskEntryStateContext.Provider>
      </UnwellEntryStateContext.Provider>
    </EntryModalStateContext.Provider>
  )
})