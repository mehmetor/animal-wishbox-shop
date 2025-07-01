"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MoveRight, Leaf, Recycle, ArrowRightIcon } from "lucide-react";
import { SpinningText } from "@/components/magicui/spinning-text";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { AuroraText } from "@/components/magicui/aurora-text";
import { cn } from "@/lib/utils";
import Stack from "@/components/reactbits/Stack/Stack";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useState } from "react";

const defaultCards = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
  },
];

const images = [
  {
    id: 1,
    img: "https://mscrosugxoblkqhymkux.supabase.co/storage/v1/object/public/media//princess-eco-friendly-cat-litter-flushable-lavender-6l_WA-PLT4.webp",
    href: "/products/princess-eco-friendly-cat-litter-flushable-lavender-6l",
  },
  {
    id: 2,
    img: "https://mscrosugxoblkqhymkux.supabase.co/storage/v1/object/public/media//princess-eco-friendly-cat-litter-flushable-green-tea-6l_WA-PLT2.webp",
    href: "/products/princess-eco-friendly-cat-litter-flushable-green-tea-6l",
  },
  {
    id: 3,
    img: "https://mscrosugxoblkqhymkux.supabase.co/storage/v1/object/public/media//princess-eco-friendly-cat-litter-flushable-strawberry-6l_WA-PLT3.webp",
    href: "/products/princess-eco-friendly-cat-litter-flushable-strawberry-6l",
  },
];

const Hero = () => {
  const t = useTranslations("HomePage");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      console.log("window.innerWidth", window.innerWidth);
      setIsMobile(window.innerWidth < 576);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="hero relative inset-x-0 min-h-[762px] w-full border-b pb-16">
      <div className="inset-0 flex flex-col flex-nowrap items-center justify-between pt-16 lg:flex-row">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex h-full flex-col items-center justify-center gap-16 lg:w-full"
        >
          <LocalizedClientLink
            href="/store"
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ tüm ürünleri keşfet</span>
              <MoveRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </LocalizedClientLink>

          <div className="flex flex-col items-center gap-6">
            <div className="text-3xl text-slate-700 md:text-4xl dark:text-white">
              çevre dostu
            </div>
            <div className="text-4xl font-bold md:text-5xl dark:text-white">
              <AuroraText
                colors={[
                  "#FF0080",
                  "#7928CA",
                  "#0070F3",
                  "#38bdf8",
                  "#a855f7",
                  "#0F52BA",
                ]}
              >
                kedi kumu
              </AuroraText>
            </div>
          </div>
          <div className="hidden w-full flex-col items-center gap-4 py-8 lg:flex">
            <div className="py-8 font-extralight dark:text-neutral-200">
              <SpinningText>benzersiz • çevre dostu •</SpinningText>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex w-full flex-col items-center justify-center gap-2 lg:gap-8"
        >
          <div className="relative px-0">
            <Stack
              randomRotation={true}
              sensitivity={180}
              sendToBackOnClick={true}
              cardDimensions={{
                width: isMobile ? 291 : 388,
                height: isMobile ? 375 : 500,
              }}
              cardsData={images}
            />

            {/* <TiltedCard
                imageSrc="https://vwtwktgmqoqlwspzteqb.supabase.co/storage/v1/object/public/media//PRINCESS_ECO%20FRIENDLY%20LITTER_LAVENDER%20SCENT_6L_PLT4-01JNJTFCTVP46XD2VJGVAJM74C.png"
                altText="Kendrick Lamar - GNX Album Cover"
                // captionText="Kendrick Lamar - GNX"
                // containerHeight="360px"
                containerWidth="300px"
                // imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">Kendrick Lamar - GNX x</p>
                }
              /> */}
          </div>

          <div className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-400">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-start">
                <Leaf
                  className="mt-1 mr-2 flex-shrink-0 text-green-600"
                  size={24}
                />
                <p>
                  Princess çevre dostu, doğal kedi kumu, bambu, mısır
                  veya geri dönüştürülmüş kağıt gibi yenilenebilir kaynaklardan
                  üretilen sürdürülebilir bir seçimdir.
                </p>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex items-start">
                  <Recycle
                    className="mt-1 mr-2 flex-shrink-0 text-green-600"
                    size={24}
                  />
                  <p>
                    Biyolojik olarak parçalanabilir ve kompostlanabilir
                    olduğundan çevresel etkiyi en aza indirir.
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  {/* <Button>
                    <ShoppingCartIcon />
                    Sepete Ekle
                  </Button> */}
                  <LocalizedClientLink href="/products/princess-eco-friendly-cat-litter-flushable-lavender-6l">
                    <Button variant="outline">
                      <span className="ml-2"> İncele</span>
                      <ArrowRightIcon />
                    </Button>
                  </LocalizedClientLink>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
