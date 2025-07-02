"use client";

import { convertToLocale } from "@lib/util/money";
import React from "react";

type CartTotalsProps = {
  totals: {
    total?: number | null;
    subtotal?: number | null;
    item_total?: number | null;
    tax_total?: number | null;
    shipping_total?: number | null;
    discount_total?: number | null;
    gift_card_total?: number | null;
    currency_code: string;
    shipping_subtotal?: number | null;
  };
};

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    subtotal,
    item_total,
    tax_total,
    discount_total,
    gift_card_total,
    shipping_subtotal,
  } = totals;

  return (
    <div>
      <div className="text-muted-foreground flex flex-col gap-y-2 font-medium">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-1">Sepet Toplamı</span>
          <span
            className="tabular-nums font-semibold"
            data-testid="cart-subtotal"
            data-value={item_total || 0}
          >
            {convertToLocale({ amount: item_total ?? 0, currency_code })}
          </span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>İndirim</span>
            <span
              className="text-primary tabular-nums"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </span>
          </div>
        )}

        {Number(shipping_subtotal) > 0 && (
          <div className="flex items-center justify-between">
            <span>Kargo</span>
            <span
              className="tabular-nums"
              data-testid="cart-shipping"
              data-value={shipping_subtotal || 0}
            >
              {convertToLocale({
                amount: shipping_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}

        {/*  
        <div className="flex justify-between">
          <span className="flex items-center gap-x-1">Vergi</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div> */}

        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>Hediye Kartı</span>
            <span
              className="text-primary tabular-nums"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: gift_card_total ?? 0, currency_code })}
            </span>
          </div>
        )}
      </div>
      <div className="my-4 h-px w-full border-b border-gray-200" />
      <div className="text-foreground mb-2 flex items-center justify-between font-medium">
        <span>Toplam</span>
        <span
          className="tabular-nums font-bold"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
    </div>
  );
};

export default CartTotals;
