import ChevronDown from "@modules/common/icons/chevron-down";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { Card, CardContent } from "@/components/ui/card";
import { MagicCard } from "@/components/magicui/magic-card";

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null;
  orders: HttpTypes.StoreOrder[] | null;
};

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper">
      <div className="hidden sm:block">
        <div className="text-xl-semi mb-4 flex items-center justify-between">
          <span data-testid="welcome-message" data-value={customer?.first_name}>
            Merhaba {customer?.first_name}
          </span>
          <span className="text-foreground text-sm font-normal">
            <span
              className="font-semibold"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </span>
        </div>
        <div className="flex flex-col border-t border-gray-200 py-8">
          <div className="col-span-1 row-span-2 flex h-full flex-1 flex-col gap-y-4">
            <div className="mb-6 flex items-start gap-x-16">
              <div className="flex flex-col gap-y-4">
                <h3 className="font-semibold">Profil</h3>
                <div className="flex items-center gap-x-2">
                  <span
                    className="text-xl leading-none"
                    data-testid="customer-profile-completion"
                    data-value={getProfileCompletion(customer)}
                  >
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="text-muted-foreground text-base uppercase">
                    Tamamlandı
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <h3 className="font-semibold">Adresler</h3>
                <div className="flex items-center gap-x-2">
                  <span
                    className="text-xl leading-none"
                    data-testid="addresses-count"
                    data-value={customer?.addresses?.length || 0}
                  >
                    {customer?.addresses?.length || 0}
                  </span>
                  <span className="text-muted-foreground text-base uppercase">
                    Kayıtlı
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="font-semibold">Son Siparişler</h3>
              </div>
              <ul
                className="flex flex-col gap-y-4"
                data-testid="orders-wrapper"
              >
                {orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li
                        key={order.id}
                        data-testid="order-wrapper"
                        data-value={order.id}
                      >
                        <LocalizedClientLink
                          href={`/account/orders/details/${order.id}`}
                        >
                          <Card>
                            <MagicCard>
                              <CardContent className="flex items-center justify-between">
                                <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-x-2 text-sm font-normal">
                                  <span className="font-semibold">Tarih</span>
                                  <span className="font-semibold">
                                    Sipariş No
                                  </span>
                                  <span className="font-semibold">
                                    Toplam Tutar
                                  </span>
                                  <span data-testid="order-created-date">
                                    {new Date(
                                      order.created_at,
                                    ).toLocaleDateString(order.currency_code)}
                                  </span>
                                  <span
                                    data-testid="order-id"
                                    data-value={order.display_id}
                                  >
                                    #{order.display_id}
                                  </span>
                                  <span data-testid="order-amount">
                                    {convertToLocale({
                                      amount: order.total,
                                      currency_code: order.currency_code,
                                    })}
                                  </span>
                                </div>
                                <button
                                  className="flex items-center justify-between"
                                  data-testid="open-order-button"
                                >
                                  <span className="sr-only">
                                    Sipariş #{order.display_id} e git
                                  </span>
                                  <ChevronDown className="-rotate-90" />
                                </button>
                              </CardContent>
                            </MagicCard>
                          </Card>
                        </LocalizedClientLink>
                      </li>
                    );
                  })
                ) : (
                  <span data-testid="no-orders-message">
                    Henüz siparişiniz yok
                  </span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0;

  if (!customer) {
    return 0;
  }

  if (customer.email) {
    count++;
  }

  if (customer.first_name && customer.last_name) {
    count++;
  }

  if (customer.phone) {
    count++;
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing,
  );

  if (billingAddress) {
    count++;
  }

  return (count / 4) * 100;
};

export default Overview;
