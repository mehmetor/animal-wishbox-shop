"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Pencil, Loader } from "lucide-react";
import { setShippingMethod } from "@lib/data/cart";
import { calculatePriceForShippingOption } from "@lib/data/fulfillment";
import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";
import ErrorMessage from "@modules/checkout/components/error-message";
import Divider from "@modules/common/components/divider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { MagicCard } from "@/components/magicui/magic-card";
import { MagicSwitchCard } from "@/components/magicui/magic-switch-card";
import EditButton from "../edit-button";

const PICKUP_OPTION_ON = "__PICKUP_ON";
const PICKUP_OPTION_OFF = "__PICKUP_OFF";

type ShippingProps = {
  cart: HttpTypes.StoreCart;
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null;
};

function formatAddress(address: any) {
  if (!address) {
    return "";
  }

  let ret = "";

  if (address.address_1) {
    ret += ` ${address.address_1}`;
  }

  if (address.address_2) {
    ret += `, ${address.address_2}`;
  }

  if (address.postal_code) {
    ret += `, ${address.postal_code} ${address.city}`;
  }

  if (address.country_code) {
    ret += `, ${address.country_code.toUpperCase()}`;
  }

  return ret;
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);

  const [showPickupOptions, setShowPickupOptions] =
    useState<string>(PICKUP_OPTION_OFF);
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null,
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "delivery";

  const _shippingMethods = availableShippingMethods?.filter(
    // @ts-ignore
    (sm) => sm.service_zone?.fulfillment_set?.type !== "pickup",
  );

  const _pickupMethods = availableShippingMethods?.filter(
    // @ts-ignore
    (sm) => sm.service_zone?.fulfillment_set?.type === "pickup",
  );

  const hasPickupOptions = !!_pickupMethods?.length;

  // Shipping method enabled states
  const [enabledShippingMethods, setEnabledShippingMethods] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    setIsLoadingPrices(true);

    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id));

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {};
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => (pricesMap[p.value?.id || ""] = p.value?.amount!));

          setCalculatedPricesMap(pricesMap);
          setIsLoadingPrices(false);
        });
      }
    }

    if (_pickupMethods?.find((m) => m.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON);
    }
  }, [availableShippingMethods]);

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false });
  };

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false });
  };

  const handleShippingMethodToggle = async (id: string, enabled: boolean) => {
    setError(null);
    setIsLoading(true);

    if (enabled) {
      await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });

      setShippingMethodId(id);
      setEnabledShippingMethods((prev) => ({
        ...Object.keys(prev).reduce(
          (acc, key) => ({ ...acc, [key]: false }),
          {},
        ),
        [id]: true,
      }));
    } else {
      // If disabling the current method, don't actually disable it
      setIsLoading(false);
    }
  };

  // Initialize enabled method
  useEffect(() => {
    if (shippingMethodId) {
      setEnabledShippingMethods({
        [shippingMethodId]: true,
      });
    }
  }, [shippingMethodId]);

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  return (
    <div className="">
      <div className="mt-4 mb-8 flex flex-row items-center justify-between">
        <h2
          className={cn("flex flex-row items-baseline gap-x-2 text-2xl", {
            "pointer-events-none opacity-50 select-none":
              !isOpen && cart.shipping_methods?.length === 0,
          })}
        >
          Teslimat
        </h2>
        {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && <CheckCircle />}
      </div>
      {isOpen ? (
        <>
          <div className="grid">
            <div className="flex flex-col">
              <span className="text-foreground font-medium">
                Teslimat yöntemi
              </span>
              <span className="text-muted-foreground mb-4">
                Siparişinizin nasıl teslim edilmesini istersiniz?
              </span>
            </div>
            <div data-testid="delivery-options-container">
              <div className="space-y-4 pt-2 pb-8 md:pt-0">
                {_shippingMethods?.map((option) => {
                  const isDisabled =
                    option.price_type === "calculated" &&
                    !isLoadingPrices &&
                    typeof calculatedPricesMap[option.id] !== "number";

                  const price =
                    option.price_type === "flat"
                      ? convertToLocale({
                          amount: option.amount!,
                          currency_code: cart?.currency_code,
                        })
                      : calculatedPricesMap[option.id]
                        ? convertToLocale({
                            amount: calculatedPricesMap[option.id],
                            currency_code: cart?.currency_code,
                          })
                        : "-";

                  return (
                    <MagicSwitchCard
                      key={option.id}
                      title={option.name}
                      description="Standart teslimat süresi: 2-5 iş günüdür. Stokta sorunu olabilecek ürünler için temin süresi 30 güne kadar uzayabilir. Bu durumda kargo takibi üzerinden bilgilendirme yapılacaktır."
                      rightContent={price}
                      checked={!!enabledShippingMethods[option.id]}
                      onCheckedChange={(checked) =>
                        handleShippingMethodToggle(option.id, checked)
                      }
                      onClick={() =>
                        handleShippingMethodToggle(
                          option.id,
                          !enabledShippingMethods[option.id],
                        )
                      }
                      disabled={isDisabled}
                      isLoading={
                        isLoadingPrices && option.price_type === "calculated"
                      }
                      testId="delivery-option-switch"
                    />
                  );
                })}

                {hasPickupOptions && (
                  <div className="mt-6">
                    <div className="mb-4 flex flex-col">
                      <span className="text-foreground font-medium">
                        Mağaza Teslimatı
                      </span>
                      <span className="text-foreground/70 font-medium">
                        Siparişinizi mağazadan teslim alın
                      </span>
                    </div>

                    {_pickupMethods?.map((option) => {
                      return (
                        <MagicSwitchCard
                          key={option.id}
                          title={option.name}
                          description={formatAddress(
                            // @ts-ignore
                            option.service_zone?.fulfillment_set?.location
                              ?.address,
                          )}
                          rightContent={convertToLocale({
                            amount: option.amount!,
                            currency_code: cart?.currency_code,
                          })}
                          checked={!!enabledShippingMethods[option.id]}
                          onCheckedChange={(checked) =>
                            handleShippingMethodToggle(option.id, checked)
                          }
                          onClick={() =>
                            handleShippingMethodToggle(
                              option.id,
                              !enabledShippingMethods[option.id],
                            )
                          }
                          disabled={option.insufficient_inventory}
                          className="mt-4"
                          testId="pickup-option-switch"
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />
            <Button
              size="lg"
              className="mt"
              onClick={handleSubmit}
              disabled={isLoading || !shippingMethodId}
              data-testid="submit-delivery-option-button"
            >
              {isLoading && <Loader className="animate-spin" />}
              Ödemeye devam et
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-row justify-between">
          {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
            <div className="flex flex-col">
              <p className="text-foreground mb-1 font-semibold">Yöntem</p>
              <p className="text-muted-foreground font-medium">
                {cart.shipping_methods?.at(-1)?.name}
                {": "}
                <span className="font-mono text-lg">
                  {convertToLocale({
                    // @ts-ignore
                    amount: cart.shipping_methods.at(-1)?.amount!,
                    currency_code: cart?.currency_code,
                  })}
                </span>
              </p>
            </div>
          )}

          <EditButton
            handleEdit={handleEdit}
            visible={
              !isOpen &&
              cart?.shipping_address &&
              cart?.billing_address &&
              !!cart?.email
            }
          />
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  );
};

export default Shipping;
