import '@tourmalinecore/react-tc-modal/es/index.css'
import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import "react-datepicker/dist/react-datepicker.css"
import './WorkEntryModalContent.scss'

import { Modal } from '@tourmalinecore/react-tc-modal'
import { WorkEntryModalStateContext } from './state/WorkEntryModalStateContext'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import InputMask from 'react-input-mask'

export const WorkEntryModalContent = observer(({
  onClose,
  onAddWorkEntry,
}: {
  onClose: () => unknown,
  onAddWorkEntry: () => unknown,
}) => {
  const workEntryModalState = useContext(WorkEntryModalStateContext)

  const {
    workEntryModalData, 
  } = workEntryModalState

  return (
    <Modal
      className="work-entry-modal" 
      maxWidth={240}
      noPaddingBody
      content={(
        <div className='work-entry-modal__inner'>
          <div className='work-entry-modal__field'>
            <span className='work-entry-modal__label'>
              Task name
            </span> 
            <input 
              type="text" 
              name="title" 
              data-cy="title-input"
              value={workEntryModalData.title} 
              onChange={(e) => workEntryModalState.setTitle({
                title: e.target.value,
              })} 
            />
          </div>

          <div className='work-entry-modal__field'>
            <span className='work-entry-modal__label'>
              Task id
            </span> 
            <input 
              type="text" 
              name="taskId" 
              data-cy="task-id-input"
              value={workEntryModalData.taskId} 
              onChange={(e) => workEntryModalState.setTaskId({
                taskId: e.target.value,
              })} 
            />
          </div>

          <div className='work-entry-modal__field'>
            <span className='work-entry-modal__label'>
              Task completion time
            </span>
            <div className='work-entry-modal__completion-time-container'>
              <DatePicker
                data-cy="datepicker-input"
                className='work-entry-modal__date-field'
                selected={workEntryModalData.date}
                dateFormat="dd.MM"
                onChange={(date) => workEntryModalState.setDate({
                  date: date as Date,
                })}
              />

              <div className='work-entry-modal__time-range'>
                <InputMask
                  data-cy="start-time-input"
                  className='work-entry-modal__time-field'
                  mask="99:99"
                  maskChar="0"
                  value={formatTime({
                    time: workEntryModalData.start,
                  })}
                  onChange={(e) => workEntryModalState.setStartTime({
                    startTime: parseTimeString({
                      timeString: e.target.value,
                      originalDate: workEntryModalData.start,
                    }),
                  })}
                />
                {`-`}
                <InputMask
                  data-cy="end-time-input"
                  className='work-entry-modal__time-field'
                  mask="99:99"
                  maskChar="0"
                  value={formatTime({
                    time: workEntryModalData.end,
                  })}
                  onChange={(e) => workEntryModalState.setEndTime({
                    endTime: parseTimeString({
                      timeString: e.target.value,
                      originalDate: workEntryModalData.end,
                    }),
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      onApply={onAddWorkEntry}
      applyText="Add Task"
      showApply={true}
      onClose={onClose}
    />
  )

  function formatTime({
    time,
  }: {
    time: Date,
  }) {
    return moment(time)
      .format(`HH:mm`)
  }

  function parseTimeString({
    timeString,
    originalDate,
  }: {
    timeString: string,
    originalDate: Date,
  }) {  
    const originalMoment = moment(originalDate)
    const [
      hours,
      minutes,
    ] = timeString.split(`:`)
      .map(Number)
  
    return originalMoment
      .set({
        hour: isNaN(hours) ? originalMoment.hour() : hours,
        minute: isNaN(minutes) ? originalMoment.minute() : minutes,
      })
      .toDate()
  }
})