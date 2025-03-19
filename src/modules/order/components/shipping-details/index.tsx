import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";

import Divider from "@modules/common/components/divider";

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder;
};

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <h2 className="my-6 flex flex-row text-2xl">Teslimat</h2>
      <div className="flex items-start gap-x-8">
        <div
          className="flex w-1/3 flex-col"
          data-testid="shipping-address-summary"
        >
          <p className="text-foreground mb-1 font-semibold">Teslimat Adresi</p>
          <p className="text-muted-foreground font-medium">
            {order.shipping_address?.first_name}{" "}
            {order.shipping_address?.last_name}
          </p>
          <p className="text-muted-foreground font-medium">
            {order.shipping_address?.address_1}{" "}
            {order.shipping_address?.address_2}
          </p>
          <p className="text-muted-foreground font-medium">
            {order.shipping_address?.postal_code},{" "}
            {order.shipping_address?.city}
          </p>
          <p className="text-muted-foreground font-medium">
            {order.shipping_address?.country_code?.toUpperCase()}
          </p>
        </div>

        <div
          className="flex w-1/3 flex-col"
          data-testid="shipping-contact-summary"
        >
          <p className="text-foreground mb-1 font-semibold">İletişim</p>
          <p className="text-muted-foreground font-medium">
            {order.shipping_address?.phone}
          </p>
          <p className="text-muted-foreground font-medium">{order.email}</p>
        </div>

        <div
          className="flex w-1/3 flex-col"
          data-testid="shipping-method-summary"
        >
          <p className="text-foreground mb-1 font-semibold">Teslimat Yöntemi</p>
          <p className="text-muted-foreground font-medium">
            {(order as any).shipping_methods[0]?.name} (
            {convertToLocale({
              amount: order.shipping_methods?.[0].total ?? 0,
              currency_code: order.currency_code,
            })}
            )
          </p>
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  );
};

export default ShippingDetails;
