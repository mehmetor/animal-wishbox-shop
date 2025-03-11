import { Heading } from "@medusajs/ui"
import { useTranslations } from "next-intl"

const Hero = () => {
  const t = useTranslations("HomePage")

  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <h1 className="text-3xl font-bold">Hello world!</h1>
        
<button className="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800">Submit</button>

          <Heading level="h2" className="text-3xl leading-10 font-normal">
            {t("comingSoon")}
          </Heading>
        </span>
      </div>
    </div>
  )
}

export default Hero
