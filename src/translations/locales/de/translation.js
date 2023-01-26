export default {
  app: {
    title: 'Cypress Test App',
    loading: 'Starte Anwednung...',
  },

  sections: {
    personInfoTitle: 'Persönliche Angaben',
    addressTitle: 'Adresse',
    contactTitle: 'Kontaktinformationen',
  },

  formFields: {
    country: {
      label: 'Land',
    },
    email: {
      label: 'E-Mail-Adresse',
    },
    firstName: {
      label: 'Vorname',
      sublabel: 'Bitte genau wie im Identitätsausweis angeben',
    },
    lastName: {
      label: 'Nachname',
      sublabel: 'Bitte genau wie im Identitätsausweis angeben',
    },
    phoneNumber: {
      label: 'Mobiltelefon&#173',
    },
    hasPrivacyPolicyAccepted: {
      label:
        'Ich habe die <a href="#" tabindex="-1">Allgemeinen Geschäftsbedingungen</a> sowie die <a href="https://bob.ch/en/corporate-clients/service/dataprotection/bob-zero/" target="_blank" tabindex="-1">Datenschutzrichtlinien</a> gelesen und akzeptiere diese.',
    },
    streetNameAndNr: {
      label: 'Strasse / Nr.',
    },
    hasNewsletter: {
      label:
        'Ich will den Newsletter abonieren, um über Neuigkeiten per Mail informiert zu werden.',
    },
    zipAndCity: {
      label: 'PLZ / Ort',
    },

    error: {
      fieldRequired: 'Diese Angabe ist obligatorisch.',
      invalidAmount:
        'Der eingegebene Betrag ist nicht zulässig. Bitte Angabe überprüfen',
      invalidCurrency: 'Bitte gültigen Betrag eingeben',
      invalidDate: 'Bitte geben Sie ein gültiges Datum ein (TT.MM.JJJJ)',
      invalidDuration:
        'Die eingegebene Laufzeit ist nicht zulässig. Bitte Angabe überprüfen',
      invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      invalidMaxAmount:
        'Der eingegebene Betrag ist zu hoch. Bitte Angabe überprüfen',
      invalidMinAmount:
        'Der eingegebene Betrag ist zu niedrig. Bitte Angabe überprüfen',
      invalidMobileTitle: 'Bitte geben Sie eine gültige Telefonnummer ein',
      invalidStreetNumber: 'Bitte geben Sie eine gültige Hausnummer ein',
      invalidText: 'Bitte geben Sie gültige Zeichen ein',
      invalidValue:
        'Die eingegebene Wert ist nicht zulässig. Bitte Angabe überprüfen',
      invalidZip: 'Bitte geben Sie eine gültige Postleitzahl ein',
      maxError: 'Der Wert überschreitet das Maximum',
      minError: 'Der Wert liegt unter dem Minimum',
    },
  },

  actions: {
    submit: 'Absenden',
  }
}
