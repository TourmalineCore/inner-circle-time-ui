import './DayHeader.scss'
import moment from 'moment'

import { EntryType } from '../../../../../../common/constants/entryType'
import { TrackedEntry } from '../../../../types'

const BUTTON_TEXT: Record<number, string> = {
  [EntryType.SICK_LEAVE]: `Sick leave`,
}

export function DayHeader({
  date,
  label,
  backgroundEntries,
  openEntry,
  createNewEntry,
  showLabel,
}: {
  date: Date,
  label: string,
  backgroundEntries: TrackedEntry[],
    openEntry: ({
      entry,
    }: {
    entry: TrackedEntry,
  }) => unknown,
    createNewEntry: ({
      start,
      end,
    }: {
    start: Date,
    end: Date,
  }) => unknown,
  showLabel?: boolean,
}) {
  const foundEntry = backgroundEntries.find(({
    start,
    end,
  }) => {
    const entryStart = moment(start)
      .startOf(`day`)
    const entryEnd = moment(end)
      .startOf(`day`)
    const currentDate = moment(date)
      .startOf(`day`)

    return currentDate.isBetween(entryStart, entryEnd, `day`, `[]`) 
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
      createNewEntry({
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