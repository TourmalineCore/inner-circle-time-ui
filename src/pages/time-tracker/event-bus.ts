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