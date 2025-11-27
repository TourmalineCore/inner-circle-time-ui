import { observer } from "mobx-react-lite"
import { WorkItemModalContent } from "./WorkItemModalContent"
import { api } from "../../../../common/api"
import { useContext } from "react"
import { WorkItemModalStateContext } from "./state/WorkItemModalStateContext"
import moment from "moment"

export const WorkItemModalContainer = observer(({
  onClose,
}: {
  onClose: () => unknown,
}) => {
  const workItemModalState = useContext(WorkItemModalStateContext)

  return (
    <WorkItemModalContent
      onClose={onClose}
      onAddWorkItem={addWorkItemAsync}
    />
  )
  
  async function addWorkItemAsync() {
    const {
      title,
      taskId,
      date,
      start,
      end,
    } = workItemModalState.workItemModalData

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
