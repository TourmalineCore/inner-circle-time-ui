
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './TimeTrackerTableContent.scss'

import { observer } from 'mobx-react-lite'
import { useCallback, useContext, useEffect, useState } from 'react'
import { TimeTrackerStateContext } from './state/TimeTrackerTableStateContext'
import moment from 'moment'
import { momentLocalizer, View, Views, Calendar, SlotInfo } from 'react-big-calendar'
import { useDeviceSize } from '../../../../common/hooks/useDeviceSize'

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
    isMobile,
  } = useDeviceSize()
  
  const [
    currentView,
    setCurrentView,
  ] = useState<View>(isMobile ? Views.DAY : Views.WEEK)

  useEffect(() => {
    setCurrentView(isMobile ? Views.DAY : Views.WEEK)
  }, [
    isMobile,
  ])

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
      view={currentView}
      views={[
        Views.WEEK,
        Views.DAY,
      ]}
      formats={{
        timeGutterFormat: `HH:mm`,
      }}
      onView={setCurrentView}
      events={timeTrackerState.workItems}
      timeslots={4}
      step={15}
      localizer={localizer}
      // eventPropGetter={eventPropGetter as never}
      // dayPropGetter={dayPropGetter as DayPropGetter}
      onSelectSlot={handleSelectSlot}
      // onSelectEvent={}
      selectable
      min={moment()
        .hour(7)
        .minute(0)
        .toDate()}
      max={moment()
        .hour(21)
        .minute(0)
        .toDate()}
    />
  )
})