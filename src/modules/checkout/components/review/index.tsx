"use client";

import { useSearchParams } from "next/navigation";
import LegalDocuments from "@/modules/content/legal-documents/templates";
import { cn } from "@/lib/utils";
import PaymentButton from "../payment-button";

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
      <div className="mt-4 mb-8 flex flex-row items-center justify-between">
        <h2
          className={cn("flex flex-row items-baseline gap-x-2 text-2xl", {
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
                <LegalDocuments variant="inline" /> sözleşmelerini okuduğunuzu, anladığınızı ve
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
