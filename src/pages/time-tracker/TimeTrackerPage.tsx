import { useMemo, useState } from "react"
import { TimeTrackerTableState } from "./sections/time-tracker-table/state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./sections/time-tracker-table/state/TimeTrackerTableStateContext"
import { TimeTrackerTableContainer } from "./sections/time-tracker-table/TimeTrackerTableContainer"
import { EntryModalState } from "./sections/entry-modal/state/EntryModalState"
import { WorkEntryItem } from "./types"
import { EntryModalStateContext } from "./sections/entry-modal/state/EntryModalStateContext"
import { EntryModal } from "./sections/entry-modal/EntryModal"

export function TimeTrackerPage() {  
  const timeTrackerTableState = useMemo(
    () => new TimeTrackerTableState(),
    [],
  )

  const entryModalState = useMemo(
    () => new EntryModalState(),
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
      <EntryModalStateContext.Provider value={entryModalState}>
        <TimeTrackerTableContainer
          onOpenEntryModal={() => setIsOpenModal(true)}
          setEntryModalData={setEntryModalData}
          setEntryModalDataTime={setEntryModalDateAndTime}
          triggerReloadState={triggerReloadState}
        />
        {isOpenModal && <EntryModal
          onClose={() => setIsOpenModal(false)}
          handleTriggerReloadState={handleTriggerReloadState}
        />}
      </EntryModalStateContext.Provider>
    </TimeTrackerStateContext.Provider>
  )

  // Trigger to reload the workEntry state after adding or updating a work entry
  function handleTriggerReloadState() {
    setTriggerReloadState(!triggerReloadState)
  }

  function setEntryModalData({
    id,
    title,
    taskId,
    description,
    project,
    start,
    end,
  }: WorkEntryItem) {
    if (id) {
      workEntryModalState.setId({
        id,
      })
    }

    workEntryModalState.setTaskId({
      taskId,
    })

    workEntryModalState.setDescription({
      description,
    })

    workEntryModalState.setProjectId({
      projectId: project.id,
    })

    workEntryModalState.setTitle({
      title,
    })

    setEntryModalDateAndTime({
      startTime:start,
      endTime: end,
    })
  }

  function setEntryModalDateAndTime({
    startTime,
    endTime,
  }: {
    startTime: WorkEntryItem['start'],
    endTime: WorkEntryItem['end'],
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
