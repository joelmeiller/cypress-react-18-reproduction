import { ButtonType } from 'frr-web/lib/components/Button'
import { Form, FormProps } from 'frr-web/lib/form/components/Form'
import { FormField, FormFieldType } from 'frr-web/lib/form/components/types'
import { makeFormLens } from 'frr-web/lib/form/util'
import { Person } from '../../types/Person'
import { usePersonContext } from '../providers/PersonProvider'
import {
  loadCitySuggestions,
  loadZipSuggestions,
} from '../utils/loadZipCitySuggestions'
import {
  validateCity,
  validateEmail,
  validateMobilePhoneNr,
  validateName,
  validateStreetNumber,
  validateZip,
} from '../utils/validate'
import { personFormFields } from './Person.formFields'

export const personFormProps: Pick<
  FormProps<Person>,
  'dataTestId' | 'formFields' | 'buttons'
> = {
  dataTestId: 'person-form',
  formFields: personFormFields,
  buttons: [
    {
      type: ButtonType.Primary,
      label: 'actions.submit',
      onClick: ({ submit }) => {
        submit()
      },
    },
  ],
}

export const PersonModule = (props: {}) => {
  const { value, setValue } = usePersonContext()

  return (
    <Form<Person>
      {...personFormProps}
      data={value}
      onChange={setValue}
      onSubmit={({ formState }) => {
        setValue(formState)
      }}
    />
  )
}
