import { useMemo, useState } from "react"
import { TimeTrackerTableState } from "./sections/time-tracker-table/state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./sections/time-tracker-table/state/TimeTrackerTableStateContext"
import { TimeTrackerTableContainer } from "./sections/time-tracker-table/TimeTrackerTableContainer"
import { EntryModal } from "./sections/entry-modal/EntryModal"

export function TimeTrackerPage() {  
  const timeTrackerTableState = useMemo(
    () => new TimeTrackerTableState(),
    [], 
  )

  const [
    triggerReloadState,
    setTriggerReloadState,
  ] = useState(false)

  const [
    isOpenModal,
    setIsOpenModal,
  ] = useState(false) 
  
  return (
    <>
      <TimeTrackerStateContext.Provider value={timeTrackerTableState}>
        <TimeTrackerTableContainer
          onOpenEntryModal={() => setIsOpenModal(true)}
          triggerReloadState={triggerReloadState}
        />
      </TimeTrackerStateContext.Provider>
      {isOpenModal && <EntryModal
        currentEntry={timeTrackerTableState.currentEntry!}
        onClose={() => setIsOpenModal(false)}
        handleTriggerReloadState={handleTriggerReloadState}
      />}
    </>
  )

  // Trigger to reload the workEntry state after adding or updating a work entry
  function handleTriggerReloadState() {
    setIsOpenModal(false)
    setTriggerReloadState(!triggerReloadState)
  }
}
