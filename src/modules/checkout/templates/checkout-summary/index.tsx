import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import ItemsPreviewTemplate from "@modules/cart/templates/preview";
import DiscountCode from "@modules/checkout/components/discount-code";
import CartTotals from "@modules/common/components/cart-totals";
import Divider from "@modules/common/components/divider";

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-0 flex flex-col-reverse gap-y-8 py-8 sm:flex-col sm:py-0">
      <Card className="p-2 md:p-3">
        <CardHeader>
          <CardTitle className="mt-6 text-2xl font-normal">
            Sepetinizdeki Ürünler
          </CardTitle>
        </CardHeader>
        <CardContent className="flex w-full flex-col">
          <Divider />
          <ItemsPreviewTemplate cart={cart} />
          <Divider className="mb-6" />
          <CartTotals totals={cart} />
          <div className="my-6">
            <DiscountCode cart={cart} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutSummary;
