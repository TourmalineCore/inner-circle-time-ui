import { observer } from "mobx-react-lite"
import { TimeTrackerTableContent } from "./TimeTrackerTableContent"
import { useContext, useEffect } from "react"
import { TimeTrackerStateContext } from "./state/TimeTrackerTableStateContext"
import moment from "moment"
import { api } from "../../../../common/api/api"
// import { WorkEntryItem } from "../../types"
import { Views } from "react-big-calendar"
import { useDeviceSize } from "../../../../common/hooks/useDeviceSize"

export const TimeTrackerTableContainer = observer(({
  onOpenEntryModal,
  triggerReloadState, 
}: {
  onOpenEntryModal: () => unknown,
  triggerReloadState: boolean,
}) => {
  const timeTrackerState = useContext(TimeTrackerStateContext)
  
  const {
    viewStartDate,
    viewEndDate,
  } = timeTrackerState

  const {
    isDesktop,
  } = useDeviceSize()

  useEffect(() => {
    timeTrackerState.setViewPeriod({
      date: new Date(),
      view: Views.WEEK,
    })
  }, [
    isDesktop,
  ])
  
  useEffect(() => {
    if (viewStartDate === null && viewEndDate === null) return

    async function loadedEntries() {
      const {
        data,
      } = await api.trackingGetWorkEntriesByPeriod({
        startDate: viewStartDate as string,
        endDate: viewEndDate as string,
      })

      const {
        data: {
          projects,
        },
      } = await api.trackingGetEmployeeProjectsByPeriod({
        startDate: viewStartDate!,
        endDate: viewEndDate!,
      })

      timeTrackerState.initialize({
        loadedData: {
          entries: data
            .workEntries
            .map((workEntry) => ({
              id: workEntry.id,
              taskId: workEntry.taskId,
              description: workEntry.description,
              project: projects.find((project) => project.id === workEntry.projectId)!,
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

    loadedEntries()
  }, [
    viewStartDate,
    viewEndDate,
    triggerReloadState,
  ])

  return (
    <TimeTrackerTableContent 
      onOpenEntryModal={onOpenEntryModal}
    />
  )
})
