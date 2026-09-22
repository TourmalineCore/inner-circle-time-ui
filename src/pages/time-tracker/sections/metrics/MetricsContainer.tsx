import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { MetricsStateContext } from "./state/MetricsStateContext"
import { api } from "../../../../common/api/api"
import { MetricsContent } from "./MetricsContent"
import { eventBus, EventBusType } from "../../event-bus"
import moment from "moment"

export const MetricsContainer = observer(({
  dateWithinWeek,
}: {
  dateWithinWeek: string,
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
    dateWithinWeek,
  ])
  
  return (
    <MetricsContent />
  )

  async function loadMetricsAsync() {
    const startWeekDate = moment(dateWithinWeek)
      // isoWeek is necessary so that moment returns the date starting from Monday, not Sunday.
      .startOf(`isoWeek`) 
      .format(`YYYY-MM-DD`)
    
    const endWeekDate = moment(dateWithinWeek)
      .endOf(`isoWeek`) 
      .format(`YYYY-MM-DD`)

    const {
      data: {
        trackedHours,
      },
    } = await api
      .reporting
      .getMetrics({
        startDate: startWeekDate,
        endDate: endWeekDate,
      })
  
    metricsState.initialize({
      loadedMetrics: {
        trackedHours,
      },
    })
  }
})