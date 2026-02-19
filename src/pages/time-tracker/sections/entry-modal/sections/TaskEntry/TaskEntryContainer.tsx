import { observer } from "mobx-react-lite"
import { TaskEntryContent } from "./TaskEntryContent"
import { useContext, useEffect } from "react"
import { TaskEntryStateContext } from "./state/TaskEntryStateContext"
import axios from "axios"
import moment from "moment"
import { EMPTY_TASK_ENTRY_DATA } from "./state/TaskEntryState"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { api } from "../../../../../../common/api/api"
import { TaskEntry } from "../../../../types"

export const TaskEntryContainer = observer(({
  taskEntry,
  handleTriggerReloadState,
}: {
  taskEntry: TaskEntry,
  handleTriggerReloadState: () => unknown,
}) => {
  const taskEntryState = useContext(TaskEntryStateContext)

  useEffect(() => {
    setTaskEntryData(taskEntry)
    loadProjectsAsync()
  }, [])

  return (
    <TaskEntryContent
      onSubmitTaskEntryAsync={onSubmitTaskEntryAsync}
    />
  )
  
  async function onSubmitTaskEntryAsync() {
    taskEntryState.setIsSaving()
    taskEntryState.setIsTriedToSubmit()

    if (!taskEntryState.isValid) {
      taskEntryState.setError({
        error: `Fill in all the fields`,
      })
      taskEntryState.resetIsSaving()
      return
    }

    const {
      id,
      title,
      taskId,
      description,
      projectId,
      date,
      start,
      end,
    } = taskEntryState.taskEntryData

    const startDateTime = concatDateAndTime({
      date: date!,
      time: start!,
    })

    const endDateTime = concatDateAndTime({
      date: date!,
      time: end!,
    })

    const taskEntryData = {
      title,
      taskId,
      description,
      projectId,
      startTime: startDateTime,
      endTime: endDateTime,
    }

    try {
      id 
        ? await api.trackingUpdateWorkEntry(id, taskEntryData)
        : await api.trackingCreateWorkEntry(taskEntryData)

      handleTriggerReloadState()

      taskEntryState.resetError()
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          taskEntryState.setError({
            error: error.response.data.detail,
          })
        }
      }
    }
    finally {
      taskEntryState.resetIsSaving()
      taskEntryState.resetIsTriedToSubmit()
    } 
  }
 
  async function loadProjectsAsync() {
    const startDate = moment(taskEntryState.taskEntryData.start)
      .format(`YYYY-MM-DD`)
      
    const {
      data: {
        projects,
      },
    } = await api.trackingGetEmployeeProjectsByPeriod({
      startDate,
      endDate: startDate,
    })

    taskEntryState.setProjects({
      projects,
    })

    if (taskEntryState.taskEntryData.projectId === EMPTY_TASK_ENTRY_DATA.projectId) {
      taskEntryState.setProjectId({
        projectId: projects[0].id,
      })
    }
  }
  
  function setTaskEntryData({
    id,
    title,
    taskId,
    description ,
    projectId,
    start,
    end,
  }: TaskEntry) {
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
})
