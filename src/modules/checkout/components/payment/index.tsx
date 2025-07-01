"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader, SendHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { isStripe as isStripeFunc, paymentInfoMap } from "@lib/constants";
import { initiatePaymentSession } from "@lib/data/cart";
import ErrorMessage from "@modules/checkout/components/error-message";
import PaymentContainer, {
  StripeCardContainer,
} from "@modules/checkout/components/payment-container";
import Divider from "@modules/common/components/divider";
import EditButton from "../edit-button";

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any;
  availablePaymentMethods: any[];
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending",
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardBrand, setCardBrand] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? "",
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "payment";

  const isStripe = isStripeFunc(selectedPaymentMethod);

  const setPaymentMethod = async (method: string) => {
    setError(null);
    setSelectedPaymentMethod(method);
    if (isStripeFunc(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      });
    }
  };

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0;

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null)
    try {
      const shouldInputCard =
        isStripeFunc(selectedPaymentMethod) && !activeSession;

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod;

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        });
      }

      if (!shouldInputCard) {
        router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          },
        );
        setIsLoading(false);
        return
      }

      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  return (
    <div className="">
      <div className="mt-4 mb-8 flex flex-row items-center justify-between">
        <h2
          className={cn("flex flex-row gap-x-2 text-2xl", {
            "pointer-events-none opacity-50 select-none":
              !isOpen && !paymentReady,
          })}
        >
          Ödeme
        </h2>
        {!isOpen && paymentReady && <CheckCircle />}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <>
              {/* <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
              > */}
              {availablePaymentMethods.map((paymentMethod) => (
                <div key={paymentMethod.id}>
                  {isStripeFunc(paymentMethod.id) ? (
                    <StripeCardContainer
                      paymentProviderId={paymentMethod.id}
                      selectedPaymentOptionId={selectedPaymentMethod}
                      paymentInfoMap={paymentInfoMap}
                      setCardBrand={setCardBrand}
                      setError={setError}
                      setCardComplete={setCardComplete}
                      onCheckedChange={setPaymentMethod}
                    />
                  ) : (
                    <PaymentContainer
                      paymentInfoMap={paymentInfoMap}
                      paymentProviderId={paymentMethod.id}
                      selectedPaymentOptionId={selectedPaymentMethod}
                      onCheckedChange={setPaymentMethod}
                    />
                  )}
                </div>
              ))}
              {/* </RadioGroup> */}
            </>
          )}

          {paidByGiftcard && (
            <div className="flex w-full flex-col sm:w-1/3">
              <p className="text-foreground mb-1 font-semibold">
                Ödeme yöntemi
              </p>
              <p
                className="text-muted-foreground font-medium"
                data-testid="payment-method-summary"
              >
                Hediye kartı
              </p>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            className="mt-6"
            onClick={handleSubmit}
            disabled={
              isLoading ||
              // (isStripe && !cardComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            {isLoading && <Loader className="animate-spin" />}
            {/* {!activeSession
              ? // && isStripeFunc(selectedPaymentMethod)
                "Kart bilgilerinizi giriniz"
              : "Devam et"} */}
            Devam et
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex w-full items-stretch flex-col md:flex-row gap-x-1">
              <div className="flex grow flex-col mb-4">
                <p className="text-foreground mb-1 font-semibold">
                  Ödeme yöntemi
                </p>
                <p
                  className="text-muted-foreground font-medium"
                  data-testid="payment-method-summary"
                >
                  Havale/EFT ile ödeme
                  {/* {paymentInfoMap[activeSession?.provider_id]?.title ||
                    activeSession?.provider_id} */}
                </p>
              </div>
              <div className="flex grow flex-col">
                <p className="text-foreground mb-1 font-semibold">
                  Ödeme detayları
                </p>
                <div
                  className="text-muted-foreground flex items-center gap-2 font-medium"
                  data-testid="payment-details-summary"
                >
                    {isStripeFunc(selectedPaymentMethod) && cardBrand
                      ? cardBrand
                      : "Banka Transferi"}
                </div>
              </div>

              <EditButton
                handleEdit={handleEdit}
                visible={!isOpen && paymentReady}
              />
            </div>
          ) : paidByGiftcard ? (
            <div className="flex w-full flex-col sm:w-1/3">
              <p className="text-foreground mb-1 font-semibold">
                Ödeme yöntemi
              </p>
              <p
                className="text-muted-foreground font-medium"
                data-testid="payment-method-summary"
              >
                Hediye kartı
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  );
};

export default Payment;
