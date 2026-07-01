import moment from "moment"
import { CreateTaskEntryRequest, UpdateTaskEntryRequest } from "@tourmalinecore/inner-circle-time-api-js-client"
import { api } from "../../../../../../common/api/api"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { EntryStrategy } from "../entryTypesStrategy"
import { TaskEntryState } from "../../sections/TaskEntry/state/TaskEntryState"
import { TaskEntryStateContext } from "../../sections/TaskEntry/state/TaskEntryStateContext"
import { TaskEntryContent } from "../../sections/TaskEntry/TaskEntryContent"
import { EntryType } from "../../../../../../common/constants/entryType"

export class TaskEntryStrategy implements EntryStrategy {
  readonly entryType = EntryType.TASK
  readonly entryStateConstructor = TaskEntryState
  readonly StateContext = TaskEntryStateContext
  readonly EntryContent = () => <TaskEntryContent />
  readonly modalConfiguration = {
    label: `Task`,
    hasCopyButton: true,
    hasDeleteButton: true,
  }

  initializeNewEntry({
    startTime,
    endTime,
    entryState,
  }: {
    startTime: Date,
    endTime: Date,
    entryState: TaskEntryState,
  }) {
    entryState.initializeNewEntry({
      startTime,
      endTime,
    })
  }

  async initializeExistingEntryAsync({
    entryId,
    entryState,
  }: {
    entryId: number,
    entryState: TaskEntryState,
  }) {
    const {
      data: taskEntry,
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

  async createEntryAsync({
    requestData,
  }: {
    requestData: CreateTaskEntryRequest,
  }) {
    return api.trackingCreateTaskEntry(requestData)
  }

  async updateEntryAsync({
    entryId,
    requestData,
  }: {
    entryId: number,
    requestData: UpdateTaskEntryRequest,
  }) {
    return api.trackingUpdateTaskEntry(entryId, requestData)
  }

  async loadProjectsAsync({
    entryState,
  }: {
    entryState: TaskEntryState,
  }) {
    const {
      start,
    } = entryState.taskEntryData
    
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

  buildRequestData({
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

  validateOnClient({
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
}