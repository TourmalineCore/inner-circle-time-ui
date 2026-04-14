import { createContext } from "react"
import { PersonalReportState } from "./PersonalReportState"

export const PersonalReportStateContext = createContext<PersonalReportState>(null as unknown as PersonalReportState)
