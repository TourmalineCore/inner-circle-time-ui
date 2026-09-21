import { eventBus, EventBusType } from "../../event-bus"
import { MetricsContainer } from "./MetricsContainer"
import { MetricsState } from "./state/MetricsState"
import { MetricsStateContext } from "./state/MetricsStateContext"

describe(`MetricsContainer`, () => {
  describe(`Event Call`, eventCallTests)   
})

function eventCallTests() {
  it(`
  GIVEN a metrics container
  WHEN ENTRIES_CHANGED event is published
  SHOULD make complete network call to get metrics
  `, () => {
    cy.intercept(`GET`, `**/reporting/metrics?startDate=2026-09-14&endDate=2026-09-20`, {
      statusCode: 200,
      body: {
        trackedHours: 8, 
      },
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

function mountComponent() {
  const metricsState = new MetricsState()

  cy.spy(eventBus, `subscribe`)
    .as(`eventBusSubscribe`)

  cy.spy(eventBus, `publish`)
    .as(`eventBusPublish`)

  cy
    .mount(
      <MetricsStateContext.Provider value={metricsState}>
        <MetricsContainer
          startDate={`2026-09-14`}
          endDate={`2026-09-20`}
        />
      </MetricsStateContext.Provider>,
    )
}