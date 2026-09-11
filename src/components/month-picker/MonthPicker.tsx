import './MonthPicker.scss'
import 'react-datepicker/dist/react-datepicker.css'

import { HTMLProps, forwardRef } from 'react'
import { DatePicker } from 'react-datepicker'
import CalendarIcon from '../../assets/icons/calendar-icon.svg?react'

const MonthPickerCustomInput = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(({
  value, onClick,
}, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="month-picker__button"
    data-cy="month-picker-select"
  >
    <CalendarIcon/>
    <span data-cy="month-picker-result">{value}</span>
    <span className="month-picker__arrow">&or;</span>
  </button>
))

export function MonthPicker({
  selectedMonth, 
  onChange,
}: {
  selectedMonth: Date, 
  onChange: (date: Date) => unknown,
}){
  return (
    <div
      className="month-picker"
      data-cy="month-picker"
    >
      <DatePicker
        selected={selectedMonth}
        onChange={(date) => onChange(
          date as Date,
        )}
        showMonthYearPicker
        dateFormat="MMM yyyy"
        customInput={<MonthPickerCustomInput />}
      />
    </div>
  )
}
