import { FormProps } from 'frr-web/lib/form/components/Form'
import { FormFieldType } from 'frr-web/lib/form/components/types'
import { makeFormLens } from 'frr-web/lib/form/util'
import { Person } from '../../types/Person'
import {
  loadCitySuggestions,
  loadZipSuggestions
} from '../utils/loadZipCitySuggestions'
import {
  validateCity,
  validateEmail,
  validateMobilePhoneNr,
  validateName,
  validateStreetNumber,
  validateZip
} from '../utils/validate'

const mkPersonLens = makeFormLens<Person>()

export const personFormFields: FormProps<Person>['formFields'] = [
  {
    type: FormFieldType.FormSection,
    title: 'sections.personInfoTitle',
    fields: [
      [
        {
          label: {
            label: 'formFields.firstName.label',
            sublabel: 'formFields.firstName.sublabel',
          },
          name: 'given-name',
          type: FormFieldType.TextInput,
          lens: mkPersonLens(['baseInfo', 'name']),
          required: true,
          validate: validateName,
        },
      ],

      [
        {
          label: {
            label: 'formFields.lastName.label',
            sublabel: 'formFields.lastName.sublabel',
          },
          name: 'family-name',
          type: FormFieldType.TextInput,
          lens: mkPersonLens(['baseInfo', 'surname']),
          required: true,
          validate: validateName,
        },
      ],
    ],
  },
  {
    type: FormFieldType.FormSection,
    title: 'sections.addressTitle',
    fields: [
      {
        type: FormFieldType.MultiInput,
        label: { label: 'formFields.streetNameAndNr.label' },
        fields: [
          {
            itemStyle: {
              marginRight: 0,
            },
            name: 'address-line1',
            required: true,
            type: FormFieldType.TextInput,
            lens: mkPersonLens(['address', 'street']),
            validate: validateName,
          },
          {
            style: {
              wrapper: {
                marginRight: 'var(--multi-form-field-gap)',
                minWidth: 'var(--multi-form-field-street-nr-width)',
                maxWidth: 'var(--multi-form-field-street-nr-width)',
              },
            },
            itemStyle: {
              marginLeft: 0,
            },
            name: 'address-line2',
            type: FormFieldType.TextInput,
            maxLength: 4,
            lens: mkPersonLens(['address', 'houseNr']),
            validate: validateStreetNumber,
          },
        ],
      },
      {
        type: FormFieldType.MultiInputAutosuggest,
        label: { label: 'formFields.zipAndCity.label' },
        fields: [
          {
            style: {
              wrapper: {
                marginRight: 'var(--multi-form-field-gap)',
                minWidth: 'var(--multi-form-field-zip-width)',
                maxWidth: 'var(--multi-form-field-zip-width)',
              },
            },
            itemStyle: { marginRight: 0 },
            lens: mkPersonLens(['address', 'zip']),
            name: 'zip',
            onLoadSuggestions: loadZipSuggestions,
            required: true,
            type: FormFieldType.TextInputAutosuggest,
            validate: validateZip,
          },
          {
            itemStyle: { marginLeft: 0 },
            lens: mkPersonLens(['address', 'city']),
            name: 'city',
            onLoadSuggestions: loadCitySuggestions,
            required: true,
            type: FormFieldType.TextInputAutosuggest,
            validate: validateCity,
          },
        ],
      },
    ],
  },
  {
    type: FormFieldType.FormSection,
    title: 'sections.contactTitle',
    fields: [
      [
        {
          label: { label: 'formFields.email.label' },
          name: 'email',
          required: true,
          type: FormFieldType.TextInput,
          lens: mkPersonLens(['baseInfo', 'email']),
          validate: validateEmail,
        },
      ],
      {
        type: FormFieldType.TextInput,
        label: { label: 'formFields.phoneNumber.label' },
        name: 'phone',
        prefix: '+41',
        placeholder: 'formFields.phoneNumber.placeholder',
        lens: mkPersonLens(['baseInfo', 'phone']),
        validate: validateMobilePhoneNr,
      },
    ],
  },
  {
    type: FormFieldType.FormSection,
    fields: [
      {
        label: {
          label: 'formFields.hasNewsletter.label',
          style: {
            wrapper: { maxWidth: 660 },
          },
        },
        required: true,
        type: FormFieldType.YesNoRadioGroup,
        lens: mkPersonLens(['optIns', 'hasNewsletter']),
      },
    ],
  },
]
