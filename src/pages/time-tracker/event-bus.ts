export enum EventBusType {
  TABLE_RELOAD_ENTRIES = `TABLE:RELOAD_ENTRIES`,
}

type EventBusMap = {
  [EventBusType.TABLE_RELOAD_ENTRIES]: unknown,
}

class EventBus {
  private _events = new Map<string, Set<() => unknown>>()
  
  trigger<T extends keyof EventBusMap>(event: T) {
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

export const reloadEntriesEvent = () => eventBus.trigger(EventBusType.TABLE_RELOAD_ENTRIES)