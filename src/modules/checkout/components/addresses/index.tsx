"use client";

import { useActionState } from "react";
import { CheckCircle, Pencil } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setAddresses } from "@lib/data/cart";
import compareAddresses from "@lib/util/compare-addresses";
import { HttpTypes } from "@medusajs/types";
import { useToggleState } from "@medusajs/ui";
import Divider from "@modules/common/components/divider";
import Spinner from "@modules/common/icons/spinner";
import BillingAddress from "../billing_address";
import ErrorMessage from "../error-message";
import ShippingAddress from "../shipping-address";
import { SubmitButton } from "../submit-button";
import { Button } from "@/components/ui/button";
import EditButton from "../edit-button";
import { cn } from "@/lib/utils";

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "address";

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true,
  );

  const handleEdit = () => {
    router.push(pathname + "?step=address");
  };

  const [message, formAction] = useActionState(setAddresses, null);

  return (
    <div className="">
      <div className="mt-4 mb-8 flex flex-row items-center justify-between">
        <h2
          className={cn("flex flex-row items-baseline gap-x-2 text-2xl", {
            "pointer-events-none select-none": !isOpen,
          })}
        >
          Teslimat Adresi
        </h2>
        {!isOpen && <CheckCircle />}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <h2 className="gap-x-4 pt-8 pb-6 text-2xl">Fatura Adresi</h2>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton className="mt-6" data-testid="submit-address-button">
              Devam et
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-sm font-normal">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex w-full items-start gap-x-1">
                  <div
                    className="flex w-1/3 flex-col"
                    data-testid="shipping-address-summary"
                  >
                    <p className="text-foreground mb-1 font-semibold">
                      Teslimat Adresi
                    </p>
                    <p className="text-muted-foreground font-medium">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </p>
                    <p className="text-muted-foreground font-medium">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </p>
                    <p className="text-muted-foreground font-medium">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </p>
                    <p className="text-muted-foreground font-medium">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </p>
                  </div>

                  <div
                    className="flex w-1/3 flex-col"
                    data-testid="shipping-contact-summary"
                  >
                    <p className="text-foreground mb-1 font-semibold">
                      İletişim
                    </p>
                    <p className="text-muted-foreground font-medium">
                      {cart.shipping_address.phone}
                    </p>
                    <p className="text-muted-foreground font-medium">
                      {cart.email}
                    </p>
                  </div>

                  <div
                    className="flex w-1/3 flex-col"
                    data-testid="billing-address-summary"
                  >
                    <p className="text-foreground mb-1 font-semibold">
                      Fatura Adresi
                    </p>

                    {sameAsBilling ? (
                      <p className="text-muted-foreground font-medium">
                        Fatura ve teslimat adresi aynı.
                      </p>
                    ) : (
                      <>
                        <p className="text-muted-foreground font-medium">
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </p>
                        <p className="text-muted-foreground font-medium">
                          {cart.billing_address?.address_1}{" "}
                          {cart.billing_address?.address_2}
                        </p>
                        <p className="text-muted-foreground font-medium">
                          {cart.billing_address?.postal_code},{" "}
                          {cart.billing_address?.city}
                        </p>
                        <p className="text-muted-foreground font-medium">
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}

      <EditButton
        handleEdit={handleEdit}
        visible={!isOpen && !!cart?.shipping_address}
      />

      <Divider className="mt-8" />
    </div>
  );
};

export default Addresses;
