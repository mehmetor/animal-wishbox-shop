import LocalizedClientLink from "@modules/common/components/localized-client-link";
import React from "react";

const Help = () => {
  return (
    <div className="">
      <div className="mt-4 mb-8 flex flex-row items-center justify-between">
        <h2 className="flex flex-row items-baseline gap-x-2 text-2xl">
          Yardım
        </h2>
      </div>
      <div className="my-2 text-base">
        <ul className="flex flex-col gap-y-2 pl-4">
          <li>
            <LocalizedClientLink href="/contact">İletişim</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/yasal/iade-iptal-degisim-politikasi">
              İade, İptal, Değişim Politikası
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
