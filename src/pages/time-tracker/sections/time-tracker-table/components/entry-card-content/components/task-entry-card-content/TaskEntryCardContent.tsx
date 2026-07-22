import './TaskEntryCardContent.scss'

import { getDurationLabel } from '../getDurationLabel'

export function TaskEntryCardContent({
  title,
  taskId,
  projectName,
  startTime,
  endTime,
}: {
  title: string,
  taskId: string,
  projectName: string,
  startTime: Date,
  endTime: Date,
}) {
  return (
    <div className="task-entry-card-content">
      <div className='task-entry-card-content__label'>
        {getDurationLabel({
          startTime,
          endTime,
        })}
      </div>
      <div>{projectName}</div>
      <div>{taskId} {title}</div>
    </div>
  )
}