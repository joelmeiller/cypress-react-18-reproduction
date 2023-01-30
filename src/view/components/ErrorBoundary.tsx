import { MediaQuery } from 'frr-web/lib/theme/configure.theme'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { DeprecatedLanguage as Language } from 'frr-web/lib/theme/language'

const Wrapper = styled.div`
  width: 100vw;
  height: var(--view-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  flex-direction: column;
`
const Container = styled.div`
  width: 580px;
  height: 580px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.03);

  @media ${MediaQuery.Mobile} {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  & > h1 {
    max-width: 480px;
    font-size: 32px;
    font-weight: 700;
    margin: 24px 16px 8px;
    font-family: Helvetica;
    text-align: center;
  }

  & > h3 {
    max-width: 480px;
    font-size: 18px;
    opacity: 0.5;
    margin: 8px 16px;
    font-family: Helvetica;
    text-align: center;
  }

  & > p {
    max-width: 480px;
    font-size: 14px;
    opacity: 0.5;
    margin: 8px 16px 32px;
    font-family: Helvetica;
    text-align: center;
  }
`

const Button = styled.div`
  border: 0;
  min-width: 96px;
  padding: 4px 24px;
  color: white;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 4px;
  font-family: Arial;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: rgba(80, 80, 80, 1);
  }
`

const errorTranslations = {
  title: {
    [Language.DE]: 'Hoppla, da ist was schief gelaufen.',
    [Language.EN]: 'An error occured',
    [Language.FR]: 'Oups! Un problème est survenu.',
    [Language.IT]: 'Ops, qualcosa è andato storto.',
  },
  subtitle: {
    [Language.DE]:
      'Entweder liegt zurzeit ein technisches Problem vor oder die gewünschte Seite konnte nicht gefunden werden.',
    [Language.EN]: 'We apologise for the inconvience.',
    [Language.FR]:
      'Soit il y a actuellement un problème technique, soit la page souhaitée est introuvable.',
    [Language.IT]:
      'Si è verificato un problema tecnico oppure non è stato possibile trovare la pagina desiderata.',
  },
  description: {
    [Language.DE]:
      'Das tut uns leid. Bitte versuchen Sie es später noch einmal.',
    [Language.EN]:
      'We are sorry for the inconvenience caused. Please try again later.',
    [Language.FR]:
      'Nous en sommes désolés. Veuillez réessayer à nouveau plus tard.',
    [Language.IT]: 'Siamo spiacenti. La preghiamo di riprovare più tardi.',
  },
  button: {
    [Language.DE]: 'Nochmals versuchen',
    [Language.EN]: 'Try again',
    [Language.FR]: 'Réessayer',
    [Language.IT]: 'Riprova',
  },
}

export class ErrorBoundary extends React.Component<{ children: ReactNode }> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  render() {
    const state = this.state as { hasError: boolean; errorLabel: string }
    let language = window.location.pathname.split('/')[1] as Language
    if (
      ![Language.DE, Language.EN, Language.FR, Language.IT].includes(language)
    ) {
      language = Language.EN
    }

    return state.hasError ? (
      <Wrapper>
        <Container>
          <img
            src={'/warning.svg'}
            style={{ width: 144, height: 144 }}
            alt='warning'
          />
          <h1>{errorTranslations.title[language]}</h1>
          <h3>{errorTranslations.subtitle[language]}</h3>
          <p>{errorTranslations.description[language]}</p>

          <Button
            onClick={() => {
              const win = window as any
              win.localStorage.clear()
              win.sessionStorage.clear()
              win.location.reload()
            }}
          >
            {errorTranslations.button[language]}
          </Button>
        </Container>
      </Wrapper>
    ) : (
      // eslint-disable-next-line react/prop-types
      this.props.children
    )
  }
}
