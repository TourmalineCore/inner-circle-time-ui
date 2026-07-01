import { useMemo } from "react"
import { DeleteModalState } from "./state/DeleteModalState"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"
import { DeleteModalContainer } from "./DeleteModalContainer"

export function DeleteModal({
  entryId,
  label,
  closeEntryModal,
  closeDeleteModal,
}: {
  entryId: number,
  label: string,
  closeEntryModal: () => unknown,
  closeDeleteModal: () => unknown,
}) {
  const deleteModalState = useMemo(
    () => new DeleteModalState(),
    [],
  )
  
  return (
    <DeleteModalStateContext.Provider value={deleteModalState}>
      <DeleteModalContainer 
        entryId={entryId}
        label={label}
        closeEntryModal={closeEntryModal}
        closeDeleteModal={closeDeleteModal}
      />        
    </DeleteModalStateContext.Provider>
  )
}