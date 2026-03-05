import { useContext } from "react"
import { api } from "../../../../../../common/api/api"
import { DeleteModalContent } from "./DeleteModalContent"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"
import { observer } from "mobx-react-lite"
import { eventBus } from "../../../../event-bus"

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

    eventBus.trigger(`DELETE_MODAL:CLOSE`)
    eventBus.trigger(`ENTRY_MODAL:CLOSE`)
    eventBus.trigger(`TABLE:RELOAD_ENTRIES`)
  }
})