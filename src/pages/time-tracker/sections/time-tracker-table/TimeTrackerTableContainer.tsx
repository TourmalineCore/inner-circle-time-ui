import { observer } from "mobx-react-lite"
import { TimeTrackerTableContent } from "./TimeTrackerTableContent"
import { useContext, useEffect } from "react"
import { TimeTrackerStateContext } from "./state/TimeTrackerTableStateContext"
import moment from "moment"
import { api } from "../../../../common/api/api"
import { WorkEntryItem } from "../../types"
import { Views } from "react-big-calendar"

export const TimeTrackerTableContainer = observer(({
  onOpenWorkEntryModal,
  setWorkEntryModalData,
  setWorkEntryModalDataTime,
  triggerReloadState, 
}: {
  onOpenWorkEntryModal: () => unknown,
  setWorkEntryModalData: (workEntry: WorkEntryItem) => unknown,
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
  } = timeTrackerState

  useEffect(() => {
    timeTrackerState.setViewPeriod({
      date: new Date(),
      view: Views.WEEK,
    })
  }, [])
  
  useEffect(() => {
    if (viewStartDate === null && viewEndDate === null) return

    async function loadedWorkEntries() {
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
          workEntries: data
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

    loadedWorkEntries()
  }, [
    viewStartDate,
    viewEndDate,
    triggerReloadState,
  ])

  return (
    <TimeTrackerTableContent 
      onOpenWorkEntryModal={onOpenWorkEntryModal}
      setWorkEntryModalData={setWorkEntryModalData}
      setWorkEntryModalDataTime={setWorkEntryModalDataTime}
    />
  )
})
