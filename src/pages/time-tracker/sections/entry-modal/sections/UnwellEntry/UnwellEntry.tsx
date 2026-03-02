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
    unwellEntryState.updateUnwellEntryData({
      unwellEntryData: {
        id: unwellEntry?.id,
        date: unwellEntry.start,
        start: unwellEntry.start,
        end: unwellEntry.end,
      },
    })
  }, [])

  return (
    <UnwellEntryStateContext.Provider value={unwellEntryState}>
      <UnwellEntryContainer
        handleTriggerReloadState={handleTriggerReloadState}
      />
    </UnwellEntryStateContext.Provider>
  )
  
}