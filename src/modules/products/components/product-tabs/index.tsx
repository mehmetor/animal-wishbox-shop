"use client";

import { Truck, RefreshCcwDot, Undo2, Zap } from "lucide-react";

import Accordion from "./accordion";
import { HttpTypes } from "@medusajs/types";
import {
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui/accordion";

type ProductTabsProps = {
  product: HttpTypes.StoreProduct;
};

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Ürün Bilgileri",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Kargo & İade",
      component: <ShippingInfoTab />,
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Ürün Bilgileri</AccordionTrigger>
        <AccordionContent>
          <ProductInfoTab product={product} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Kargo & İade</AccordionTrigger>
        <AccordionContent>
          <ShippingInfoTab />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="p-4 text-sm font-normal">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Malzeme</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Ülke</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Tip</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Ağırlık</span>
            <p>{product.weight ? `${product.weight}` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Boyutlar</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShippingInfoTab = () => {
  return (
    <div className="p-4 pl-0 text-sm font-normal">
      <div className="grid grid-cols-1 gap-y-4">
        <div className="flex items-start gap-x-2">
          <div className="w-8">
            <Truck  strokeWidth={1} />
          </div>
          <div>
            <span className="font-semibold">Kargo</span>
            <p className="">Paketiniz 3-5 iş günü içinde teslim alın.</p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <div className="w-8">
            <RefreshCcwDot strokeWidth={1} />
          </div>
          <div>
            <span className="font-semibold">Değişim</span>
            <p className="">
              Uyumlu değil mi? Endişe etmeyin - ürününüzü yeni bir ürünle
              değiştireceğiz.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <div className="w-8">
            <Undo2 strokeWidth={1} />
          </div>
          <div>
            <span className="font-semibold">İade</span>
            <p className="">
              Sadece ürününüzü iade edin ve para iadesi alın. İade işlemini sorunsuz hale getireceğiz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
