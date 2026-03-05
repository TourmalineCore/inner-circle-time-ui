import { useContext } from "react"
import { api } from "../../../../../../common/api/api"
import { DeleteModalContent } from "./DeleteModalContent"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"
import { observer } from "mobx-react-lite"
import { closeDeleteModalEvent, closeEntryModalEvent, reloadEntriesEvent } from "../../../../event-bus"

export const DeleteModalContainer = observer(({
  id,
  label,
}: {
  id: number,
  label: string,
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

    closeDeleteModalEvent()
    closeEntryModalEvent()
    reloadEntriesEvent()
  }
})