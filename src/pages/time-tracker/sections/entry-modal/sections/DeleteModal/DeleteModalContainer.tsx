import { useContext } from "react"
import { api } from "../../../../../../common/api/api"
import { DeleteModalContent } from "./DeleteModalContent"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"
import { observer } from "mobx-react-lite"
import { eventBus, EventBusType } from "../../../../event-bus"

export const DeleteModalContainer = observer(({
  id,
  label,
  closeEntryModal,
  closeDeleteModal,
}: {
  id: number,
  label: string,
  closeEntryModal: () => unknown,
  closeDeleteModal: () => unknown,
}) => {
  const deleteModalState = useContext(DeleteModalStateContext)
      
  const {
    deletionReason,
    isDeletionReasonValid,
  } = deleteModalState
    
  return (
    <DeleteModalContent 
      label={label}
      onSubmitDeletionReason={onSubmitDeletionReason}
      closeDeleteModal={closeDeleteModal}
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

    closeDeleteModal()
    closeEntryModal()
    eventBus.publish(EventBusType.ENTRIES_CHANGED)
  }
})