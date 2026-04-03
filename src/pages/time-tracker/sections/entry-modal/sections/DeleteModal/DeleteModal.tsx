import { useMemo } from "react"
import { DeleteModalState } from "./state/DeleteModalState"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"
import { DeleteModalContainer } from "./DeleteModalContainer"

export function DeleteModal({
  id,
  label,
  closeEntryModal,
  closeDeleteModal,
}: {
  id: number,
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
        id={id}
        label={label}
        closeEntryModal={closeEntryModal}
        closeDeleteModal={closeDeleteModal}
      />        
    </DeleteModalStateContext.Provider>
  )
}