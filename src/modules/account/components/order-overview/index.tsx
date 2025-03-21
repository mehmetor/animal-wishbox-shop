"use client";

import OrderCard from "../order-card";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { HttpTypes } from "@medusajs/types";
import { RainbowButton } from "@/components/magicui/rainbow-button";

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex w-full flex-col gap-y-8">
        {orders.map((o) => (
          <div key={o.id} className="border-b pb-0 last:border-none last:pb-0">
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex w-full flex-col items-center gap-y-4 py-16"
      data-testid="no-orders-container"
    >
      <h2 className="pb-16 text-2xl">Burada görülecek bir şey yok</h2>
      <p className="text-muted-foreground">
        Henüz bir siparişiniz yok, bunu değiştirelim mi? {":)"}
      </p>
      <div className="my-4">
        <LocalizedClientLink href="/" passHref>
          <RainbowButton data-testid="continue-shopping-button">
            Alışverişe devam et
          </RainbowButton>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default OrderOverview;
