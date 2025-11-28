import { useMemo, useState } from "react"
import { TimeTrackerTableState } from "./sections/time-tracker-table/state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./sections/time-tracker-table/state/TimeTrackerTableStateContext"
import { TimeTrackerTableContainer } from "./sections/time-tracker-table/TimeTrackerTableContainer"
import { WorkEntryModalContainer } from "./sections/work-entry-modal/WorkEntryModalContainer"
import { WorkEntryModalStateContext } from "./sections/work-entry-modal/state/WorkEntryModalStateContext"
import { WorkEntryModalState } from "./sections/work-entry-modal/state/WorkEntryModalState"

export function TimeTrackerPage() {  
  const timeTrackerTableState = useMemo(
    () => new TimeTrackerTableState(),
    [],
  )

  const workEntryModalState = useMemo(
    () => new WorkEntryModalState(),
    [],
  )

  const [
    isOpenModal,
    setIsOpenModal,
  ] = useState(false)
  
  return (
    <TimeTrackerStateContext.Provider value={timeTrackerTableState}>
      <WorkEntryModalStateContext.Provider value={workEntryModalState}>
        <TimeTrackerTableContainer
          onOpenWorkEntryModal={() => setIsOpenModal(true)}
          setWorkEntryModalDataTime={setWorkEntryModalDataTime}
        />
        {isOpenModal && <WorkEntryModalContainer
          onClose={() => setIsOpenModal(false)}
        />}
      </WorkEntryModalStateContext.Provider>
    </TimeTrackerStateContext.Provider>
  )

  function setWorkEntryModalDataTime({
    startTime,
    endTime,
  }: {
    startTime: Date,
    endTime: Date,
  }) {
    workEntryModalState.setDate({
      date: startTime,
    })

    workEntryModalState.setStartTime({
      startTime,
    })
    
    workEntryModalState.setEndTime({
      endTime,
    })
  }
}
