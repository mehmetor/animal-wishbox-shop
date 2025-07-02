"use client";

import { useActionState, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";

import { LOGIN_VIEW } from "@modules/account/templates/login-template";
import Input from "@modules/common/components/input";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import ErrorMessage from "@modules/checkout/components/error-message";
import { requestPasswordReset, resetPassword } from "@lib/data/customer";
import { Button, buttonVariants } from "@/components/ui/button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

type Props = {
  setCurrentView?: (view: LOGIN_VIEW) => void;
};

const ResetPassword = ({ setCurrentView }: Props) => {
  const { countryCode } = useParams();
  const searchParams = useSearchParams();

  const [requestState, requestFormAction] = useActionState(
    requestPasswordReset,
    {
      success: false,
      message: undefined,
    },
  );
  const [resetState, resetFormAction] = useActionState(resetPassword, {
    success: false,
    message: undefined,
  });

  const token = useMemo(() => searchParams.get("token"), [searchParams]);

  // E-postadan gelen link ile bu görünüm çalışır
  if (token) {
    if (resetState.success) {
      return (
        <div className="flex w-full max-w-sm flex-col items-center">
          <h1 className="mb-8 font-semibold">Şifreniz Güncellendi</h1>
          <p className="text-foreground mb-8 text-center text-base">
            {resetState.message}
          </p>
          <LocalizedClientLink
            href="/account"
            className={buttonVariants({ variant: "default" })}
          >
            Giriş Yap
          </LocalizedClientLink>
        </div>
      );
    }

    return (
      <div
        className="flex w-full max-w-sm flex-col items-center"
        data-testid="reset-password-page"
      >
        <h1 className="mb-8 font-semibold">Yeni Şifre Belirle</h1>
        <p className="text-foreground mb-8 text-center text-base">
          Lütfen yeni şifrenizi oluşturun.
        </p>
        <form className="w-full" action={resetFormAction}>
          <input type="hidden" name="token" value={token} />
          <input
            type="hidden"
            name="countryCode"
            value={countryCode as string}
          />
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
            <Input
              label="Yeni Şifre (Tekrar)"
              name="password_confirm"
              type="password"
              required
              data-testid="password-confirm-input"
            />
          </div>
          <ErrorMessage
            error={resetState.message}
            data-testid="error-message"
          />
          <SubmitButton className="mt-6 w-full" data-testid="submit-button">
            Onayla ve Giriş Yap
          </SubmitButton>
        </form>
      </div>
    );
  }

  // /account sayfasında "Şifremi Unuttum" tıklandığında bu görünüm çalışır
  return (
    <div
      className="flex w-full max-w-sm flex-col items-center"
      data-testid="reset-password-page"
    >
      <h1 className="mb-8 font-semibold">Şifremi Unuttum</h1>
      <p className="text-foreground mb-8 text-center text-base">
        Şifrenizi sıfırlamak için e-posta adresinizi girin. E-postanıza şifre
        sıfırlama bağlantısı göndereceğiz.
      </p>

      {requestState.success ? (
        <p className="text-center text-green-600">{requestState.message}</p>
      ) : (
        <form className="w-full" action={requestFormAction}>
          <div className="flex w-full flex-col gap-y-2">
            <Input
              label="E-posta"
              name="email"
              type="email"
              autoComplete="email"
              required
              data-testid="email-input"
            />
          </div>
          <ErrorMessage
            error={requestState.message}
            data-testid="error-message"
          />
          <SubmitButton className="mt-6 w-full" data-testid="submit-button">
            Sıfırlama linki gönder
          </SubmitButton>
        </form>
      )}
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
              className={buttonVariants({
                variant: "link",
                className: "pl-1",
              })}
              data-testid="sign-in-link"
            >
              Giriş Yap
            </LocalizedClientLink>
          )}
        </span>
      </div>
    </div>
  );
};

export default ResetPassword;
