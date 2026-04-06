export enum EventBusType {
  ENTRIES_CHANGED = `ENTRIES_CHANGED`,
}

type EventBusMap = {
  [EventBusType.ENTRIES_CHANGED]: unknown,
}

class EventBus {
  private _events = new Map<string, Set<() => unknown>>()
  
  publish<T extends keyof EventBusMap>(event: T) {
    this._events.get(event)
      ?.forEach((callback) => callback())
  }

  subscribe<T extends keyof EventBusMap>(event: T, callback: () => unknown) {
    if (!this._events.has(event)) {
      this._events.set(event, new Set())
    }

    this._events.get(event)!.add(callback)
    
    return () => this._events.get(event)
      ?.delete(callback)
  }
}

export const eventBus = new EventBus()