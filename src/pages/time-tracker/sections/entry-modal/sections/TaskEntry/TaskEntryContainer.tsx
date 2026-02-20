import { observer } from "mobx-react-lite"
import { TaskEntryContent } from "./TaskEntryContent"
import { useContext, useEffect } from "react"
import { TaskEntryStateContext } from "./state/TaskEntryStateContext"
import axios from "axios"
import moment from "moment"
import { EMPTY_TASK_ENTRY_DATA } from "./state/TaskEntryState"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { api } from "../../../../../../common/api/api"

export const TaskEntryContainer = observer(({
  handleTriggerReloadState,
}: {
  handleTriggerReloadState: () => unknown,
}) => {
  const taskEntryState = useContext(TaskEntryStateContext)

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

  useEffect(() => {
    loadProjectsAsync()
  }, [
    start,
  ])

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
    if (start === null) return 

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

    taskEntryState.setProjects({
      projects,
    })

    if (projectId === EMPTY_TASK_ENTRY_DATA.projectId) {
      taskEntryState.setProjectId({
        projectId: projects[0].id,
      })
    }
  }
})
