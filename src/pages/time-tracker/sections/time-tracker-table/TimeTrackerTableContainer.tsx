import { observer } from "mobx-react-lite"
import { TimeTrackerTableContent } from "./TimeTrackerTableContent"
import { useContext, useEffect } from "react"
import { TimeTrackerStateContext } from "./state/TimeTrackerTableStateContext"
import moment from "moment"
import { api } from "../../../../common/api/api"
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
      } = await api.trackingGetEntriesByPeriod({
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

      const taskEntries = data
        .taskEntries
        .map((taskEntry) => ({
          id: taskEntry.id,
          taskId: taskEntry.taskId,
          description: taskEntry.description,
          project: projects.find((project) => project.id === taskEntry.projectId)!,
          title: taskEntry.title,
          type: taskEntry.type,
          date: moment(taskEntry.startTime)
            .toDate(),
          start: moment(taskEntry.startTime)
            .toDate(),
          end: moment(taskEntry.endTime)
            .toDate(),
        }))

      const unwellEntries = data
        .unwellEntries
        .map((unwellEntry) => ({
          id: unwellEntry.id,
          type: unwellEntry.type,
          date: moment(unwellEntry.startTime)
            .toDate(),
          start: moment(unwellEntry.startTime)
            .toDate(),
          end: moment(unwellEntry.endTime)
            .toDate(),
        })) 

      timeTrackerState.initialize({
        loadedData: {
          entries: [
            ...taskEntries,
            ...unwellEntries,
          ], 
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
