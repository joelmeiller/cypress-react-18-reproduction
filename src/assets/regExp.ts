export const EMAIL_REGEX =
  // eslint-disable-next-line no-control-regex
  /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])[a-zA-Z0-9]$/

export const PHONE_REGEX = /^0?7[0-9]{1}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/

// At least one digit
export const ZIP_REGEXP = /(?=.*\d)/

export const ZERO_COUNTRY_CODE_OPTIONS = [
  {
    name: '+41',
    value: '+41',
  },
  {
    name: '+49',
    value: '+49',
  },
  {
    name: '+43',
    value: '+43',
  },
  {
    name: '+33',
    value: '+33',
  },
  {
    name: '+39',
    value: '+39',
  },
  {
    name: '+423',
    value: '+423',
  },
]

export const NAME_REGEXP = /^[A-Za-zÀ-ž- '`.]+$/
//repleaced on 6Jan22: export const NAME_REGEXP = /^[A-Za-zÀ-ž ]+$/
export const CITY_REGEXP = /^[A-Za-zÀ-ž- '()`.]+$/

export const STREET_NUMBER_REGEXP = /^[a-zA-Z0-9 ]*$/
