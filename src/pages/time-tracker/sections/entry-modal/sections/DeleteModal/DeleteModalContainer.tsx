import { useContext } from "react"
import { api } from "../../../../../../common/api/api"
import { DeleteModalContent } from "./DeleteModalContent"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"
import { observer } from "mobx-react-lite"

export const DeleteModalContainer = observer(({
  id,
  onCloseDeleteModal,
  onCloseAllModals,
}: {
  id: number,
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
      onSubmitDeletionReason={onSubmitDeletionReason}
      onClose={onCloseDeleteModal}
    />        
  )

  async function onSubmitDeletionReason(){
    deleteModalState.setIsTriedToSubmit()
    
    if (!isDeletionReasonValid) {
      deleteModalState.setError({
        error: `Fill in the reason`,
      })
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