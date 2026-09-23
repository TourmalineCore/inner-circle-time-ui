import './UnwellEntryCardContent.scss'

import { getDurationLabel } from '../getDurationLabel'
import { getEntryCardDataCy } from '../../../../../../../../common/utils/getEntryCardDataCy/getEntryCardDataCy'

export function UnwellEntryCardContent({
  startTime,
  endTime,
}: {
  startTime: Date,
  endTime: Date,
}) {
  return (
    <div className="unwell-entry-card-content"
      data-cy={getEntryCardDataCy({
        entryName: `unwell-entry`,
        startTime,
        endTime,
      })}
    >
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