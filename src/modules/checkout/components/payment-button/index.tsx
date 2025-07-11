"use client";

import { isManual, isStripe } from "@lib/constants";
import { placeOrder } from "@lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import ErrorMessage from "../error-message";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { RainbowButton } from "@/components/magicui/rainbow-button";

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart;
  "data-testid": string;
  disabled?: boolean;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
  disabled = false,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1 ||
    disabled;

  const paymentSession = cart.payment_collection?.payment_sessions?.[0];

  switch (true) {
    case isStripe(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      );
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      );
    default:
      return <Button disabled>Ödeme Yöntemi Seçiniz</Button>;
  }
};

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart;
  notReady: boolean;
  "data-testid"?: string;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onPaymentCompleted = async () => {
    try {
      console.log(
        "StripePaymentButton: onPaymentCompleted -> placing order...",
      );
      await placeOrder();
    } catch (err: any) {
      console.error("StripePaymentButton: Error during placeOrder", err);
      if (err.message.includes("NEXT_REDIRECT")) {
        throw err;
      }
      setErrorMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const stripe = useStripe();
  const elements = useElements();
  const card = elements?.getElement("card");

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending",
  );

  const disabledStripe = !stripe || !elements ? true : false;

  const handlePayment = async () => {
    console.log("StripePaymentButton: handlePayment started");
    setSubmitting(true);

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false);
      return;
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address?.first_name +
              " " +
              cart.billing_address?.last_name,
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent;

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted();
          }

          setErrorMessage(error.message || null);
          return;
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted();
        }

        return;
      });
  };

  return (
    <>
      <Button
        disabled={submitting || disabledStripe || notReady}
        onClick={handlePayment}
        data-testid={dataTestId}
      >
        {submitting ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          "Siparişi Ver"
        )}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  );
};

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onPaymentCompleted = async () => {
    try {
      await placeOrder();
    } catch (err: any) {
      if (err.message.includes("NEXT_REDIRECT")) {
        throw err;
      }
      setErrorMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayment = () => {
    setSubmitting(true);
    onPaymentCompleted();
  };

  return (
    <>
      <RainbowButton
        disabled={submitting || notReady}
        onClick={handlePayment}
        data-testid="submit-order-button"
      >
        {submitting ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          "Siparişi Tamamla"
        )}
      </RainbowButton>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  );
};

export default PaymentButton;
