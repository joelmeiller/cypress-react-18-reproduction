import { ButtonType } from 'frr-web/lib/components/Button'
import { Form, FormProps } from 'frr-web/lib/form/components/Form'
import { Person } from '../../types/Person'
import { usePersonContext } from '../providers/PersonProvider'
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

export const PersonModule = (props: { onSubmit: () => void }) => {
  const { value, setValue } = usePersonContext()

  return (
    <Form<Person>
      {...personFormProps}
      data={value}
      onChange={setValue}
      onSubmit={({ formState }) => {
        console.log('SUBMIT', formState)
        setValue(formState)
        props.onSubmit()
      }}
    />
  )
}
