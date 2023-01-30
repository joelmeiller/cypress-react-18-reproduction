import { getPersona } from '../support/utils/getPersona'

describe('Person Form - Test 1', function () {
  let person

  before(function () {
    getPersona('person-1').then((p) => {
      person = p
    })
  })

  it('run test', function () {
    cy.testForm(person, {
      skipFormFields: [],
    })
  })
})
