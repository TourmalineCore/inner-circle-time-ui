import moment from "moment"
import { CreateTaskEntryRequest, UpdateTaskEntryRequest } from "../../../../../../../api"
import { api } from "../../../../../../common/api/api"
import { TrackedEntry } from "../../../../types"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { EMPTY_TASK_ENTRY_DATA, TaskEntryState } from "./state/TaskEntryState"
import { TaskEntryStateContext } from "./state/TaskEntryStateContext"
import { TaskEntryContent } from "./TaskEntryContent"
import { EntryStrategy } from "../../entry-types-strategy"

export const TASK_ENTRY_STRATEGY: EntryStrategy = {
  entryState: TaskEntryState,
  StateContext: TaskEntryStateContext,
  setEntryData: ({
    entryData,
    entryState,
  }: {
    entryData: TrackedEntry,
    entryState: TaskEntryState,
  }) => setTaskEntryData({
    entryState,
    entryData,
  }), 
  EntryContent: <TaskEntryContent />,
  validateOnClient: ({
    entryState,
  }: {
    entryState: TaskEntryState,
  }) => validateTaskEntry({
    entryState, 
  }),
  buildRequestData: ({
    entryState,
  }: {
    entryState: TaskEntryState,
  }) => buildTaskEntryRequest({
    entryState, 
  }),
  createEntryAsync: ({
    requestData,
  }: {
    requestData: CreateTaskEntryRequest,
  }) => api.trackingCreateTaskEntry(requestData),
  updateEntryAsync: ({
    id,
    requestData,
  }: {
    id: number,
    requestData: UpdateTaskEntryRequest,
  }) => api.trackingUpdateTaskEntry(id, requestData),
  loadProjectsAsync: ({
    entryState,
  }: {
    entryState: TaskEntryState,
  }) => loadProjectsAsync({
    entryState, 
  }),
  finally: ({ 
    entryState,
  }: {
    entryState: TaskEntryState,
  }) => resetTaskEntrySavingState({
    entryState, 
  }),
  buttonLabels: {
    create: `Add Task`,
    update: `Update Task`,
  },
}

function validateTaskEntry({
  entryState,
}: {
  entryState: TaskEntryState,
}) {
  entryState.setIsSaving()
  entryState.setIsTriedToSubmit()

  if (!entryState.isValid) {
    entryState.setError({
      error: `Fill in all the fields`,
    })
    entryState.resetIsSaving()
    return false
  }
  
  return true
}

function buildTaskEntryRequest({
  entryState,
}: {
  entryState: TaskEntryState,
}) {
  const {
    title,
    taskId,
    description,
    projectId,
    date,
    start,
    end,
  } = entryState.taskEntryData
    
  const startDateTime = concatDateAndTime({
    date: date!,
    time: start!,
  })
    
  const endDateTime = concatDateAndTime({
    date: date!,
    time: end!,
  })
    
  return {
    title,
    taskId,
    description,
    projectId,
    startTime: startDateTime,
    endTime: endDateTime,
  }
}

async function loadProjectsAsync({
  entryState,
}: {
  entryState: TaskEntryState,
}) {
  const {
    projectId,
    start,
  } = entryState.taskEntryData

  if (start === null) {
    return  
  } 
  
  const startDate = moment(start)
    .format(`YYYY-MM-DD`)

  const {
    data: {
      projects,
    },
  } = await api.trackingGetEmployeeProjectsByPeriod({
    startDate,
    endDate: startDate,
  })

  entryState.setProjects({
    projects,
  })

  if (projectId === EMPTY_TASK_ENTRY_DATA.projectId) {
    entryState.updateUnwellEntryData({
      taskEntryData: {
        projectId: projects[0].id,
      },
    })
  }
}

function resetTaskEntrySavingState({
  entryState,
}: {
  entryState: TaskEntryState,
}) {
  entryState.resetIsSaving()
  entryState.resetIsTriedToSubmit()
}

function setTaskEntryData({
  entryData,
  entryState,
}: {
  entryData: TrackedEntry,
  entryState: TaskEntryState,
}) {
  entryState.updateUnwellEntryData({
    taskEntryData: {
      id: entryData?.id,
      title: entryData.title || ``,
      taskId: entryData.taskId || ``,
      description: entryData.description || ``,
      projectId: entryData.project?.id || 0,
      date: entryData.start,
      start: entryData.start,
      end:entryData.end,
    },
  })
}