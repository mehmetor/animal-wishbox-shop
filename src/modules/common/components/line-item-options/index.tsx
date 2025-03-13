import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { useTranslations } from "next-intl"

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

const LineItemOptions = ({
  variant,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  const t = useTranslations("Components")
  return (
    <Text
      data-testid={dataTestid}
      data-value={dataValue}
      className="inline-block font-medium text-muted-foreground w-full overflow-hidden text-ellipsis"
    >
      {t("variant")}: {variant?.title}
    </Text>
  )
}

export default LineItemOptions
