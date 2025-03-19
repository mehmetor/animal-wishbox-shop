import LocalizedClientLink from "@modules/common/components/localized-client-link";
import React from "react";

const Help = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl">Yardım</h2>
      <div className="my-2 text-base">
        <ul className="flex flex-col gap-y-2 pl-4">
          <li>
            <LocalizedClientLink href="/contact">İletişim</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact">
              İade & Değişim
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
