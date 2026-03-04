import '@tourmalinecore/react-tc-modal/es/index.css'
import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import "react-datepicker/dist/react-datepicker.css"

import './EntryModal.scss'

import DeleteIcon from "../../../../assets/icons/trash.svg?react"
import CopyIcon from "../../../../assets/icons/copy.svg?react"

import { EntryModalStateContext } from './state/EntryModalStateContext'
import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { EntryModalContent } from './EntryModalContent'
import { EntryStrategy } from './entry-types-strategy'
import axios from 'axios'

export const EntryModalContainer = observer(({
  id,
  isCopy,
  onCloseEntryModal,
  entryStrategy,
  handleTriggerReloadState,
  onOpenDeleteModal,
  handleCopyEntry,
}: {
  id?: number,
  isCopy: boolean,
  onCloseEntryModal: () => unknown,
  entryStrategy: EntryStrategy,
  handleTriggerReloadState: () => unknown,
  onOpenDeleteModal: () => unknown,
  handleCopyEntry: () => unknown,
}) => {
  const entryModalState = useContext(EntryModalStateContext)
  const entryState = useContext(entryStrategy.StateContext)

  const {
    type,
  } = entryModalState

  useEffect(() => {
    entryStrategy.loadProjectsAsync({
      entryState,
    })
  }, [
    type,
  ])

  const isExistingEntry = !!id
  const isDisabledTypesSelect = !!id || isCopy

  return (
    <EntryModalContent 
      onClose={onCloseEntryModal} 
      isDisabledTypesSelect={isDisabledTypesSelect}
    >
      {entryStrategy.EntryContent}
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
            ? `Update ${entryStrategy.label}`
            : `Add ${entryStrategy.label}`
          }
        </button>
        {
          isExistingEntry && (
            <>
              <button
                data-cy="delete-button"
                className='entry-modal__delete-button'
                type='button'
                onClick={onOpenDeleteModal}
              >
                <DeleteIcon />
              </button>
              <button
                data-cy="copy-button"
                className='entry-modal__copy-button'
                type='button'
                onClick={handleCopyEntry}
              >
                <CopyIcon />
              </button>
            </>
          )
        }
      </div>
    </EntryModalContent>
  )

  async function onSubmitEntry() {
    const isValid = entryStrategy.validateOnClient({
      entryState,
    })

    if (!isValid) {
      entryModalState.setError({
        error: `Fill in all the fields`,
      })
      return
    }
    
    try {
      const requestData = entryStrategy.buildRequestData({
        entryState,
      })

      if (id) {
        await entryStrategy.updateEntryAsync({
          id,
          requestData,
        })
      }
      else {
        await entryStrategy.createEntryAsync({
          requestData,
        })
      }

      handleTriggerReloadState()

      entryState.resetError()
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          entryModalState.setError({
            error: error.response.data.detail,
          })
        }
      }
    }
    finally {
      entryStrategy.finally({
        entryState,
      })
    }
  }
})
