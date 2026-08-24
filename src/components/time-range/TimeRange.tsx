import "react-datepicker/dist/react-datepicker.css"
import './TimeRange.scss'

import DatePicker from "react-datepicker"
import InputMask from 'react-input-mask'
import { formatTime } from "../../common/utils/dateAndTime"
import clsx from "clsx"

export function TimeRange({
  date,
  startTime,
  endTime,
  onChangeDate,
  onChangeStartTime,
  onChangeEndTime,
  className,
  label,
  isDateError,
  isDisabled,
  dataCy,
}: {
  date: Date | null,
  startTime: Date,
  endTime: Date,
  onChangeDate: (date: Date | null) => unknown,
  onChangeStartTime: (e: React.ChangeEvent<HTMLInputElement>) => unknown,
  onChangeEndTime: (e: React.ChangeEvent<HTMLInputElement>) => unknown,
  className: string,
  label?: string,
  isDateError?: boolean,
  isDisabled?: boolean,
  dataCy?: {
    datepicker?: string,
    startTime?: string,
    endTime?: string,
  },
}) {
  return (
    <div className={clsx(`time-range`, className)}>
      {label && (
        <span className='time-range__label'>
          {label}
        </span>
      )}
      <div className='time-range__container'>
        <div data-cy={dataCy?.datepicker || `datepicker`}>
          <DatePicker
            className={clsx(`time-range__datepicker`, {
              'error': isDateError,
            })}
            selected={date}
            dateFormat="dd.MM"
            onChange={onChangeDate}
            disabled={isDisabled}
            onKeyDown={(e) => e.preventDefault()}
          />
        </div>
        <div className='time-range__time-range'>
          <InputMask
            data-cy={dataCy?.startTime || `start-time-input`}
            className='time-range__time-input'
            mask="99:99"
            maskChar="0"
            value={formatTime({
              time: startTime,
            })}
            disabled={isDisabled}
            onChange={onChangeStartTime}
          />
          {`-`}
          <InputMask
            data-cy={dataCy?.endTime || `end-time-input`}
            className='time-range__time-input'
            mask="99:99"
            maskChar="0"
            value={formatTime({
              time: endTime,
            })}
            disabled={isDisabled}
            onChange={onChangeEndTime}
          />
        </div>
      </div>
    </div>
  )
}