
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './TimeTrackerTableContent.scss'

import { observer } from 'mobx-react-lite'
import { useCallback, useContext } from 'react'
import { TimeTrackerStateContext } from './state/TimeTrackerTableStateContext'
import moment from 'moment'
import 'moment/locale/ru'
import { momentLocalizer, Calendar, SlotInfo} from 'react-big-calendar'
import { View } from '../../types'

// This is necessary so that the calendar starts on Monday, not Sunday
moment.locale(`ru`, {
  week: {
    dow: 1, 
  },
})

const localizer = momentLocalizer(moment)

export const TimeTrackerTableContent = observer(({
  onOpenWorkItemModal,
  setWorkItemModalDataTime,
}: {
  onOpenWorkItemModal: () => unknown,
  setWorkItemModalDataTime: ({
    startTime,
    endTime,
  }: {
    startTime: Date,
    endTime: Date,
  }) => unknown, 
}) => {
  const timeTrackerState = useContext(TimeTrackerStateContext)

  const {
    workItems,
    currentView,
  } = timeTrackerState

  const handleSelectSlot = useCallback(({
    start,
    end,
    action, 
  }: SlotInfo) => {
    if (action !== `click`) return

    setWorkItemModalDataTime({
      startTime: start,
      endTime: end,
    })

    onOpenWorkItemModal()
  }, [])

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
      events={workItems}
      timeslots={4}
      step={15}
      localizer={localizer}
      // eventPropGetter={eventPropGetter as never}
      // dayPropGetter={dayPropGetter as DayPropGetter}
      onSelectSlot={handleSelectSlot}
      // onSelectEvent={}
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