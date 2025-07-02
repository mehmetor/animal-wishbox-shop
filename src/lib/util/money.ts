import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  locale = "tr-TR",
}: ConvertToLocaleParams) => {
  if (!currency_code || isEmpty(currency_code)) {
    return amount.toString()
  }

  // Sayıyı biçimlendir
  const formatter = new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits,
    maximumFractionDigits,
  })
  
  // Para birimi sembolünü al
  const currencySymbol = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency_code,
    currencyDisplay: "symbol",
  })
    .format(0)
    .replace(/[0-9.,\s]/g, "")
    .trim()
  
  const formattedNumber = formatter.format(amount)
  
  // Türkçe ve benzer diller için sembolü sağa, diğerleri için sola yerleştir
  // bu liste genişletilebilir
  const rightSymbolLocales = ["tr-TR", "de-DE", "fr-FR"]
  const isRightSymbol = rightSymbolLocales.some(rightLocale => 
    locale.startsWith(rightLocale.split("-")[0])
  )
  
  return isRightSymbol
    ? `${formattedNumber}\u00A0${currencySymbol}`
    : `${currencySymbol}${formattedNumber}`
}
