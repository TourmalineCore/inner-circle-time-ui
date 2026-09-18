import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { MetricsStateContext } from "./state/MetricsStateContext"
import { api } from "../../../../common/api/api"
import { MetricsContent } from "./MetricsContent"
import { eventBus, EventBusType } from "../../event-bus"

export const MetricsContainer = observer(({
  startDate,
  endDate,
}: {
  startDate: string,
  endDate: string,
}) => {
  const metricsState = useContext(MetricsStateContext)

  const [
    needToReloadMetrics,
    setNeedToReloadMetrics,
  ] = useState(false)

  useEffect(() => {
    const unsubscribeEntriesChanged = eventBus.subscribe(EventBusType.ENTRIES_CHANGED, () => {
      setNeedToReloadMetrics((prev) => !prev)
    })
    
    return () => {
      unsubscribeEntriesChanged()
    }
  }, [
    needToReloadMetrics,
  ])

  useEffect(() => {
    loadMetricsAsync()
  }, [
    needToReloadMetrics,
    startDate,
    endDate,
  ])
  
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