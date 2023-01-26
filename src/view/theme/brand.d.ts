import { ComponentThemeConfig } from "frr-web/lib/theme/theme.components"
import { FormThemeConfig } from "frr-web/lib/theme/theme.form"

export type BrandTheme = {
  brandName: string
  appTheme: ComponentThemeConfig
  formTheme: FormThemeConfig
  baseStyle: string
}
