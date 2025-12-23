import { observer } from "mobx-react-lite"
import { TimeTrackerTableContent } from "./TimeTrackerTableContent"
import { useContext, useEffect } from "react"
import { Views } from "react-big-calendar"
import { useDeviceSize } from "../../../../common/hooks/useDeviceSize"
import { TimeTrackerStateContext } from "./state/TimeTrackerTableStateContext"
import moment from "moment"
import { api } from "../../../../common/api/api"
import { WorkEntryModal } from "../../types"

export const TimeTrackerTableContainer = observer(({
  onOpenWorkEntryModal,
  setWorkEntryModalData,
  setWorkEntryModalDataTime,
  triggerReloadState,
}: {
  onOpenWorkEntryModal: () => unknown,
  setWorkEntryModalData: (workEntry: WorkEntryModal) => unknown,
  setWorkEntryModalDataTime: ({
    startTime,
    endTime,
  }: {
    startTime: Date,
    endTime: Date,
  }) => unknown, 
  triggerReloadState: boolean,
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
      } = await api.trackingGetWorkEntriesByPeriod({
        startDate: viewStartDate as string,
        endDate: viewEndDate as string,
      })

      timeTrackerState.initialize({
        loadedData: {
          workEntries: data
            .workEntries
            .map((workEntry) => ({
              id: workEntry.id,
              taskId: workEntry.taskId,
              description: workEntry.description,
              projectName: workEntry.projectName,
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
    triggerReloadState,
  ])

  if (!currentView) return

  return (
    <TimeTrackerTableContent 
      onOpenWorkEntryModal={onOpenWorkEntryModal}
      setWorkEntryModalData={setWorkEntryModalData}
      setWorkEntryModalDataTime={setWorkEntryModalDataTime}
    />
  )
})
