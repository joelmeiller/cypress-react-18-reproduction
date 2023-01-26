import {
  CITY_REGEXP,
  EMAIL_REGEX,
  NAME_REGEXP,
  PHONE_REGEX,
  STREET_NUMBER_REGEXP,
  ZIP_REGEXP,
} from '../../assets/regExp'

export const validateZip = (value: any) =>
  !ZIP_REGEXP.test(`${value}`) ? 'formFields.error.invalidZip' : null

export const validateEmail = (value: any) =>
  !EMAIL_REGEX.test(`${value}`) ? 'formFields.error.invalidEmail' : null

export const validateMobilePhoneNr = (value: any) =>
  !PHONE_REGEX.test(`${value}`) ? 'formFields.error.invalidMobileTitle' : null

export const validateName = (value: string) =>
  !NAME_REGEXP.test(`${value}`) ? 'formFields.error.invalidText' : null

export const validateStreetNumber = (value: string) =>
  !STREET_NUMBER_REGEXP.test(`${value}`)
    ? 'formFields.error.invalidStreetNumber'
    : null

export const validateCity = (value: string) =>
  !CITY_REGEXP.test(`${value}`) ? 'formFields.error.invalidText' : null
