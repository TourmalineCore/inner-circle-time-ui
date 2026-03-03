import { useMemo } from "react"
import { DeleteModalState } from "./state/DeleteModalState"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"
import { DeleteModalContainer } from "./DeleteModalContainer"

export function DeleteModal({
  id,
  onCloseDeleteModal,
  onCloseAllModals,
}: {
  id: number,
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
        onCloseDeleteModal={onCloseDeleteModal}
        onCloseAllModals={onCloseAllModals}
      />        
    </DeleteModalStateContext.Provider>
  )
}