export enum EventBusType {
  ENTRY_MODAL_OPEN = `ENTRY_MODAL:OPEN`,
  ENTRY_MODAL_CLOSE =`ENTRY_MODAL:CLOSE`,
  DELETE_MODAL_OPEN = `DELETE_MODAL:OPEN`,
  DELETE_MODAL_CLOSE = `DELETE_MODAL:CLOSE`,
  TABLE_RELOAD_ENTRIES = `TABLE:RELOAD_ENTRIES`,
  TABLE_RESET_ENTRY = `TABLE:RESET_ENTRY`,
  TABLE_COPY_ENTRY= `TABLE:COPY_ENTRY`,
}

type EventBusMap = {
  [EventBusType.ENTRY_MODAL_OPEN]: unknown,
  [EventBusType.ENTRY_MODAL_CLOSE]: unknown,
  [EventBusType.DELETE_MODAL_OPEN]: unknown,
  [EventBusType.DELETE_MODAL_CLOSE]: unknown,
  [EventBusType.TABLE_RELOAD_ENTRIES]: unknown,
  [EventBusType.TABLE_RESET_ENTRY]: unknown,
  [EventBusType.TABLE_COPY_ENTRY]: unknown,
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

export const openEntryModalEvent = () => eventBus.trigger(EventBusType.ENTRY_MODAL_OPEN)
export const closeEntryModalEvent = () => eventBus.trigger(EventBusType.ENTRY_MODAL_CLOSE)
export const openDeleteModalEvent = () => eventBus.trigger(EventBusType.DELETE_MODAL_OPEN)
export const closeDeleteModalEvent = () => eventBus.trigger(EventBusType.DELETE_MODAL_CLOSE)
export const reloadEntriesEvent = () => eventBus.trigger(EventBusType.TABLE_RELOAD_ENTRIES)
export const resetEntryEvent = () => eventBus.trigger(EventBusType.TABLE_RESET_ENTRY)
export const copyEntryEvent = () => eventBus.trigger(EventBusType.TABLE_COPY_ENTRY)