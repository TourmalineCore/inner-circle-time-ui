import { observer } from "mobx-react-lite"
import { TimeTrackerTableContent } from "./TimeTrackerTableContent"
import { useContext, useEffect } from "react"
import { api } from "../../../../common/api"
import { Views } from "react-big-calendar"
import { useDeviceSize } from "../../../../common/hooks/useDeviceSize"
import { TimeTrackerStateContext } from "./state/TimeTrackerTableStateContext"
import { WorkEntriesResponse } from "../../types"
import moment from "moment"

export const TimeTrackerTableContainer = observer(({
  onOpenWorkEntryModal,
  setWorkEntryModalDataTime,
}: {
  onOpenWorkEntryModal: () => unknown,
  setWorkEntryModalDataTime: ({
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

    async function loadedWorkEntries() {
      const {
        data,
      } = await api.get<WorkEntriesResponse>(`/tracking/work-entries?startTime=${viewStartDate}&endTime=${viewEndDate}`)

      timeTrackerState.initialize({
        loadedData: {
          workEntries: data
            .workEntries
            .map((workEntry) => ({
              id: workEntry.id,
              taskId: workEntry.taskId,
              title: workEntry.title,
              date: moment(workEntry.startTime)
                .toDate(),
              start: moment(workEntry.startTime)
                .toDate(),
              end: moment(workEntry.endTime)
                .toDate(),
            })), 
        },
      })
    }

    loadedWorkEntries()
  }, [
    viewStartDate,
    viewEndDate,
  ])

  if (!currentView) return

  return (
    <TimeTrackerTableContent 
      onOpenWorkEntryModal={onOpenWorkEntryModal}
      setWorkEntryModalDataTime={setWorkEntryModalDataTime}
    />
  )
})
