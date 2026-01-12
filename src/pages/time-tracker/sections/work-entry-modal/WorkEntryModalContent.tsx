import '@tourmalinecore/react-tc-modal/es/index.css'
import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import "react-datepicker/dist/react-datepicker.css"
import './WorkEntryModalContent.scss'

import { Modal } from '@tourmalinecore/react-tc-modal'
import { WorkEntryModalStateContext } from './state/WorkEntryModalStateContext'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import DatePicker from 'react-datepicker'
import InputMask from 'react-input-mask'
import { formatTime, parseTimeString } from '../../utils/date-and-time'

export const WorkEntryModalContent = observer(({
  onClose,
  onSubmitWorkEntryAsync,
}: {
  onClose: () => unknown,
  onSubmitWorkEntryAsync: () => unknown,
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
              className={`${workEntryModalState.errors.isTitleError
                ? `error` 
                : ``}`}
            />
          </div>

          <div className='work-entry-modal__field'>
            <span className='work-entry-modal__label'>
              Project
            </span> 
            <select 
              name='project'
              data-cy="project-select"
              value={workEntryModalData.projectId}
              onChange={(e) => workEntryModalState.setProjectId({
                projectId: Number(e.target.value),
              })}
            >
              {workEntryModalState.projects.map(({
                id, name,
              }) => (
                <option
                  data-cy="projects-select-option"
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              ))}
            </select>
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
              className={`${workEntryModalState.errors.isTaskIdError
                ? `error` 
                : ``}`}
            />
          </div>

          <div className='work-entry-modal__field'>
            <span className='work-entry-modal__label'>
              Description
            </span> 
            <textarea 
              name="description" 
              data-cy="description-input"
              value={workEntryModalData.description} 
              onChange={(e) => workEntryModalState.setDescription({
                description: e.target.value,
              })}
              className={`work-entry-modal__description ${workEntryModalState.errors.isDescriptionError
                ? `error` 
                : ``}`}
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
                onKeyDown={(e) => e.preventDefault()}
              />

              <div className='work-entry-modal__time-range'>
                <InputMask
                  data-cy="start-time-input"
                  className='work-entry-modal__time-field'
                  mask="99:99"
                  maskChar="0"
                  value={formatTime({
                    time: workEntryModalData.start!,
                  })}
                  onChange={(e) => workEntryModalState.setStartTime({
                    startTime: parseTimeString({
                      timeString: e.target.value,
                      originalDate: workEntryModalData.start!,
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
                    time: workEntryModalData.end!,
                  })}
                  onChange={(e) => workEntryModalState.setEndTime({
                    endTime: parseTimeString({
                      timeString: e.target.value,
                      originalDate: workEntryModalData.end!,
                    }),
                  })}
                />
              </div>
            </div>
          </div>

          { 
            workEntryModalState.error && (
              <span className='work-entry-modal__error'>
                {workEntryModalState.error}
              </span>
            )
          }
        </div>
      )}
      isButtonsDisabled={workEntryModalState.isSaving}
      onApply={onSubmitWorkEntryAsync}
      applyText={workEntryModalData.id
        ? `Update Task`
        : `Add Task`
      }
      showApply={true}
      onClose={onClose}
    />
  )
})