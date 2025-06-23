"use client";

import { useToggleState } from "@medusajs/ui";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CountrySelect from "../country-select";
import { HttpTypes } from "@medusajs/types";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { ArrowRightFromLineIcon, Menu, Minus } from "lucide-react";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Divider from "@/modules/common/components/divider";

const SideMenuItems = {
  home: "/",
  store: "/store",
  account: "/account",
  cart: "/cart",
};

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState();
  const t = useTranslations("SideMenu");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex h-full w-full max-w-sm flex-col py-4">
          <DrawerHeader>
            <DrawerTitle>
              <img
                className="h-6 pl-4 md:pl-6 lg:h-7"
                alt="Animal Wishbox"
                src="https://mscrosugxoblkqhymkux.supabase.co/storage/v1/object/public/media//animal-wishbox-logo-black-600x72.png"
              />
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div
            data-testid="nav-menu-popup"
            className="flex h-full flex-col justify-between px-12 py-8"
          >
            <ul className="flex h-full flex-col items-start justify-start gap-2">
              {Object.entries(SideMenuItems).map(([name, href]) => {
                return (
                  <li key={name}>
                    <LocalizedClientLink
                      href={href}
                      className="hover:text-foreground/40 text-xl leading-10"
                      onClick={toggleState.close}
                      data-testid={`${name.toLowerCase()}-link`}
                    >
                      {t(name)}
                    </LocalizedClientLink>
                  </li>
                );
              })}
              <div className="grow" />

              <Divider />
              <li>
                <LocalizedClientLink href="/contact" passHref>
                  İletişim
                </LocalizedClientLink>
              </li>
              <Divider />
              <li className="text-sm">
                <LocalizedClientLink href="/yasal/iade-iptal-degisim-politikasi" passHref>
                  İade – İptal – Değişim Politikası
                </LocalizedClientLink>
              </li>
              <li className="text-sm">
                <LocalizedClientLink href="/yasal/kvkk-aydinlatma-metni" passHref>
                  KVKK Aydınlatma Metni
                </LocalizedClientLink>
              </li>
              <li className="text-sm">
                <LocalizedClientLink href="/yasal/mesafeli-satis-sozlesmesi" passHref>
                  Mesafeli Satış Sözleşmesi
                </LocalizedClientLink>
              </li>
              <li className="text-sm">
                <LocalizedClientLink href="/yasal/on-bilgilendirme-formu" passHref>
                  Ön Bilgilendirme Formu
                </LocalizedClientLink>
              </li>
              <li className="text-sm">
                <LocalizedClientLink href="/yasal/acik-riza-metni" passHref>
                  Açık Rıza Metni
                </LocalizedClientLink>
              </li>
            </ul>
            <div className="flex flex-col gap-y-6 hidden">
              <Divider />
              <div
                className="flex justify-between"
                onMouseEnter={toggleState.open}
                onMouseLeave={toggleState.close}
              >
                {regions && (
                  <CountrySelect toggleState={toggleState} regions={regions} />
                )}
                <ArrowRightFromLineIcon
                  className={cn(
                    "transition-transform duration-150",
                    toggleState.state ? "-rotate-90" : "",
                  )}
                />
              </div>
            </div>
          </div>

          <DrawerFooter className="flex items-center justify-between">
            <DrawerTitle className="text-sm font-light">
              © {new Date().getFullYear()} Animal Wishbox.{" "}
              {t("allRightsReserved")}
            </DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="secondary"
                ref={closeButtonRef}
                className="hidden"
              >
                {t("close")}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
  /*
  return (
    <Drawer open={toggleState.state} onOpenChange={toggleState.toggle}>
      <Drawer.Trigger asChild>
        <IconButton variant="transparent">
          <BarsThree />
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Content
        aria-describedby="side-menu"
        className="z-50 sm:max-w-[360px]"
      >
        <Drawer.Header>
          <Drawer.Title></Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="p-4">
          <div
            data-testid="nav-menu-popup"
            className="flex flex-col h-full justify-between p-6"
          >
            <ul className="flex flex-col gap-6 items-start justify-start">
              {Object.entries(SideMenuItems).map(([name, href]) => {
                return (
                  <li key={name}>
                    <LocalizedClientLink
                      href={href}
                      className="text-2xl leading-10 hover:text-foreground/40 "
                      onClick={toggleState.close}
                      data-testid={`${name.toLowerCase()}-link`}
                    >
                      {t(name)}
                    </LocalizedClientLink>
                  </li>
                )
              })}
            </ul>
            <div className="hidden flex flex-col gap-y-6 ">
              <div
                className="flex justify-between"
                onMouseEnter={toggleState.open}
                onMouseLeave={toggleState.close}
              >
                {regions && (
                  <CountrySelect toggleState={toggleState} regions={regions} />
                )}
                <ArrowRightMini
                  className={clx(
                    "transition-transform duration-150",
                    toggleState.state ? "-rotate-90" : ""
                  )}
                />
              </div>
            </div>
          </div>
        </Drawer.Body>
        <Drawer.Footer className="flex justify-between items-center txt-compact-small">
          <Drawer.Title className="txt-compact-small">
            © {new Date().getFullYear()} Animal Wishbox. {t("allRightsReserved")}
          </Drawer.Title>
          <Drawer.Close asChild>
            <Button variant="secondary" ref={closeButtonRef} className="hidden">{t("close")}</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )*/
};

export default SideMenu;
