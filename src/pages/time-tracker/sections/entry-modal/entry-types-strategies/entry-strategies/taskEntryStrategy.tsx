import moment from "moment"
import { CreateTaskEntryRequest, UpdateTaskEntryRequest } from "@tourmalinecore/inner-circle-time-api-js-client"
import { api } from "../../../../../../common/api/api"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { EntryStrategy } from "../entryTypesStrategy"
import { TaskEntryState } from "../../sections/TaskEntry/state/TaskEntryState"
import { TaskEntryStateContext } from "../../sections/TaskEntry/state/TaskEntryStateContext"
import { TaskEntryContent } from "../../sections/TaskEntry/TaskEntryContent"

export const TASK_ENTRY_STRATEGY: EntryStrategy = {
  entryStateConstructor: TaskEntryState,
  StateContext: TaskEntryStateContext, 
  EntryContent: () => <TaskEntryContent />,
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
  initializeNewEntry: ({
    startTime,
    endTime,
    entryState,
  }: {
    startTime: Date,
    endTime: Date,
    entryState: TaskEntryState,
  }) => {
    entryState.initializeNewEntry({
      startTime,
      endTime,
    })
  },
  initializeExistingEntryAsync: async ({
    entryId, 
    entryState,
  }: {
    entryId: number,
    entryState: TaskEntryState,
  }) => await initializeExistingEntryAsync({
    entryId,
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
  label: `Task`,
}

function validateTaskEntry({
  entryState,
}: {
  entryState: TaskEntryState,
}) {
  entryState.setIsTriedToSubmit()

  if (!entryState.isValid) {
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
}

async function initializeExistingEntryAsync({
  entryId,
  entryState,
}: {
  entryId: number,
  entryState: TaskEntryState,
}) {
  const {
    data: {
      taskEntry,
    },
  } = await api.trackingGetTaskEntry(entryId)

  entryState.initializeExistingEntry({
    taskEntry: {
      id: taskEntry.id,
      title: taskEntry.title,
      taskId: taskEntry.taskId,
      description: taskEntry.description,
      projectId: taskEntry.projectId,
      date: new Date(taskEntry.startTime),
      start: new Date(taskEntry.startTime),
      end: new Date(taskEntry.endTime),
    },
  })
}