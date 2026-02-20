import { useEffect, useMemo } from "react"
import { TaskEntryStateContext } from "./state/TaskEntryStateContext"
import { TaskEntryState } from "./state/TaskEntryState"
import { TaskEntryContainer } from "./TaskEntryContainer"
import { TaskEntryData } from "../../../../types"

export function TaskEntry({
  taskEntry,
  handleTriggerReloadState,
}: {
  taskEntry: TaskEntryData,
  handleTriggerReloadState: () => unknown,
}) {
  const taskEntryState = useMemo(
    () => new TaskEntryState(),
    [],
  )

  useEffect(() => {
    setTaskEntryData(taskEntry)
  }, [])

  return (
    <TaskEntryStateContext.Provider value={taskEntryState}>
      <TaskEntryContainer
        handleTriggerReloadState={handleTriggerReloadState}
      />
    </TaskEntryStateContext.Provider>
  )

  function setTaskEntryData({
    id,
    title,
    taskId,
    description ,
    projectId,
    start,
    end,
  }: TaskEntryData) {
    taskEntryState.setDate({
      date: start!,
    })

    taskEntryState.setStartTime({
      startTime: start!,
    })
    
    taskEntryState.setEndTime({
      endTime: end!,
    })

    if (id) {
      taskEntryState.setId({
        id,
      })

      taskEntryState.setTitle({
        title,
      })

      taskEntryState.setTaskId({
        taskId,
      })

      taskEntryState.setDescription({
        description,
      })

      taskEntryState.setProjectId({
        projectId,
      })
    }
  }
}
