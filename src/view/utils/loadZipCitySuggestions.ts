import { Option } from 'frr-web/lib/components/menu/Menu.types'
import { TextInputSuggestions } from "frr-web/lib/form/components/types"
import { ZipCityList } from "../../assets/zipCityList"

const ZipList = ZipCityList.map((item) => ({
  value: item.zip,
  label: `${item.zip} ${item.city}`,
  isTranslated: true,
  data: item,
}))

export const loadZipSuggestions = (
  searchString: string,
): Promise<TextInputSuggestions> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const zipCityOptions = ZipList.filter((item) =>
        item.value.startsWith(searchString),
      ).splice(0, 7)
      resolve(zipCityOptions)
    }, 0)
  })
}

const mapEmployerZipCity = (option: Option) => ({
  ...option,
  data: {
    ...option.data,
    employerCity: option.data.city,
    employerZip: option.data.zip,
  },
})

export const loadEmployerZipSuggestions = (
  searchString: string,
): Promise<TextInputSuggestions> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const zipCityOptions = ZipList.filter((item) =>
        item.value.startsWith(searchString),
      )
        .splice(0, 7)
        .map(mapEmployerZipCity)
      resolve(zipCityOptions)
    }, 0)
  })
}

const CityList = ZipCityList.map((item) => ({
  value: item.city,
  label: `${item.city} (${item.zip})`,
  isTranslated: true,
  data: item,
}))

export const loadCitySuggestions = (
  searchString: string,
): Promise<TextInputSuggestions> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const zipCityOptions = CityList.filter((item) =>
        item.value.toLowerCase().startsWith(searchString.toLowerCase()),
      ).splice(0, 7)
      resolve(zipCityOptions)
    }, 0)
  })
}

export const loadEmployerCitySuggestions = (
  searchString: string,
): Promise<TextInputSuggestions> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const zipCityOptions = CityList.filter((item) =>
        item.value.toLowerCase().startsWith(searchString.toLowerCase()),
      )
        .splice(0, 7)
        .map(mapEmployerZipCity)
      resolve(zipCityOptions)
    }, 0)
  })
}
