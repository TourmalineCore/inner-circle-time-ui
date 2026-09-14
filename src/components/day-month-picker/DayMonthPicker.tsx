import "react-datepicker/dist/react-datepicker.css"

import clsx from "clsx"
import { DatePicker } from "react-datepicker"

export function DayMonthPicker({
  className,
  isError = false,
  selected,
  onChange,
  isDisabled = false,
  ...props
}: {
  className: string,
  isError?: boolean,
  selected?: Date | null,
  onChange: (date: Date | null) => unknown,
  isDisabled?: boolean,
}) {
  return (
    <DatePicker
      className={clsx(`day-month-picker`, className, {
        error: isError,
      })}
      selected={selected}
      dateFormat="dd.MM"
      onChange={onChange}
      disabled={isDisabled}
      onKeyDown={(e) => e.preventDefault()}
      calendarStartDay={1}
      {...props}
    />
  )
}