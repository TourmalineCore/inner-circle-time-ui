import { useMemo, useState } from "react"
import { TimeTrackerTableState } from "./sections/time-tracker-table/state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./sections/time-tracker-table/state/TimeTrackerTableStateContext"
import { TimeTrackerTableContainer } from "./sections/time-tracker-table/TimeTrackerTableContainer"
import { WorkItemModalContainer } from "./sections/work-item-modal/WorkItemModalContainer"
import { WorkItemModalStateContext } from "./sections/work-item-modal/state/WorkItemModalStateContext"
import { WorkItemModalState } from "./sections/work-item-modal/state/WorkItemModalState"

export function TimeTrackerPage() {  
  const timeTrackerState = useMemo(
    () => new TimeTrackerTableState(),
    [],
  )

  const workItemModalState = useMemo(
    () => new WorkItemModalState(),
    [],
  )

  const [
    isOpenModal,
    setIsOpenModal,
  ] = useState(false)
  
  return (
    <TimeTrackerStateContext.Provider value={timeTrackerState}>
      <WorkItemModalStateContext.Provider value={workItemModalState}>
        <TimeTrackerTableContainer
          onOpenWorkItemModal={() => setIsOpenModal(true)}
          setWorkItemModalDataTime={setWorkItemModalDataTime}
        />
        {isOpenModal && <WorkItemModalContainer
          onClose={() => setIsOpenModal(false)}
        />}
      </WorkItemModalStateContext.Provider>
    </TimeTrackerStateContext.Provider>
  )

  function setWorkItemModalDataTime({
    startTime,
    endTime,
  }: {
    startTime: Date,
    endTime: Date,
  }) {
    workItemModalState.setDate({
      date: startTime,
    })

    workItemModalState.setStartTime({
      startTime,
    })
    
    workItemModalState.setEndTime({
      endTime,
    })
  }
}
