import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <div className="flex flex-col items-start">
      {price.price_type === "sale" && (
        <Text
          className="line-through text-gray-400 text-sm"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
      <Text
        className={clx("font-semibold", {
          "text-red-600": price.price_type === "sale",
          "text-gray-900": price.price_type !== "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
    </div>
  )
}
