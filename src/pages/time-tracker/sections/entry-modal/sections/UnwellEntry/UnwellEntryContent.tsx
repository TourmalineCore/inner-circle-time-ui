import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import "react-datepicker/dist/react-datepicker.css"
import './UnwellEntry.scss'

import { UnwellEntryStateContext } from './state/UnwellEntryStateContext'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import DatePicker from 'react-datepicker'
import InputMask from 'react-input-mask'
import { formatTime, parseTimeString } from '../../../../utils/date-and-time'

export const UnwellEntryContent = observer(() => {
  const unwellEntryState = useContext(UnwellEntryStateContext)

  const {
    unwellEntryData,
  } = unwellEntryState

  const {
    date,
    start,
    end,
  } = unwellEntryData

  return (
    <div className='unwell-entry'>
      <div className='unwell-entry__field'>
        <span className='unwell-entry__label'>
          Absent:
        </span>
        <div className='unwell-entry__time-spent-container'>
          <DatePicker
            data-cy="datepicker-input"
            className='unwell-entry__date-field'
            selected={date}
            dateFormat="dd.MM"
            onChange={(date) => unwellEntryState.setDate({
              date: date as Date,
            })}
            onKeyDown={(e) => e.preventDefault()}
          />
    
          <div className='unwell-entry__time-range'>
            <InputMask
              data-cy="start-time-input"
              className='unwell-entry__time-field'
              mask="99:99"
              maskChar="0"
              value={formatTime({
                time: start!,
              })}
              onChange={(e) => unwellEntryState.setStartTime({
                startTime: parseTimeString({
                  timeString: e.target.value,
                  originalDate: start!,
                }),
              })}
            />
            {`-`}
            <InputMask
              data-cy="end-time-input"
              className='unwell-entry__time-field'
              mask="99:99"
              maskChar="0"
              value={formatTime({
                time: end!,
              })}
              onChange={(e) => unwellEntryState.setEndTime({
                endTime: parseTimeString({
                  timeString: e.target.value,
                  originalDate: end!,
                }),
              })}
            />
          </div>
        </div>
      </div>
    </div>
  )
},
)