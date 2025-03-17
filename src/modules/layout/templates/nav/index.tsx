import React from "react";
import { listRegions } from "@lib/data/regions";
import { listCollections } from "@lib/data/collections";
import { listCategories } from "@/lib/data/categories";
import { StoreRegion } from "@medusajs/types";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import SideMenu from "@modules/layout/components/side-menu";
import { User } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-3 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions);
  const { collections } = await listCollections({
    fields: "*products"    
  });
  const productCategories = await listCategories();

  return (
    <header className="group sticky z-50">
      <nav className="fixed inset-x-0 top-4 container mx-auto h-16 px-4 md:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between rounded-full border border-gray-500/25 bg-white/25 pr-8 shadow-md backdrop-blur-lg">
          <div className="flex grow">
            <a href="/" className="text-xl font-semibold text-slate-600">
              
              <img
                  className=" h-6 lg:h-7 pl-4 md:pl-6 "
                  alt="Animal Wishbox"
                  src="https://mscrosugxoblkqhymkux.supabase.co/storage/v1/object/public/media//animal-wishbox-logo-black-600x72.png"
                /> 
            </a>
          </div>
          
          <div className="hidden sm:flex grow">
            <NavigationMenu>
              <NavigationMenuList>
                {collections.sort((a, b) => a.title.localeCompare(b.title)).map((collection) => (
                  <NavigationMenuItem key={collection.id} className="text-foreground/80">
                    <Link
                      href={`/collections/${collection.handle}`}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink>
                        {collection.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent px-2 font-normal text-foreground/80">
                    Katagoriler
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-3 p-4 md:w-[460px] md:grid-cols-2 lg:w-[600px]">
                      {productCategories.map((category) => (
                        <ListItem
                          key={category.id}
                          title={category.name}
                          href={`/categories/${category.handle}`}
                        >
                          {category.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* <NavigationMenuItem></NavigationMenuItem> */}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4 md:gap-6">
            <LocalizedClientLink href="/account" data-testid="nav-account-link">
              <User />
            </LocalizedClientLink>
            <CartButton />
            <SideMenu regions={regions} />
          </div>
        </div>
      </nav>
    </header>
  );
}
