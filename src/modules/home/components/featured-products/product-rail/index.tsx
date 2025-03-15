import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      // @ts-ignore: 'collection_id' özelliği tip tanımında bulunmuyor ancak API tarafından destekleniyor
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  // if (!pricedProducts) {
  //   return null
  // }

  return (
    <div className="container py-12 sm:py-24">
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl">{collection.title}</h2>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          Tümünü Gör
        </InteractiveLink>
      </div>
      <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4 sm:gap-y-12">
        {pricedProducts &&
          pricedProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  )
}
