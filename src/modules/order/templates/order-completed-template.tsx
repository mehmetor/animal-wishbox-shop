import { cookies as nextCookies } from "next/headers";

import CartTotals from "@modules/common/components/cart-totals";
import Help from "@modules/order/components/help";
import Items from "@modules/order/components/items";
import OnboardingCta from "@modules/order/components/onboarding-cta";
import OrderDetails from "@modules/order/components/order-details";
import ShippingDetails from "@modules/order/components/shipping-details";
import PaymentDetails from "@modules/order/components/payment-details";
import { HttpTypes } from "@medusajs/types";

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder;
};

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies();

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true";

  return (
    <div className="min-h-[calc(100vh-64px)] p-6">
      <div className="container flex h-full w-full max-w-4xl flex-col items-center justify-center gap-y-10">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex h-full w-full max-w-4xl flex-col gap-4 py-10"
          data-testid="order-complete-container"
        >
          <h1 className="text-foreground mb-4 flex flex-col gap-y-3 text-3xl">
            <span>Tebrikler!</span>
            <span>Siparişiniz başarıyla tamamlandı.</span>
          </h1>
          <OrderDetails order={order} />
          <h2 className="flex flex-row text-2xl">Özet</h2>
          <Items order={order} />
          <CartTotals totals={order} />
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
        </div>
      </div>
    </div>
  );
}
