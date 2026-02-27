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
    taskEntryState.updateUnwellEntryData({
      taskEntryData: {
        id: taskEntry.id,
        title: taskEntry.title,
        taskId: taskEntry.taskId,
        description: taskEntry.description,
        projectId: taskEntry.projectId,
        date: taskEntry.date,
        start: taskEntry.start,
        end: taskEntry.end,
      },
    })
  }, [])

  return (
    <TaskEntryStateContext.Provider value={taskEntryState}>
      <TaskEntryContainer
        handleTriggerReloadState={handleTriggerReloadState}
      />
    </TaskEntryStateContext.Provider>
  )
}
