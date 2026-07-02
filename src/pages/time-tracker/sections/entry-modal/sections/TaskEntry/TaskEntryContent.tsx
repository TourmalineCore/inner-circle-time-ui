import './TaskEntry.scss'

import { TaskEntryStateContext } from './state/TaskEntryStateContext'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { parseTimeString } from '../../../../utils/date-and-time'
import clsx from 'clsx'
import { TimeRange } from '../../../../../../components/TimeRange/TimeRange'

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
          data-cy="entry-modal-project-select"
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
        <label 
          htmlFor="taskId"
          className='task-entry__label'
        >
          Task ID
        </label>
        <input 
          id="taskId"
          type="text" 
          name="taskId" 
          data-cy="entry-modal-task-id-input"
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
        <label 
          htmlFor="title"
          className='task-entry__label'
        >
          Task name
        </label>
        <input 
          id="title"
          type="text" 
          name="title" 
          data-cy="entry-modal-title-input"
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
        <label 
          htmlFor="description"
          className='task-entry__label'
        >
          What has been done?
        </label>
        <textarea 
          id="description" 
          name="description" 
          data-cy="entry-modal-description-input"
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
        <TimeRange 
          className='task-entry__time-range'
          label='Time spent'
          date={date}
          startTime={start!}
          endTime={end!}
          onChangeDate={(date) => taskEntryState.updateTaskEntryData({
            taskEntryData: {
              date,
            },
          })}
          onChangeStartTime={(e) => taskEntryState.updateTaskEntryData({
            taskEntryData: {
              start: parseTimeString({
                timeString: e.target.value,
                originalDate: start!,
              }),
            },
          })}
          onChangeEndTime={(e) => taskEntryState.updateTaskEntryData({
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
  )
})