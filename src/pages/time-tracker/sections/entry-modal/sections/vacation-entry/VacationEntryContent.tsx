import './VacationEntryContent.scss'

import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { VacationEntryStateContext } from './state/VacationStateContext'
import DatePicker from 'react-datepicker'

export const VacationEntryContent = observer(() => {
  const vacationEntryState = useContext(VacationEntryStateContext)

  const {
    vacationEntry,
  } = vacationEntryState

  const {
    period,
    isUnpaid,
  } = vacationEntry

  return (
    <div className='vacation-entry'>
      <div className='vacation-entry__field'>
        <div className='vacation-entry__period-container'>
          <div data-cy='start-date-datepicker'>
            <DatePicker
              className='vacation-entry__datepicker'
              selected={period.startDate}
              dateFormat="dd.MM"
              onChange={(date) => vacationEntryState.updateVacationEntry({
                vacationEntry: {
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
              className="vacation-entry__datepicker"
              selected={period.endDate}
              dateFormat="dd.MM"
              onChange={(date) => vacationEntryState.updateVacationEntry({
                vacationEntry: {
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
      <div className='vacation-entry__checkbox'>
        <input
          type='checkbox'
          id="unpaid"
          checked={isUnpaid}
          onChange={(value) => vacationEntryState.updateVacationEntry({
            vacationEntry: {
              isUnpaid: value.target.checked,
            },
          })}/>
        <label htmlFor="unpaid">Unpaid</label>
      </div>
    </div>
  )
})