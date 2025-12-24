import 'react-big-calendar/lib/css/react-big-calendar.css'
import './TimeTrackerTableContent.scss'

import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { TimeTrackerStateContext } from './state/TimeTrackerTableStateContext'
import moment from 'moment'
import 'moment/locale/ru'
import { momentLocalizer, Calendar, SlotInfo} from 'react-big-calendar'
import { View, WorkEntryItem } from '../../types'
import { useDeviceSize } from '../../../../common/hooks/useDeviceSize'

// This is necessary so that the calendar starts on Monday, not Sunday
moment.locale(`ru`, {
  week: {
    dow: 1, 
  },
})

const localizer = momentLocalizer(moment)

export const TimeTrackerTableContent = observer(({
  onOpenWorkEntryModal,
  setWorkEntryModalData,
  setWorkEntryModalDataTime,
}: {
  onOpenWorkEntryModal: () => unknown,
  setWorkEntryModalData: (workEntry: WorkEntryItem ) => unknown,
  setWorkEntryModalDataTime: ({
    startTime,
    endTime,
  }: {
    startTime: Date,
    endTime: Date,
  }) => unknown, 
}) => {
  const timeTrackerState = useContext(TimeTrackerStateContext)
  const {
    isMobile,
  } = useDeviceSize()

  const {
    tableData,
    currentView,
  } = timeTrackerState

  const {
    workEntries, 
  } = tableData

  const handleSelectSlot = ({
    start,
    end,
    action, 
  }: SlotInfo) => {
    // Todo: remove select checking after added button to add event for mobile version
    const accessAction: SlotInfo['action'] = isMobile ? `select` : `click`
      
    if (action == accessAction) {

      setWorkEntryModalDataTime({
        startTime: start,
        endTime: end,
      })

      onOpenWorkEntryModal()
    }
  }

  const handleSelectWorkEntry = (workEntry: WorkEntryItem ) => {
    setWorkEntryModalData(workEntry)

    onOpenWorkEntryModal()
  }

  return (
    <Calendar
      dayLayoutAlgorithm="no-overlap"
      view={currentView!}
      views={[
        currentView!,
      ]}
      formats={{
        timeGutterFormat: `HH:mm`,
      }}
      onView={(view) => timeTrackerState.setCurrentView({
        view: view as View,
      })}
      events={workEntries}
      timeslots={4}
      step={15}
      localizer={localizer}
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectWorkEntry}
      onNavigate={(date) => timeTrackerState.setViewPeriod({
        date: date,
      })}
      selectable
      min={moment()
        .hour(0)
        .minute(0)
        .toDate()}
      max={moment()
        .hour(23)
        .minute(59)
        .toDate()}
    />
  )
})