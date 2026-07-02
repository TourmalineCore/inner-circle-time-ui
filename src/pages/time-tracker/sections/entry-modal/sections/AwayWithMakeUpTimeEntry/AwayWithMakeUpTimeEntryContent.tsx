import './AwayWithMakeUpTimeEntry.scss'

import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { parseTimeString } from '../../../../utils/date-and-time'
import { AwayWithMakeUpTimeEntryStateContext } from './state/AwayWithMakeUpTimeEntryStateContext'
import IconCross from '../../../../../../assets/icons/cross.svg?react'
import clsx from 'clsx'
import { TimeRange } from '../../../../../../components/TimeRange/TimeRange'

export const AwayWithMakeUpTimeEntryContent = observer(({
  isRelatedEntryFieldsDisabled = false,
}: {
  isRelatedEntryFieldsDisabled?: boolean,
}) => {
  const awayWithMakeUpTimeEntryState = useContext(AwayWithMakeUpTimeEntryStateContext)

  const {
    awayWithMakeUpTimeEntryData,
    isDescriptionError,
  } = awayWithMakeUpTimeEntryState

  const {
    date,
    start,
    end,
    description,
    makeUpTimeList,
  } = awayWithMakeUpTimeEntryData

  return (
    <div className='away-with-make-up-time-entry'>
      <div className='away-with-make-up-time-entry__field'>
        <label 
          htmlFor="description"
          className='away-with-make-up-time-entry__label'
        >
          Reason
        </label> 
        <textarea 
          id="description"
          name="description" 
          data-cy="entry-modal-description-input"
          value={description} 
          disabled={isRelatedEntryFieldsDisabled}
          onChange={(e) => awayWithMakeUpTimeEntryState.updateAwayWithMakeUpTimeEntryData({
            awayWithMakeUpTimeEntryData: {
              description: e.target.value,
            },
          })}
          className={clsx(`away-with-make-up-time-entry__description`, {
            'error': isDescriptionError,
          })}
        />
      </div>
      <div className='away-with-make-up-time-entry__field'>
        <TimeRange 
          className='away-with-make-up-time-entry__time-range'
          label='Absent'
          date={date}
          startTime={start!}
          endTime={end!}
          isDisabled={isRelatedEntryFieldsDisabled}
          onChangeDate={(date) => awayWithMakeUpTimeEntryState.updateAwayWithMakeUpTimeEntryData({
            awayWithMakeUpTimeEntryData: {
              date,
            },
          })}
          onChangeStartTime={(e) => awayWithMakeUpTimeEntryState.updateAwayWithMakeUpTimeEntryData({
            awayWithMakeUpTimeEntryData: {
              start: parseTimeString({
                timeString: e.target.value,
                originalDate: start!,
              }),
            },
          })}
          onChangeEndTime={(e) => awayWithMakeUpTimeEntryState.updateAwayWithMakeUpTimeEntryData({
            awayWithMakeUpTimeEntryData: {
              end: parseTimeString({
                timeString: e.target.value,
                originalDate: end!,
              }),
            },
          })}
          dataCy={{
            datepicker: `away-datepicker`,
          }}
        />
      </div>
      <div className='away-with-make-up-time-entry__field'>
        <span className='away-with-make-up-time-entry__label'>
          Make-up time
        </span>
        <ul>
          {makeUpTimeList.map(({
            id,
            date,
            startTime,
            endTime,
          }) => (
            <li 
              key={id}
              className='away-with-make-up-time-entry__make-up'
              data-cy={`make-up-time`}
            >
              <TimeRange
                className='away-with-make-up-time-entry__time-range' 
                date={date}
                startTime={startTime!}
                endTime={endTime!}
                isDateError={awayWithMakeUpTimeEntryState.isMakeUpTimeDateError({
                  makeUpTimeId: id,
                })}
                onChangeDate={(date) => awayWithMakeUpTimeEntryState.updateMakeUpTime({
                  makeUpTime: {
                    id,  
                    date: date!,
                  },
                })}
                onChangeStartTime={(e) => awayWithMakeUpTimeEntryState.updateMakeUpTime({
                  makeUpTime: {
                    id,
                    startTime: parseTimeString({
                      timeString: e.target.value,
                      originalDate: startTime!,
                    }),
                  },
                })}
                onChangeEndTime={(e) => awayWithMakeUpTimeEntryState.updateMakeUpTime({
                  makeUpTime: {
                    id,
                    endTime: parseTimeString({
                      timeString: e.target.value,
                      originalDate: endTime!,
                    }),
                  },
                })}
                dataCy={{
                  datepicker: `make-up-time-datepicker`,
                  startTime: `make-up-time-start-time-input`,
                  endTime: `make-up-time-end-time-input`,
                }}
              />
              {
                makeUpTimeList.length > 1 && (
                  <span 
                    className='away-with-make-up-time-entry__remove-make-up-time-button'
                    data-cy={`remove-make-up-time-button`}
                    onClick={() => awayWithMakeUpTimeEntryState.removeMakeUpTime({
                      makeUpTimeId: id,
                    })}
                  >
                    <IconCross />
                  </span>
                )
              }
            </li>
          ))}
        </ul>
        <div
          role='button'
          className='away-with-make-up-time-entry__add-make-up-time-button'
          data-cy={`add-make-up-time-button`}
          onClick={() => awayWithMakeUpTimeEntryState.addMakeUpTime()}
        >
           + Add more make-up time
        </div>
      </div>
    </div>
  )
})