"use client"

import { useActionState, useEffect, useMemo, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import ErrorMessage from "@modules/checkout/components/error-message"
import { requestPasswordReset, resetPassword } from "@lib/data/customer"
import { Button, buttonVariants } from "@/components/ui/button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  setCurrentView?: (view: LOGIN_VIEW) => void
}

const ResetPassword = ({ setCurrentView }: Props) => {
  const { countryCode } = useParams()
  const searchParams = useSearchParams()

  const [requestState, requestFormAction, isRequestPending] = useActionState(requestPasswordReset, null)
  const [resetState, resetFormAction, isResetPending] = useActionState(resetPassword, null)

  const token = useMemo(() => searchParams.get("token"), [searchParams])

  // Handle the case where the user is redirected back from the password reset email
  if (token) {
    return (
      <div className="flex w-full max-w-sm flex-col items-center" data-testid="reset-password-page">
        <h1 className="mb-8 font-semibold">Yeni Şifre Belirle</h1>
        <p className="text-foreground mb-8 text-center text-base">
          Lütfen yeni şifrenizi girin.
        </p>
        <form className="w-full" action={resetFormAction}>
          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="countryCode" value={countryCode as string} />
          <div className="flex w-full flex-col gap-y-2">
            <Input
              label="E-posta"
              name="email"
              type="email"
              autoComplete="email"
              required
              data-testid="email-input"
              defaultValue={searchParams.get("email") || ""}
            />
            <Input
              label="Yeni Şifre"
              name="password"
              type="password"
              required
              data-testid="password-input"
            />
          </div>
          <ErrorMessage error={resetState} data-testid="error-message" />
          <SubmitButton className="w-full mt-6" data-testid="submit-button">
            Şifreyi Güncelle
          </SubmitButton>
        </form>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center" data-testid="reset-password-page">
      <h1 className="mb-8 font-semibold">Şifremi Unuttum</h1>
      <p className="text-foreground mb-8 text-center text-base">
        Şifrenizi sıfırlamak için e-posta adresinizi girin. E-postanıza şifre sıfırlama bağlantısı göndereceğiz.
      </p>
      <form className="w-full" action={requestFormAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="E-posta"
            name="email"
            type="email"
            autoComplete="email"
            required
            data-testid="email-input"
          />
        </div>
        <ErrorMessage error={requestState} data-testid="error-message" />
        <SubmitButton className="w-full mt-6" data-testid="submit-button">
          Sıfırlama linki gönder
        </SubmitButton>
      </form>
      <div className="text-foreground mt-6 flex w-full flex-row justify-evenly text-sm font-normal">
        <span className="inline-block">
          Şifreni hatırladın mı?{" "}
          {setCurrentView ? (
            <Button
              variant="link"
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className="pl-1"
              data-testid="sign-in-button"
            >
              Giriş Yap
            </Button>
          ) : (
            <LocalizedClientLink
              href="/account"
              className={buttonVariants({ variant: "link", className: "pl-1" })}
              data-testid="sign-in-link"
            >
              Giriş Yap
            </LocalizedClientLink>
          )}
        </span>
      </div>
    </div>
  )
}

export default ResetPassword 