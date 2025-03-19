import { Container, Heading, Text } from "@medusajs/ui";

import { isStripe, paymentInfoMap } from "@lib/constants";
import Divider from "@modules/common/components/divider";
import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder;
};

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0];

  return (
    <div>
      <Heading level="h2" className="text-3xl-regular my-6 flex flex-row">
        Payment
      </Heading>
      <div>
        {payment && (
          <div className="flex w-full items-start gap-x-1">
            <div className="flex w-1/3 flex-col">
              <Text className="text-foreground mb-1 font-semibold">
                Payment method
              </Text>
              <Text
                className="text-muted-foreground font-medium"
                data-testid="payment-method"
              >
                {paymentInfoMap[payment.provider_id].title}
              </Text>
            </div>
            <div className="flex w-2/3 flex-col">
              <Text className="text-foreground mb-1 font-semibold">
                Payment details
              </Text>
              <div className="text-muted-foreground flex items-center gap-2 font-medium">
                <Container className="flex h-7 w-fit items-center p-2">
                  {paymentInfoMap[payment.provider_id].icon}
                </Container>
                <Text data-testid="payment-amount">
                  {isStripe(payment.provider_id) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      })} paid at ${new Date(
                        payment.created_at ?? "",
                      ).toLocaleString()}`}
                </Text>
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
