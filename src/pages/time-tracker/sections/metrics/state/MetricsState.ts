import { GetMetricsResponse } from '@tourmalinecore/inner-circle-time-api-js-client'
import { makeAutoObservable } from 'mobx'

export class MetricsState {
  private _metrics = {
    trackedHours: 0,
  }

  constructor() {
    makeAutoObservable(this)
  }

  initialize({
    loadedMetrics,
  }: {
    loadedMetrics: GetMetricsResponse,
  }) {
    this._metrics = loadedMetrics
  }

  get metrics() {
    return this._metrics
  }
}
