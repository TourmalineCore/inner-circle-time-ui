import { observer } from "mobx-react-lite"
import { TimeTrackerTableContent } from "./TimeTrackerTableContent"
import { useContext, useEffect } from "react"
import { api } from "../../../../common/api"
import { Views } from "react-big-calendar"
import { useDeviceSize } from "../../../../common/hooks/useDeviceSize"
import { TimeTrackerStateContext } from "./state/TimeTrackerTableStateContext"

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

    timeTrackerState.setViewPeriod({
      date: new Date(),
    })
  }, [
    isMobile,
  ])
  
  useEffect(() => {
    if (viewStartDate === null && viewEndDate === null) return

    function loadedWorkItems() {
      api.get(`/tracking/work-entries?startTime=${viewStartDate}&endTime=${viewEndDate}`)
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
