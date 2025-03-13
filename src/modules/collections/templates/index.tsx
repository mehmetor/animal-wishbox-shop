import { Suspense } from "react";

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid";
import RefinementList from "@modules/store/components/refinement-list";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import PaginatedProducts from "@modules/store/templates/paginated-products";
import { HttpTypes } from "@medusajs/types";

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions;
  collection: HttpTypes.StoreCollection;
  page?: string;
  countryCode: string;
}) {
  const pageNumber = page ? parseInt(page) : 1;
  const sort = sortBy || "created_at";

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 md:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-10 xl:grid-cols-[320px_1fr]">
        {/* Filtreleme bölümü */}
        <aside className="order-2 lg:order-1">
          <div className="sticky top-20 pb-10">
            <div className="rounded-xl border border-gray-100 bg-white/50 p-5 shadow-sm backdrop-blur-sm">
              <RefinementList sortBy={sort} />
            </div>
          </div>
        </aside>

        {/* Ana içerik bölümü */}
        <main className="order-1 lg:order-2">
          <header className="mb-8 md:mb-10">
            <h1 className="text-2xl text-gray-900 md:text-3xl lg:text-4xl">
              {collection.title}
            </h1>
          </header>

          <Suspense
            fallback={
              <div className="animate-pulse space-y-4">
                <SkeletonProductGrid
                  numberOfProducts={collection.products?.length}
                />
              </div>
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              collectionId={collection.id}
              countryCode={countryCode}
            />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
