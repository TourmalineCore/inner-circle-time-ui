import { eventBus, EventBusType } from "../../event-bus"
import { MetricsContainer } from "./MetricsContainer"
import { MetricsState } from "./state/MetricsState"
import { MetricsStateContext } from "./state/MetricsStateContext"

describe(`MetricsContainer`, () => {
  describe(`Event Call`, eventCallTests)
  describe(`Metrics Request`, metricsRequestTests)   
})

function eventCallTests() {
  it(`
  GIVEN a metrics container
  WHEN ENTRIES_CHANGED event is published
  SHOULD make complete network call to get metrics
  `, () => {
    cy.intercept(`GET`, `**/reporting/metrics?startDate=2026-09-14&endDate=2026-09-20`, {
      statusCode: 200,
    })
      .as(`getMetrics`)

    mountComponent()

    cy.get(`@eventBusSubscribe`)
      .should(
        `have.been.calledWith`,
        EventBusType.ENTRIES_CHANGED,
      )

    cy.wait(`@getMetrics`)
      .its(`response.statusCode`)
      .should(`eq`, 200)

    cy.then(() => {
      eventBus.publish(EventBusType.ENTRIES_CHANGED)
    })

    cy.wait(`@getMetrics`)
      .its(`response.statusCode`)
      .should(`eq`, 200)
  })
}

function metricsRequestTests() {
  it(`
  GIVEN a metrics container
  WHEN the component is rendered
  SHOULD make a network call for the start and end of the week
  `, () => {
    cy.intercept(`GET`, `**/reporting/metrics?startDate=2026-09-14&endDate=2026-09-20`, {
      statusCode: 200,
    })
      .as(`getMetrics`)

    mountComponent({
      dateWithinWeek: `2026-09-14`,
    })

    cy.wait(`@getMetrics`)
  })
}

function mountComponent({
  dateWithinWeek = `2026-09-14`,
}: {
  dateWithinWeek?: string,
} = {}) {
  const metricsState = new MetricsState()

  cy.spy(eventBus, `subscribe`)
    .as(`eventBusSubscribe`)

  cy.spy(eventBus, `publish`)
    .as(`eventBusPublish`)

  cy
    .mount(
      <MetricsStateContext.Provider value={metricsState}>
        <MetricsContainer
          dateWithinWeek={dateWithinWeek}
        />
      </MetricsStateContext.Provider>,
    )
}