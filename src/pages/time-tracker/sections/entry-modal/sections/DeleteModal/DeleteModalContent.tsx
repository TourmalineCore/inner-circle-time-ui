import '@tourmalinecore/react-tc-modal/es/index.css'
import './DeleteModal.scss'

import { useContext } from "react"
import { DeleteModalStateContext } from "./state/DeleteModalStateContext"

import { Modal } from '@tourmalinecore/react-tc-modal'
import { observer } from "mobx-react-lite"
import clsx from 'clsx'
import { EntryStrategy } from '../../entry-types-strategy'

export const DeleteModalContent = observer(({
  entryStrategy,
  onClose,
  onSubmitDeletionReason,
}: {
  entryStrategy: EntryStrategy,
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
          <h3 className="delete-modal__title">
            {entryStrategy.titleLabels.delete}
          </h3>
          <div className="delete-modal__inner">
            <label 
              htmlFor="delete-reason"
            >
              Reason to delete: 
            </label>
            <textarea 
              className={clsx(`delete-modal__input`, {
                'error': isDeletionReasonError,
              })}
              id="delete-reason" 
              name="delete-reason" 
              value={deletionReason}
              data-cy="delete-reason"
              onChange={(e) => deleteModalState.setDeletionReason({
                deletionReason: e.target.value,
              })}
            />
          </div>
          { 
            isDeletionReasonError && (
              <span className='delete-modal__error'>
                Fill in the reason
              </span>
            )
          }
          <button
            className="delete-modal__button"
            type="button"
            onClick={onSubmitDeletionReason}
            data-cy="delete-entry-button"
          >
            {entryStrategy.buttonLabels.delete}
          </button>
        </div>
      )}
      onClose={onClose}
    />
  )
})