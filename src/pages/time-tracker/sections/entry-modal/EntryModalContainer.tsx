import '@tourmalinecore/react-tc-modal/es/index.css'
import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import "react-datepicker/dist/react-datepicker.css"
import './EntryModal.scss'

import { EntryModalStateContext } from './state/EntryModalStateContext'
import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { EntryModalContent } from './EntryModalContent'
import { EntryStrategy } from './entry-types-strategy'
import axios from 'axios'

export const EntryModalContainer = observer(({
  onClose,
  entryStrategy,
  id,
  handleTriggerReloadState,
}: {
  onClose: () => unknown,
  entryStrategy: EntryStrategy,
  id?: number,
  handleTriggerReloadState: () => unknown,
}) => {
  const entryModalState = useContext(EntryModalStateContext)
  const entryState = useContext(entryStrategy.StateContext)

  const {
    type,
  } = entryModalState

  useEffect(() => {
    // reset error when type changes
    entryModalState.resetError()

    entryStrategy.loadProjectsAsync({
      entryState,
    })
  }, [
    type,
  ])

  const isExistingEntry = !!id

  return (
    <EntryModalContent 
      onClose={onClose} 
      isExistingEntry={isExistingEntry}
    >
      {entryStrategy.EntryContent}
      { 
        entryModalState.error && (
          <span className='entry-modal__error'>
            {entryModalState.error}
          </span>
        )
      }
      <button
        data-cy="submit-button"
        className='entry-modal__submit'
        type='submit'
        onClick={() => onSubmitEntry()}
      >
        {isExistingEntry
          ? entryStrategy.buttonLabels.update
          : entryStrategy.buttonLabels.create
        }
      </button>
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
