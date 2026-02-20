import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { UnwellEntryStateContext } from "./state/UnwellEntryStateContext"
import axios from "axios"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { api } from "../../../../../../common/api/api"
import { UnwellEntryContent } from "./UnwellEntryContent"

export const UnwellEntryContainer = observer(({
  handleTriggerReloadState,
}: {
  handleTriggerReloadState: () => unknown,
}) => {
  const unwellEntryState = useContext(UnwellEntryStateContext)

  return (
    <UnwellEntryContent
      onSubmitUnwellEntryAsync={onSubmitUnwellEntryAsync}
    />
  )
  
  async function onSubmitUnwellEntryAsync() {
    const {
      id,
      date,
      start,
      end,
    } = unwellEntryState.unwellEntryData

    const startDateTime = concatDateAndTime({
      date: date!,
      time: start!,
    })

    const endDateTime = concatDateAndTime({
      date: date!,
      time: end!,
    })

    const unwellEntryData = {
      startTime: startDateTime,
      endTime: endDateTime,
    }

    try {
      id 
        ? await api.trackingUpdateUnwellEntry(id, unwellEntryData)
        : await api.trackingCreateUnwellEntry(unwellEntryData)

      handleTriggerReloadState()

      unwellEntryState.resetError()
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          unwellEntryState.setError({
            error: error.response.data.detail,
          })
        }
      }
    }
  }
})
