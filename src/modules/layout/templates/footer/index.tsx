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
    <>
      <footer className="mt-16 w-full border-y pb-8">
        <div className="container mx-auto flex flex-col">
          <div className="my-12 pb-12 grid grid-cols-1 gap-10 border-b text-sm sm:grid-cols-3 md:grid-cols-4 md:gap-16">
            <div className="col-span-1 sm:col-span-3 md:col-span-1">
              <LocalizedClientLink href="/" className="text-xl font-medium">
                Animal Wishbox
              </LocalizedClientLink>
            </div>

            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-4">
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
              <div className="flex flex-col gap-4">
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

            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium text-gray-900">
                Bağlantılar
              </span>
              <ul className="grid grid-cols-1 gap-2 text-sm text-gray-500">
                <li>
                  <LocalizedClientLink
                    className="hover:text-gray-900"
                    href="/store"
                  >
                    Mağaza
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-gray-900"
                    href="/contact"
                  >
                    İletişim
                  </LocalizedClientLink>
                </li>
                <li className="my-1 w-2/3 border-b" />
                <li>
                  <LocalizedClientLink
                    className="hover:text-gray-900"
                    href="/yasal/iade-iptal-degisim-politikasi"
                  >
                    İade, İptal, Değişim Politikası
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-gray-900"
                    href="/yasal/kvkk-aydinlatma-metni"
                  >
                    KVKK Aydınlatma Metni
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-gray-900"
                    href="/yasal/mesafeli-satis-sozlesmesi"
                  >
                    Mesafeli Satış Sözleşmesi
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-gray-900"
                    href="/yasal/on-bilgilendirme-formu"
                  >
                    Ön Bilgilendirme Formu
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-gray-900"
                    href="/yasal/acik-riza-metni"
                  >
                    Açık Rıza Metni
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex w-full flex-col justify-between text-xs text-gray-500 md:flex-row">
            <div className="flex flex-col">
              <p>
                © {new Date().getFullYear()} Animal Wishbox. Tüm hakları
                saklıdır.
              </p>
            </div>

            <MedusaCTA />
          </div>
        </div>
      </footer>
      <div className="pt-8 text-center text-xs text-gray-500">
        Created by{" "}
        <a href="https://simetri8.com" target="_blank" rel="noreferrer">
          S8
        </a>
        {", "}<span>v0.4.20</span>
      </div>
    </>
  );
}
