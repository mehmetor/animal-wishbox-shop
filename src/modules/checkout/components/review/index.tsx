"use client";

import { Heading, Text, clx } from "@medusajs/ui";

import PaymentButton from "../payment-button";
import { useSearchParams } from "next/navigation";
import LegalDocuments from "@modules/checkout/templates/legal-documents";

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams();

  const isOpen = searchParams.get("step") === "review";

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0;

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard);

  return (
    <div className="">
      <div className="mb-6 flex flex-row items-center justify-between">
        <h2
          className={clx("flex flex-row items-baseline gap-x-2 text-2xl", {
            "pointer-events-none opacity-50 select-none": !isOpen,
          })}
        >
          Siparişiniz Tamamlandı
        </h2>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="mb-6 flex w-full items-start gap-x-1">
            <div className="w-full">
              <span className="text-foreground mb-1">
                <strong>Siparişi Tamamla</strong> düğmesine tıklayarak 
                <LegalDocuments /> sözleşmelerini okuduğunuzu, anladığınızı ve
                kabul ettiğinizi onaylamış olursunuz.
              </span>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  );
};

export default Review;
