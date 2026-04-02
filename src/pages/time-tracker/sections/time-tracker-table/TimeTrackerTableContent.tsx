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
import { EntryContent } from './components/EntryContent/EntryContent'
import { EntryType } from '../../../../common/constants/entryType'

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
  createNewEntry,
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
  createNewEntry: ({
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
        createNewEntry({
          start,
          end,
        })
      }
    }
  }

  const handleSelectEntry = (entry: TrackedEntry) => {
    if (isCopyMode) {
      resetIsCopyMode()
    }
    
    openEntry({
      entry,
    })
  }

  const eventPropGetter = ({
    type, 
  }: TrackedEntry) => {
    const typesClassName = {
      [EntryType.TASK]: `task`,
      [EntryType.UNWELL]: `unwell`,
    }

    return {
      className: `time-tracker-table__entry time-tracker-table__entry--${typesClassName[type!]}`,
    } 
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
          eventTimeRangeFormat: ({
            start,
            end, 
          }) => 
            `${moment(start)
              .format(`HH:mm`)} - ${moment(end)
              .format(`HH:mm`)}`,
        }}
        events={entries}
        timeslots={4}
        step={15}
        localizer={localizer}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEntry}
        onNavigate={(date) => timeTrackerState.setViewPeriod({
          date: date,
          view: currentView,
        })}
        eventPropGetter={eventPropGetter}
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
          event: EntryContent,
        }}
      />
    </>
  )
})