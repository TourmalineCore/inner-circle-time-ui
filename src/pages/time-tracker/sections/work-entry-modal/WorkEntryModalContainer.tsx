import { observer } from "mobx-react-lite"
import { WorkEntryModalContent } from "./WorkEntryModalContent"
import { api } from "../../../../common/api"
import { useContext } from "react"
import { WorkEntryModalStateContext } from "./state/WorkEntryModalStateContext"
import { concatDateAndTime } from "../../utils/date-and-time"

export const WorkEntryModalContainer = observer(({
  onClose,
}: {
  onClose: () => unknown,
}) => {
  const workEntryModalState = useContext(WorkEntryModalStateContext)

  return (
    <WorkEntryModalContent
      onClose={onClose}
      onSubmitWorkEntryAsync={onSubmitWorkEntryAsync}
    />
  )
  
  async function onSubmitWorkEntryAsync() {
    const {
      id,
      title,
      taskId,
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

    try {
      await api.post(`tracking/work-entries${id ? `/${id}` : ``}`,
        {
          title,
          taskId,
          startTime: startDateTime,
          endTime: endDateTime,
        },
      )
      onClose()
      window.location.reload()
    }
    catch{ /* empty */ }
  }
})
