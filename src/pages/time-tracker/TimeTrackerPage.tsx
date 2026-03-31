import { useEffect, useMemo, useState } from "react"
import { TimeTrackerTableState } from "./sections/time-tracker-table/state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./sections/time-tracker-table/state/TimeTrackerTableStateContext"
import { TimeTrackerTableContainer } from "./sections/time-tracker-table/TimeTrackerTableContainer"
import { EntryModal } from "./sections/entry-modal/EntryModal"
import { eventBus, EventBusType } from "./event-bus"

export function TimeTrackerPage() {  
  const timeTrackerTableState = useMemo(
    () => new TimeTrackerTableState(),
    [], 
  )

  const [
    isOpenModal,
    setIsOpenModal,
  ] = useState(false) 

  const {
    isCopyMode,
    currentEntry,
  } = timeTrackerTableState

  useEffect(() => {
    const unsubscribeEntryModalOpen = eventBus.subscribe(EventBusType.ENTRY_MODAL_OPEN, () => {
      setIsOpenModal(true)
    })

    const unsubscribeEntryModalClose = eventBus.subscribe(EventBusType.ENTRY_MODAL_CLOSE, () => {
      setIsOpenModal(false)
    }) 
    
    const unsubscribeResetEntry = eventBus.subscribe(EventBusType.TABLE_RESET_ENTRY, () => {
      timeTrackerTableState.resetCurrentEntry()
    })

    const unsubscribeCopyEntry = eventBus.subscribe(EventBusType.TABLE_COPY_ENTRY, () => {
      timeTrackerTableState.copyCurrentEntry()

      setIsOpenModal(false)
    })
    
    return () => {
      unsubscribeEntryModalOpen()
      unsubscribeEntryModalClose()
      unsubscribeResetEntry()
      unsubscribeCopyEntry()
    }
  }, [
    timeTrackerTableState,
    currentEntry, 
    isOpenModal,
  ])
  
  return (
    <>
      <TimeTrackerStateContext.Provider value={timeTrackerTableState}>
        <TimeTrackerTableContainer />
      </TimeTrackerStateContext.Provider>
      {isOpenModal && (
        <EntryModal 
          currentEntry={currentEntry!}
          isCopyMode={isCopyMode}
        />
      )}
    </>
  )
}
