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
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeDocument, setActiveDocument] =
    useState<LegalDocumentType | null>(null);
  const [preliminaryFormAccepted, setPreliminaryFormAccepted] =
    useState(false);
  const [salesContractAccepted, setSalesContractAccepted] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);

  const handleOpenDocument = (documentType: LegalDocumentType) => {
    setActiveDocument(documentType);
    setModalOpen(true);
  };

  const isSubmitDisabled = !preliminaryFormAccepted || !salesContractAccepted;

  return (
    <div
      className="flex max-w-sm flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="mb-6 font-semibold">Animal Wishbox Üyesi Ol</h1>
      <p className="text-foreground mb-4 text-center text-base">
        Üye profilinizi oluşturun ve gelişmiş bir alışveriş deneyimine erişin.
      </p>
      {/* <div className="text-foreground my-4 w-full rounded-md bg-amber-100 p-4 text-center text-sm">
        <span className="font-semibold">Önemli:</span> Daha önce misafir olarak
        sipariş verdiyseniz, siparişlerinizi görüntülemek için{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.RESET_PASSWORD)}
          className="text-primary font-semibold underline"
        >
          şifre oluşturmanız
        </button>{" "}
        gerekmektedir. Yeni üyelik oluşturmak, eski siparişlerinize erişim
        sağlamaz.
      </div> */}
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

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-x-2 text-sm">
            <Checkbox
              id="preliminary-information-form"
              checked={preliminaryFormAccepted}
              onCheckedChange={() =>
                setPreliminaryFormAccepted(!preliminaryFormAccepted)
              }
            />
            <label
              htmlFor="preliminary-information-form"
              className="cursor-pointer"
            >
              <button
                type="button"
                onClick={() =>
                  handleOpenDocument("preliminary-information-form")
                }
                className="text-primary underline"
              >
                Ön Bilgilendirme Formunu
              </button>{" "}
              okudum ve kabul ediyorum.
            </label>
          </div>
          <div className="flex items-center gap-x-2 text-sm">
            <Checkbox
              id="distance-sales-contract"
              checked={salesContractAccepted}
              onCheckedChange={() =>
                setSalesContractAccepted(!salesContractAccepted)
              }
            />
            <label
              htmlFor="distance-sales-contract"
              className="cursor-pointer"
            >
              <button
                type="button"
                onClick={() => handleOpenDocument("distance-sales-contract")}
                className="text-primary underline"
              >
                Mesafeli Satış Sözleşmesini
              </button>{" "}
              okudum ve kabul ediyorum.
            </label>
          </div>
          <div className="flex items-center gap-x-2 text-sm">
            <Checkbox
              id="consent-document"
              checked={consentAccepted}
              onCheckedChange={() => setConsentAccepted(!consentAccepted)}
            />
            <label htmlFor="consent-document" className="cursor-pointer">
              <button
                type="button"
                onClick={() => handleOpenDocument("consent-document")}
                className="text-primary underline"
              >
                Açık Rıza Metni
              </button>{" "}
              kapsamında ticari elektronik ileti gönderilmesini kabul ediyorum.
            </label>
          </div>
        </div>
        <SubmitButton
          className="mt-6 w-full"
          data-testid="register-button"
          disabled={isSubmitDisabled}
        >
          Üye Ol
        </SubmitButton>
      </form>
      <span className="text-foreground mt-6 flex w-full flex-row justify-between text-center text-sm font-normal">
        <div>
          Zaten üye misiniz?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="text-primary underline"
          >
            Giriş Yap
          </button>
        </div>

        <button
          onClick={() => setCurrentView(LOGIN_VIEW.RESET_PASSWORD)}
          className="text-primary underline"
        >
          Şifremi Unuttum
        </button>
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
