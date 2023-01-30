import { format, isValid } from 'date-fns'
import {
  filterByHidden,
  filterByVisible,
} from 'frr-web/lib/form/components/functions/filter.form'
import { flatten } from 'frr-web/lib/form/components/functions/flatten'
import {
  FormFieldType,
  SingleFormField,
} from 'frr-web/lib/form/components/types'
import merge from 'lodash.merge'
import {
  OmittedFormProps,
  TestAutoSuggestOptions,
  TestModuleOptions,
  TestSliderOptions,
} from '../../types'
import { testActionsAfter, testActionsBefore } from './testActions'

const log = !!Cypress.env('CYPRESS_LOG_ACTIVE')
const logOptions = { log }

const getAmountValue = (v: any): number | null => {
  if (v === undefined || v === null) return null

  if (!isNaN(v)) return v

  let value: number | null = null
  if (typeof v === 'string') {
    const rv = v.replace(',', '.')
    const num = Number(rv)
    value = v === '' || isNaN(num) ? null : num
  }
  return value
}

const Formatter = new Intl.NumberFormat('de-CH', {
  style: 'currency',
  currency: 'CHF',
})

const testFormFieldVisible = <T extends {}>(params: {
  field: SingleFormField<T>
  formData: T
  formReadOnly: boolean
  options: {
    autoSuggest?: TestAutoSuggestOptions
    checkValueOnly?: boolean
    dateField?: { dateFormat?: string; skipFormatDate?: boolean }
    sliderField?: TestSliderOptions
  }
}) => {
  const { field, formData, formReadOnly = false, options } = params

  const id = field.lens.id()
  let value = field.lens.get(formData)
  const hasValue = value !== undefined && value !== null

  if (hasValue && log) {
    cy.log(`!!! Field ${field.type} / Id = ${id} / Value = ${value} !!!`)
  }

  switch (field.type) {
    case FormFieldType.MaskedDatePicker:
    case FormFieldType.DatePicker:
    case FormFieldType.FormattedDatePicker:
    case FormFieldType.MaskedDatePicker:
      if (hasValue) {
        cy.getByDataTestId(field.lens.id()).then(($elem) => {
          if (formReadOnly || field.readOnly) {
            cy.wrap($elem, logOptions)
              .invoke('attr', 'data-value')
              .should('eq', `${value}`)
          } else if ($elem && !$elem.attr('disabled')) {
            if (!!value && value > '') {
              const dateValue =
                !options.dateField?.skipFormatDate &&
                isValid(new Date(value as string))
                  ? format(
                      new Date(value as string),
                      options.dateField?.dateFormat || 'dd.MM.yyyy',
                    )
                  : value
              cy.wrap($elem, logOptions)
                .clear({ log: false })
                .type(`${dateValue}`)
            } else {
              cy.wrap($elem, logOptions).clear({ log: false })
            }
          }
        })
      }
      break
    case FormFieldType.NumberInput:
    case FormFieldType.TextArea:
    case FormFieldType.TextInput:
    case FormFieldType.TextNumber: {
      if (hasValue) {
        cy.getByDataTestId(field.lens.id()).then(($elem) => {
          if (formReadOnly || field.readOnly) {
            if (field.readOnlyOptions?.image) {
              cy.wrap($elem, logOptions)
                .invoke('attr', 'src')
                .should('eq', field.readOnlyOptions?.image)
            } else {
              // Special case email address: If email address contains capital letters, the backend transforms them lower case
              value =
                id === 'customer.baseInfo.email'
                  ? (value as string).toLowerCase()
                  : value

              cy.wrap($elem, logOptions)
                .invoke('attr', 'data-value')
                .should('eq', `${value}`)
            }
          } else if ($elem && !$elem.attr('disabled')) {
            cy.wrap($elem, logOptions)
              .clear({ log: false })
              .type(`${value}`, logOptions)
          }
        })
      }
      break
    }

    case FormFieldType.TextSelect:
    case FormFieldType.CountrySelect:
    case FormFieldType.NumberSelect: {
      if (hasValue) {
        cy.getByDataTestId(field.lens.id()).then(($elem) => {
          if (formReadOnly || field.readOnly) {
            cy.wrap($elem, logOptions)
              .invoke('attr', 'data-value')
              .should('eq', `${value}`)
          } else {
            cy.wrap($elem, logOptions).click(logOptions)
            cy.getByDataTestId(`${field.lens.id()}:option-${value}`).click(
              logOptions,
            )
          }
        })
      }
      break
    }

    case FormFieldType.TextInputAutosuggest: {
      if (hasValue) {
        cy.getByDataTestId(field.lens.id()).then(($elem) => {
          if (formReadOnly || field.readOnly) {
            if (field.readOnlyOptions?.image) {
              cy.wrap($elem, logOptions)
                .invoke('attr', 'src')
                .should('eq', field.readOnlyOptions?.image)
            } else {
              cy.wrap($elem, logOptions)
                .invoke('attr', 'data-value')
                .should('eq', `${value}`)
            }
          } else if ($elem && !$elem.attr('disabled')) {
            const autoSuggestOption = options.autoSuggest?.find(
              (option) => option.fieldId === field.lens.id(),
            )

            // If auto-suggest options are set use them
            if (autoSuggestOption) {
              // If input value and select value are given, start typing the input value and select the select value from the menu
              // or if the prefilled value is set, check that the value is there
              if (
                autoSuggestOption.inputValue &&
                autoSuggestOption.selectValue
              ) {
                cy.wrap($elem, logOptions)
                  .clear({ log: false })
                  .type(`${autoSuggestOption.inputValue}`, logOptions)
                cy.getByDataTestId(
                  `option-${autoSuggestOption.selectValue.toLowerCase()}`,
                ).click(logOptions)
              } else if (autoSuggestOption.prefilledValue) {
                cy.wrap($elem, logOptions)
                  .invoke('attr', 'value')
                  .should('eq', `${autoSuggestOption.prefilledValue}`)
              }
            } else {
              if (!!value && value > '') {
                cy.wrap($elem, logOptions)
                  .clear({ log: false })
                  .type(`${value}`, logOptions)
                  .blur(logOptions)
                cy.wait(500, { log: false })
              } else {
                cy.wrap($elem, logOptions).clear({ log: false })
              }
            }
          }
        })
      }
      break
    }

    case FormFieldType.CurrencyInput: {
      if (hasValue) {
        cy.getByDataTestId(field.lens.id()).then(($elem) => {
          if (formReadOnly || field.readOnly) {
            const amountValue = getAmountValue(value as string)
            cy.wrap($elem, logOptions)
              .invoke('attr', 'data-value')
              .should('eq', `${amountValue}`)

            if (amountValue !== null) {
              cy.wrap($elem, logOptions)
                .invoke('text')
                .should('eq', Formatter.format(amountValue))
            }
          } else if ($elem && !$elem.attr('disabled')) {
            cy.log('!!! CurrencyInput !!!', value)
            cy.wrap($elem, logOptions)
              .clear({ log: false })
              .type(`${value}`, logOptions)
          }
        })
      }
      break
    }

    case FormFieldType.CodeInput: {
      if (hasValue) {
        if (!!value && value > '') {
          cy.get('[data-theme-id="codeInput:input"]', logOptions)
            .first(logOptions)
            .type(`${value}`, logOptions)
        } else {
          cy.get('[data-theme-id="codeInput:input"]', logOptions).clear({
            log: false,
          })
        }
      }
      break
    }

    case FormFieldType.Slider: {
      if (!field.isDisabled) {
        cy.getByDataTestId(field.lens.id()).within(() => {
          if (options.checkValueOnly) {
            cy.getByDataTestId('slider-value').should('have.value', value)
          } else if (options.sliderField?.useInputField) {
            cy.getByDataTestId('slider-value').clear().type(`${value}`)
          } else {
            cy.get('.MuiSlider-rail', logOptions)
              .should('be.visible')
              .invoke('width')
              .then((width) => {
                if (width && value && typeof value === 'number' && field.step) {
                  const stepWidth =
                    (width / (field.max - field.min)) * field.step
                  const steps = (value - field.min) / field.step
                  const xPos = Math.round(
                    Math.floor(steps * stepWidth * 100) / 100,
                  )

                  // Try to find right position iteratively as there are differences between browsers and OS (e.g. Windows and Mac)

                  // 1. First attempt with click on xPos - 1px
                  cy.get('.MuiSlider-root', logOptions).click(
                    xPos - 1,
                    5,
                    logOptions,
                  )
                  cy.getByDataTestId('slider-value')
                    .then(($elem) => {
                      const sliderValue = $elem.attr(
                        field.isEditable ? 'value' : 'data-value',
                      )
                      log &&
                        cy.log(
                          `1. Attempt --> SLIDER DATA VALUE: ${sliderValue}`,
                        )
                      return cy.wrap(sliderValue === `${value}`, logOptions)
                    })
                    // 2. Second attempt with arrow right + 10 CHF
                    .then((found) => {
                      if (!found) {
                        cy.get('.MuiSlider-thumb', logOptions).type(
                          '{rightArrow}',
                          logOptions,
                        )
                        return cy
                          .getByDataTestId('slider-value')
                          .then(($elem) => {
                            const sliderValue = $elem.attr(
                              field.isEditable ? 'value' : 'data-value',
                            )
                            log &&
                              cy.log(
                                `2. Attempt --> SLIDER DATA VALUE: ${sliderValue}`,
                              )
                            return cy.wrap(
                              sliderValue === `${value}`,
                              logOptions,
                            )
                          })
                      } else {
                        return cy.wrap(found, logOptions)
                      }
                    })
                    // 3. Third attempt with arrow right + 10 CHF
                    .then((found) => {
                      if (!found) {
                        cy.get('.MuiSlider-thumb', logOptions).type(
                          '{rightArrow}',
                          logOptions,
                        )
                        return cy
                          .getByDataTestId('slider-value')
                          .then(($elem) => {
                            const sliderValue = $elem.attr(
                              field.isEditable ? 'value' : 'data-value',
                            )
                            log &&
                              cy.log(
                                `3. Attempt --> SLIDER DATA VALUE: ${sliderValue}`,
                              )
                            return cy.wrap(
                              sliderValue === `${value}`,
                              logOptions,
                            )
                          })
                      } else {
                        return cy.wrap(found, logOptions)
                      }
                    })
                    // 4. Fourth attempt with arrow right + 10 CHF
                    .then((found) => {
                      if (!found) {
                        cy.get('.MuiSlider-thumb', logOptions).type(
                          '{rightArrow}',
                          logOptions,
                        )
                        return cy
                          .getByDataTestId('slider-value')
                          .then(($elem) => {
                            const sliderValue = $elem.attr(
                              field.isEditable ? 'value' : 'data-value',
                            )
                            log &&
                              cy.log(
                                `4. Attempt --> SLIDER DATA VALUE: ${sliderValue}`,
                              )
                            return cy.wrap(
                              sliderValue === `${value}`,
                              logOptions,
                            )
                          })
                      } else {
                        return cy.wrap(found, logOptions)
                      }
                    })
                    .then((found) => {
                      expect(found, `Loan amount ${value} not found`).to.be.true
                    })
                }
              })
          }
        })
      }
      break
    }

    case FormFieldType.RadioGroup:
    case FormFieldType.OptionGroup: {
      if (hasValue) {
        if (formReadOnly || field.readOnly) {
          cy.getByDataTestId(field.lens.id()).then(($elem) => {
            cy.wrap($elem, logOptions)
              .invoke('attr', 'data-value')
              .should('eq', `${value}`)
          })
        } else {
          cy.getByDataTestId(`${field.lens.id()}:${value}`).click({
            force: true,
            log,
          })
        }
      }
      break
    }

    case FormFieldType.YesNoRadioGroup:
    case FormFieldType.YesNoOptionGroup: {
      if (value !== null) {
        if (formReadOnly || field.readOnly) {
          cy.getByDataTestId(field.lens.id()).then(($elem) => {
            cy.wrap($elem, logOptions)
              .invoke('attr', 'data-value')
              .should('eq', `${value}`)
          })
        } else {
          if (options.checkValueOnly) {
            cy.getByDataTestId(`${field.lens.id()}:${value || false}`).should(
              'have.class',
              'active',
            )
          } else {
            cy.getByDataTestId(`${field.lens.id()}:${value || false}`).click({
              force: true,
              log,
            })
          }
        }
      }
      break
    }

    case FormFieldType.Toggle: {
      if (formReadOnly || field.readOnly) {
        cy.getByDataTestId(field.lens.id()).then(($elem) => {
          cy.wrap($elem, logOptions)
            .invoke('attr', 'data-value')
            .should('eq', `${value}`)
        })
      } else {
        cy.get(`[data-test-id="${field.lens.id()}"] button`, logOptions)
          .invoke('attr', 'value')
          .then((toggleValue) => {
            if (`${value}` !== toggleValue) {
              cy.getByDataTestId(field.lens.id()).click(logOptions)
            }
          })
      }
      break
    }

    case FormFieldType.FileInput: {
      // Do nothing
    }

    default:
    // Do nothing
  }
}

const testFormFieldHidden = <T extends {}>(field: SingleFormField<T>) => {
  cy.getByDataTestId(field.lens.id()).should('not.exist')
}

const translate = (v: string) => v

export const testForm = <T extends {}>(
  formProps: {
    formFields: OmittedFormProps<T>['formFields']
    readOnly?: boolean
    dataTestId?: string
    onSubmit?: any
  },
  data: T,
  options: TestModuleOptions = { skipFormFields: [] },
  meta?: { formState: T },
) => {
  const formData = merge({}, data, options.data)

  const formFields =
    (Array.isArray(formProps.formFields) && formProps.formFields) ||
    (meta && formProps.formFields(meta)) ||
    []

  const hiddenFormFields = flatten(
    filterByHidden({ data: formData, formFields, translate }),
    formData,
  ).filter((field) => !options.skipFormFields.includes(field.lens.id()))

  const visibleFormFields = arrangeFieldOrder(
    flatten(
      filterByVisible({ data: formData, formFields, translate }),
      formData,
    ).filter((field) => !options.skipFormFields.includes(field.lens.id())),
    options.autoSuggestOptions,
  )

  cy.wait(1000, { log: false })

  if (formProps.dataTestId) {
    cy.getByDataTestId(formProps.dataTestId).within(() => {
      testActionsBefore(options)

      visibleFormFields.forEach((field) => {
        testFormFieldVisible({
          field,
          formData,
          formReadOnly: !!formProps.readOnly,
          options: {
            dateField: options.dateOptions,
            autoSuggest: options.autoSuggestOptions,
            sliderField: options.sliderOptions,
          },
        })
      })

      hiddenFormFields.forEach(testFormFieldHidden)

      testActionsAfter({
        actionId: 'form-actions',
        isSubmit: !!formProps.onSubmit && !options.skipSubmit,
        ...options,
      })
    })
  } else {
    cy.get('form', logOptions).then(($form) => {
      $form.on('submit', (e) => {
        e.preventDefault()
      })
    })
    testActionsBefore(options)

    visibleFormFields.forEach((field) => {
      testFormFieldVisible({
        field,
        formData,
        formReadOnly: !!formProps.readOnly,
        options: {
          dateField: options.dateOptions,
          autoSuggest: options.autoSuggestOptions,
          sliderField: options.sliderOptions,
        },
      })
    })

    hiddenFormFields.forEach(testFormFieldHidden)

    testActionsAfter({
      actionId: 'form-actions',
      isSubmit: !!formProps.onSubmit && !options.skipSubmit,
      ...options,
    })
  }
}

const arrangeFieldOrder = (
  fields: Array<SingleFormField<any>>,
  autoSuggestOptions?: TestAutoSuggestOptions,
) => {
  let arrangedFields = [...fields]

  const hasSequence =
    autoSuggestOptions?.findIndex((option) => option.sequenceNr) !== -1

  if (hasSequence) {
    const orderableFields =
      autoSuggestOptions?.sort(
        (a, b) => (a.sequenceNr || 0) - (b.sequenceNr || 0),
      ) || []
    arrangedFields = arrangeNextField(fields, orderableFields)
  }

  return arrangedFields
}

const arrangeNextField = (
  fields: Array<SingleFormField<any>>,
  orderableFields: TestAutoSuggestOptions,
) => {
  if (orderableFields.length <= 1) {
    return fields
  } else {
    const nextOrderableFields = orderableFields.slice(2)
    const currentOrderableFieldIndex = fields.findIndex(
      (field) => field.lens.id() === orderableFields[0].fieldId,
    )
    const nextOrderableFieldIndex = fields.findIndex(
      (field) => field.lens.id() === orderableFields[1].fieldId,
    )

    if (
      currentOrderableFieldIndex !== -1 &&
      nextOrderableFieldIndex !== -1 &&
      currentOrderableFieldIndex > nextOrderableFieldIndex
    ) {
      // Swap elements
      const tempField = fields[nextOrderableFieldIndex]
      fields[nextOrderableFieldIndex] = fields[currentOrderableFieldIndex]
      fields[currentOrderableFieldIndex] = tempField
    }

    return arrangeNextField(fields, nextOrderableFields)
  }
}
