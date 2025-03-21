"use client";

import { useState } from "react";
import { updateLineItem } from "@lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import CartItemSelect from "@modules/cart/components/cart-item-select";
import ErrorMessage from "@modules/checkout/components/error-message";
import DeleteButton from "@modules/common/components/delete-button";
import LineItemOptions from "@modules/common/components/line-item-options";
import LineItemPrice from "@modules/common/components/line-item-price";
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Spinner from "@modules/common/icons/spinner";
import Thumbnail from "@modules/products/components/thumbnail";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type ItemProps = {
  item: HttpTypes.StoreCartLineItem;
  type?: "full" | "preview";
  currencyCode: string;
};

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeQuantity = async (quantity: number) => {
    setError(null);
    setUpdating(true);

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10;
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory;

  return (
    <TableRow className="w-full" data-testid="product-row">
      <TableCell className="w-20 p-4 !px-0">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={cn("flex", {
            "w-16": type === "preview",
            "w-12 sm:w-24": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
      </TableCell>

      <TableCell className="text-left">
        <p
          className="text-foreground whitespace-break-spaces"
          data-testid="product-title"
        >
          {item.product_title}
        </p>
        {/* <LineItemOptions variant={item.variant} data-testid="product-variant" /> */}
      </TableCell>

      {type === "full" && (
        <TableCell>
          <div className="flex w-28 items-center gap-2">
            <DeleteButton id={item.id} data-testid="product-delete-button" />
            <CartItemSelect
              value={item.quantity}
              onChange={(value) => changeQuantity(parseInt(value.target.value))}
              className="h-10 w-14 p-4"
              data-testid="product-select-button"
            >
              {/* TODO: Update this with the v2 way of managing inventory */}
              {Array.from({ length: Math.min(maxQuantity, 10) }, (_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              ))}

              {/* <option value={1} key={1}>
                1
              </option> */}
            </CartItemSelect>
            {updating && (
              <div className="h-4 w-4">
                <Spinner />
              </div>
            )}
          </div>
          <ErrorMessage error={error} data-testid="product-error-message" />
        </TableCell>
      )}

      {type === "full" && (
        <TableCell className="hidden sm:table-cell">
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </TableCell>
      )}

      <TableCell className="">
        <span
          className={cn("!pr-0", {
            "flex h-full flex-col items-end justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 items-center">
              <p className="text-foreground/70">{item.quantity}x </p>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          )}
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </span>
      </TableCell>
    </TableRow>
  );
};

export default Item;
