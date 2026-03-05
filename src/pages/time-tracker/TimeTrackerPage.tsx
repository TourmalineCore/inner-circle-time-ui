import { useEffect, useMemo, useState } from "react"
import { TimeTrackerTableState } from "./sections/time-tracker-table/state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./sections/time-tracker-table/state/TimeTrackerTableStateContext"
import { TimeTrackerTableContainer } from "./sections/time-tracker-table/TimeTrackerTableContainer"
import { EntryModal } from "./sections/entry-modal/EntryModal"
import { eventBus } from "./event-bus"

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

  useEffect(() => {
    const unsubscribeEntryModalOpen = eventBus.subscribe(`ENTRY_MODAL:OPEN`, () => {
      setIsOpenModal(true)
    })

    const unsubscribeEntryModalClose = eventBus.subscribe(`ENTRY_MODAL:CLOSE`, () => {
      setIsOpenModal(false)
    }) 
    
    const unsubscribeResetEntry = eventBus.subscribe(`TABLE:RESET_ENTRY`, () => {
      timeTrackerTableState.resetCurrentEntry()
    })

    const unsubscribeCopyEntry = eventBus.subscribe(`TABLE:COPY_ENTRY`, () => {
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
