import { observer } from "mobx-react-lite"
import { WorkItemModalContent } from "./WorkItemModalContent"
import { api } from "../../../../common/api"
import { useContext } from "react"
import { WorkItemModalStateContext } from "./state/WorkItemModalStateContext"

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
      startTime,
      endTime,
    } = workItemModalState.workItemModalData

    try {

      await api.post(`/work-entries`,
        {
          title,
          startTime,
          endTime,
        },
      )
    }
    catch{ /* empty */ }
  }
})
