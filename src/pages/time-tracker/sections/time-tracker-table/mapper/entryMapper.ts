import { AwayWithMakeUpTimeEntryDto, GetEntriesByPeriodResponse, MakeUpTimeEntryWithRelatedEntryDto, ProjectDto, SickLeaveEntryDto, TaskEntryDto, UnwellEntryDto } from "@tourmalinecore/inner-circle-time-api-js-client"
import moment from "moment"

export class EntryMapper {
  public static toEntryList({
    entriesResponse,
    projects,
  }: {
    entriesResponse: GetEntriesByPeriodResponse,
    projects: ProjectDto[],
  }) {
    const {
      taskEntries,
      unwellEntries,
      awayWithMakeUpTimeEntries,
      makeUpTimeEntries,
      sickLeaveEntries, 
    } = entriesResponse

    return {
      entries: [
        ...this.mapTaskEntries({
          taskEntries,
          projects,
        }),
        ...this.mapUnwellEntries({
          unwellEntries,
        }),
        ...this.mapAwayWithMakeUpTimeEntries({
          awayWithMakeUpTimeEntries,
        }),
        ...this.mapMakeUpTimeEntries({
          makeUpTimeEntries,
        }), 
      ],
      allDayEntries: [
        ...this.mapSickLeaveEntries({
          sickLeaveEntries,
        }),
      ],
    }
  }

  private static mapTaskEntries({
    taskEntries,
    projects,
  }: {
    taskEntries: TaskEntryDto[],
    projects: ProjectDto[],
  } ) {
    return taskEntries
      .map((taskEntry) => ({
        id: taskEntry.id,
        taskId: taskEntry.taskId,
        description: taskEntry.description,
        project: projects.find((project) => project.id === taskEntry.projectId)!,
        title: taskEntry.title,
        type: taskEntry.type,
        date: moment(taskEntry.startTime)
          .toDate(),
        start: moment(taskEntry.startTime)
          .toDate(),
        end: moment(taskEntry.endTime)
          .toDate(),
      }))
  }

  private static mapUnwellEntries({
    unwellEntries,
  }: {
    unwellEntries: UnwellEntryDto[],
  } ) {
    return unwellEntries
      .map((unwellEntry) => ({
        id: unwellEntry.id,
        type: unwellEntry.type,
        date: moment(unwellEntry.startTime)
          .toDate(),
        start: moment(unwellEntry.startTime)
          .toDate(),
        end: moment(unwellEntry.endTime)
          .toDate(),
      }))
  }

  private static mapAwayWithMakeUpTimeEntries({
    awayWithMakeUpTimeEntries,
  }: {
    awayWithMakeUpTimeEntries: AwayWithMakeUpTimeEntryDto[],
  } ) {
    return awayWithMakeUpTimeEntries
      .map((awayWithMakeUpTimeEntry) => ({
        id: awayWithMakeUpTimeEntry.id,
        type: awayWithMakeUpTimeEntry.type,
        description: awayWithMakeUpTimeEntry.description,
        date: moment(awayWithMakeUpTimeEntry.startTime)
          .toDate(),
        start: moment(awayWithMakeUpTimeEntry.startTime)
          .toDate(),
        end: moment(awayWithMakeUpTimeEntry.endTime)
          .toDate(),
        makeUpTimeList: awayWithMakeUpTimeEntry.makeUpTimeList,
      }))
  }

  private static mapMakeUpTimeEntries({
    makeUpTimeEntries,
  }: {
    makeUpTimeEntries: MakeUpTimeEntryWithRelatedEntryDto[],
  } ) {
    return makeUpTimeEntries
      .map((makeUpTimeEntry) => ({
        relatedEntryId: makeUpTimeEntry.relatedEntryId,
        relatedEntryType: makeUpTimeEntry.relatedEntryType,
        type: makeUpTimeEntry.type,
        date: moment(makeUpTimeEntry.startTime)
          .toDate(),
        start: moment(makeUpTimeEntry.startTime)
          .toDate(),
        end: moment(makeUpTimeEntry.endTime)
          .toDate(),
      }))
  }

  private static mapSickLeaveEntries({
    sickLeaveEntries,
  }: {
    sickLeaveEntries: SickLeaveEntryDto[],
  } ) {
    return sickLeaveEntries
      .map((sickLeaveEntry) => ({
        id: sickLeaveEntry.id,
        type: sickLeaveEntry.entryType,
        start: moment(sickLeaveEntry.period.startDate)
          .startOf(`day`)
          .toDate(),
        end: moment(sickLeaveEntry.period.endDate)
          .endOf(`day`)
          .toDate(),
        isAllDayEntry: true,
      }))
  }
}