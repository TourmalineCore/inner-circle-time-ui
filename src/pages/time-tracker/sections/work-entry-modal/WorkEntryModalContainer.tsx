import { observer } from "mobx-react-lite"
import { WorkEntryModalContent } from "./WorkEntryModalContent"
import { useContext } from "react"
import { WorkEntryModalStateContext } from "./state/WorkEntryModalStateContext"
import { concatDateAndTime } from "../../utils/date-and-time"
import { api } from "../../../../common/api/api"

export const WorkEntryModalContainer = observer(({
  onClose,
  handleTriggerReloadState,
}: {
  onClose: () => unknown,
  handleTriggerReloadState: () => unknown,
}) => {
  const workEntryModalState = useContext(WorkEntryModalStateContext)

  return (
    <WorkEntryModalContent
      onClose={onClose}
      onSubmitWorkEntryAsync={onSubmitWorkEntryAsync}
    />
  )
  
  async function onSubmitWorkEntryAsync() {
    workEntryModalState.setIsSaving()
    workEntryModalState.setIsTriedToSubmit()

    const {
      id,
      title,
      taskId,
      description,
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

    if (!workEntryModalState.isValid) {
      workEntryModalState.setError({
        error: `Fill in all the fields`,
      })
      workEntryModalState.resetIsSaving()
      return
    }

    const workEntryData = {
      title,
      taskId,
      description,
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
    finally {
      workEntryModalState.resetIsSaving()
      workEntryModalState.resetIsTriedToSubmit()
    } 
  }
})
