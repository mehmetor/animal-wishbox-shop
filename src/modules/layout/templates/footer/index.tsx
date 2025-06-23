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
    <footer className="mt-16 w-full border-t px-8">
      <div className="container mx-auto flex flex-col">
        <div className="my-16 flex flex-col items-start justify-between gap-6 sm:flex-row">
          <div className="w-full pb-8">
            <LocalizedClientLink href="/" className="text-xl font-medium">
              Animal Wishbox
            </LocalizedClientLink>
          </div>

          <div className="flex w-full flex-row gap-10 text-sm md:gap-16 md:px-12">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-1 flex-col gap-8">
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
              <div className="flex flex-1 flex-col gap-8">
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

            <div className="flex flex-1 flex-col gap-8">
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
                <li>
                  <LocalizedClientLink
                    className="hover:text-gray-900"
                    href="/yasal/iade-iptal-degisim-politikasi"
                  >
                    İade – İptal – Değişim Politikası
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
        </div>

        <div className="mt-8 flex w-full justify-between text-xs text-gray-500">
          <div className="flex flex-col">
            <p>© {new Date().getFullYear()} Animal Wishbox.</p>
            <p>Tüm hakları saklıdır.</p>
            <p>v0.1.9</p>

            <ul className="mt-2">
              <li>
                <a
                  href="https://github.com/animal-wishbox/documentation"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-6 items-center gap-1 hover:text-gray-900"
                >
                  <span>Dokümantasyon</span>
                  <ExternalLink size={16} />
                </a>
              </li>
              <li>
                <div>
                  <a
                    href={`${medusaBackendUrl}/app`}
                    target="_blank"
                    rel="noreferrer"
                    title={medusaBackendUrl}
                    className="flex h-6 items-center gap-1 hover:text-gray-900"
                  >
                    <span>Portal</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <MedusaCTA />
        </div>
      </div>
    </footer>
  );
}
