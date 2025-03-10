import { BarsThree, XMark } from "@medusajs/icons"
import { Button, Drawer, Heading, Prompt, Text } from "@medusajs/ui"
import { useTranslations } from "next-intl"

const Hero = () => {
  const t = useTranslations("HomePage")


  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h2"
            className="text-3xl leading-10 text-ui-fg-subtle font-normal"
          >
            {t("comingSoon")}
          </Heading>
        </span>
        {/* <a
          href="https://github.com/medusajs/nextjs-starter-medusa"
          target="_blank"
        >
          <Button variant="secondary">
            View on GitHub
            <Github />
          </Button>
        </a> */}
      </div>
    </div>
  )
}

export default Hero
