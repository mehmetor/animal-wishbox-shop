"use client";

import React, { useEffect, useMemo, useActionState } from "react";

import Input from "@modules/common/components/input";
import NativeSelect from "@modules/common/components/native-select";

import AccountInfo from "../account-info";
import { HttpTypes } from "@medusajs/types";
import { addCustomerAddress, updateCustomerAddress } from "@lib/data/customer";
import CountrySelect from "@/modules/checkout/components/country-select";

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer;
  regions: HttpTypes.StoreRegion[];
};

const ProfileBillingAddress: React.FC<MyInformationProps> = ({
  customer,
  regions,
}) => {
  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries?.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
          }));
        })
        .flat() || []
    );
  }, [regions]);

  const [successState, setSuccessState] = React.useState(false);

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing,
  );

  const initialState: Record<string, any> = {
    isDefaultBilling: true,
    isDefaultShipping: false,
    error: false,
    success: false,
  };

  if (billingAddress) {
    initialState.addressId = billingAddress.id;
  }

  const [state, formAction] = useActionState(
    billingAddress ? updateCustomerAddress : addCustomerAddress,
    initialState,
  );

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    setSuccessState(state.success);
  }, [state]);

  const currentInfo = useMemo(() => {
    if (!billingAddress) {
      return <span className="text-muted-foreground">Fatura adresi yok</span>;
    }

    const country =
      regionOptions?.find(
        (country) => country?.value === billingAddress.country_code,
      )?.label || billingAddress.country_code?.toUpperCase();

    return (
      <div className="flex flex-col font-semibold" data-testid="current-info">
        <span>
          {billingAddress.first_name} {billingAddress.last_name}
        </span>
        <span>{billingAddress.company}</span>
        <span>{billingAddress.address_1}</span>
        {billingAddress.address_2 ? (
          <span>{billingAddress.address_2}</span>
        ) : null}
        <span>
          {billingAddress.postal_code}, {billingAddress.city}
          {billingAddress.province ? `, ${billingAddress.province}` : ""}
        </span>
        <span>{country}</span>
      </div>
    );
  }, [billingAddress, regionOptions]);

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <input type="hidden" name="addressId" value={billingAddress?.id || ""} />
      <AccountInfo
        label="Fatura Adresi"
        currentInfo={currentInfo}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={
          typeof state.error === "string"
            ? state.error
            : "Bir hata oluştu, lütfen daha sonra tekrar deneyiniz."
        }
        clearState={clearState}
        data-testid="account-billing-address-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="Ad"
              name="first_name"
              defaultValue={billingAddress?.first_name || ""}
              required
              data-testid="billing-first-name-input"
            />
            <Input
              label="Soyad"
              name="last_name"
              defaultValue={billingAddress?.last_name || ""}
              required
              data-testid="billing-last-name-input"
            />
          </div>
          <Input
            label="Şirket"
            name="company"
            defaultValue={billingAddress?.company || ""}
            data-testid="billing-company-input"
          />
          <Input
            label="Adres"
            name="address_1"
            defaultValue={billingAddress?.address_1 || ""}
            required
            data-testid="billing-address-1-input"
          />
          <Input
            label="Adres 2"
            name="address_2"
            defaultValue={billingAddress?.address_2 || ""}
            data-testid="billing-address-2-input"
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <Input
              label="Posta Kodu"
              name="postal_code"
              defaultValue={billingAddress?.postal_code || ""}
              required
              data-testid="billing-postcal-code-input"
            />
            <Input
              label="İlçe"
              name="city"
              defaultValue={billingAddress?.city || ""}
              required
              data-testid="billing-city-input"
            />
          </div>
          <Input
            label="Şehir"
            name="province"
            defaultValue={billingAddress?.province || ""}
            required
            data-testid="billing-province-input"
          />
          <CountrySelect
            name="country_code"
            value={billingAddress?.country_code || ""}
            region={regions[0]}
            required
            data-testid="billing-country-code-select"
          />

          {/* <NativeSelect
            name="country_code"
            defaultValue={billingAddress?.country_code || undefined}
            required
            data-testid="billing-country-code-select"
          >
            <option value="">-</option>
            {regionOptions.map((option, i) => {
              return (
                <option key={i} value={option?.value}>
                  {option?.label}
                </option>
              );
            })}
          </NativeSelect> */}
        </div>
      </AccountInfo>
    </form>
  );
};

export default ProfileBillingAddress;
