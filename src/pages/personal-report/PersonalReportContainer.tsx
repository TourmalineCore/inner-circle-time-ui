import { useContext, useEffect } from "react"
import { api } from "../../common/api/api"
import { observer } from "mobx-react-lite"
import { PersonalReportStateContext } from "./state/PersonalReportStateContext"
import { UNSPECIFIED_EMPLOYEE_ID } from "./state/PersonalReportState"
import { PersonalReportContent } from "./PersonalReportContent"

export const PersonalReportContainer = observer(() => {
  const personalReportState = useContext(PersonalReportStateContext)
  
  const {
    monthYearDate,
    selectedEmployeeId,
    selectedDate, 
  } = personalReportState

  const {
    month,
    year,
  } = monthYearDate
  
  useEffect(() => {
    loadEmployeesAsync()
  }, [])

  useEffect(() => {
    if (selectedEmployeeId !== UNSPECIFIED_EMPLOYEE_ID) {
      loadTrackedEntriesForEmployeeAsync({ 
        employeeId: selectedEmployeeId, 
      })
    }
  }, [
    selectedEmployeeId,
    selectedDate,
  ])

  return (
    <PersonalReportContent />
  )

  async function loadEmployeesAsync() {
    const {
      data: {
        employees,
      },
    } = await api.reportingGetAllEmployees()

    personalReportState.initializeEmployees({
      employees,
    })
  }

  async function loadTrackedEntriesForEmployeeAsync({
    employeeId,
  }: {
    employeeId: number,
  }) {
    const {
      data: {
        trackedEntries,
        taskHours,
        unwellHours,
      },
    } = await api.reportingGetPersonalReport({
      employeeId,
      year,
      month,
    })

    personalReportState.initializePersonalReport({
      trackedEntries,
      taskHours,
      unwellHours,
    })
  }
})