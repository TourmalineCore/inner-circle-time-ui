export type PersonalReportData = {
  trackedEntries: PersonalReportTrackedEntry[],
  taskHours: number,
  unwellHours: number,
}

export type PersonalReportTrackedEntry = {
  date: string,
  trackedHoursPerDay: number,
  time: string,
  hours: number,
  entryType: string, 
  project: string,
  taskId: string,
  taskTitle: string,
  description: string,
}