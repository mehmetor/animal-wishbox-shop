import { Button } from "@/components/ui/button";
import { login } from "@lib/data/customer";
import { LOGIN_VIEW } from "@modules/account/templates/login-template";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import Input from "@modules/common/components/input";
import { useActionState } from "react";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null);

  return (
    <div
      className="flex w-full max-w-sm flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="mb-8 font-semibold">Hoşgeldiniz</h1>
      <p className="text-foreground mb-8 text-center text-base">
        Giriş yapmak için lütfen bilgilerinizi giriniz.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex w-full flex-col gap-y-2">
          <Input
            label="E-posta"
            name="email"
            type="email"
            title="Lütfen geçerli bir e-posta adresi giriniz."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Şifre"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton data-testid="sign-in-button" className="mt-6 w-full">
          Giriş Yap
        </SubmitButton>
      </form>
      <div className="text-foreground mt-6 flex flex-row justify-evenly w-full text-sm font-normal">
        <span className="inline-block">
          Üye değil misiniz?
          <Button
            variant="link"
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            data-testid="register-button"
            className="pl-1"
          >
            Üye Ol
          </Button>
        </span>
        <span className="inline-block">
          <Button
            variant="link"
            onClick={() => setCurrentView(LOGIN_VIEW.RESET_PASSWORD)}
            data-testid="reset-password-button"
            className="px-0"
          >
            Şifremi Unuttum
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Login;
