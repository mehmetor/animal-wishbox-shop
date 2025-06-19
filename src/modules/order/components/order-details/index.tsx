"use client";

import { useLocale, useTranslations } from "next-intl";
import OrderNumber from "@/modules/common/components/order-number";
import { HttpTypes } from "@medusajs/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder;
  showStatus?: boolean;
};

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const locale = useLocale();
  const t = useTranslations("Order");

  const formatFulfillmentStatus = (status: string) => {
    try {
      const key = status.toLowerCase();
      return {
        label: t(`fulfillmentStatus.${key}`),
        description: t(`fulfillmentStatus.${key}_description`),
      };
    } catch (error) {
      // Fallback if translation is not found
      const formatted = status.split("_").join(" ");
      return {
        label: formatted.slice(0, 1).toUpperCase() + formatted.slice(1),
        description: "",
      };
    }
  };

  const formatPaymentStatus = (status: string) => {
    try {
      const key = status.toLowerCase();
      return {
        label: t(`paymentStatus.${key}`),
        description: t(`paymentStatus.${key}_description`),
      };
    } catch (error) {
      // Fallback if translation is not found
      const formatted = status.split("_").join(" ");
      return {
        label: formatted.slice(0, 1).toUpperCase() + formatted.slice(1),
        description: "",
      };
    }
  };

  const fulfillmentStatusInfo = formatFulfillmentStatus(
    order.fulfillment_status,
  );
  const paymentStatusInfo = formatPaymentStatus(order.payment_status);

  return (
    <div className="flex flex-col gap-6">
      <p className="">
        Sipariş onay detaylarını{" "}
        <span
          className="text-foreground/85 font-semibold"
          data-testid="order-email"
        >
          {order.email}
        </span>{" "}
        adresine gönderdik.
      </p>

      <div className="flex flex-col gap-2">
        <p className="text-primary">
          <span className="text-muted-foreground">Sipariş tarihi:</span>{" "}
          <span data-testid="order-date">
            {new Date(order.created_at).toLocaleDateString(locale)}
          </span>
        </p>
        <OrderNumber id={order.display_id} />
      </div>

      {showStatus && (
        <div className="flex flex-col gap-2">
          <>
            <div className="flex items-center gap-1">
              <p className="text-muted-foreground">
                Ödeme durumu:{" "}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className="text-foreground font-medium"
                      data-testid="order-payment-status"
                    >
                      {paymentStatusInfo.label}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-[240px]">
                    {paymentStatusInfo.description}
                  </TooltipContent>
                </Tooltip>
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-muted-foreground">
                Sipariş durumu:{" "}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className="text-foreground font-medium"
                      data-testid="order-status"
                    >
                      {fulfillmentStatusInfo.label}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-[240px]">
                    {fulfillmentStatusInfo.description}
                  </TooltipContent>
                </Tooltip>
              </p>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
