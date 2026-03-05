type EventMap = {
  'ENTRY_MODAL:OPEN': unknown,
  'ENTRY_MODAL:CLOSE': unknown,
  'DELETE_MODAL:OPEN': unknown,
  'DELETE_MODAL:CLOSE': unknown,
  'TABLE:RELOAD_ENTRIES': unknown,
  'TABLE:RESET_ENTRY': unknown,
  'TABLE:COPY_ENTRY': unknown,
}

class EventBus {
  private listeners = new Map<string, Set<() => unknown>>()
  
  trigger<T extends keyof EventMap>(event: T) {
    this.listeners.get(event)
      ?.forEach((callback) => callback())
  }

  subscribe<T extends keyof EventMap>(event: T, callback: () => unknown) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(callback)
    
    return () => this.listeners.get(event)
      ?.delete(callback)
  }
}

export const eventBus = new EventBus()

export const openEntryModalEvent = () => eventBus.trigger(`ENTRY_MODAL:OPEN`)
export const closeEntryModalEvent = () => eventBus.trigger(`ENTRY_MODAL:CLOSE`)
export const openDeleteModalEvent = () => eventBus.trigger(`DELETE_MODAL:OPEN`)
export const closeDeleteModalEvent = () => eventBus.trigger(`DELETE_MODAL:CLOSE`)
export const reloadEntriesEvent = () => eventBus.trigger(`TABLE:RELOAD_ENTRIES`)
export const resetEntryEvent = () => eventBus.trigger(`TABLE:RESET_ENTRY`)
export const copyEntryEvent = () => eventBus.trigger(`TABLE:COPY_ENTRY`)