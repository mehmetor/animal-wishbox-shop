import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder;
};

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return;
    }

    return convertToLocale({
      amount,
      currency_code: order.currency_code,
    });
  };

  return (
    <div className="border-b pb-6">
      <h2 className="py-6 text-2xl">Sipariş Özeti</h2>
      <div className="text-foreground my-2 px-4 text-sm font-normal">
        <div className="text-foreground mb-2 flex items-center justify-between text-base">
          <span>Ürün Toplamı</span>
          <span>{getAmount(order.item_total)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {order.discount_total > 0 && (
            <div className="flex items-center justify-between">
              <span>İndirim</span>
              <span>- {getAmount(order.discount_total)}</span>
            </div>
          )}
          {order.gift_card_total > 0 && (
            <div className="flex items-center justify-between">
              <span>Kupon</span>
              <span>- {getAmount(order.gift_card_total)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>Kargo</span>
            <span>{getAmount(order.shipping_total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Vergi</span>
            <span>{getAmount(order.tax_total)}</span>
          </div>
        </div>
        <div className="my-4 h-px w-full border-b border-dashed" />
        <div className="text-foreground mb-2 flex items-center justify-between text-base">
          <span>Toplam</span>
          <span>{getAmount(order.total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
