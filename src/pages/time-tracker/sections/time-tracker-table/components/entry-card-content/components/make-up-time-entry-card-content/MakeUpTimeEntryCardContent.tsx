import './MakeUpTimeEntryCardContent.scss'

import { getDurationLabel } from '../getDurationLabel'
import { getEntryCardDataCy } from '../../../../../../../../common/utils/getEntryCardDataCy/getEntryCardDataCy'

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
      data-cy={getEntryCardDataCy({
        entryName: `make-up-time`,
        startTime,
        endTime,
      })}
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