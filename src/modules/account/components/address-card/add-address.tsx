"use client";

import { useEffect, useState, useActionState } from "react";

import useToggleState from "@lib/hooks/use-toggle-state";
import CountrySelect from "@modules/checkout/components/country-select";
import Input from "@modules/common/components/input";
import Modal from "@modules/common/components/modal";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import { HttpTypes } from "@medusajs/types";
import { addCustomerAddress } from "@lib/data/customer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";

const AddAddress = ({
  region,
  addresses,
}: {
  region: HttpTypes.StoreRegion;
  addresses: HttpTypes.StoreCustomerAddress[];
}) => {
  const [successState, setSuccessState] = useState(false);
  const { state, open, close: closeModal } = useToggleState(false);

  const [formState, formAction] = useActionState(addCustomerAddress, {
    isDefaultShipping: addresses.length === 0,
    success: false,
    error: null,
  });

  const close = () => {
    setSuccessState(false);
    closeModal();
  };

  useEffect(() => {
    if (successState) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState]);

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true);
    }
  }, [formState]);

  return (
    <>
      <Card
        className="flex w-full cursor-pointer"
        onClick={open}
        data-testid="add-address-button"
      >
        <MagicCard>
          <CardContent className="flex h-full min-h-[280px] flex-col items-center justify-evenly gap-y-2">
            <span className="font-semibold">Yeni Adres</span>
            <Plus size={64} color="gray" strokeWidth={1} />
          </CardContent>
        </MagicCard>
      </Card>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <form action={formAction}>
          <Modal.Title>Adres Ekle</Modal.Title>
          <Modal.Body>
            <div className="flex w-full flex-col gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  label="İsim"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                />
                <Input
                  label="Soyisim"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
              </div>
              <Input
                label="Şirket"
                name="company"
                autoComplete="organization"
                data-testid="company-input"
              />
              <Input
                label="Adres"
                name="address_1"
                required
                autoComplete="address-line1"
                data-testid="address-1-input"
              />
              <Input
                label="Adres 2"
                name="address_2"
                autoComplete="address-line2"
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  label="Posta Kodu"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                />
                <Input
                  label="İlçe"
                  name="city"
                  required
                  data-testid="city-input"
                />
              </div>
              <Input
                label="Şehir"
                name="province"
                required
                data-testid="state-input"
              />
              <CountrySelect
                region={region}
                name="country_code"
                required
                autoComplete="country"
                data-testid="country-select"
              />
              <Input
                label="Telefon"
                name="phone"
                autoComplete="phone"
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div
                className="text-destructive py-2 text-sm font-normal"
                data-testid="address-error"
              >
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="reset"
              variant="outline"
              onClick={close}
              data-testid="cancel-button"
            >
              İptal
            </Button>
            <SubmitButton data-testid="save-button">Kaydet</SubmitButton>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddAddress;
