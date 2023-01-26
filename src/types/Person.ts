export type Person = {
  baseInfo: {
    name: string | null
    surname: string | null
    email: string | null
    countryCode: string | null
    phone: string | null
    language: string | null
  }
  address: {
    street: string | null
    houseNr: string | null
    city: string | null
    zip: string | null
    country: string | null
  }
  optIns: {
    hasNewsletter: boolean | null
    hasPrivacyPolicyAccepted: boolean
  }
}
