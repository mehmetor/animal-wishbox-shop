"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Pencil } from "lucide-react";
import { RadioGroup, Radio } from "@headlessui/react";
import { setShippingMethod } from "@lib/data/cart";
import { calculatePriceForShippingOption } from "@lib/data/fulfillment";
import { convertToLocale } from "@lib/util/money";
import { CheckCircleSolid, Loader } from "@medusajs/icons";
import { HttpTypes } from "@medusajs/types";
import { Heading, Text, clx } from "@medusajs/ui";
import ErrorMessage from "@modules/checkout/components/error-message";
import Divider from "@modules/common/components/divider";
import MedusaRadio from "@modules/common/components/radio";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const PICKUP_OPTION_ON = "__PICKUP_ON";
const PICKUP_OPTION_OFF = "__PICKUP_OFF";

type ShippingProps = {
  cart: HttpTypes.StoreCart;
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null;
};

function formatAddress(address) {
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
    (sm) => sm.service_zone?.fulfillment_set?.type !== "pickup",
  );

  const _pickupMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type === "pickup",
  );

  const hasPickupOptions = !!_pickupMethods?.length;

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

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup",
  ) => {
    setError(null);

    if (variant === "pickup") {
      setShowPickupOptions(PICKUP_OPTION_ON);
    } else {
      setShowPickupOptions(PICKUP_OPTION_OFF);
    }

    let currentId: string | null = null;
    setIsLoading(true);
    setShippingMethodId((prev) => {
      currentId = prev;
      return id;
    });

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId);

        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  return (
    <div className="">
      <div className="mt-4 mb-8 flex flex-row items-center justify-between">
        <h2
          className={clx("flex flex-row items-baseline gap-x-2 text-2xl", {
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
              <span className="text-foreground/70 mb-4 font-medium">
                Siparişinizin nasıl teslim edilmesini istersiniz?
              </span>
            </div>
            <div data-testid="delivery-options-container">
              <div className="pt-2 pb-8 md:pt-0">
                {hasPickupOptions && (
                  <RadioGroup
                    value={showPickupOptions}
                    onChange={(value) => {
                      const id = _pickupMethods.find(
                        (option) => !option.insufficient_inventory,
                      )?.id;

                      if (id) {
                        handleSetShippingMethod(id, "pickup");
                      }
                    }}
                  >
                    <Radio
                      value={PICKUP_OPTION_ON}
                      data-testid="delivery-option-radio"
                      className={clx(
                        "rounded-rounded hover:shadow-borders-interactive-with-active mb-2 flex cursor-pointer items-center justify-between border px-8 py-4 text-sm font-normal",
                        {
                          "border-ui-border-interactive":
                            showPickupOptions === PICKUP_OPTION_ON,
                        },
                      )}
                    >
                      <div className="flex items-center gap-x-4">
                        <MedusaRadio
                          checked={showPickupOptions === PICKUP_OPTION_ON}
                        />
                        <span className="text-base">Siparişinizi alın</span>
                      </div>
                      <span className="text-foreground justify-self-end">
                        -
                      </span>
                    </Radio>
                  </RadioGroup>
                )}
                <RadioGroup
                  value={shippingMethodId}
                  onChange={(v) => handleSetShippingMethod(v, "shipping")}
                >
                  {_shippingMethods?.map((option) => {
                    const isDisabled =
                      option.price_type === "calculated" &&
                      !isLoadingPrices &&
                      typeof calculatedPricesMap[option.id] !== "number";

                    return (
                      <Radio
                        key={option.id}
                        value={option.id}
                        data-testid="delivery-option-radio"
                        disabled={isDisabled}
                        className={clx(
                          "rounded-rounded hover:shadow-borders-interactive-with-active mb-2 flex cursor-pointer items-center justify-between border px-8 py-4 text-sm font-normal",
                          {
                            "border-ui-border-interactive":
                              option.id === shippingMethodId,
                            "hover:shadow-brders-none cursor-not-allowed":
                              isDisabled,
                          },
                        )}
                      >
                        <div className="flex items-center gap-x-4">
                          <MedusaRadio
                            checked={option.id === shippingMethodId}
                          />
                          <span className="text-base">{option.name}</span>
                        </div>
                        <span className="text-foreground justify-self-end">
                          {option.price_type === "flat" ? (
                            convertToLocale({
                              amount: option.amount!,
                              currency_code: cart?.currency_code,
                            })
                          ) : calculatedPricesMap[option.id] ? (
                            convertToLocale({
                              amount: calculatedPricesMap[option.id],
                              currency_code: cart?.currency_code,
                            })
                          ) : isLoadingPrices ? (
                            <Loader />
                          ) : (
                            "-"
                          )}
                        </span>
                      </Radio>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          </div>

          {showPickupOptions === PICKUP_OPTION_ON && (
            <div className="grid">
              <div className="flex flex-col">
                <span className="text-foreground font-medium">Mağaza</span>
                <span className="text-foreground/70 mb-4 font-medium">
                  Yakınınızdaki bir mağazayı seçin
                </span>
              </div>
              <div data-testid="delivery-options-container">
                <div className="pt-2 pb-8 md:pt-0">
                  <RadioGroup
                    value={shippingMethodId}
                    onChange={(v) => handleSetShippingMethod(v, "pickup")}
                  >
                    {_pickupMethods?.map((option) => {
                      return (
                        <Radio
                          key={option.id}
                          value={option.id}
                          disabled={option.insufficient_inventory}
                          data-testid="delivery-option-radio"
                          className={clx(
                            "rounded-rounded hover:shadow-borders-interactive-with-active mb-2 flex cursor-pointer items-center justify-between border px-8 py-4 text-sm font-normal",
                            {
                              "border-ui-border-interactive":
                                option.id === shippingMethodId,
                              "hover:shadow-brders-none cursor-not-allowed":
                                option.insufficient_inventory,
                            },
                          )}
                        >
                          <div className="flex items-start gap-x-4">
                            <MedusaRadio
                              checked={option.id === shippingMethodId}
                            />
                            <div className="flex flex-col">
                              <span className="text-base">{option.name}</span>
                              <span className="text-foreground/70 text-base">
                                {formatAddress(
                                  option.service_zone?.fulfillment_set?.location
                                    ?.address,
                                )}
                              </span>
                            </div>
                          </div>
                          <span className="text-foreground justify-self-end">
                            {convertToLocale({
                              amount: option.amount!,
                              currency_code: cart?.currency_code,
                            })}
                          </span>
                        </Radio>
                      );
                    })}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          <div>
            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />
            <Button
              size="lg"
              className="mt"
              onClick={handleSubmit}
              disabled={isLoading}
              data-testid="submit-delivery-option-button"
            >
              {isLoading && <Loader />}
              Ödemeye devam et
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-row justify-between">
          <div className="text-sm font-normal">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="flex flex-col">
                <Text className="text-foreground mb-1 font-semibold">
                  Yöntem
                </Text>
                <Text className="text-muted-foreground font-medium">
                  {cart.shipping_methods?.at(-1)?.name}
                  {": "}
                  <span className="font-mono text-base">
                    {convertToLocale({
                      amount: cart.shipping_methods.at(-1)?.amount!,
                      currency_code: cart?.currency_code,
                    })}
                  </span>
                </Text>
              </div>
            )}
          </div>
          {!isOpen &&
            cart?.shipping_address &&
            cart?.billing_address &&
            cart?.email && (
              <div className="flex items-end justify-end">
                <Button
                  onClick={handleEdit}
                  // className="text-primary hover:text-primary/80"
                  variant="outline"
                  data-testid="edit-address-button"
                >
                  <Pencil />
                  Düzenle
                </Button>
              </div>
            )}
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  );
};

export default Shipping;
