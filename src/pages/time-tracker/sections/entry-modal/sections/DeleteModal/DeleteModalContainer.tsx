import { useContext } from "react"
import { api } from "../../../../../../common/api/api"
import { DeleteModalContent } from "./DeleteModalContent"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"
import { observer } from "mobx-react-lite"
import { EntryStrategy } from "../../entry-types-strategy"

export const DeleteModalContainer = observer(({
  id,
  entryStrategy,
  onCloseDeleteModal,
  onCloseAllModals,
}: {
  id: number,
  entryStrategy: EntryStrategy,
  onCloseDeleteModal: () => unknown,
  onCloseAllModals: () => unknown,
}) => {
  const deleteModalState = useContext(DeleteModalStateContext)
      
  const {
    deletionReason,
    isDeletionReasonValid,
  } = deleteModalState
    
  return (
    <DeleteModalContent 
      entryStrategy={entryStrategy}
      onSubmitDeletionReason={onSubmitDeletionReason}
      onClose={onCloseDeleteModal}
    />        
  )

  async function onSubmitDeletionReason(){
    deleteModalState.setIsTriedToSubmit()
    
    if (!isDeletionReasonValid) {
      return
    }

    await api.trackingSoftDeleteEntry(
      id,
      {
        deletionReason,
      },
    )
    onCloseAllModals()
  }
})