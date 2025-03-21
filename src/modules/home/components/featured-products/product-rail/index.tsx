// import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { listProducts } from "@lib/data/products";
import { HttpTypes } from "@medusajs/types";

import InteractiveLink from "@modules/common/components/interactive-link";
import ProductPreview from "@modules/products/components/product-preview";
import React from "react";

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection;
  region: HttpTypes.StoreRegion;
}) {
  console.log("collection", collection);

  // const plugin = React.useRef(
  //   Autoplay({ delay: 2000, stopOnInteraction: true }),
  // );

  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      // @ts-ignore: 'collection_id' özelliği tip tanımında bulunmuyor ancak API tarafından destekleniyor
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  });

  if (!pricedProducts) {
    return null;
  }

  return (
    <div className="container pt-16">
      <div className="mb-8 flex justify-between">
        <h2 className="text-2xl">{collection.title} koleksiyonu</h2>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          Tümünü Gör
        </InteractiveLink>
      </div>
      <Carousel
        // plugins={[plugin.current]}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {pricedProducts
            // .sort((a, b) => a.title.localeCompare(b.title))
            .map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <ProductPreview product={product} region={region} isFeatured />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {pricedProducts &&
          pricedProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
      </ul> */}
    </div>
  );
}
