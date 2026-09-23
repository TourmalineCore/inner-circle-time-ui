import "./AwayWithMakeUpTimeEntryCardContent.scss"

import { getDurationLabel } from "../getDurationLabel"
import { getEntryCardDataCy } from "../../../../../../../../common/utils/getEntryCardDataCy/getEntryCardDataCy"

export function AwayWithMakeUpTimeEntryCardContent({
  startTime,
  endTime,
}: {
  startTime: Date,
  endTime: Date,
}) {
  return (
    <div
      className="away-with-make-up-time-entry-card-content"
      data-cy={getEntryCardDataCy({
        entryName: `away-with-make-up-time-entry`,
        startTime,
        endTime,
      })}
    >
      <div className='away-with-make-up-time-entry-card-content__label'>
        {getDurationLabel({
          startTime,
          endTime,
        })}
      </div>
      <div>Away with make-up time</div>
    </div>
  )
}