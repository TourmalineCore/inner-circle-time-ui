import './DayHeader.scss'
import moment from 'moment'

import { EntryType } from '../../../../../../common/constants/entryType'
import { TrackedEntry } from '../../../../types'
import { findEntryForDate } from '../../../../../../common/utils/find-entry-for-date/findEntryForDate'
import clsx from 'clsx'

const ENTRY_TYPE_CONFIG: Record<number, {
  text: string,
  className: string,
}> = {
  [EntryType.SICK_LEAVE]: {
    text: `Sick leave`,
    className: `day-header__button--sick-leave`,
  },
  [EntryType.VACATION]: {
    text: `Vacation`,
    className: `day-header__button--vacation`,
  },
}

export function DayHeader({
  date,
  label,
  allDayEntries,
  openEntry,
  createNewAllDayEntry,
  showLabel = true,
}: {
  date: Date,
  label: string,
  allDayEntries: TrackedEntry[],
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
  const foundAllDayEntry = findEntryForDate({
    entries: allDayEntries,
    date, 
  })

  const entryConfig = foundAllDayEntry
    ? ENTRY_TYPE_CONFIG[foundAllDayEntry.type!]
    : null

  const weekDay = moment(date)
    .format(`dddd`)
    .toLowerCase() 

  const handleEntryButtonClick = () => {
    if (foundAllDayEntry) {
      openEntry({
        entry: foundAllDayEntry,
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
          className={clsx(`day-header__button ${entryConfig?.className || ``}`)}
          onClick={handleEntryButtonClick}
        >
          {entryConfig?.text || `Add an all-day event`}
        </button>
      </div>
    </div>
  )
}