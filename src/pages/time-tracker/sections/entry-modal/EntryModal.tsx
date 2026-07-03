import { useContext, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { EntryModalContainer } from "./EntryModalContainer"
import { DeleteModal } from "./sections/DeleteModal/DeleteModal"
import { EntryModalStateContext } from "./state/EntryModalStateContext"
import { EntryTypesStrategy } from "./entry-types-strategies/entryTypesStrategy"

export const EntryModal = observer(() => {
  const entryModalState = useContext(EntryModalStateContext)

  const {
    currentEntry,
    entryType,
  } = entryModalState
  
  const entryStrategy = EntryTypesStrategy.create({
    entryType: currentEntry?.entryType || entryType,
    relatedEntryType: currentEntry?.relatedEntryType,
  })

  const entryState = useMemo(
    () => new entryStrategy.entryStateConstructor(),
    [
      entryType,
    ],
  )

  useEffect(() => {
    entryModalState.setEntryType({
      entryType: entryStrategy.entryType,
    })

    // reset error when entry type changes
    entryModalState.resetError()
  }, [
    entryStrategy.entryType,
  ])

  const StateContext = entryStrategy.StateContext

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false)

  const {
    label,
  } = entryStrategy.modalConfiguration

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
            entryId={currentEntry!.id!}
            label={label}
            closeEntryModal={() => entryModalState.closeEntryModal()}
            closeDeleteModal={() => setIsDeleteModalOpen(false)}
          />
        )
      }
    </>
  )
})