export { DeprecatedLanguage } from 'frr-web/lib/theme/language'
import { Person } from '../../src/types/Person'
import { FormButtonProps, FormProps } from 'frr-web/lib/form/components/Form'
import { FormField } from 'frr-web/lib/form/components/types'
import { DeprecatedLanguage } from 'frr-web/lib/theme/language'

export type Language = DeprecatedLanguage
export type TestPerson = Person

export type TestModuleActions = {
  actionId?: string
  actions?: Array<{
    dataTestId: string
    disabledAfter?: boolean
    disabledBefore?: boolean
    click?: boolean
  }>
}

export type TestOptions = {
  baseUrl?: string
  isMobile?: boolean
  language?: {
    overwriteLanguage?: string
    testElement?: {
      itemId: string
      textBefore?: string
      textCurrent: string
    }
  }
}

export type TestAutoSuggestOptions = Array<{
  fieldId: string
  inputValue?: string
  selectValue?: string
  sequenceNr?: number
  prefilledValue?: string
}>

export type TestSliderOptions = { useInputField: boolean }

export type TestModuleOptions = TestModuleActions & {
  autoSuggestOptions?: TestAutoSuggestOptions
  data?: any
  dateOptions?: { dateFormat?: string; skipFormat?: boolean }
  skipFormFields: Array<string>
  skipSubmit?: boolean
  sliderOptions?: TestSliderOptions
}

export type OmittedFormProps<
  T,
  C = Record<string, unknown>,
  S = Record<string, unknown>,
> = Omit<
  FormProps<T>,
  'buttons' | 'data' | 'display' | 'formFields' | 'onChange' | 'onSubmit'
> & {
  buttons?: Array<
    Omit<FormButtonProps<T>, 'onClick'> & {
      onClick: (params: { submit: () => void }) => void
    }
  >
  onSubmit: (
    params: {
      formState: T
      language: Language
    } & S,
  ) => void
  formFields:
    | Array<FormField<T>>
    | ((config: C & { formState: T }) => Array<FormField<T>>)
}
