import { observer } from "mobx-react-lite"
import { TimeTrackerTableContent } from "./TimeTrackerTableContent"

export const TimeTrackerTableContainer = observer(({
  onOpenWorkItemModal,
  setWorkItemModalDataTime,
}: {
  onOpenWorkItemModal: () => unknown,
  setWorkItemModalDataTime: ({
    startTime,
    endTime,
  }: {
    startTime: Date,
    endTime: Date,
  }) => unknown, 
}) => {
  return (
    <TimeTrackerTableContent 
      onOpenWorkItemModal={onOpenWorkItemModal}
      setWorkItemModalDataTime={setWorkItemModalDataTime}/>
  )
})
