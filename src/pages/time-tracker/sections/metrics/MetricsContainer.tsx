import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"
import { MetricsStateContext } from "./state/MetricsStateContext"
import { api } from "../../../../common/api/api"
import { MetricsContent } from "./MetricsContent"

export const MetricsContainer = observer(({
  startDate,
  endDate,
}: {
  startDate: string,
  endDate: string,
}) => {
  const metricsState = useContext(MetricsStateContext)

  useEffect(() => {
    loadMetricsAsync()
  }, [])
  
  return (
    <MetricsContent />
  )

  async function loadMetricsAsync() {
    const {
      data: {
        trackedHours,
      },
    } = await api
      .reporting
      .getMetrics({
        startDate: startDate,
        endDate: endDate,
      })
  
    metricsState.initialize({
      loadedMetrics: {
        trackedHours,
      },
    })
  }
})