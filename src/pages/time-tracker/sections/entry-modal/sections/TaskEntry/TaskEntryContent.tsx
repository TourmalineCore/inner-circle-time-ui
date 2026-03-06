import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import "react-datepicker/dist/react-datepicker.css"
import './TaskEntry.scss'

import { TaskEntryStateContext } from './state/TaskEntryStateContext'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import DatePicker from 'react-datepicker'
import InputMask from 'react-input-mask'
import { formatTime, parseTimeString } from '../../../../utils/date-and-time'
import clsx from 'clsx'

export const TaskEntryContent = observer(() => {
  const taskEntryState = useContext(TaskEntryStateContext)

  const {
    taskEntryData,
    errors,
  } = taskEntryState

  const {
    isTitleError,
    isTaskIdError,
    isDescriptionError,
    isProjectIdError,
  } = errors
  
  const {
    title,
    projectId,
    taskId,
    description,
    date,
    start,
    end,
  } = taskEntryData

  return (
    <div className='task-entry'>
      <div className='task-entry__field'>
        <span className='task-entry__label'>
          Project
        </span> 
        <select
          className={clsx({
            'error': isProjectIdError,
          })} 
          name='project'
          data-cy="project-select"
          value={projectId}
          onChange={(e) => taskEntryState.updateTaskEntryData({
            taskEntryData: {
              projectId: Number(e.target.value),
            },
          })}
        >
          <option
            className='task-entry__empty-project-option'
            value=""
          >
            Choose project
          </option>
          {taskEntryState.projects.map(({
            id,
            name,
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
    
      <div className='task-entry__field'>
        <span className='task-entry__label'>
          Task ID
        </span> 
        <input 
          type="text" 
          name="taskId" 
          data-cy="task-id-input"
          value={taskId} 
          onChange={(e) => taskEntryState.updateTaskEntryData({
            taskEntryData: {
              taskId: e.target.value,
            },
          })}
          className={clsx({
            'error': isTaskIdError,
          })}
        />
      </div>
      
      <div className='task-entry__field'>
        <span className='task-entry__label'>
          Task name
        </span> 
        <input 
          type="text" 
          name="title" 
          data-cy="title-input"
          value={title} 
          onChange={(e) => taskEntryState.updateTaskEntryData({
            taskEntryData: {
              title: e.target.value,
            },
          })}
          className={clsx({
            'error': isTitleError,
          })}
        />
      </div>
    
      <div className='task-entry__field'>
        <span className='task-entry__label'>
          What has been done?
        </span> 
        <textarea 
          name="description" 
          data-cy="description-input"
          value={description} 
          onChange={(e) => taskEntryState.updateTaskEntryData({
            taskEntryData: {
              description: e.target.value,
            },
          })}
          className={clsx(`task-entry__description`, {
            'error': isDescriptionError,
          })}
        />
      </div>
    
      <div className='task-entry__field'>
        <span className='task-entry__label'>
          Time spent
        </span>
        <div className='task-entry__completion-time-container'>
          <DatePicker
            data-cy="datepicker-input"
            className='task-entry__date-field'
            selected={date}
            dateFormat="dd.MM"
            onChange={(date) => taskEntryState.updateTaskEntryData({
              taskEntryData: {
                date,
              },
            })}
            onKeyDown={(e) => e.preventDefault()}
          />
    
          <div className='task-entry__time-range'>
            <InputMask
              data-cy="start-time-input"
              className='task-entry__time-field'
              mask="99:99"
              maskChar="0"
              value={formatTime({
                time: start!,
              })}
              onChange={(e) => taskEntryState.updateTaskEntryData({
                taskEntryData: {
                  start: parseTimeString({
                    timeString: e.target.value,
                    originalDate: start!,
                  }),
                },
              })}
            />
            {`-`}
            <InputMask
              data-cy="end-time-input"
              className='task-entry__time-field'
              mask="99:99"
              maskChar="0"
              value={formatTime({
                time: end!,
              })}
              onChange={(e) => taskEntryState.updateTaskEntryData({
                taskEntryData: {
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
    </div>
  )
})