import React from "react";

import UnderlineLink from "@modules/common/components/interactive-link";

import AccountNav from "../components/account-nav";
import { HttpTypes } from "@medusajs/types";

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null;
  children: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 sm:py-12" data-testid="account-page">
      <div className="container mx-auto flex h-full max-w-5xl flex-1 flex-col">
        <div className="grid grid-cols-1 py-12 sm:grid-cols-[240px_1fr]">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1 px-2">{children}</div>
        </div>
        <div className="flex flex-col items-end justify-between gap-8 border-gray-200 px-4 py-12 sm:flex-row sm:border-t">
          <div>
            <h3 className="text-xl-semi mb-4">Sorularınız mı var?</h3>
            <span className="font-medium">
              Sıkça sorulan soruları ve cevaplarını iletişim sayfamızda
              bulabilirsiniz.
            </span>
          </div>
          <div>
            <UnderlineLink href="/contact">İletişim</UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
