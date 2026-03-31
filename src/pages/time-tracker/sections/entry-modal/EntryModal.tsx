import { useEffect, useMemo, useState } from "react"
import { EntryModalStateContext } from "./state/EntryModalStateContext"
import { EntryModalState } from "./state/EntryModalState"
import { TrackedEntry } from "../../types"
import { observer } from "mobx-react-lite"
import { ENTRY_TYPES_STRATEGY } from "./entry-types-strategy"
import { EntryModalContainer } from "./EntryModalContainer"
import { DeleteModal } from "./sections/DeleteModal/DeleteModal"
import { eventBus, EventBusType } from "../../event-bus"

export const EntryModal = observer(({
  currentEntry,
  isCopyMode,
}: {
  currentEntry: TrackedEntry,
  isCopyMode: boolean,
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

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false)

  useEffect(() => {
    const unsubscribeEntryModalOpen = eventBus.subscribe(EventBusType.DELETE_MODAL_OPEN, () => {
      setIsDeleteModalOpen(true)
    })
  
    const unsubscribeEntryModalClose = eventBus.subscribe(EventBusType.DELETE_MODAL_CLOSE, () => {
      setIsDeleteModalOpen(false)
    }) 
      
    return () => {
      unsubscribeEntryModalOpen(),
      unsubscribeEntryModalClose()
    } 
  }, [
    isDeleteModalOpen,
  ])
  
  return (
    <>
      <EntryModalStateContext.Provider value={entryModalState}>
        <StateContext.Provider value={entryState}>
          <EntryModalContainer
            id={currentEntry.id}
            entryStrategy={entryStrategy}
            isCopyMode={isCopyMode}
          >        
          </EntryModalContainer>
        </StateContext.Provider>
      </EntryModalStateContext.Provider>
      {
        isDeleteModalOpen && (
          <DeleteModal
            id={currentEntry.id!}
            label={entryStrategy.label}
          />
        )
      }
    </>
  )
})