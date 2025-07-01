import { HttpTypes } from "@medusajs/types";
import { Container } from "@medusajs/ui";
import { mapKeys } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import AddressSelect from "../address-select";
import CountrySelect from "../country-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null;
  cart: HttpTypes.StoreCart | null;
  checked: boolean;
  onChange: () => void;
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.last_name": cart?.shipping_address?.last_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.company": cart?.shipping_address?.company || "",
    "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
    "shipping_address.city": cart?.shipping_address?.city || "",
    "shipping_address.country_code": cart?.shipping_address?.country_code || "",
    "shipping_address.province": cart?.shipping_address?.province || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
    email: cart?.email || "",
  });

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2),
    [cart?.region],
  );

  // check if customer has saved addresses that are in the current region
  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (a) => a.country_code && countriesInRegion?.includes(a.country_code),
      ),
    [customer?.addresses, countriesInRegion],
  );

  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string,
  ) => {
    address &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        "shipping_address.first_name": address?.first_name || "",
        "shipping_address.last_name": address?.last_name || "",
        "shipping_address.address_1": address?.address_1 || "",
        "shipping_address.company": address?.company || "",
        "shipping_address.postal_code": address?.postal_code || "",
        "shipping_address.city": address?.city || "",
        "shipping_address.country_code": address?.country_code || "",
        "shipping_address.province": address?.province || "",
        "shipping_address.phone": address?.phone || "",
      }));

    email &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        email: email,
      }));
  };

  useEffect(() => {
    // Ensure cart is not null and has a shipping_address before setting form data
    if (cart && cart.shipping_address) {
      setFormAddress(cart?.shipping_address, cart?.email);
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, customer.email);
    }
  }, [cart]); // Add cart as a dependency

  // Ülke değeri başka bir yerde hardcoded olarak bulunabilir
  // Bu değeri sadece ilk kez çalıştığında ata ve formData'da ülke kodu yoksa
  useEffect(() => {
    // Form verileri başlatıldığında ülke kodu için bir değer olduğundan emin olalım
    // ülke kodu yoksa default ülke kodunu ata
    if (
      cart?.region?.countries &&
      cart.region.countries.length > 0 &&
      !formData["shipping_address.country_code"]
    ) {
      const defaultCountry = cart.region.countries[0].iso_2;
      console.log("Ülke değeri yoktu, otomatik ayarlandı:", defaultCountry);
      setFormData((prevData) => ({
        ...prevData,
        "shipping_address.country_code": defaultCountry,
      }));
    }
  }, [cart?.region, formData["shipping_address.country_code"]]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Ülke seçimi için özel fonksiyon
  const handleCountryChange = (e: {
    target: { name: string; value: string };
  }) => {
    const value = e.target.value.trim();
    console.log("Ülke değişti:", e.target.name, value);
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  // Ülke seçimi için ülke kod değeri
  const countryCode = formData["shipping_address.country_code"] || "";

  return (
    <>
      {customer && (addressesInRegion?.length || 0) > 0 && (
        <Container className="mb-6 flex flex-col gap-y-4 px-0 py-4">
          <p className="text-sm font-normal">
            {`Merhaba ${customer.first_name}, kayıtlı adreslerinizden birini kullanmak ister misiniz?`}
          </p>
          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace("shipping_address.", ""),
              ) as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </Container>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="shipping_address.first_name">
            Ad {<span className="text-destructive">*</span>}
          </Label>
          <Input
            id="shipping_address.first_name"
            name="shipping_address.first_name"
            autoComplete="given-name"
            value={formData["shipping_address.first_name"]}
            onChange={handleChange}
            required
            data-testid="shipping-first-name-input"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="shipping_address.last_name">
            Soyad {<span className="text-destructive">*</span>}
          </Label>
          <Input
            id="shipping_address.last_name"
            name="shipping_address.last_name"
            autoComplete="family-name"
            value={formData["shipping_address.last_name"]}
            onChange={handleChange}
            required
            data-testid="shipping-last-name-input"
          />
        </div>
        <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
          <Label htmlFor="shipping_address.address_1">
            Adres {<span className="text-destructive">*</span>}
          </Label>
          <Textarea
            id="shipping_address.address_1"
            name="shipping_address.address_1"
            autoComplete="address-line1"
            value={formData["shipping_address.address_1"]}
            onChange={handleChange}
            required
            data-testid="shipping-address-input"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="shipping_address.postal_code">
            Posta Kodu {<span className="text-destructive">*</span>}
          </Label>
          <Input
            id="shipping_address.postal_code"
            name="shipping_address.postal_code"
            autoComplete="postal-code"
            value={formData["shipping_address.postal_code"]}
            onChange={handleChange}
            required
            data-testid="shipping-postal-code-input"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="shipping_address.city">
            İlçe {<span className="text-destructive">*</span>}
          </Label>
          <Input
            id="shipping_address.city"
            name="shipping_address.city"
            autoComplete="address-level2"
            value={formData["shipping_address.city"]}
            onChange={handleChange}
            required
            data-testid="shipping-city-input"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="shipping_address.province">
            Şehir
            {<span className="text-destructive">*</span>}
          </Label>
          <Input
            id="shipping_address.province"
            name="shipping_address.province"
            autoComplete="address-level1"
            value={formData["shipping_address.province"]}
            onChange={handleChange}
            required
            data-testid="shipping-province-input"
          />
        </div>
        <div className="flex flex-col gap-1">
          <CountrySelect
            name="shipping_address.country_code"
            autoComplete="country"
            region={cart?.region}
            value={countryCode}
            onChange={handleCountryChange}
            required
            data-testid="shipping-country-select"
          />
        </div>
        <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
          <Label htmlFor="shipping_address.company">Şirket</Label>
          <Input
            id="shipping_address.company"
            name="shipping_address.company"
            value={formData["shipping_address.company"]}
            onChange={handleChange}
            autoComplete="organization"
            data-testid="shipping-company-input"
          />
        </div>
      </div>

      <div className="my-8 flex items-center gap-2">
        <Switch
          id="same_as_billing"
          name="same_as_billing"
          checked={checked}
          onCheckedChange={onChange}
          data-testid="billing-address-checkbox"
        />
        <Label htmlFor="same_as_billing" className="cursor-pointer">
          Fatura adresi teslimat adresi ile aynı
        </Label>
      </div>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">
            E-posta {<span className="text-destructive">*</span>}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            title="Geçerli bir e-posta adresi giriniz."
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
            data-testid="shipping-email-input"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="shipping_address.phone">
            Telefon {<span className="text-destructive">*</span>}
          </Label>
          <Input
            id="shipping_address.phone"
            name="shipping_address.phone"
            autoComplete="tel"
            value={formData["shipping_address.phone"]}
            onChange={handleChange}
            data-testid="shipping-phone-input"
            required
          />
        </div>
      </div>
    </>
  );
};

export default ShippingAddress;
