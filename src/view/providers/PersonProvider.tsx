import { createContext, ReactNode, useContext, useState } from 'react'
import { Person } from '../../types/Person'

type PersonContextT = {
  value: Person
  setValue: (v: Person) => void
}

export const usePersonContext = (): PersonContextT => {
  const val = useContext(PersonContext)
  if (!val) {
    throw new Error(`Person not found.`)
  }
  return val
}

const PersonContext = createContext<PersonContextT | undefined>(undefined)
PersonContext.displayName = 'PersonContext'

const initialPerson: Person = {
  baseInfo: {
    name: null,
    surname: null,
    email: null,
    countryCode: null,
    phone: null,
    language: null,
  },
  address: {
    street: null,
    houseNr: null,
    city: null,
    zip: null,
    country: null,
  },
  optIns: {
    hasNewsletter: null,
    hasPrivacyPolicyAccepted: false,
  },
}
export const PersonProvider = (props: { children: ReactNode }) => {
  const [person, setPerson] = useState<Person>(initialPerson)

  return (
    <PersonContext.Provider value={{ value: person, setValue: setPerson }}>
      {props.children}
    </PersonContext.Provider>
  )
}
