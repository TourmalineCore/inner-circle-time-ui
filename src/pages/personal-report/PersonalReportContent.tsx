import '@tourmalinecore/react-table-responsive/styles.css'
import './PersonalReport.scss'

import { observer } from "mobx-react-lite"
import { ClientTable } from '@tourmalinecore/react-table-responsive'
import { useContext } from "react"
import { PersonalReportTrackedEntry } from "./types"
import { PersonalReportStateContext } from './state/PersonalReportStateContext'
import { UNSPECIFIED_EMPLOYEE_ID } from './state/PersonalReportState'
import { DatePicker } from '../../components/DatePicker/DatePicker'

export const PersonalReportContent = observer(() => {
  const personalReportState = useContext(PersonalReportStateContext)

  const {
    personalReportData,
    selectedDate,
    selectedEmployeeId,
    employees,
    totalHours,
  } = personalReportState

  const {
    trackedEntries,
    taskHours,
    unwellHours,
  } = personalReportData

  const {
    totalTrackedHoursPerMonth,
    totalPayableHours,
  } = totalHours

  return (
    <>
      <div 
        className='personal-report'
        data-cy='personal-report'
      >
        <div className='personal-report__head'>
          <select
            className='personal-report__employee-select'
            name='employee-select'
            data-cy="employee-select"
            value={selectedEmployeeId}
            onChange={(e) => {
              personalReportState.setSelectedEmployeeId({ 
                employeeId: Number(e.target.value), 
              })
            }}
          >
            <option
              className='personal-report__empty-employee-option'
              value={UNSPECIFIED_EMPLOYEE_ID}
            >
            Choose employee
            </option>
            {employees.map(({
              id,
              fullName,
            }) => (
              <option
                data-cy="employees-select-option"
                key={id}
                value={id}
              >
                {fullName}
              </option>
            ))}
          </select>
          <DatePicker 
            selectedDate={selectedDate}
            onChange={(date) => {
              personalReportState.setSelectedDate({
                newDate: date,
              })
            }}
          />
        </div>
        <ClientTable<PersonalReportTrackedEntry>
          tableId="personal-report-table"
          data={trackedEntries}
          columns={[
            {
              id: `Date`,
              header: `Date`,
              accessorFn: (row) => row.date,
              maxSize: 80,
            },
            {
              id: `Tracked hours per day `,
              header: () => <span>Tracked hours<br/> per day</span>,
              accessorFn: (row) => row.trackedHoursPerDay,
              maxSize: 140,
            },
            {
              id: `Time`,
              header: `Time`,
              accessorFn: (row) => row.time,
              maxSize: 150,
            },
            {
              id: `Hours`,
              header: `Hours`,
              accessorFn: (row) => row.hours,
              maxSize: 80,
            },
            {
              id: `Type`,
              header: `Type`,
              accessorFn: (row) => row.entryType,
              maxSize: 100,
            }, 
            {
              id: `Project`,
              header: `Project`,
              accessorFn: (row) => row.project,
            },
            {
              id: `Task ID`,
              header: `Task ID`,
              accessorFn: (row) => row.taskId,
              maxSize: 100,
            }, 
            {
              id: `Task title`,
              header: `Task title`,
              cell: ({
                row,
              }) => <div className='personal-report__text-wrapper'>{row.original.taskTitle}</div>,
              minSize: 200,
            },
            {
              id: `Description`,
              header: `Description`,
              cell: ({
                row,
              }) => <div className='personal-report__text-wrapper'>{row.original.description}</div>,
              minSize: 200,
            },
          ]}
          tcOrder={{
            id: `Date`,
            desc: true,
          }}
          tcRenderMobileTitle={(row) => row.original.date}
        />
      </div>
      <div className='personal-report__footer'>
        <div className='personal-report__total-per-period'>Total tracked hours per period - {totalTrackedHoursPerMonth}</div>
        <div>Total payable hours - {totalPayableHours}</div>
        <div>Task hours - {taskHours}</div>
        <div>Unwell hours - {unwellHours}</div>
      </div>
    </>
  )
})
