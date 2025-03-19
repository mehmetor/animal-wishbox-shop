import { Container, Heading, Text } from "@medusajs/ui";

import { isStripe, paymentInfoMap } from "@lib/constants";
import Divider from "@modules/common/components/divider";
import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";
import PaymentBankTransfer from "@/modules/common/components/payment-bank-transfer";

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder;
};

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0];

  return (
    <div>
      <h2 className="my-6 flex flex-row text-2xl">Ödeme</h2>
      <div>
        {payment && (
          <div className="flex w-full flex-col items-start gap-4 md:flex-row">
            <div className="flex flex-col md:w-1/3">
              <p className="text-foreground mb-1 font-semibold">
                Ödeme Yöntemi
              </p>
              <p
                className="text-muted-foreground font-medium"
                data-testid="payment-method"
              >
                {payment.provider_id == "pp_system_default"
                  ? "Havale/EFT ile Ödeme (Banka Transferi)"
                  : paymentInfoMap[payment.provider_id].title}
              </p>
            </div>
            <div className="flex flex-col md:w-2/3">
              <p className="text-foreground mb-1 font-semibold">
                Ödeme Detayları
              </p>
              <div className="flex items-center gap-2 font-medium">
                {payment.provider_id == "pp_system_default" ? (
                  <div className="flex flex-col gap-2 py-2">
                    <PaymentBankTransfer className="mt-2"
                      orderNumber={order.display_id?.toString()}
                    />
                  </div>
                ) : (
                  <>
                    <Container className="flex h-7 w-fit items-center p-2">
                      {paymentInfoMap[payment.provider_id].icon}
                    </Container>
                    <p data-testid="payment-amount">
                      {isStripe(payment.provider_id) && payment.data?.card_last4
                        ? `**** **** **** ${payment.data.card_last4}`
                        : `${convertToLocale({
                            amount: payment.amount,
                            currency_code: order.currency_code,
                          })} paid at ${new Date(
                            payment.created_at ?? "",
                          ).toLocaleString()}`}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Divider className="mt-8" />
    </div>
  );
};

export default PaymentDetails;
