import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { ModuleDelegator } from './components/Delegator'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Loading } from './components/Loading'
import { PersonProvider } from './providers/PersonProvider'
import { ThemeProvider } from './providers/ThemeProvider'

export const App = () => {
  const { t } = useTranslation()

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading label={t('app.loading')} />}>
        <ThemeProvider>
          <PersonProvider>
            <ModuleDelegator />
          </PersonProvider>
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  )
}
