import { useMemo } from "react";

import Thumbnail from "@modules/products/components/thumbnail";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { Button } from "@/components/ui/button";

type OrderCardProps = {
  order: HttpTypes.StoreOrder;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0) ?? 0
    );
  }, [order]);

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0;
  }, [order]);

  return (
    <div className="flex flex-col" data-testid="order-card">
      <div className="mb-3 text-2xl uppercase">
        #<span data-testid="order-display-id">{order.display_id}</span>
      </div>
      <div className="text-foreground flex items-center divide-x divide-gray-200 text-sm font-normal">
        <span className="pr-2" data-testid="order-created-at">
          {new Date(order.created_at).toLocaleDateString(
            order.shipping_address?.country_code,
          )}
        </span>
        <span className="px-2" data-testid="order-amount">
          {convertToLocale({
            amount: order.total,
            currency_code: order.currency_code,
          })}
        </span>
        <span className="pl-2">{`${numberOfLines} ${
          numberOfLines > 1 ? "ürün" : "ürün"
        }`}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {order.items?.slice(0, 3).map((i) => {
          return (
            <div
              key={i.id}
              className="flex flex-col gap-y-2"
              data-testid="order-item"
            >
              <Thumbnail thumbnail={i.thumbnail} images={[]} size="square" />
              <div className="text-foreground flex  text-sm font-normal">
                <span
                  className="text-foreground"
                  data-testid="item-title"
                >
                  {i.title}
                </span>
                <span className="ml-2">x</span>
                <span data-testid="item-quantity">{i.quantity}</span>
              </div>
            </div>
          );
        })}
        {numberOfProducts > 4 && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <span className="text-foreground text-sm font-normal">
              + {numberOfLines - 4}
            </span>
            <span className="text-foreground text-sm font-normal">
              daha fazla
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button data-testid="order-details-link" variant="link">
            Detayları gör
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default OrderCard;
