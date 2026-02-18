import 'react-big-calendar/lib/css/react-big-calendar.css'
import './TimeTrackerTableContent.scss'
import moment from 'moment'
import 'moment/locale/ru'

import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { TimeTrackerStateContext } from './state/TimeTrackerTableStateContext'
import { momentLocalizer, Calendar, SlotInfo, Views} from 'react-big-calendar'
import { WorkEntryItem } from '../../types'
import { useDeviceSize } from '../../../../common/hooks/useDeviceSize'

// This is necessary so that the calendar starts on Monday, not Sunday
moment.locale(`ru`, {
  week: {
    dow: 1, 
  },
})

const localizer = momentLocalizer(moment)

export const TimeTrackerTableContent = observer(({
  onOpenEntryModal,
  setEntryModalData,
  setEntryModalDataTime,
}: {
  onOpenEntryModal: () => unknown,
  setEntryModalData: (workEntry: WorkEntryItem) => unknown,
  setEntryModalDataTime: ({
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

      setEntryModalDataTime({
        startTime: start,
        endTime: end,
      })

      onOpenEntryModal()
    }
  }

  const handleSelectWorkEntry = (workEntry: WorkEntryItem) => {
    setEntryModalData(workEntry)

    onOpenEntryModal()
  }

  const currentView = isMobile ? Views.DAY : Views.WEEK

  return (
    <Calendar
      dayLayoutAlgorithm="no-overlap"
      view={currentView}
      views={[
        currentView,
      ]}
      formats={{
        timeGutterFormat: `HH:mm`,
      }}
      events={workEntries}
      timeslots={4}
      step={15}
      localizer={localizer}
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectWorkEntry}
      onNavigate={(date) => timeTrackerState.setViewPeriod({
        date: date,
        view: currentView,
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