import { cn } from "@/lib/utils";
import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import MedusaCTA from "@modules/layout/components/medusa-cta";
import { ExternalLink } from "lucide-react";

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  // Animal Wishbox backend URL'sini al
  const medusaBackendUrl =
    process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";

  return (
    <footer className="w-full border-t border-gray-200 mt-16">
      <div className="container mx-auto flex w-full flex-col">
        <div className="flex flex-col items-start justify-between gap-6 py-10 sm:flex-row">
          <div>
            <LocalizedClientLink href="/" className="text-xl font-medium">
              Animal Wishbox
            </LocalizedClientLink>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3 md:gap-16">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-900">
                  Katagoriler
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li
                        className="flex flex-col gap-2 text-sm text-gray-500"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={cn(
                            "hover:text-gray-900",
                            children && "text-sm font-medium",
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="ml-3 grid grid-cols-1 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-gray-900"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-900">
                  Kolleksiyonlar
                </span>
                <ul
                  className={cn(
                    "grid grid-cols-1 gap-2 text-sm text-gray-500",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    },
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-gray-900"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <ul className="grid grid-cols-1 gap-2 text-sm text-gray-500">
                <li>
                  <a
                    href="https://github.com/animal-wishbox/documentation"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-gray-900"
                  >
                    <span>Dokümantasyon</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <div className="mt-1 flex items-center gap-2">
                    <a
                      href={`${medusaBackendUrl}/app`}
                      target="_blank"
                      rel="noreferrer"
                      title={medusaBackendUrl}
                      className="flex items-center gap-2"
                    >
                      <span>Portal</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-16 flex w-full justify-between text-gray-400">
          <div className="flex flex-col">
            <p className="text-xs">
              © {new Date().getFullYear()} Animal Wishbox. v0.1.3
            </p>
            <p className="text-xs">
              <span>Tüm hakları saklıdır.</span>
            </p>
          </div>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  );
}
