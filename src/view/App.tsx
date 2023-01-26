import React, { Suspense } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Loading } from './components/Loading'
import { ThemeProvider } from './providers/ThemeProvider'
import { H1 } from 'frr-web/lib/html'
import { PersonProvider } from './providers/PersonProvider'
import { PersonForm } from './components/PersonForm'
import { useTranslation } from 'react-i18next'

export const App = () => {
  const { t } = useTranslation()

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading label={t('app.loading')} />}>
        <ThemeProvider>
          <PersonProvider>
            <H1 label={'app.title'} />
            <PersonForm />
          </PersonProvider>
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  )
}
