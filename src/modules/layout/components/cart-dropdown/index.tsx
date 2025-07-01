"use client";

import { useEffect, useRef, useState } from "react";
import { HttpTypes } from "@medusajs/types";
import { IconBadge } from "@medusajs/ui";
import { CalendarIcon, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  HoverCardTrigger,
  HoverCardContent,
  HoverCard,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";
import Thumbnail from "@/modules/products/components/thumbnail";
import LineItemOptions from "@/modules/common/components/line-item-options";
import LineItemPrice from "@/modules/common/components/line-item-price";
import DeleteButton from "@/modules/common/components/delete-button";
import { convertToLocale } from "@/lib/util/money";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mobil cihazları tespit etmek için useMediaQuery hook'u
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null;
}) => {
  const t = useTranslations("HomePage");
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined,
  );
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  
  // Mobil cihaz kontrolü
  const isMobile = useMediaQuery("(max-width: 768px)");

  const open = () => setCartDropdownOpen(true);
  const close = () => setCartDropdownOpen(false);
  
  // Mobil cihazlarda tıklama ile açma/kapama işlevi
  const toggleCart = () => {
    setCartDropdownOpen(!cartDropdownOpen);
  };

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0) || 0;

  const subtotal = cartState?.subtotal ?? 0;
  const itemRef = useRef<number>(totalItems || 0);

  const timedOpen = () => {
    open();
    const timer = setTimeout(close, 5000);
    setActiveTimer(timer);
  };

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer);
    }
    open();
  };

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer);
      }
    };
  }, [activeTimer]);

  const pathname = usePathname();

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current]);

  return (
    <HoverCard
      openDelay={100}
      closeDelay={300}
      onOpenChange={setCartDropdownOpen}
      open={cartDropdownOpen}
    >
      <HoverCardTrigger asChild>
        <div 
          className="relative" 
          onClick={isMobile ? toggleCart : undefined}
          style={isMobile ? { cursor: "pointer" } : undefined}
        >
          <ShoppingCart />
          {totalItems > 0 && (
            <div className="absolute -top-4 -right-4">
              <Badge variant="secondary">{totalItems}</Badge>
            </div>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-96 md:w-[32rem]" align="end">
        <div className="p-4">
          <h3 className="font-semibold">{t("cart")}</h3>
        </div>
        {cartState && cartState.items?.length ? (
          <>
            <ScrollArea className="-mx-4 grid h-80 grid-cols-1 border-y px-2 md:h-96">
              {cartState.items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1;
                })
                .map((item) => (
                  <div
                    className="grid grid-cols-[100px_1fr] border-b py-1"
                    key={item.id}
                    data-testid="cart-item"
                  >
                    <LocalizedClientLink
                      href={`/products/${item.product_handle}`}
                      className="w-24"
                    >
                      <Thumbnail
                        thumbnail={item.thumbnail}
                        images={item.variant?.product?.images}
                        size="square"
                      />
                    </LocalizedClientLink>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <div className="mr-1 flex h-24 flex-col justify-between py-1">
                            <h3 className="">
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                data-testid="product-link"
                              >
                                {item.title}
                              </LocalizedClientLink>
                            </h3>
                            {/* <LineItemOptions
                              variant={item.variant}
                              data-testid="cart-item-variant"
                              data-value={item.variant}
                            /> */}
                            <div className="flex items-center gap-x-2">
                              <span
                                data-testid="cart-item-quantity"
                                data-value={item.quantity}
                              >
                                <span className="text-muted-foreground text-sm">
                                  {t("quantity")}
                                </span>
                                :{" "}
                                <span className="tabular-nums">
                                  {item.quantity}
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="mr-2 flex h-24 flex-col items-end justify-end py-1">
                            <DeleteButton
                              id={item.id}
                              className=""
                              data-testid="cart-item-remove-button"
                              title={t("remove")}
                            />
                            <div className="mt-auto">
                              <LineItemPrice
                                item={item}
                                style="tight"
                                currencyCode={cartState.currency_code}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </ScrollArea>
            <div className="flex flex-col gap-y-4 p-4 font-normal">
              <div className="flex items-center justify-between">
                <span className="text-foreground font-semibold">
                  {t("subtotal")}{" "}
                  {/* <span className="font-normal">({t("exclTaxes")})</span> */}
                </span>
                <span
                  className="font-semibold tabular-nums"
                  data-testid="cart-subtotal"
                  data-value={subtotal}
                >
                  {convertToLocale({
                    amount: subtotal,
                    currency_code: cartState.currency_code,
                  })}
                </span>
              </div>
              <LocalizedClientLink href="/cart" passHref>
                <Button
                  className="w-full"
                  size="lg"
                  data-testid="go-to-cart-button"
                  onClick={close}
                >
                  {t("goToCart")}
                </Button>
              </LocalizedClientLink>
            </div>
          </>
        ) : (
          <div>
            <div className="flex flex-col items-center justify-center gap-y-4 py-16">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-sm font-normal text-white">
                <span>0</span>
              </div>
              <span>{t("emptyCart")}</span>
              <div>
                <LocalizedClientLink href="/store">
                  <>
                    <span className="sr-only">{t("goToAllProductsPage")}</span>
                    <Button onClick={close}>{t("exploreProducts")}</Button>
                  </>
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

/*

        <div className="flex items-center justify-center p-4">
          <h3 className="font-semibold">{t("cart")}</h3>
        </div>
        {cartState && cartState.items?.length ? (
          <>
            <div className="no-scrollbar grid grid-cols-1 gap-y-8 overflow-y-scroll p-px px-4">
              {cartState.items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1;
                })
                .map((item) => (
                  <div
                    className="grid grid-cols-[122px_1fr] gap-x-4"
                    key={item.id}
                    data-testid="cart-item"
                  >
                    <LocalizedClientLink
                      href={`/products/${item.product_handle}`}
                      className="w-24"
                    >
                      <Thumbnail
                        thumbnail={item.thumbnail}
                        images={item.variant?.product?.images}
                        size="square"
                      />
                    </LocalizedClientLink>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <div className="mr-4 flex w-[180px] flex-col overflow-ellipsis whitespace-nowrap">
                            <h3 className="text-base overflow-hidden text-ellipsis">
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                data-testid="product-link"
                              >
                                {item.title}
                              </LocalizedClientLink>
                            </h3>
                            <LineItemOptions
                              variant={item.variant}
                              data-testid="cart-item-variant"
                              data-value={item.variant}
                            />
                            <span
                              data-testid="cart-item-quantity"
                              data-value={item.quantity}
                            >
                              {t("quantity")}: {item.quantity}
                            </span>
                          </div>
                          <div className="flex justify-end">
                            <LineItemPrice
                              item={item}
                              style="tight"
                              currencyCode={cartState.currency_code}
                            />
                          </div>
                        </div>
                      </div>
                      <DeleteButton
                        id={item.id}
                        className="mt-1"
                        data-testid="cart-item-remove-button"
                      >
                        {t("remove")}
                      </DeleteButton>
                    </div>
                  </div>
                ))}
            </div>
            <div className="text-sm font-normal flex flex-col gap-y-4 p-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground font-semibold">
                  {t("subtotal")}{" "}
                  <span className="font-normal">({t("exclTaxes")})</span>
                </span>
                <span
                  className="font-semibold"
                  data-testid="cart-subtotal"
                  data-value={subtotal}
                >
                  {convertToLocale({
                    amount: subtotal,
                    currency_code: cartState.currency_code,
                  })}
                </span>
              </div>
              <LocalizedClientLink href="/cart" passHref>
                <Button
                  className="w-full"
                  size="large"
                  data-testid="go-to-cart-button"
                >
                  {t("goToCart")}
                </Button>
              </LocalizedClientLink>
            </div>
          </>
        ) : (
          <div>
            <div className="flex flex-col items-center justify-center gap-y-4 py-16">
              <div className="text-sm font-normal flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white">
                <span>0</span>
              </div>
              <span>{t("emptyCart")}</span>
              <div>
                <LocalizedClientLink href="/store">
                  <>
                    <span className="sr-only">{t("goToAllProductsPage")}</span>
                    <Button onClick={close}>{t("exploreProducts")}</Button>
                  </>
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        )}
*/
export default CartDropdown;
