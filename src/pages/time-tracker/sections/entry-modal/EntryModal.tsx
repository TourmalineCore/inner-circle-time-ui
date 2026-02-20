import { useEffect, useMemo} from "react"
import { EntryModalContent } from "./EntryModalContent"
import { EntryModalStateContext } from "./state/EntryModalStateContext"
import { EntryModalState } from "./state/EntryModalState"
import { TrackedEntry } from "../../types"
import { EntryType } from "../../../../common/constants/entryType"
import { observer } from "mobx-react-lite"
import { TaskEntry } from "./sections/TaskEntry/TaskEntry"
import { UnwellEntry } from "./sections/UnwellEntry/UnwellEntry"

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
      <EntryModalContent
        onClose={onClose}
        isExistingEntry={currentEntry.type !== undefined}
      >        
        {type == EntryType.TASK && <TaskEntry 
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
        {type == EntryType.UNWELL && <UnwellEntry 
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
    </EntryModalStateContext.Provider>
  )
})