import './UnwellEntryCardContent.scss'

import { getDurationLabel } from '../getDurationLabel'

export function UnwellEntryCardContent({
  startTime,
  endTime,
}: {
  startTime: Date,
  endTime: Date,
}) {
  return (
    <div className="unwell-entry-card-content">
      <div className='unwell-entry-card-content__label'>
        {getDurationLabel({
          startTime,
          endTime,
        })}
      </div>
      <div>Feeling unwell</div>
    </div>
  )
}