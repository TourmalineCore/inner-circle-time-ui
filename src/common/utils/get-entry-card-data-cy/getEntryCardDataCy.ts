import moment from 'moment'

export function getEntryCardDataCy({
  entryName,
  startTime,
  endTime,
}: {
  entryName: string,
  startTime: Date,
  endTime: Date,
}) {
  return `${entryName}-${moment(startTime)
    .format(`dddd-HH:mm`)
    .toLowerCase()}-${moment(endTime)
    .format(`HH:mm`)}`
}
