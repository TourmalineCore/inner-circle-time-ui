import './SickLeaveEntryContent.scss'

import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { SickLeaveEntryStateContext } from './state/SickLeaveEntryStateContext'
import { DayMonthPicker } from '../../../../../../components/day-month-picker/DayMonthPicker'

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
            <DayMonthPicker
              className='sick-leave-entry__datepicker'
              selected={period.startDate}
              onChange={(date) => sickLeaveEntryState.updateSickLeaveEntry({
                sickLeaveEntry: {
                  period: {
                    endDate: period.endDate,
                    startDate: date!,
                  },
                },
              })}
            />
          </div>
          {`-`}
          <div data-cy='end-date-datepicker'>
            <DayMonthPicker
              className="sick-leave-entry__datepicker"
              selected={period.endDate}
              onChange={(date) => sickLeaveEntryState.updateSickLeaveEntry({
                sickLeaveEntry: {
                  period: {
                    startDate: period.startDate,
                    endDate: date!,
                  },
                },
              })}
            />
          </div>
        </div>
      </div>
    </div>
  )
})