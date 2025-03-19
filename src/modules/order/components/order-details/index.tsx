import { useLocale } from "next-intl";
import OrderNumber from "@/modules/common/components/order-number";
import { HttpTypes } from "@medusajs/types";

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder;
  showStatus?: boolean;
};

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const locale = useLocale();

  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ");

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1);
  };

  return (
    <div>
      <p>
        Sipariş onay detaylarını{" "}
        <span
          className="text-foreground/85 font-semibold"
          data-testid="order-email"
        >
          {order.email}
        </span>{" "}
        adresine gönderdik.
      </p>
      <p className="mt-2">
        <span className="text-muted-foreground">Sipariş tarihi:</span>{" "}
        <span data-testid="order-date">
          {new Date(order.created_at).toLocaleDateString(locale)}
        </span>
      </p>
      <div className="text-primary mt-2">
        <OrderNumber id={order.display_id} />
      </div>

      <div className="text-compact-small mt-4 flex items-center gap-x-4">
        {showStatus && (
          <>
            <p>
              Sipariş durumu:{" "}
              <span
                className="text-muted-foreground"
                data-testid="order-status"
              >
                {/* TODO: Check where the statuses should come from */}
                {formatStatus(order.fulfillment_status)}
              </span>
            </p>
            <p>
              Ödeme durumu:{" "}
              <span
                className="text-muted-foreground"
                sata-testid="order-payment-status"
              >
                {formatStatus(order.payment_status)}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
