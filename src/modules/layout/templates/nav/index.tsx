import { Suspense } from "react"
import { BarsThree, XMark } from "@medusajs/icons"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { Button, IconBadge, IconButton, Text } from "@medusajs/ui"
import { Drawer } from "@medusajs/ui"
import { ShoppingCart, User } from "lucide-react"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative mx-auto duration-200 h-20">
        <nav
          aria-label="Global"
          className="fixed top-4 backdrop-blur-lg bg-white/25 dark:bg-slate-900/25 shadow-md inset-x-4 h-12 max-w-screen-xl mx-auto rounded-full overflow-hidden border dark:border-slate-700/70"
        >
          <div className="h-full flex items-center justify-between mx-auto px-4">
            <div className="flex flex-1">
              <a href="/" className="">
                <span>Animal Wishbox</span>
                {/* <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  /> */}
              </a>
            </div>

            <div className="hidden lg:flex lg:gap-x-12"></div>

            <div className="flex flex-1 justify-end  gap-2">
              <LocalizedClientLink
                href="/account"
                className="hover:text-ui-fg-base flex gap-2"
                data-testid="nav-account-link"
              >
                <IconButton variant="transparent">
                  <User />
                </IconButton>
              </LocalizedClientLink>

              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base flex"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    <IconButton variant="transparent">
                      <ShoppingCart />
                    </IconButton>
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>

              <SideMenu regions={regions} />
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
