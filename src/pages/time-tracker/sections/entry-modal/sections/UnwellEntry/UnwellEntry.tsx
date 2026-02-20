import { useEffect, useMemo } from "react"
import { UnwellEntryStateContext } from "./state/UnwellEntryStateContext"
import { UnwellEntryData } from "../../../../types"
import { UnwellEntryState } from "./state/UnwellEntryState"
import { UnwellEntryContainer } from "./UnwellEntryContainer"

export function UnwellEntry({
  unwellEntry,
  handleTriggerReloadState,
}: {
  unwellEntry: UnwellEntryData,
  handleTriggerReloadState: () => unknown,
}) {
  const unwellEntryState = useMemo(
    () => new UnwellEntryState(),
    [],
  )

  useEffect(() => {
    setUnwellEntryData(unwellEntry)
  }, [])

  return (
    <UnwellEntryStateContext.Provider value={unwellEntryState}>
      <UnwellEntryContainer
        handleTriggerReloadState={handleTriggerReloadState}
      />
    </UnwellEntryStateContext.Provider>
  )
  
  function setUnwellEntryData({
    id,
    start,
    end,
  }: UnwellEntryData) {
    unwellEntryState.setDate({
      date: start!,
    })

    unwellEntryState.setStartTime({
      startTime: start!,
    })
    
    unwellEntryState.setEndTime({
      endTime: end!,
    })

    if (id) {
      unwellEntryState.setId({
        id,
      })
    }
  }
}