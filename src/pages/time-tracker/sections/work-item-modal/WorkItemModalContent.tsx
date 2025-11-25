import '@tourmalinecore/react-tc-modal/es/index.css'
import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import "react-datepicker/dist/react-datepicker.css"
import './WorkItemModalContent.scss'

import { Modal } from '@tourmalinecore/react-tc-modal'
import { WorkItemModalStateContext } from './state/WorkItemModalStateContext'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import InputMask from 'react-input-mask'

export const WorkItemModalContent = observer(({
  onClose,
  onAddWorkItem,
}: {
  onClose: () => unknown,
  onAddWorkItem: () => unknown,
}) => {
  const workItemModalState = useContext(WorkItemModalStateContext)

  const {
    workItemModalData, 
  } = workItemModalState

  return (
    <Modal
      className="work-item-modal" 
      maxWidth={240}
      noPaddingBody
      content={(
        <div className='work-item-modal__inner'>
          <div className='work-item-modal__field'>
            <span className='work-item-modal__label'>
              Task name
            </span> 
            <input 
              type="text" 
              name="title" 
              value={workItemModalData.title} 
              onChange={(e) => workItemModalState.setTitle({
                title: e.target.value,
              })} 
            />
          </div>

          <div className='work-item-modal__field'>
            <span className='work-item-modal__label'>
              Task id
            </span> 
            <input 
              type="text" 
              name="taskId" 
              value={workItemModalData.taskId} 
              onChange={(e) => workItemModalState.setTaskId({
                taskId: e.target.value,
              })} 
            />
          </div>

          <div className='work-item-modal__field'>
            <span className='work-item-modal__label'>
              Task completion time
            </span>
            <div className='work-item-modal__completion-time-container'>
              <DatePicker
                className='work-item-modal__date-field'
                selected={workItemModalData.date}
                dateFormat="dd.MM"
                onChange={(date) => workItemModalState.setDate({
                  date: date as Date,
                })}
              />

              <div className='work-item-modal__time-range'>
                <InputMask
                  className='work-item-modal__time-field'
                  mask="99:99"
                  maskChar="0"
                  value={formatTime({
                    time: workItemModalData.startTime,
                  })}
                  onChange={(e) => workItemModalState.setStartTime({
                    startTime: parseTimeString({
                      timeString: e.target.value,
                      originalDate: workItemModalData.startTime,
                    }),
                  })}
                />
                {`-`}
                <InputMask
                  className='work-item-modal__time-field'
                  mask="99:99"
                  maskChar="0"
                  value={formatTime({
                    time: workItemModalData.endTime,
                  })}
                  onChange={(e) => workItemModalState.setEndTime({
                    endTime: parseTimeString({
                      timeString: e.target.value,
                      originalDate: workItemModalData.endTime,
                    }),
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      onApply={onAddWorkItem}
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