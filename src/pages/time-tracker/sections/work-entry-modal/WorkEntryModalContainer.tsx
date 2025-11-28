import { observer } from "mobx-react-lite"
import { WorkEntryModalContent } from "./WorkEntryModalContent"
import { api } from "../../../../common/api"
import { useContext } from "react"
import { WorkEntryModalStateContext } from "./state/WorkEntryModalStateContext"
import moment from "moment"

export const WorkEntryModalContainer = observer(({
  onClose,
}: {
  onClose: () => unknown,
}) => {
  const workEntryModalState = useContext(WorkEntryModalStateContext)

  return (
    <WorkEntryModalContent
      onClose={onClose}
      onAddWorkEntry={addWorkEntryAsync}
    />
  )
  
  async function addWorkEntryAsync() {
    const {
      title,
      taskId,
      date,
      start,
      end,
    } = workEntryModalState.workEntryModalData

    const startDateTime = concatDateAndTime({
      date,
      time: start,
    })

    const endDateTime = concatDateAndTime({
      date,
      time: end,
    })

    try {
      await api.post(`tracking/work-entries`,
        {
          title,
          taskId,
          startTime: startDateTime,
          endTime: endDateTime,
        },
      )
    }
    catch{ /* empty */ }
  }

  function concatDateAndTime({
    date,
    time,
  }: {
    date: Date,
    time: Date,
  }) {
    return moment(date)
      .hours(moment(time)
        .hours())
      .minutes(moment(time)
        .minutes())
      .seconds(moment(time)
        .seconds())
      .format(`YYYY-MM-DDTHH:mm:ss`)
  }
})
