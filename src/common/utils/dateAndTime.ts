import moment from "moment"

export function formatTime({
  time,
}: {
  time: Date,
}) {
  return moment(time)
    .format(`HH:mm`)
}

export function parseTimeString({
  timeString, 
  originalDate,
}: {
  timeString: string,
  originalDate: Date,
}) {  
  const originalMoment = moment(originalDate)
  const [
    hours,
    minutes,
  ] = timeString.split(`:`)
    .map(Number)
  
  return originalMoment
    .set({
      hour: isNaN(hours) ? originalMoment.hour() : hours,
      minute: isNaN(minutes) ? originalMoment.minute() : minutes,
    })
    .toDate()
}

export function concatDateAndTime({
  date,
  time,
}: {
  date: Date,
  time: Date,
}) {
  return moment(date)
    .hours(moment(time)
      .hours())
    .minutes(moment(time)
      .minutes())
    .seconds(moment(time)
      .seconds())
    .format(`YYYY-MM-DDTHH:mm:ss`)
}