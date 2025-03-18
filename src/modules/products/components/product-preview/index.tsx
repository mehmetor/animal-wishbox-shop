import { Text } from "@medusajs/ui";
import { listProducts } from "@lib/data/products";
import { getProductPrice } from "@lib/util/get-product-price";
import { HttpTypes } from "@medusajs/types";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VariantPrice } from "@/types/global";
import { MagicCard } from "@/components/magicui/magic-card";
export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct;
  isFeatured?: boolean;
  region: HttpTypes.StoreRegion;
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  });

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <Card className="p-0 gap-1 md:gap-4 shadow-none">
        <MagicCard gradientColor="var(--violet-200)" gradientFrom="var(--primary)" gradientTo="var(--secondary)" className="py-3 md:py-4">
          <CardHeader>
            <CardTitle>
              <div className="line-clamp-2 text-sm font-semibold md:text-base">
                {product.title}
              </div>
            </CardTitle>
            <CardDescription className="text-xs text-gray-500">
              {product.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="square"
              isFeatured={isFeatured}
            />
          </CardContent>
          <CardFooter className="flex justify-between text-sm md:text-base">
            <div className="flex flex-col items-start">
              {/* <Button>Sepete Ekle</Button> */}
            </div>
            {cheapestPrice && (
              <PreviewPrice price={cheapestPrice as VariantPrice} />
            )}
          </CardFooter>
        </MagicCard>
      </Card>
    </LocalizedClientLink>
  );
}
