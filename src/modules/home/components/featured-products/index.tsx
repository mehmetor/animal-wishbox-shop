import { HttpTypes } from "@medusajs/types";
import ProductRail from "@modules/home/components/featured-products/product-rail";

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[];
  region: HttpTypes.StoreRegion;
}) {
  // const sortedCollections = [...collections].sort((a, b) => {
  //   const sortOrderA = Number(a.metadata?.["sort-order"] || 0);
  //   const sortOrderB = Number(b.metadata?.["sort-order"] || 0);
  //   return sortOrderA - sortOrderB;
  // });
  console.log("collections", collections);

  return collections
    .sort((a, b) => {
      // @ts-ignore
      return a.metadata?.["sortOrder"] - b.metadata?.["sortOrder"];
    })
    .map((collection) => {
      return (
        <li key={collection.id}>
          <ProductRail collection={collection} region={region} />
        </li>
      );
    });
}
