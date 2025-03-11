import "./globals.css"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { cn } from "@lib/utils"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log("app/layout.tsx")
  const locale = await getLocale()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} data-mode="light">
      <body>
        <NextIntlClientProvider messages={messages}>
          <main
            className={cn(
              "min-h-screen",
              "bg-[url('/assets/pattern-light.svg')]",
              "dark:bg-[url('/assets/pattern-dark.svg')]"
            )}
          >
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
