import './DayHeader.scss'
import moment from 'moment'

import { EntryType } from '../../../../../../common/constants/entryType'
import { TrackedEntry } from '../../../../types'
import { findEntryForDate } from '../../../../../../common/utils/find-entry-for-date/findEntryForDate'

const BUTTON_TEXT: Record<number, string> = {
  [EntryType.SICK_LEAVE]: `Sick leave`,
}

export function DayHeader({
  date,
  label,
  backgroundEntries,
  openEntry,
  createNewAllDayEntry,
  showLabel = true,
}: {
  date: Date,
  label: string,
  backgroundEntries: TrackedEntry[],
  openEntry: ({
    entry,
  }: {
    entry: TrackedEntry,
  }) => unknown,
  createNewAllDayEntry: ({
    start,
    end,
  }: {
    start: Date,
    end: Date,
  }) => unknown,
  showLabel?: boolean,
}) {
  const foundEntry = findEntryForDate({
    entries: backgroundEntries,
    date, 
  })

  const buttonText = foundEntry
    ? BUTTON_TEXT[foundEntry.type!]
    :`Add an all-day event`

  const weekDay = moment(date)
    .format(`dddd`)
    .toLowerCase() 

  const handleEntryButtonClick = () => {
    if (foundEntry) {
      openEntry({
        entry: foundEntry,
      })
    }
    else {
      createNewAllDayEntry({
        start: date,
        end: date,
      })
    }
  } 

  return (  
    <div className='day-header'>
      <div className='day-header__container'>
        {showLabel && (
          <span data-cy='day-header-label'>{label}</span>
        )}
        <button
          data-cy={`${weekDay}-all-day-entry-button`} 
          className='day-header__button'
          onClick={handleEntryButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}