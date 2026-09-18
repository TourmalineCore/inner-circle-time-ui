import './Metrics.scss'

import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { MetricsStateContext } from "./state/MetricsStateContext"
import { formatToTwoDecimalPlaces } from "../../../../common/utils/formatToTwoDecimalPlaces/formatToTwoDecimalPlaces"
import { formatHoursAsHhMm } from '../../../../common/utils/formatHoursAsHhMm/formatHoursAsHhMm'

export const MetricsContent = observer(() => {
  const metricsState = useContext(MetricsStateContext)

  const {
    trackedHours,
  } = metricsState.metrics

  const trackedHoursWithTwoDecimalPlaces = formatToTwoDecimalPlaces(trackedHours)

  const formattedTrackedTime = formatHoursAsHhMm({
    hours: trackedHoursWithTwoDecimalPlaces,
  })

  return (
    <div className="metrics">
      <div 
        className="metrics__tracked-hours"
        data-cy='metrics-tracked-hours'
      >
        {formattedTrackedTime} tracked time
      </div>
    </div>
  )
})