export const getPersona = (personaFile: string) => {
  return cy.fixture(personaFile).then((persona) => {
    return persona
  })
}
