import { useEffect, useMemo } from "react"
import { EntryModalStateContext } from "./state/EntryModalStateContext"
import { EntryModalState } from "./state/EntryModalState"
import { TrackedEntry } from "../../types"
import { observer } from "mobx-react-lite"
import { ENTRY_TYPES_STRATEGY } from "./entry-types-strategy"
import { EntryModalContainer } from "./EntryModalContainer"

export const EntryModal = observer(({
  currentEntry,
  onClose,
  handleTriggerReloadState,
}: {
  currentEntry: TrackedEntry,
  onClose: () => unknown,
  handleTriggerReloadState: () => unknown,
}) => {
  const entryModalState = useMemo(
    () => new EntryModalState(),
    [],
  )

  const {
    type,
  } = entryModalState

  useEffect(() => {
    if (currentEntry.type) {
      entryModalState.setType({
        type: currentEntry.type,
      })
    }
  }, [
    currentEntry.type,
  ])

  const entryStrategy = ENTRY_TYPES_STRATEGY[currentEntry?.type || type]

  const entryState = useMemo(() => {
    const state = new entryStrategy.entryStateConstructor()

    entryStrategy.setEntryData({
      entryData: currentEntry,
      entryState: state,
    })
  
    return state
  }, [
    type,
  ])

  useEffect(() => {
    // reset error when type changes
    entryModalState.resetError()
  }, [
    type,
  ])

  const StateContext = entryStrategy.StateContext
  
  return (
    <EntryModalStateContext.Provider value={entryModalState}>
      <StateContext.Provider value={entryState}>
        <EntryModalContainer
          id={currentEntry.id}
          entryStrategy={entryStrategy}
          onClose={onClose}
          handleTriggerReloadState={handleTriggerReloadState}
        >        
        </EntryModalContainer>
      </StateContext.Provider>
    </EntryModalStateContext.Provider>
  )
})