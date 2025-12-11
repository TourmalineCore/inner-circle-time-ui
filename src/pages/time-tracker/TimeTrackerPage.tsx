import { useMemo, useState } from "react"
import { TimeTrackerTableState } from "./sections/time-tracker-table/state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./sections/time-tracker-table/state/TimeTrackerTableStateContext"
import { TimeTrackerTableContainer } from "./sections/time-tracker-table/TimeTrackerTableContainer"
import { WorkEntryModalContainer } from "./sections/work-entry-modal/WorkEntryModalContainer"
import { WorkEntryModalStateContext } from "./sections/work-entry-modal/state/WorkEntryModalStateContext"
import { WorkEntryModalState } from "./sections/work-entry-modal/state/WorkEntryModalState"
import { WorkEntry } from "./types"

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
    triggerReloadState,
    setTriggerReloadState,
  ] = useState(false)

  const [
    isOpenModal,
    setIsOpenModal,
  ] = useState(false)
  
  return (
    <TimeTrackerStateContext.Provider value={timeTrackerTableState}>
      <WorkEntryModalStateContext.Provider value={workEntryModalState}>
        <TimeTrackerTableContainer
          onOpenWorkEntryModal={() => setIsOpenModal(true)}
          setWorkEntryModalData={setWorkEntryModalData}
          setWorkEntryModalDataTime={setWorkEntryModalDateAndTime}
          triggerReloadState={triggerReloadState}
        />
        {isOpenModal && <WorkEntryModalContainer
          onClose={() => {
            setIsOpenModal(false)
            workEntryModalState.reset()
          }}
          handleTriggerReloadState={handleTriggerReloadState}
        />}
      </WorkEntryModalStateContext.Provider>
    </TimeTrackerStateContext.Provider>
  )

  // Trigger to reload the workEntry state after adding or updating a work entry
  function handleTriggerReloadState() {
    setTriggerReloadState(!triggerReloadState)
  }

  function setWorkEntryModalData({
    id,
    title,
    taskId,
    start,
    end,
  }: WorkEntry) {
    if (id) {
      workEntryModalState.setId({
        id,
      })
    }

    if (taskId) {
      workEntryModalState.setTaskId({
        taskId,
      })
    }

    workEntryModalState.setTitle({
      title,
    })

    setWorkEntryModalDateAndTime({
      startTime:start,
      endTime: end,
    })
  }

  function setWorkEntryModalDateAndTime({
    startTime,
    endTime,
  }: {
    startTime: WorkEntry['start'],
    endTime: WorkEntry['end'],
  }) {
    workEntryModalState.setDate({
      date: startTime!,
    })

    workEntryModalState.setStartTime({
      startTime: startTime!,
    })
    
    workEntryModalState.setEndTime({
      endTime: endTime!,
    })
  }
}
