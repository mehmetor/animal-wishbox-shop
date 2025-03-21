import { clx } from "@medusajs/ui";

import { getProductPrice } from "@lib/util/get-product-price";
import { HttpTypes } from "@medusajs/types";

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct;
  variant?: HttpTypes.StoreProductVariant;
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  });

  const selectedPrice = variant ? variantPrice : cheapestPrice;

  if (!selectedPrice) {
    return <div className="block h-9 w-32 animate-pulse" />;
  }

  return (
    <div className="text-foreground flex flex-col items-end">
      <span
        className={clx("text-xl", {
          "text-primary": selectedPrice.price_type === "sale",
        })}
      >
        {!variant && "From "}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === "sale" && (
        <>
          <p>
            <span className="text-muted-foreground">Orjinal: </span>
            <span
              className="line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </p>
          <span className="text-primary">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
    </div>
  );
}
