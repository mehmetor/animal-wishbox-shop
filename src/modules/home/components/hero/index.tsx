"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MoveRight } from "lucide-react";
import { SpinningText } from "@/components/magicui/spinning-text";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { AuroraText } from "@/components/magicui/aurora-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";

const Hero = () => {
  const t = useTranslations("HomePage");

  return (
    <div className="relative h-[75vh] w-full border-b">
      <div className="small:p-32 absolute inset-0 flex flex-row flex-nowrap items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col items-start gap-8 px-4"
        >
          <AnimatedShinyText className="flex items-center py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Katalogta Keşfet</span>
            <MoveRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>

          <div className="text-xl text-slate-700 md:text-4xl dark:text-white">
            Tamamen doğal
          </div>

          <div className="text-3xl font-bold md:text-7xl dark:text-white">
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

          <div className="flex  ">
            <RainbowButton
              className="text-white"
              data-testid="add-product-button"
            >
              Gözat
            </RainbowButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col items-start gap-4 px-4"
        >
          <div className="py-8 font-extralight dark:text-neutral-200">
            <SpinningText>benzersiz • çevre dostu •</SpinningText>
          </div>
        </motion.div>

        {/* <div className="flex gap-4">
          <Button>Click me</Button>
          <Button variant={"secondary"}>Click me</Button>
          <Button variant={"destructive"}>Click me</Button>
          <Button variant={"link"}>Click me</Button>
          <Button variant={"outline"}>Click me</Button>
        </div>
        <h2 className="text-3xl leading-10 font-normal">{t("comingSoon")}</h2> */}
      </div>
    </div>
  );
};

export default Hero;
