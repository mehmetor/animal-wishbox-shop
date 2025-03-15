import React from "react";
import { listRegions } from "@lib/data/regions";
import { StoreRegion } from "@medusajs/types";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import SideMenu from "@modules/layout/components/side-menu";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuItem,
//   NavigationMenuViewport,
// } from "@/components/ui/navigation-menu";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ];

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
//             className,
//           )}
//           {...props}
//         >
//           <div className="text-sm leading-none font-medium">{title}</div>
//           <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions);

  return (
    <header className="group sticky z-50 ">
      <nav className="fixed inset-x-0 top-4 container mx-auto h-16 px-8 md:px-16 lg:px-24">
        <div className="flex h-full items-center justify-between rounded-full border border-gray-500/25 bg-white/25 px-8 shadow-md backdrop-blur-lg">
          <div className="flex flex-1">
            <a href="/" className="text-xl font-semibold text-slate-600">
              <span>Animal Wishbox</span>
              {/* <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                /> */}
            </a>
          </div>

          {/* <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                            href="/"
                          >
                           
                            <div className="mt-4 mb-2 text-lg font-medium">
                              shadcn/ui
                            </div>
                            <p className="text-muted-foreground text-sm leading-tight">
                              Beautifully designed components that you can copy
                              and paste into your apps. Accessible.
                              Customizable. Open Source.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/docs" title="Introduction">
                        Re-usable components built using Radix UI and Tailwind
                        CSS.
                      </ListItem>
                      <ListItem href="/docs/installation" title="Installation">
                        How to install dependencies and structure your app.
                      </ListItem>
                      <ListItem
                        href="/docs/primitives/typography"
                        title="Typography"
                      >
                        Styles for headings, paragraphs, lists...etc
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Ürünler</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem title="Köpekler" href="/products/dogs">
                        Köpek dostlarımız için özel ürünler ve aksesuarlar
                      </ListItem>
                      <ListItem title="Kediler" href="/products/cats">
                        Kedi dostlarımız için özel ürünler ve aksesuarlar
                      </ListItem>
                      <ListItem title="Kuşlar" href="/products/birds">
                        Kuş dostlarımız için özel ürünler ve aksesuarlar
                      </ListItem>
                      <ListItem title="Balıklar" href="/products/fish">
                        Balık dostlarımız için özel ürünler ve aksesuarlar
                      </ListItem>
                      <ListItem title="Tüm Ürünler" href="/products">
                        Tüm hayvan dostlarımız için ürünlerimizi keşfedin
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem></NavigationMenuItem>
              </NavigationMenuList>

            </NavigationMenu> */}

          <div className="flex flex-1 items-center justify-end gap-3">
            <LocalizedClientLink href="/account" data-testid="nav-account-link">
              <Button variant="ghost" size="icon">
                <User className="scale-125" />
              </Button>
            </LocalizedClientLink>

            <CartButton />

            <SideMenu regions={regions} />
          </div>
        </div>
      </nav>
    </header>
  );
}
