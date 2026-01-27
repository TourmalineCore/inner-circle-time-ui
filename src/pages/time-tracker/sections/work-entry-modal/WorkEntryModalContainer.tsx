import { observer } from "mobx-react-lite"
import { WorkEntryModalContent } from "./WorkEntryModalContent"
import { useContext, useEffect } from "react"
import { WorkEntryModalStateContext } from "./state/WorkEntryModalStateContext"
import { concatDateAndTime } from "../../utils/date-and-time"
import { api } from "../../../../common/api/api"
import axios from "axios"
import moment from "moment"
import { EMPTY_WORK_ENTRY_MODAL_DATA } from "./state/WorkEntryModalState"

export const WorkEntryModalContainer = observer(({
  onClose,
  handleTriggerReloadState,
}: {
  onClose: () => unknown,
  handleTriggerReloadState: () => unknown,
}) => {
  const workEntryModalState = useContext(WorkEntryModalStateContext)
  
  useEffect(() => {
    loadProjectsAsync()
  }, [])

  return (
    <WorkEntryModalContent
      onClose={onClose}
      onSubmitWorkEntryAsync={onSubmitWorkEntryAsync}
    />
  )
  
  async function onSubmitWorkEntryAsync() {
    workEntryModalState.setIsSaving()
    workEntryModalState.setIsTriedToSubmit()

    if (!workEntryModalState.isValid) {
      workEntryModalState.setError({
        error: `Fill in all the fields`,
      })
      workEntryModalState.resetIsSaving()
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
    } = workEntryModalState.workEntryModalData

    const startDateTime = concatDateAndTime({
      date: date!,
      time: start!,
    })

    const endDateTime = concatDateAndTime({
      date: date!,
      time: end!,
    })

    const workEntryData = {
      title,
      taskId,
      description,
      projectId,
      startTime: startDateTime,
      endTime: endDateTime,
    }

    try {
      id 
        ? await api.trackingUpdateWorkEntry(id, workEntryData)
        : await api.trackingCreateWorkEntry(workEntryData)

      onClose()
      handleTriggerReloadState()

      workEntryModalState.resetError()
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          workEntryModalState.setError({
            error: error.response.data.detail,
          })
        }
      }
    }
    finally {
      workEntryModalState.resetIsSaving()
      workEntryModalState.resetIsTriedToSubmit()
    } 
  }
 
  async function loadProjectsAsync() {
    const startDate = moment(workEntryModalState.workEntryModalData.start)
      .format(`YYYY-MM-DD`)
      
    const {
      data: {
        projects,
      },
    } = await api.trackingGetEmployeeProjectsByPeriod({
      startDate,
      endDate: startDate,
    })

    workEntryModalState.setProjects({
      projects,
    })

    if (workEntryModalState.workEntryModalData.projectId === EMPTY_WORK_ENTRY_MODAL_DATA.projectId) {
      workEntryModalState.setProjectId({
        projectId: projects[0].id,
      })
    }
  }
})
