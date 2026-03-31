import { useMemo } from "react"
import { DeleteModalState } from "./state/DeleteModalState"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"
import { DeleteModalContainer } from "./DeleteModalContainer"

export function DeleteModal({
  id,
  label,
  closeEntryModal,
}: {
  id: number,
  label: string,
  closeEntryModal: () => unknown,
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
      />        
    </DeleteModalStateContext.Provider>
  )
}