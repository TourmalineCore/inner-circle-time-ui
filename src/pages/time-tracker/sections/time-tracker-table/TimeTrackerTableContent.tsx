import 'react-big-calendar/lib/css/react-big-calendar.css'
import './TimeTrackerTable.scss'
import moment from 'moment'
import 'moment/locale/ru'

import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { TimeTrackerStateContext } from './state/TimeTrackerTableStateContext'
import { momentLocalizer, Calendar, SlotInfo, Views } from 'react-big-calendar'
import { TrackedEntry } from '../../types'
import { useDeviceSize } from '../../../../common/hooks/useDeviceSize'
import { EntryCardContent } from './components/entry-card-content/EntryCardContent'
import { DayHeader } from './components/day-header/DayHeader'
import { EntryType } from '../../../../common/constants/entryType'
import { findEntryForDate } from '../../../../common/utils/find-entry-for-date/findEntryForDate'

// This is necessary so that the calendar starts on Monday, not Sunday
moment.locale(`ru`, {
  week: {
    dow: 1, 
  },
})

const localizer = momentLocalizer(moment)

export const TimeTrackerTableContent = observer(({
  isCopyMode,
  openEntry,
  createNewNonAllDayEntry,
  createNewAllDayEntry,
  createCopyEntry,
  resetIsCopyMode,
}: {
  isCopyMode: boolean,
  createCopyEntry: ({
    start,
    end,
  }: {
    start: Date,
    end: Date,
  }) => unknown,
  createNewNonAllDayEntry: ({
    allDayEntryType,
    start,
    end,
  }: {
    allDayEntryType?: EntryType,
    start: Date,
    end: Date,
  }) => unknown,
  createNewAllDayEntry: ({
    start,
    end,
  }: {
    start: Date,
    end: Date,
  }) => unknown,
  openEntry: ({
    entry,
  }: {
    entry: TrackedEntry,
  }) => unknown,
  resetIsCopyMode: () => unknown,
}) => {
  const timeTrackerState = useContext(TimeTrackerStateContext)
  const {
    isMobile,
  } = useDeviceSize()

  const {
    tableData,
  } = timeTrackerState

  const {
    entries,
    allDayEntries, 
  } = tableData

  const handleSelectSlot = ({
    start,
    end,
    action, 
  }: SlotInfo) => {    
    // Todo: remove select checking after added button to add event for mobile version
    const accessAction: SlotInfo['action'] = isMobile ? `select` : `click`

    if (action == accessAction) {
      if (isCopyMode) {
        resetIsCopyMode()
            
        createCopyEntry({
          start,
          end,
        })
      }
      else {
        const allDayEntryType = findEntryForDate({
          entries: allDayEntries,
          date: start,
        })?.type

        createNewNonAllDayEntry({
          allDayEntryType,
          start,
          end,
        })
      }
    }
  }

  const handleSelectEntry = (entry: TrackedEntry) => {
    // All day entries (sick leaves, vacation and etc) should not be clickable
    // They can only be opened via the all day button
    if (entry.isAllDayEntry) {
      return
    }

    if (isCopyMode) {
      resetIsCopyMode()
    }
    
    openEntry({
      entry,
    })
  }

  const currentView = isMobile ? Views.DAY : Views.WEEK

  return (
    <>
      {isCopyMode && (
        <div 
          className="time-tracker-table__copy-alert"
          data-cy="copy-alert"
        >
          Choose free time slot
        </div>
      )}
      <Calendar
        dayLayoutAlgorithm="no-overlap"
        view={currentView}
        views={[
          currentView,
        ]}
        formats={{
          timeGutterFormat: `HH:mm`,
        }}
        events={entries}
        backgroundEvents={allDayEntries}
        timeslots={4}
        step={15}
        localizer={localizer}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEntry}
        onNavigate={(date) => timeTrackerState.setViewPeriod({
          date: date,
          view: currentView,
        })}
        selectable
        scrollToTime={moment()
          .hour(8)
          .minute(0)
          .toDate()}
        min={moment()
          .hour(0)
          .minute(0)
          .toDate()}
        max={moment()
          .hour(23)
          .minute(59)
          .toDate()}
        components={{
          event: EntryCardContent,
          day: {
            header: (headerProps) => <DayHeader
              {...headerProps}
              allDayEntries={allDayEntries}
              openEntry={openEntry}
              createNewAllDayEntry={createNewAllDayEntry}
              showLabel={false}
            />,
          },
          week: {
            header: (headerProps) => <DayHeader
              {...headerProps}
              allDayEntries={allDayEntries}
              openEntry={openEntry}
              createNewAllDayEntry={createNewAllDayEntry}
            />,
          },
        }}
      />
    </>
  )
})