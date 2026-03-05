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
import { eventBus } from '../../event-bus'

// This is necessary so that the calendar starts on Monday, not Sunday
moment.locale(`ru`, {
  week: {
    dow: 1, 
  },
})

const localizer = momentLocalizer(moment)

export const TimeTrackerTableContent = observer(() => {
  const timeTrackerState = useContext(TimeTrackerStateContext)
  const {
    isMobile,
  } = useDeviceSize()

  const {
    currentEntry,
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
      
    const isCopy = currentEntry?.isCopy || false

    if (action == accessAction) {
      timeTrackerState.setCurrentEntry({
        entry: {
          ...(isCopy && {
            ...currentEntry,
          }),
          date: start,
          start,
          end,
          isCopy,
        },
      })

      eventBus.trigger(`ENTRY_MODAL:OPEN`)
    }
  }

  const handleSelectEntry = (entry: TrackedEntry) => {
    timeTrackerState.setCurrentEntry({
      entry: {
        ...entry,
        isCopy: false,
      },
    })

    eventBus.trigger(`ENTRY_MODAL:OPEN`)
  }

  const currentView = isMobile ? Views.DAY : Views.WEEK

  return (
    <>
      {currentEntry?.isCopy && (
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