import { useMemo} from "react"
import { TaskEntryState } from "./sections/TaskEntry/state/TaskEntryState"
import { TaskEntryStateContext } from "./sections/TaskEntry/state/TaskEntryStateContext"
import { TaskEntryContainer } from "./sections/TaskEntry/TaskEntryContainer"
import { EntryModalContent } from "./EntryModalContent"

export function EntryModal ({
  onClose,
  handleTriggerReloadState,
}: {
  onClose: () => unknown,
  handleTriggerReloadState: () => unknown,
}) {  
  const taskEntryState = useMemo(
    () => new TaskEntryState(),
    [],
  )
  
  return (
    <TaskEntryStateContext.Provider value={taskEntryState}>
      <EntryModalContent
        onClose={onClose}
      />
      <TaskEntryContainer handleTriggerReloadState={handleTriggerReloadState}/>
    </TaskEntryStateContext.Provider>
  )

}