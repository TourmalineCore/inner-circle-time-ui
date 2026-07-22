import './UnwellEntry.scss'

import { UnwellEntryStateContext } from './state/UnwellEntryStateContext'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { parseTimeString } from '../../../../../../common/utils/dateAndTime'
import { TimeRange } from '../../../../../../components/TimeRange/TimeRange'

export const UnwellEntryContent = observer(() => {
  const unwellEntryState = useContext(UnwellEntryStateContext)

  const {
    unwellEntryData,
  } = unwellEntryState

  const {
    date,
    start,
    end,
  } = unwellEntryData

  return (
    <div className='unwell-entry'>
      <div className='unwell-entry__field'>
        <TimeRange 
          className='unwell-entry__time-range'
          label='Absent'
          date={date}
          startTime={start!}
          endTime={end!}
          onChangeDate={(date) => unwellEntryState.updateUnwellEntryData({
            unwellEntryData: {
              date,
            },
          })}
          onChangeStartTime={(e) => unwellEntryState.updateUnwellEntryData({
            unwellEntryData: {
              start: parseTimeString({
                timeString: e.target.value,
                originalDate: start!,
              }),
            },
          })}
          onChangeEndTime={(e) => unwellEntryState.updateUnwellEntryData({
            unwellEntryData: {
              end: parseTimeString({
                timeString: e.target.value,
                originalDate: end!,
              }),
            },
          })}
        />
      </div>
    </div>
  )
})