import './MakeUpTimeEntryCardContent.scss'

import { getDurationLabel } from '../getDurationLabel'

export function MakeUpTimeEntryCardContent({
  startTime,
  endTime,
}: {
  startTime: Date,
  endTime: Date,
}) {
  return (
    <div className="make-up-time-entry-card-content">
      <div className='make-up-time-entry-card-content__label'>
        {getDurationLabel({
          startTime,
          endTime,
        })}
      </div>
      <div>Make-up time</div>
    </div>
  )
}