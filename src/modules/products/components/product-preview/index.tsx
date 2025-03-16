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
      <Card className=" gap-4">
        <CardHeader>
          <CardTitle className="truncate pb-1" >
            {product.title}
            {product.title.length > 50 && "..."}
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
        <CardFooter>
          {cheapestPrice && (
            <PreviewPrice price={cheapestPrice as VariantPrice} />
          )}
        </CardFooter>
      </Card>
    </LocalizedClientLink>
  );

  // return (
  //   <LocalizedClientLink href={`/products/${product.handle}`} className="group">
  //     <div data-testid="product-wrapper" className="">
  //       <div className="txt-compact-medium mt-4 flex justify-between">
  //         <Text className="text-muted-foreground" data-testid="product-title">
  //           {product.title}
  //         </Text>
  //         <div className="flex items-center gap-x-2">
  //           {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
  //         </div>
  //       </div>
  //     </div>
  //   </LocalizedClientLink>
  // );
}
