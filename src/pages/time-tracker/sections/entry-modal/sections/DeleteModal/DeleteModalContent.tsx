import '@tourmalinecore/react-tc-modal/es/index.css'

import { useContext } from "react"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"

import { Modal } from '@tourmalinecore/react-tc-modal'
import { observer } from "mobx-react-lite"
import clsx from 'clsx'

import './DeleteModal.scss'

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
    errors,
  } = deleteModalState
  
  const {
    isDeletionReasonError,
  } = errors
  
  return (
    <Modal
      maxWidth={240}
      noPaddingBody
      content={(
        <div className="delete-modal">
          <div className="delete-modal__inner">
            <textarea 
              className={clsx(`delete-modal__input`, {
                'error': isDeletionReasonError,
              })}
              value={deletionReason}
              data-cy="delete-reason"
              onChange={(e) => deleteModalState.setDeletionReason({
                deletionReason: e.target.value,
              })}
            />
          </div>
          { 
            deleteModalState.error && (
              <span className='delete-modal__error'>
                {deleteModalState.error}
              </span>
            )
          }
          <button
            className="delete-modal__button"
            type="button"
            onClick={onSubmitDeletionReason}
            data-cy="delete-entry-button"
          >
            Delete
          </button>
        </div>
      )}
      onClose={onClose}
    />
  )
})