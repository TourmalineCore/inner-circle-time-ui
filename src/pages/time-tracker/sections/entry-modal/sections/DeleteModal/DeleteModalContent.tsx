import { useContext } from "react"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"

import { Modal } from '@tourmalinecore/react-tc-modal'
import { observer } from "mobx-react-lite"

export const DeleteModalContent = observer(({
  onClose,
}: {
    onClose: () => unknown,
  }) => {

  const deleteModalState = useContext(DeleteModalStateContext)
    
  const {
    deletionReason,
  } = deleteModalState
  
  return (
    <Modal
      className="delete-modal" 
      maxWidth={240}
      noPaddingBody
      content={(
        <div className="delete-modal__inner">
          <textarea 
            className="delete-modal__input"
            value={deletionReason}
            onChange={(e) => deleteModalState.setDeletionReason({
              deletionReason: e.target.value,
            })}
          />
        </div>
      )}
      onClose={onClose}
    />
  )
})