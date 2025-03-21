import { getRequestConfig } from "next-intl/server"
import { headers } from 'next/headers'

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  // const locale = "tr"

  // URL'den countryCode parametresini almak için
  // Not: Bu kod server-side çalıştığı için, headers() veya cookies() kullanabilirsiniz
  // Eğer dinamik route'tan almak istiyorsanız, bu fonksiyon içinde doğrudan erişemezsiniz
  // Bunun yerine, route handler'ınızda params'tan alıp context olarak geçirmeniz gerekir
  
  // Örnek olarak, eğer headers'tan bir bilgi almak isterseniz:
 
  const headersList = await headers()
  const countryCode = headersList.get("x-country-code") || "tr"

  console.log("Ülke Kodu:", countryCode)

  return {
    locale: countryCode,
    messages: (await import(`../../messages/${countryCode}.json`)).default,
  }
})
