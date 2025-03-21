"use client";

import { useActionState, useState } from "react";
import Input from "@modules/common/components/input";
import { LOGIN_VIEW } from "@modules/account/templates/login-template";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { signup } from "@lib/data/customer";
import {
  LegalDocumentModal,
  LegalDocumentType,
} from "@/modules/content/legal-documents/components/legal-document-modal";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeDocument, setActiveDocument] =
    useState<LegalDocumentType | null>(null);

  const handleOpenDocument = (documentType: LegalDocumentType) => {
    setActiveDocument(documentType);
    setModalOpen(true);
  };

  return (
    <div
      className="flex max-w-sm flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="mb-6 font-semibold">Animal Wishbox Üyesi Ol</h1>
      <p className="text-foreground mb-4 text-center text-base">
        Üye profilinizi oluşturun ve gelişmiş bir alışveriş deneyimine erişin.
      </p>
      <form className="flex w-full flex-col" action={formAction}>
        <div className="flex w-full flex-col gap-y-2">
          <Input
            label="Adınız"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Soyadınız"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="E-posta"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Telefon Numaranız"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Şifreniz"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-foreground mt-6 text-center text-sm font-normal">
          Üye olarak, Animal Wishbox&apos;ın{" "}
          <button
            type="button"
            onClick={() => handleOpenDocument("privacy-policy")}
            className="text-primary underline"
          >
            Gizlilik Politikası
          </button>{" "}
          ve{" "}
          <button
            type="button"
            onClick={() => handleOpenDocument("terms-of-use")}
            className="text-primary underline"
          >
            Kullanım Sözleşmesi
          </button>
          .
        </span>
        <SubmitButton className="mt-6 w-full" data-testid="register-button">
          Üye Ol
        </SubmitButton>
      </form>
      <span className="text-foreground mt-6 text-center text-sm font-normal">
        Zaten üye misiniz?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Giriş Yap
        </button>
        .
      </span>

      <LegalDocumentModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        documentType={activeDocument}
      />
    </div>
  );
};

export default Register;
