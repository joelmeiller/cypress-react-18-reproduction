import { TestModuleActions } from '../../types'

const log = !!Cypress.env('CYPRESS_LOG_ACTIVE')
const logOptions = { log }

export const testActionsBefore = ({ actionId, actions }: TestModuleActions) => {
  if (actions) {
    cy.get(
      `[data-test-id="${actionId || 'form-actions'}"] button`,
      logOptions,
    ).should('have.length', actions.length)
    actions.forEach((action) => {
      const button = cy.getByDataTestId(action.dataTestId).should('exist')
      if (action.disabledBefore) {
        button.should('be.disabled')
      }
    })
  }
}

export const testActionsAfter = ({
  actionId,
  actions,
  isSubmit,
}: TestModuleActions & {
  isSubmit?: boolean
}) => {
  let clickButtonTestDataId: string | null = null
  let isClickButtonDisabled = false

  if (actions) {
    cy.get(
      `[data-test-id="${actionId || 'form-actions'}"] button`,
      logOptions,
    ).should('have.length', actions.length)

    actions.forEach((action) => {
      const button = cy.getByDataTestId(action.dataTestId).should('exist')
      if (action.disabledAfter) {
        button.should('be.disabled')
        isClickButtonDisabled = !!action.click
      }
      if (!!action.click) {
        clickButtonTestDataId = action.dataTestId
      }
    })
  }

  if (clickButtonTestDataId) {
    !isClickButtonDisabled &&
      cy
        .get(
          `[data-test-id='${clickButtonTestDataId}']:not([disabled])`,
          logOptions,
        )
        .should('exist')
        .click({ force: true, log })
  } else if (isSubmit) {
    cy.clickPrimaryFormButton()
  }
}
