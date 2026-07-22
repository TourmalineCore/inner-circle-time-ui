import "./AwayWithMakeUpTimeEntryCardContent.scss"

import { getDurationLabel } from "../getDurationLabel"

export function AwayWithMakeUpTimeEntryCardContent({
  startTime,
  endTime,
}: {
  startTime: Date,
  endTime: Date,
}) {
  return (
    <div className="away-with-make-up-time-entry-card-content">
      <div className='away-with-make-up-time-entry-content__label'>
        {getDurationLabel({
          startTime,
          endTime,
        })}
      </div>
      <div>Away with make-up time</div>
    </div>
  )
}