import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import de from './locales/de/translation.json'
import en from './locales/en/translation.json'

const DEBUG = false

i18next
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: DEBUG,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: 'common',
    resources: {
      de: { common: de },
      en: { common: en },
    },

    interpolation: {
      escapeValue: false, // react already safes from xss

      format: (value, format) => {
        let formattedValue = value

        if (format === 'Amount') {
          formattedValue = new Intl.NumberFormat('de-CH', {
            style: 'currency',
            currency: 'CHF',
            minimumIntegerDigits: 1,
          }).format(value.amount)
        }

        return formattedValue
      },
    },
  })
