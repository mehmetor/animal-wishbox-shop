"use client";

import React, { useEffect, useState, useActionState } from "react";

import useToggleState from "@lib/hooks/use-toggle-state";
import CountrySelect from "@modules/checkout/components/country-select";
import Input from "@modules/common/components/input";
import Modal from "@modules/common/components/modal";
import Spinner from "@modules/common/icons/spinner";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import { HttpTypes } from "@medusajs/types";
import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@lib/data/customer";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MagicCard } from "@/components/magicui/magic-card";
import { AlertDescription, Alert } from "@/components/ui/alert";
import { AlertTitle } from "@/components/ui/alert";

type EditAddressProps = {
  region: HttpTypes.StoreRegion;
  address: HttpTypes.StoreCustomerAddress;
  isActive?: boolean;
};

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const { state, open, close: closeModal } = useToggleState(false);

  const [formState, formAction] = useActionState(updateCustomerAddress, {
    success: false,
    error: null,
    addressId: address.id
  });

  const close = () => {
    setSuccessState(false);
    closeModal();
  };

  useEffect(() => {
    if (successState) {
      close();
    }
  }, [successState]);

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true);
    }
  }, [formState]);

  const removeAddress = async () => {
    setRemoving(true);
    await deleteCustomerAddress(address.id);
    setRemoving(false);
  };

  return (
    <>
      <Card
        className={cn("", {
          "border-secondary": isActive,
        })}
        data-testid="address-container"
      >
        <MagicCard className="p-2">
          <CardHeader>
            <h2 className="text-left font-semibold" data-testid="address-name">
              {address.first_name} {address.last_name}
            </h2>
            {address.company && (
              <p
                className="text-foreground text-sm"
                data-testid="address-company"
              >
                {address.company}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <p className="flex flex-col text-left text-base">
              <span data-testid="address-address">
                {address.address_1}
                {address.address_2 && <span>, {address.address_2}</span>}
              </span>
              <span data-testid="address-postal-city">
                {address.postal_code}, {address.city}
              </span>
              <span data-testid="address-province-country">
                {address.province && `${address.province}, `}
                {address.country_code?.toUpperCase()}
              </span>
            </p>
          </CardContent>
          <CardFooter className="justify-end gap-x-2">
            <Button
              variant="outline"
              className="font-normal"
              onClick={open}
              data-testid="address-edit-button"
            >
              <Edit />
              Düzenle
            </Button>
            <Button
              variant="outline"
              onClick={removeAddress}
              data-testid="address-delete-button"
            >
              {removing ? <Spinner /> : <Trash />}
            </Button>
          </CardFooter>
        </MagicCard>
      </Card>

      <div>
        <Modal isOpen={state} close={close} data-testid="edit-address-modal">
          <form action={formAction}>
            <Modal.Title>Adresi Düzenle</Modal.Title>
            <Modal.Body>
              <div className="grid w-full grid-cols-1 gap-y-2">
                <input type="hidden" name="addressId" value={address.id} />
                <div className="grid grid-cols-2 gap-x-2">
                  <Input
                    label="İsim"
                    name="first_name"
                    required
                    autoComplete="given-name"
                    defaultValue={address.first_name || undefined}
                    data-testid="first-name-input"
                  />
                  <Input
                    label="Soyisim"
                    name="last_name"
                    required
                    autoComplete="family-name"
                    defaultValue={address.last_name || undefined}
                    data-testid="last-name-input"
                  />
                </div>
                <Input
                  label="Şirket"
                  name="company"
                  autoComplete="organization"
                  defaultValue={address.company || undefined}
                  data-testid="company-input"
                />
                <Input
                  label="Adres"
                  name="address_1"
                  required
                  autoComplete="address-line1"
                  defaultValue={address.address_1 || undefined}
                  data-testid="address-1-input"
                />
                <Input
                  label="Adres 2"
                  name="address_2"
                  autoComplete="address-line2"
                  defaultValue={address.address_2 || undefined}
                  data-testid="address-2-input"
                />
                <div className="grid grid-cols-[144px_1fr] gap-x-2">
                  <Input
                    label="Posta Kodu"
                    name="postal_code"
                    required
                    autoComplete="postal-code"
                    defaultValue={address.postal_code || undefined}
                    data-testid="postal-code-input"
                  />
                  <Input
                    label="İlçe"
                    name="city"
                    required
                    defaultValue={address.city || undefined}
                    data-testid="city-input"
                  />
                </div>
                <Input
                  label="Şehir"
                  name="province"
                  defaultValue={address.province || undefined}
                  required
                  data-testid="state-input"
                />
                <CountrySelect
                  name="country_code"
                  region={region}
                  required
                  autoComplete="country"
                  value={address.country_code || undefined}
                  data-testid="country-select"
                />
                <Input
                  label="Telefon"
                  name="phone"
                  autoComplete="phone"
                  defaultValue={address.phone || undefined}
                  data-testid="phone-input"
                />
              </div>
              {formState.error && (
                <Alert variant="destructive">
                  <AlertTitle>Hata</AlertTitle>
                  <AlertDescription>{formState.error}</AlertDescription>
                </Alert>
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
      </div>
    </>
  );
};

export default EditAddress;
