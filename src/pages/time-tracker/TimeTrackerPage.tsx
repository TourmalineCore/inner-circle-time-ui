import { useMemo } from "react"
import { TimeTrackerTableState } from "./sections/time-tracker-table/state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./sections/time-tracker-table/state/TimeTrackerTableStateContext"
import { TimeTrackerTableContainer } from "./sections/time-tracker-table/TimeTrackerTableContainer"
import { EntryModal } from "./sections/entry-modal/EntryModal"
import { EntryModalState } from "./sections/entry-modal/state/EntryModalState"
import { EntryModalStateContext } from "./sections/entry-modal/state/EntryModalStateContext"
import { observer } from "mobx-react-lite"

export const TimeTrackerPage = observer(() => {  
  const timeTrackerTableState = useMemo(
    () => new TimeTrackerTableState(),
    [], 
  )

  const entryModalState = useMemo(
    () => new EntryModalState(),
    [],
  )

  const {
    isOpenModal,
    isCopyMode,
  } = entryModalState
  
  return (
    <>
      <TimeTrackerStateContext.Provider value={timeTrackerTableState}>
        <TimeTrackerTableContainer
          isCopyMode={isCopyMode}
          createCopyEntry={({
            start,
            end,
          }) => entryModalState.createCopyEntry({
            start,
            end,
          })}
          createNewEntry={({
            start,
            end,
          }) => entryModalState.createNewEntry({
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
      </TimeTrackerStateContext.Provider>
      <EntryModalStateContext.Provider value={entryModalState}>
        {isOpenModal && (
          <EntryModal />
        )}
      </EntryModalStateContext.Provider>
    </>
  )
})
