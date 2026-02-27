import moment from "moment"
import { CreateTaskEntryRequest, UpdateTaskEntryRequest } from "../../../../../../../api"
import { api } from "../../../../../../common/api/api"
import { TrackedEntry } from "../../../../types"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { EntryStrategy } from "../../EntryModal"
import { EMPTY_TASK_ENTRY_DATA, TaskEntryState } from "./state/TaskEntryState"
import { TaskEntryStateContext } from "./state/TaskEntryStateContext"
import { TaskEntryContent } from "./TaskEntryContent"

export const TASK_ENTRY_STRATEGY: EntryStrategy = {
  state: TaskEntryState,
  StateContext: TaskEntryStateContext,
  setEntryData: ({
    entryData,
    state,
  }: {
    entryData: TrackedEntry,
    state: TaskEntryState,
  }) => setTaskEntryData({
    state,
    entryData,
  }), 
  EntryContent: <TaskEntryContent />,
  clientValidation: ({
    state,
  }: {
    state: TaskEntryState,
  }) => {
    state.setIsSaving()
    state.setIsTriedToSubmit()

    if (!state.isValid) {
      state.setError({
        error: `Fill in all the fields`,
      })
      state.resetIsSaving()
      return false
    }
    
    return true
  },
  getRequestData: ({
    state,
  }: {
    state: TaskEntryState,
  }) => {
    const {
      title,
      taskId,
      description,
      projectId,
      date,
      start,
      end,
    } = state.taskEntryData
      
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
  },  
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
  loadProjectsAsync: async ({
    state,
  }: {
    state: TaskEntryState,
  }) => {
    const {
      projectId,
      start,
    } = state.taskEntryData

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
  
    state.setProjects({
      projects,
    })
  
    if (projectId === EMPTY_TASK_ENTRY_DATA.projectId) {
      state.setProjectId({
        projectId: projects[0].id,
      })
    }
  },
  finally: ({
    state,
  }: {
    state: TaskEntryState,
  }) => {
    state.resetIsSaving()
    state.resetIsTriedToSubmit()
  },
  buttonLabels: {
    create: `Add Task`,
    update: `Update Task`,
  },
}  

function setTaskEntryData({
  entryData,
  state,
}: {
  entryData: TrackedEntry,
  state: TaskEntryState,
}) {
  state.setDate({
    date: entryData.start,
  })

  state.setStartTime({
    startTime: entryData.start,
  })
    
  state.setEndTime({
    endTime: entryData.end,
  })

  if (entryData.id) {
    state.setId({
      id: entryData.id,
    })

    state.setTitle({
      title: entryData.title!,
    })

    state.setTaskId({
      taskId: entryData.taskId!,
    })

    state.setDescription({
      description: entryData.description!,
    })

    state.setProjectId({
      projectId: entryData.project!.id!,
    })
  }
}