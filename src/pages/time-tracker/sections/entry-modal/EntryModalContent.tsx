import '@tourmalinecore/react-tc-modal/es/index.css'
import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import "react-datepicker/dist/react-datepicker.css"
import './EntryModal.scss'

import { Modal } from '@tourmalinecore/react-tc-modal'
import { EntryModalStateContext } from './state/EntryModalStateContext'
import { ReactNode, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { TYPES } from '../../../../common/constants/entryType'

export const EntryModalContent = observer(({
  onClose,
  isExistingEntry,
  children,
}: {
  onClose: () => unknown,
  isExistingEntry?: boolean,
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
            disabled={isExistingEntry}
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
        </div>
      )}
      onClose={onClose}
    />
  )
})
