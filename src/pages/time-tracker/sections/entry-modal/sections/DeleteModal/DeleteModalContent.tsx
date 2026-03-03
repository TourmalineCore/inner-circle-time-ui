import '@tourmalinecore/react-tc-modal/es/index.css'

import { useContext } from "react"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"

import { Modal } from '@tourmalinecore/react-tc-modal'
import { observer } from "mobx-react-lite"

export const DeleteModalContent = observer(({
  onClose,
  onSubmitDeletionReason,
}: {
  onClose: () => unknown,
  onSubmitDeletionReason: () => unknown,
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
        <>
          <div className="delete-modal__inner">
            <textarea 
              className="delete-modal__input"
              value={deletionReason}
              onChange={(e) => deleteModalState.setDeletionReason({
                deletionReason: e.target.value,
              })}
            />
          </div>
          <button
            className="delete-modal__button"
            type="button"
            onClick={onSubmitDeletionReason}
            data-cy="delete-entry-button"
          >
            Delete
          </button>
        </>
      )}
      onClose={onClose}
    />
  )
})