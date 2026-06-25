import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import "react-datepicker/dist/react-datepicker.css"
import './AwayWithMakeUpTimeEntry.scss'

import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import DatePicker from 'react-datepicker'
import InputMask from 'react-input-mask'
import { formatTime, parseTimeString } from '../../../../utils/date-and-time'
import { AwayWithMakeUpTimeEntryStateContext } from './state/AwayWithMakeUpTimeEntryStateContext'
import IconCross from '../../../../../../assets/icons/cross.svg?react'
import clsx from 'clsx'

export const AwayWithMakeUpTimeEntryContent = observer(() => {
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
        <span className='task-entry__label'>
          Away reason
        </span> 
        <textarea 
          name="description" 
          data-cy="entry-modal-description-input"
          value={description} 
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
        {/* <span className='away-with-make-up-time-entry__label'>
          Absent
        </span> */}
        <div className='away-with-make-up-time-entry__time-spent-container'>
          <DatePicker
            data-cy="datepicker-input"
            className='away-with-make-up-time-entry__date-field'
            selected={date}
            dateFormat="dd.MM"
            onChange={(date) => awayWithMakeUpTimeEntryState.updateAwayWithMakeUpTimeEntryData({
              awayWithMakeUpTimeEntryData: {
                date,
              },
            })}
            onKeyDown={(e) => e.preventDefault()}
          />
    
          <div className='away-with-make-up-time-entry__time-range'>
            <InputMask
              data-cy="entry-modal-start-time-input"
              className='away-with-make-up-time-entry__time-field'
              mask="99:99"
              maskChar="0"
              value={formatTime({
                time: start!,
              })}
              onChange={(e) => awayWithMakeUpTimeEntryState.updateAwayWithMakeUpTimeEntryData({
                awayWithMakeUpTimeEntryData: {
                  start: parseTimeString({
                    timeString: e.target.value,
                    originalDate: start!,
                  }),
                },
              })}
            />
            {`-`}
            <InputMask
              data-cy="entry-modal-end-time-input"
              className='away-with-make-up-time-entry__time-field'
              mask="99:99"
              maskChar="0"
              value={formatTime({
                time: end!,
              })}
              onChange={(e) => awayWithMakeUpTimeEntryState.updateAwayWithMakeUpTimeEntryData({
                awayWithMakeUpTimeEntryData: {
                  end: parseTimeString({
                    timeString: e.target.value,
                    originalDate: end!,
                  }),
                },
              })}
            />
          </div>
        </div>
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
              data-cy={`away-with-make-up-time-entry__make-up`}
              key={id}
            >
              <div className='away-with-make-up-time-entry__time-spent-container'>
                <DatePicker
                  data-cy={`make-up-datepicker-input`}
                  className={clsx(`away-with-make-up-time-entry__date-field`, {
                    'error': awayWithMakeUpTimeEntryState.isMakeUpTimeDateError({
                      makeUpTimeId: id,
                    }),
                  })}
                  selected={date}
                  dateFormat="dd.MM"
                  onChange={(date) => awayWithMakeUpTimeEntryState.updateMakeUpTime({
                    makeUpTime: {
                      id,  
                      date: date!,
                    },
                  })}
                  onKeyDown={(e) => e.preventDefault()}
                />
    
                <div className='away-with-make-up-time-entry__time-range'>
                  <InputMask
                    data-cy={`entry-modal-make-up-start-time-input`}
                    className='away-with-make-up-time-entry__time-field'
                    mask="99:99"
                    maskChar="0"
                    value={formatTime({
                      time: startTime!,
                    })
                    }
                    onChange={(e) => awayWithMakeUpTimeEntryState.updateMakeUpTime({
                      makeUpTime: {
                        id,
                        startTime: parseTimeString({
                          timeString: e.target.value,
                          originalDate: startTime!,
                        }),
                      },
                    })}
                  />
                  {`-`}
                  <InputMask
                    data-cy={`entry-modal-make-up-end-time-input`}
                    className='away-with-make-up-time-entry__time-field'
                    mask="99:99"
                    maskChar="0"
                    value={formatTime({
                      time: endTime!,
                    })}
                    onChange={(e) => awayWithMakeUpTimeEntryState.updateMakeUpTime({
                      makeUpTime: {
                        id,
                        endTime: parseTimeString({
                          timeString: e.target.value,
                          originalDate: endTime!,
                        }),
                      },
                    })}
                  />
                </div>
                {
                  makeUpTimeList.length > 1 && (
                    <span 
                      className='away-with-make-up-time-entry__remove-make-up-button'
                      data-cy={`remove-make-up-button`}
                      onClick={() => awayWithMakeUpTimeEntryState.removeMakeUpTime({
                        makeUpTimeId: id,
                      })}
                    >
                      <IconCross />
                    </span>
                  )
                }
              </div>
            </li>
          ))}
        </ul>
        <div
          className='away-with-make-up-time-entry__add-make-up-button'
          data-cy={`add-make-up-button`}
          role='button'
          onClick={() => awayWithMakeUpTimeEntryState.addMakeUpTime()}
        >
           + Add more make-up time
        </div>
      </div>
    </div>
  )
})