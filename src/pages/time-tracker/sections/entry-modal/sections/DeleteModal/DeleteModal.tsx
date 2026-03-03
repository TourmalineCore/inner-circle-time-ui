import { useMemo } from "react"
import { DeleteModalState } from "./state/DeleteModalState"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"
import { DeleteModalContainer } from "./DeleteModalContainer"
import { EntryStrategy } from "../../entry-types-strategy"

export function DeleteModal({
  id,
  entryStrategy,
  onCloseDeleteModal,
  onCloseAllModals,
}: {
  id: number,
  entryStrategy: EntryStrategy,
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
        entryStrategy={entryStrategy}
        onCloseDeleteModal={onCloseDeleteModal}
        onCloseAllModals={onCloseAllModals}
      />        
    </DeleteModalStateContext.Provider>
  )
}