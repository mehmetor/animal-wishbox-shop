import { Radio as RadioGroupOption } from "@headlessui/react";
import { Text, clx } from "@medusajs/ui";
import React, { useContext, useMemo, useState, type JSX } from "react";

import Radio from "@modules/common/components/radio";

import { isManual } from "@lib/constants";
import SkeletonCardDetails from "@modules/skeletons/components/skeleton-card-details";
import { CardElement } from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import PaymentTest from "../payment-test";
import { StripeContext } from "../payment-wrapper/stripe-wrapper";
import { MagicSwitchCard } from "@/components/magicui/magic-switch-card";
import PaymentBankTransfer from "../payment-bank-transfer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

type PaymentContainerProps = {
  paymentProviderId: string;
  selectedPaymentOptionId: string | null;
  disabled?: boolean;
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>;
  children?: React.ReactNode;
  onCheckedChange: (method: string) => void;
};

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  onCheckedChange,
  children,
}) => {
  console.log(
    "paymentInfoMap",
    paymentProviderId == "pp_system_default",
    paymentInfoMap,
  );

  const title =
    paymentProviderId == "pp_system_default"
      ? "Havale/EFT ile Ödeme (Banka Transferi)"
      : paymentInfoMap[paymentProviderId]?.title || paymentProviderId;

  const [checked, setChecked] = useState(
    selectedPaymentOptionId === paymentProviderId,
  );

  const handleCheckedChange = (newChecked: boolean) => {
    setChecked(newChecked);
    onCheckedChange(paymentProviderId);
  };

  return (
    <>
      <div className="flex flex-col justify-between rounded-xl border p-4">
        {title}
        {isManual(paymentProviderId) && (
          <PaymentBankTransfer className="hidden sm:block" />
        )}
      </div>
      <div className="mt-4">
        <Alert variant="warning">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>
            Lütfen Havale/EFT yaparken sipariş numaranızı açıklama kısmına
            ekleyiniz.
          </AlertTitle>
          <AlertDescription>
            Şipariş numaranız işlemler tamamlandığında görüntülenecektir.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );

  return (
    <RadioGroupOption
      key={paymentProviderId}
      value={paymentProviderId}
      disabled={disabled}
      className={clx(
        "rounded-rounded hover:shadow-borders-interactive-with-active mb-2 flex cursor-pointer flex-col gap-y-2 border px-8 py-4 font-normal",
        {
          "border-ui-border-interactive":
            selectedPaymentOptionId === paymentProviderId,
        },
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Radio checked={selectedPaymentOptionId === paymentProviderId} />
          <Text className="text-base">
            {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
          </Text>
          {isManual(paymentProviderId) && (
            <PaymentBankTransfer className="hidden sm:block" />
          )}
        </div>
        <span className="text-foreground justify-self-end">
          {paymentInfoMap[paymentProviderId]?.icon}
        </span>
      </div>
      {isManual(paymentProviderId) && (
        <PaymentBankTransfer className="text-[10px] sm:hidden" />
      )}
      {children}
    </RadioGroupOption>
  );
};

export default PaymentContainer;

export const StripeCardContainer = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  setCardBrand,
  setError,
  setCardComplete,
}: Omit<PaymentContainerProps, "children"> & {
  setCardBrand: (brand: string) => void;
  setError: (error: string | null) => void;
  setCardComplete: (complete: boolean) => void;
}) => {
  const stripeReady = useContext(StripeContext);

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#424270",
          "::placeholder": {
            color: "rgb(107 114 128)",
          },
        },
      },
      classes: {
        base: "pt-3 pb-1 block w-full h-11 px-4 mt-0 border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-muted/80 transition-all duration-300 ease-in-out",
      },
    };
  }, []);

  const handleCheckedChange = (method: string) => {};

  return (
    <PaymentContainer
      paymentProviderId={paymentProviderId}
      selectedPaymentOptionId={selectedPaymentOptionId}
      paymentInfoMap={paymentInfoMap}
      disabled={disabled}
      onCheckedChange={handleCheckedChange}
    >
      {selectedPaymentOptionId === paymentProviderId &&
        (stripeReady ? (
          <div className="my-4 transition-all duration-150 ease-in-out">
            <Text className="text-foreground mb-1 font-semibold">
              Enter your card details:
            </Text>
            <CardElement
              options={useOptions as StripeCardElementOptions}
              onChange={(e) => {
                setCardBrand(
                  e.brand && e.brand.charAt(0).toUpperCase() + e.brand.slice(1),
                );
                setError(e.error?.message || null);
                setCardComplete(e.complete);
              }}
            />
          </div>
        ) : (
          <SkeletonCardDetails />
        ))}
    </PaymentContainer>
  );
};
