import ItemsPreviewTemplate from "@modules/cart/templates/preview";
import DiscountCode from "@modules/checkout/components/discount-code";
import CartTotals from "@modules/common/components/cart-totals";
import Divider from "@modules/common/components/divider";

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-0 flex flex-col-reverse gap-y-8 py-8 sm:flex-col sm:py-0">
      <div className="flex w-full flex-col">
        <Divider className="my-6 sm:hidden" />
        <h2 className="text-2xl flex flex-row items-baseline">
          Sepetinizdeki Ürünler
        </h2>
        <Divider className="mt-6" />
        <ItemsPreviewTemplate cart={cart} />
        <Divider className="mb-6" />
        <CartTotals totals={cart} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
