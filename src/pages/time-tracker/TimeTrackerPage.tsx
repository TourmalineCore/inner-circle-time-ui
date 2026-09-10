import { useMemo } from "react"
import { TimeTrackerTableState } from "./sections/time-tracker-table/state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./sections/time-tracker-table/state/TimeTrackerTableStateContext"
import { TimeTrackerTableContainer } from "./sections/time-tracker-table/TimeTrackerTableContainer"
import { EntryModal } from "./sections/entry-modal/EntryModal"
import { EntryModalState } from "./sections/entry-modal/state/EntryModalState"
import { EntryModalStateContext } from "./sections/entry-modal/state/EntryModalStateContext"
import { observer } from "mobx-react-lite"
import { MetricsState } from "./sections/metrics/state/MetricsState"
import { MetricsContainer } from "./sections/metrics/MetricsContainer"
import { MetricsStateContext } from "./sections/metrics/state/MetricsStateContext"

export const TimeTrackerPage = observer(() => {  
  const timeTrackerTableState = useMemo(
    () => new TimeTrackerTableState(),
    [], 
  )

  const entryModalState = useMemo(
    () => new EntryModalState(),
    [],
  )

  const metricsState = useMemo(
    () => new MetricsState(),
    [],
  )

  const {
    isOpenModal,
    isCopyMode,
  } = entryModalState

  const {
    viewStartDate,
    viewEndDate, 
  } = timeTrackerTableState
  
  return (
    <>
      <TimeTrackerStateContext.Provider value={timeTrackerTableState}>
        <MetricsStateContext.Provider value={metricsState}>
          <MetricsContainer
            startDate={viewStartDate as string}
            endDate={viewEndDate as string}
          />
          <TimeTrackerTableContainer
            isCopyMode={isCopyMode}
            createCopyEntry={({
              start,
              end,
            }) => entryModalState.createCopyEntry({
              start,
              end,
            })}
            createNewNonAllDayEntry={({
              allDayEntryType,
              start,
              end,
            }) => entryModalState.createNewNonAllDayEntry({
              allDayEntryType,
              start,
              end,
            })}
            createNewAllDayEntry={({
              start,
              end,
            }) => entryModalState.createNewAllDayEntry({
              start,
              end,
            })}
            openEntry={({
              entry,
            }) => entryModalState.openEntry({
              entry,
            })}
            resetIsCopyMode={() => entryModalState.resetIsCopyMode()}
          />
        </MetricsStateContext.Provider>
      </TimeTrackerStateContext.Provider>
      <EntryModalStateContext.Provider value={entryModalState}>
        {isOpenModal && (
          <EntryModal />
        )}
      </EntryModalStateContext.Provider>
    </>
  )
})
