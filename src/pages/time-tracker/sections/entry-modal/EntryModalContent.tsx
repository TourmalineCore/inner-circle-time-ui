import '@tourmalinecore/react-tc-modal/es/index.css'
import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import "react-datepicker/dist/react-datepicker.css"
import './EntryModal.scss'

import { Modal } from '@tourmalinecore/react-tc-modal'
import { EntryModalStateContext } from './state/EntryModalStateContext'
import { ReactNode, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { TYPES } from '../../../../common/constants/entryType'
import DeleteIcon from "../../../../assets/icons/trash.svg?react"
import CopyIcon from "../../../../assets/icons/copy.svg?react"

export const EntryModalContent = observer(({
  isExistingEntry,
  isDisabledTypesSelect,
  onSubmitEntry,
  buttonLabel,
  openDeleteModal,
  children,
}: {
  isExistingEntry: boolean,
  isDisabledTypesSelect: boolean,
  onSubmitEntry: () => unknown,
  buttonLabel: string,
  openDeleteModal: () => unknown,
  children?: ReactNode,
}) => {
  const entryModalState = useContext(EntryModalStateContext)

  const {
    type,
  } = entryModalState

  return (
    <Modal
      className="entry-modal" 
      maxWidth={240}
      noPaddingBody
      content={(
        <div className="entry-modal__inner">
          <select 
            className="entry-modal__input"
            name='type'
            data-cy="type-select"
            value={type}
            disabled={isDisabledTypesSelect}
            onChange={(e) => entryModalState.setType({
              type: Number(e.target.value),
            })}
          >
            {TYPES.map(({
              label,
              value,
            }) => (
              <option
                data-cy="projects-select-option"
                key={value}
                value={value}
              >
                {label}
              </option>
            ))}
          </select>
          {children}
          { 
            entryModalState.error && (
              <span className='entry-modal__error'>
                {entryModalState.error}
              </span>
            )
          }
          <div className="entry-modal__buttons">
            <button
              data-cy="submit-button"
              className='entry-modal__submit-button'
              type='submit'
              onClick={() => onSubmitEntry()}
            >
              {isExistingEntry
                ? `Update ${buttonLabel}`
                : `Add ${buttonLabel}`
              }
            </button>
            {
              isExistingEntry && (
                <>
                  <button
                    data-cy="delete-button"
                    className='entry-modal__delete-button'
                    type='button'
                    onClick={openDeleteModal}
                  >
                    <DeleteIcon />
                  </button>
                  <button
                    data-cy="copy-button"
                    className='entry-modal__copy-button'
                    type='button'
                    onClick={() => {
                      entryModalState.copyCurrentEntry()
                      entryModalState.closeEntryModal()
                    }}
                  >
                    <CopyIcon />
                  </button>
                </>
              )
            }
          </div>
        </div>
      )}
      onClose={() => {
        entryModalState.closeEntryModal()
        entryModalState.resetCurrentEntry()
      }}
    />
  )
})
