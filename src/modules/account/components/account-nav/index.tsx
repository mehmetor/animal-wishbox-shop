"use client";

import { clx } from "@medusajs/ui";
import { useParams, usePathname } from "next/navigation";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { HttpTypes } from "@medusajs/types";
import { signout } from "@lib/data/customer";
import { ChevronDown, LogOut, User, MapPin, Package } from "lucide-react";

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null;
}) => {
  const route = usePathname();
  const { countryCode } = useParams() as { countryCode: string };

  const handleLogout = async () => {
    await signout(countryCode);
  };

  return (
    <div>
      <div className="sm:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="mb-6 flex items-center gap-x-2 text-sm font-normal"
            data-testid="account-main-link"
          >
            <>
              <ChevronDown className="rotate-90 transform" />
              <span>Hesabım</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="text-xl-semi mb-4 px-8">
              Merhaba {customer?.first_name}
            </div>
            <div className="text-base">
              <ul>
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between border-b px-8 py-4"
                    data-testid="profile-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <User size={20} />
                        <span>Profilim</span>
                      </div>
                      <ChevronDown className="-rotate-90 transform" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between border-b px-8 py-4"
                    data-testid="addresses-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <MapPin size={20} />
                        <span>Adreslerim</span>
                      </div>
                      <ChevronDown className="-rotate-90 transform" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between border-b px-8 py-4"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package size={20} />
                      <span>Siparişlerim</span>
                    </div>
                    <ChevronDown className="-rotate-90 transform" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between border-b px-8 py-4"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <LogOut size={20} />
                      <span>Çıkış Yap</span>
                    </div>
                    <ChevronDown className="-rotate-90 transform" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden sm:block" data-testid="account-nav">
        <div>
          <div className="pb-4">
            <h3 className="text-base-semi">Hesabım</h3>
          </div>
          <div className="text-base">
            <ul className="mb-0 flex flex-col items-start justify-start gap-y-4">
              <li>
                <AccountNavLink
                  href="/account"
                  route={route!}
                  data-testid="overview-link"
                >
                  Genel Bilgiler
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/profile"
                  route={route!}
                  data-testid="profile-link"
                >
                  Profilim
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/addresses"
                  route={route!}
                  data-testid="addresses-link"
                >
                  Adreslerim
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/orders"
                  route={route!}
                  data-testid="orders-link"
                >
                  Siparişlerim
                </AccountNavLink>
              </li>
              <li className="text-grey-700">
                <button
                  type="button"
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  Çıkış Yap
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

type AccountNavLinkProps = {
  href: string;
  route: string;
  children: React.ReactNode;
  "data-testid"?: string;
};

const AccountNavLink = ({
  href,
  route,
  children,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams();

  const active = route.split(countryCode)[1] === href;
  return (
    <LocalizedClientLink
      href={href}
      className={clx("text-muted-foreground hover:text-foreground", {
        "text-foreground font-semibold": active,
      })}
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  );
};

export default AccountNav;
