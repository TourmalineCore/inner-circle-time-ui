import moment from 'moment'

export function getDurationLabel({
  startTime,
  endTime,
}: {
  startTime: Date,
  endTime: Date,
}) {
  return `${moment(startTime)
    .format(`HH:mm`)} - ${moment(endTime)
    .format(`HH:mm`)}`
}