"use client";

import { Plus } from "@medusajs/icons";
import { Button, Heading } from "@medusajs/ui";
import { useEffect, useState, useActionState } from "react";

import useToggleState from "@lib/hooks/use-toggle-state";
import CountrySelect from "@modules/checkout/components/country-select";
import Input from "@modules/common/components/input";
import Modal from "@modules/common/components/modal";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import { HttpTypes } from "@medusajs/types";
import { addCustomerAddress } from "@lib/data/customer";

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
      <button
        className="border-ui-border-base flex h-full min-h-[220px] w-full flex-col justify-between rounded border p-5"
        onClick={open}
        data-testid="add-address-button"
      >
        <span className="text-base-semi">Yeni adres</span>
        <Plus />
      </button>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>
          <Heading className="mb-2">Adres Ekle</Heading>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-2">
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
            <div className="mt-6 flex gap-3">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-10"
                data-testid="cancel-button"
              >
                İptal
              </Button>
              <SubmitButton data-testid="save-button">Kaydet</SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddAddress;
