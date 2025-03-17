import LocalizedClientLink from "@modules/common/components/localized-client-link";
import ChevronDown from "@modules/common/icons/chevron-down";
import MedusaCTA from "@modules/layout/components/medusa-cta";
import { cn } from "@/lib/utils";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("app/[countryCode]/(checkout)/layout.tsx");
  return (
    <div
      className={cn(
        "relative w-full sm:min-h-screen",
        "bg-[url('/assets/pattern-light.svg')]",
        "dark:bg-[url('/assets/pattern-dark.svg')]",
        "px-8 sm:px-16 md:px-24",
      )}
    >
      <div className="container mx-auto h-16 border-b">
        <nav className="flex h-full items-center justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-foreground flex flex-1 basis-0 items-center gap-x-2 uppercase"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="txt-compact-plus text-muted-foreground mt-px hidden sm:block">
              Back to shopping cart
            </span>
            <span className="txt-compact-plus text-muted-foreground hover:text-foreground mt-px block sm:hidden">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus text-muted-foreground uppercase"
            data-testid="store-link"
          >
            Animal Wishbox
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div
        className="relative container mx-auto"
        data-testid="checkout-container"
      >
        {children}
      </div>
      <div className="container mx-auto flex w-full items-center justify-center py-4">
        <MedusaCTA />
      </div>
    </div>
  );
}
