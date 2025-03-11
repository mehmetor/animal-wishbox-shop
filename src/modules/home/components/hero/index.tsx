import { Button } from "@/components/ui/button";
import { Heading } from "@medusajs/ui";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("HomePage");

  return (
    <div className="border-ui-border-base bg-ui-bg-subtle relative h-[75vh] w-full border-b">
      <div className="small:p-32 absolute inset-0 flex flex-col items-center justify-center gap-6 text-center">
        <span>
          <h1 className="text-3xl font-bold">Hello world!</h1>

          <Button>Click me</Button>

          <Heading level="h2" className="text-3xl leading-10 font-normal">
            {t("comingSoon")}
          </Heading>
        </span>
      </div>
    </div>
  );
};

export default Hero;
