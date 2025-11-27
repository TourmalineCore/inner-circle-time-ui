import { observer } from "mobx-react-lite"
import { TimeTrackerTableContent } from "./TimeTrackerTableContent"
import { useContext, useEffect } from "react"
import { api } from "../../../../common/api"
import { Views } from "react-big-calendar"
import { useDeviceSize } from "../../../../common/hooks/useDeviceSize"
import { TimeTrackerStateContext } from "./state/TimeTrackerTableStateContext"
import { WorkItem } from '../../types'

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
  const timeTrackerState = useContext(TimeTrackerStateContext)
  
  const {
    viewStartDate,
    viewEndDate,
    currentView, 
  } = timeTrackerState
    
  const {
    isMobile,
  } = useDeviceSize()

  useEffect(() => {
    timeTrackerState.setCurrentView({
      view: isMobile
        ? Views.DAY
        : Views.WEEK,
    })
  }, [
    isMobile,
  ])
  
  useEffect(() => {
    if (viewStartDate === null && viewEndDate === null) return

    async function loadedWorkItems() {
      const {
        data,
      } = await api.get<WorkItem[]>(`/tracking/work-entries?startTime=${viewStartDate}&endTime=${viewEndDate}`)

      timeTrackerState.initialize({
        loadedWorkItems: data,
      })
    }

    loadedWorkItems()
  }, [
    viewStartDate,
    viewEndDate,
    isMobile,
  ])

  if (!currentView) return

  return (
    <TimeTrackerTableContent 
      onOpenWorkItemModal={onOpenWorkItemModal}
      setWorkItemModalDataTime={setWorkItemModalDataTime}
    />
  )
})
