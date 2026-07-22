import './SickLeaveEntryContent.scss'

import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { SickLeaveEntryStateContext } from './state/SickLeaveStateContext'
import DatePicker from 'react-datepicker'

export const SickLeaveEntryContent = observer(() => {
  const sickLeaveEntryState = useContext(SickLeaveEntryStateContext)

  const {
    sickLeaveEntry,
  } = sickLeaveEntryState

  const {
    period,
  } = sickLeaveEntry

  return (
    <div className='sick-leave-entry'>
      <div className='sick-leave-entry__field'>
        <div className='sick-leave-entry__period-container'>
          <div data-cy='start-date-datepicker'>
            <DatePicker
              className='sick-leave-entry__datepicker'
              selected={period.startDate}
              dateFormat="dd.MM"
              onChange={(date) => sickLeaveEntryState.updateSickLeaveEntry({
                sickLeaveEntry: {
                  period: {
                    endDate: period.endDate,
                    startDate: date!,
                  },
                },
              })}
              onKeyDown={(e) => e.preventDefault()}
            />
          </div>
          {`-`}
          <div data-cy='end-date-datepicker'>
            <DatePicker
              className="sick-leave-entry__datepicker"
              selected={period.endDate}
              dateFormat="dd.MM"
              onChange={(date) => sickLeaveEntryState.updateSickLeaveEntry({
                sickLeaveEntry: {
                  period: {
                    startDate: period.startDate,
                    endDate: date!,
                  },
                },
              })}
              onKeyDown={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>
    </div>
  )
})