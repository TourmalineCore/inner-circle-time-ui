import "./AwayWithMakeUpTimeEntryCardContent.scss"

import { getDurationLabel } from "../getDurationLabel"
import moment from "moment"

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
      data-cy={`away-with-make-up-time-${moment(startTime)
        .format(`dddd-HH:mm`)
        .toLowerCase()}-${moment(endTime)
        .format(`HH:mm`)}`}
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