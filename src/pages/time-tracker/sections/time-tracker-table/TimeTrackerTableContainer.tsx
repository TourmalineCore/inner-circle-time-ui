import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { TimeTrackerStateContext } from "./state/TimeTrackerTableStateContext"
import { api } from "../../../../common/api/api"
import { Views } from "react-big-calendar"
import { useDeviceSize } from "../../../../common/hooks/useDeviceSize"
import { eventBus, EventBusType } from "../../event-bus"
import { TimeTrackerTableContent } from "./TimeTrackerTableContent"
import { TrackedEntry } from "../../types"
import { EntryMapper } from "./mapper/entryMapper"

export const TimeTrackerTableContainer = observer(({
  isCopyMode,
  openEntry,
  openMakeUpEntry,
  createNewEntry,
  createCopyEntry,
  resetIsCopyMode,
}: {
  isCopyMode: boolean,
  createCopyEntry: ({
    start,
    end,
  }: {
    start: Date,
    end: Date,
  }) => unknown,
  createNewEntry: ({
    start,
    end,
  }: {
    start: Date,
    end: Date,
  }) => unknown,
  openEntry: ({
    entry,
  }: {
    entry: TrackedEntry,
  }) => unknown,
  openMakeUpEntry: ({
    entry,
  }: {
    entry: TrackedEntry,
  }) => unknown,
  resetIsCopyMode: () => unknown,
}) => {
  const timeTrackerState = useContext(TimeTrackerStateContext)
  
  const {
    viewStartDate,
    viewEndDate,
  } = timeTrackerState

  const [
    needToReloadEntries,
    setNeedToReloadEntries,
  ] = useState(false)

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
    const unsubscribeEntriesChanged = eventBus.subscribe(EventBusType.ENTRIES_CHANGED, () => {
      setNeedToReloadEntries(!needToReloadEntries)
    })
  
    return () => {
      unsubscribeEntriesChanged()
    }
  }, [
    needToReloadEntries,
  ])
  
  useEffect(() => {
    if (viewStartDate === null && viewEndDate === null) {
      return
    }

    async function loadedEntries() {
      const {
        data: entries,
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

      timeTrackerState.initialize({
        loadedData: {
          entries: EntryMapper.toEntryList({
            entries,
            projects,
          }), 
        },
      })
    }

    loadedEntries()
  }, [
    viewStartDate,
    viewEndDate,
    needToReloadEntries,
  ])

  return (
    <TimeTrackerTableContent
      isCopyMode={isCopyMode}
      openEntry={openEntry}
      openMakeUpEntry={openMakeUpEntry}
      createCopyEntry={createCopyEntry}
      createNewEntry={createNewEntry}
      resetIsCopyMode={resetIsCopyMode}
    />
  )
})
