// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { Person } from '../../../src/types/Person'
import { personFormFields } from '../../../src/view/modules/Person.formFields'
import { personFormProps } from '../../../src/view/modules/Person.module'
import { TestOptions, TestModuleOptions } from '../types'
import { testForm } from './utils/testForm'

declare global {
  namespace Cypress {
    interface Chainable {
      clickPrimaryFormButton(dataTestId?: string): Chainable<any>
      getByDataTestId(
        dataTestId: string,
        value?: string,
        options?: Partial<
          Cypress.Loggable &
            Cypress.Timeoutable &
            Cypress.Withinable &
            Cypress.Shadow
        >,
      ): Chainable<any>
      getByItemId(itemId: string): Chainable<any>
      startApplication(persona?: string, options?: TestOptions): void
      testForm(person: Person, options: TestModuleOptions): void
    }
  }
}

const log = !!Cypress.env('CYPRESS_LOG_ACTIVE')
const logOptions = { log }

Cypress.Commands.add(
  'startApplication',
  (persona?: string, options?: TestOptions) => {
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.window().then((window) => window.sessionStorage.clear())

    /*
     * Switch language on start-up
     */
    const language = options?.language || {}
    if (language.overwriteLanguage) {
      cy.wrap(language.overwriteLanguage, { log: false }).as('language')
    } else {
      cy.wrap('', { log: false }).as('language')
    }

    const basePath =
      Cypress.env('REACT_APP_ENVIRONMENT') !== 'development'
        ? (options?.baseUrl || '').replace(
            '<env>',
            Cypress.env('REACT_APP_ENVIRONMENT'),
          )
        : ''

    cy.get<string>('@language', { log: false }).then((language) => {
      cy.visit(`${basePath}/${language}`, logOptions)
    })

    cy.get('#root', { timeout: 10000, log })
      .children()
      .should('have.length.at.least', 1)
  },
)

Cypress.Commands.add(
  'getByDataTestId',
  (
    dataTestId: string,
    value?: string,
    options?: Partial<
      Cypress.Loggable &
        Cypress.Timeoutable &
        Cypress.Withinable &
        Cypress.Shadow
    >,
  ) => {
    return cy.get(
      `[data-test-id="${dataTestId}"]${value ? `[value=${value}]` : ''}`,
      {
        ...options,
        log,
      },
    )
  },
)

Cypress.Commands.add('getByItemId', (itemId: string) => {
  return cy.get(`[itemid="${itemId}"]`, logOptions)
})

Cypress.Commands.add('clickPrimaryFormButton', (dataTestId?: string) => {
  return cy
    .get(
      `[data-test-id='${dataTestId || 'form:primary'}']:not([disabled])`,
      logOptions,
    )
    .should('exist', logOptions)
    .click({ force: true, log })
})

Cypress.Commands.add('testForm', (person, options) => {
  cy.visit('/', logOptions)
  testForm(
    {
      formFields: personFormFields,
    },
    person,
    options,
  )
})
