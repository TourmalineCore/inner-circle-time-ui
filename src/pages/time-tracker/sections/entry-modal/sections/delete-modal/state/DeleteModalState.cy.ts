import { DeleteModalState } from "./DeleteModalState"

describe(`DeleteModalState`, () => {
  describe(`Initial Data`, initialTests)
  describe(`Setters Data`, settersTests)
})

function initialTests() {
  let deleteModalState: DeleteModalState

  beforeEach(() => {
    deleteModalState = new DeleteModalState()
  })

  it(`
  GIVEN a new DeleteModalState
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(deleteModalState.deletionReason)
      .to
      .eq(``) 
  })
}

function settersTests() {
  let deleteModalState: DeleteModalState

  beforeEach(() => {
    deleteModalState = new DeleteModalState()
  })

  it(`
  GIVEN a state with initial values
  WHEN set reason of deletion 
  SHOULD save this reason to state
  `, () => {
    const deletionReason = `Wrong date`

    deleteModalState.setDeletionReason({
      deletionReason,
    })

    expect(deleteModalState.deletionReason)
      .to
      .eq(deletionReason)
  })
}
