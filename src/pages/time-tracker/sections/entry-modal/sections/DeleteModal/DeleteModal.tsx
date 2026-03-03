import { useMemo } from "react"
import { DeleteModalState } from "./state/DeleteModalState"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"
import { DeleteModalContainer } from "./DeleteModalContainer"

export function DeleteModal({
  id,
  label,
  onCloseDeleteModal,
  onCloseAllModals,
}: {
  id: number,
  label: string,
  onCloseDeleteModal: () => unknown,
  onCloseAllModals: () => unknown,
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
        onCloseDeleteModal={onCloseDeleteModal}
        onCloseAllModals={onCloseAllModals}
      />        
    </DeleteModalStateContext.Provider>
  )
}