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
    currentEntry,
  } = timeTrackerTableState
  
  // past events, maybe change semantics, e.g. ENTRY_MODAL_OPEN to empty slot clicked
  // entry modal state lift up to page
  // isModalOpen to EntryModal, maybe get rid of ENTRY_MODAL_CLOSE or move inside from global page
  // experiment to move current entry to entry of modal state
  // null object pattern form empty currentEntry
  // get rid of functions from event-bus, call directly by event name
  // trigger to publish
  // expressive state methods names, not setCurrentEntry but e.g. createNewEntry, more methods, but more explicit and clear

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
      timeTrackerTableState.setCurrentEntry({
        entry: {
          ...currentEntry!,
          id: undefined,
          isCopy: true,
        },
      })
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
        <EntryModal currentEntry={currentEntry!} />
      )}
    </>
  )
}
