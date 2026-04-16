import { useMemo } from "react"
import { observer } from "mobx-react-lite"
import { PersonalReportState } from "./state/PersonalReportState"
import { PersonalReportStateContext } from "./state/PersonalReportStateContext"
import { PersonalReportContainer } from "./PersonalReportContainer"

export const PersonalReportPage = observer(() => {  
  const personalReportState = useMemo(  
    () => new PersonalReportState(),
    [], 
  )

  return (
    <>
      <PersonalReportStateContext.Provider value={personalReportState}>
        <PersonalReportContainer />
      </PersonalReportStateContext.Provider>
    </>
  )
})
