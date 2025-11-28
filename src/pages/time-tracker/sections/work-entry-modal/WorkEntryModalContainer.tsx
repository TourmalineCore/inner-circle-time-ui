import { observer } from "mobx-react-lite"
import { WorkEntryModalContent } from "./WorkEntryModalContent"
import { api } from "../../../../common/api"
import { useContext } from "react"
import { WorkEntryModalStateContext } from "./state/WorkEntryModalStateContext"
import moment from "moment"

export const WorkEntryModalContainer = observer(({
  onClose,
}: {
  onClose: () => unknown,
}) => {
  const workEntryModalState = useContext(WorkEntryModalStateContext)

  return (
    <WorkEntryModalContent
      onClose={onClose}
      onAddWorkEntry={addWorkEntryAsync}
    />
  )
  
  async function addWorkEntryAsync() {
    const {
      title,
      taskId,
      date,
      start,
      end,
    } = workEntryModalState.workEntryModalData

    const startDateTime = moment(date)
      .hours(moment(start)
        .hours())
      .minutes(moment(start)
        .minutes())
      .seconds(moment(start)
        .seconds())
      .format(`YYYY-MM-DDTHH:mm:ss`)

    const endDateTime = moment(end)
      .format(`YYYY-MM-DDTHH:mm:ss`)

    try {
      await api.post(`/work-entries`,
        {
          title,
          taskId,
          startTime: startDateTime,
          endTime: endDateTime,
        },
      )
    }
    catch{ /* empty */ }
  }
})
