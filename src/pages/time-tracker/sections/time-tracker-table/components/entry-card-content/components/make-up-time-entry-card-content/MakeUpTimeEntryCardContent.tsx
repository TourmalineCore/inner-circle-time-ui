import './MakeUpTimeEntryCardContent.scss'

import { getDurationLabel } from '../getDurationLabel'
import moment from 'moment'

export function MakeUpTimeEntryCardContent({
  startTime,
  endTime,
}: {
  startTime: Date,
  endTime: Date,
}) {
  return (
    <div
      className="make-up-time-entry-card-content"
      data-cy={`make-up-time-${moment(startTime)
        .format(`dddd-HH:mm`)
        .toLowerCase()}-${moment(endTime)
        .format(`HH:mm`)}`}
    >
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