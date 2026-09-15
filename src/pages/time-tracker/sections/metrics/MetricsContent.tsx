import './Metrics.scss'

import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { MetricsStateContext } from "./state/MetricsStateContext"
import { formatToTwoDecimalPlaces } from "../../../../common/utils/formatToTwoDecimalPlaces"

export const MetricsContent = observer(() => {
  const metricsState = useContext(MetricsStateContext)

  const {
    trackedHours,
  } = metricsState.metrics

  return (
    <div className="metrics">
      <div 
        className="metrics__tracked-hours"
        data-cy='metrics-tracked-hours'
      >
        {formatToTwoDecimalPlaces(trackedHours)} tracked hours
      </div>
    </div>
  )
})