import {
  useMobileTouch,
  useTouchDetector,
} from 'frr-web/lib/hooks/useMobileTouch'
import {
  ComponentThemeContext,
  configureComponentTheme,
} from 'frr-web/lib/theme/theme.components'
import {
  configureFormTheme,
  FormThemeContext,
} from 'frr-web/lib/theme/theme.form'
import { ReactNode, useEffect, useLayoutEffect } from 'react'
import { componentTheme } from '../theme/componentTheme'
import { formTheme } from '../theme/formTheme'
import { configureBaseStyle } from 'frr-web/lib/theme/configureBaseStyle'
import { resetStyleConfig } from '../theme/resetStyleConfig'
import { cypressBrand } from '../theme/cypress/cypress.brand'
import { cypressStyleConfig } from '../theme/cypress/cypress.styleConfig'

// Create getter and setter for CSS variable value
export const getCSSVariable = (varName: string) => {
  const root = document.querySelector(':root') as HTMLElement
  const rs = getComputedStyle(root)
  return rs.getPropertyValue(varName)
}
export const setCSSVariable = (varName: string, value: string) => {
  const root = document.querySelector(':root') as HTMLElement
  if (root) {
    root.style.setProperty(varName, value)
  }
}

const setViewportHeight = () => {
  setCSSVariable('--view-height', window.innerHeight + 'px')
}

export const ThemeProvider = (props: { children: ReactNode }) => {
  const { isMobile } = useMobileTouch()

  const BaseStyle = configureBaseStyle({
    baseStyle: `
${resetStyleConfig}
${cypressBrand.baseStyle}
`,
    brandBaseStyle: cypressBrand.baseStyle,
    isStyleConfigActive: true,
    styleConfig: cypressStyleConfig,
  })

  useLayoutEffect(() => {
    setViewportHeight()
  }, [])

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('resize', setViewportHeight)
    }
    return () => {
      !isMobile && window.removeEventListener('resize', setViewportHeight)
    }
  }, [isMobile])

  useTouchDetector()

  return (
    <ComponentThemeContext.Provider
      value={configureComponentTheme(componentTheme)}
    >
      <BaseStyle />

      <FormThemeContext.Provider value={configureFormTheme(formTheme)}>
        {props.children}
      </FormThemeContext.Provider>
    </ComponentThemeContext.Provider>
  )
}
