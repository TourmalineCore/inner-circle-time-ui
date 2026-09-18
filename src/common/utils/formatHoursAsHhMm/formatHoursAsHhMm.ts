import moment from "moment"
import momentDurationFormatSetup from "moment-duration-format"

momentDurationFormatSetup(moment)

export function formatHoursAsHhMm({
  hours,
}: {
  hours: number,
}) {
  return moment.duration(hours, `hours`)
    .format(`h[h] m[m]`)
}