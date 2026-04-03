import { useContext, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { ENTRY_TYPES_STRATEGY } from "./entry-types-strategy"
import { EntryModalContainer } from "./EntryModalContainer"
import { DeleteModal } from "./sections/DeleteModal/DeleteModal"
import { EntryModalStateContext } from "./state/EntryModalStateContext"

export const EntryModal = observer(() => {
  const entryModalState = useContext(EntryModalStateContext)

  const {
    currentEntry,
    type,
  } = entryModalState

  useEffect(() => {
    if (currentEntry?.type) {
      entryModalState.setType({
        type: currentEntry.type,
      })
    }
  }, [
    currentEntry?.type,
  ])

  const entryStrategy = ENTRY_TYPES_STRATEGY[currentEntry?.type || type]

  const entryState = useMemo(() => {
    const state = new entryStrategy.entryStateConstructor()

    entryStrategy.setEntryData({
      entryData: currentEntry!,
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

  return (
    <>
      <StateContext.Provider value={entryState}>
        <EntryModalContainer
          entryStrategy={entryStrategy}
          openDeleteModal={() => setIsDeleteModalOpen(true)}
        >        
        </EntryModalContainer>
      </StateContext.Provider>
      {
        isDeleteModalOpen && (
          <DeleteModal
            id={currentEntry!.id!}
            label={entryStrategy.label}
            closeEntryModal={() => entryModalState.closeEntryModal()}
            closeDeleteModal={() => setIsDeleteModalOpen(false)}
          />
        )
      }
    </>
  )
})