import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { RefundPolicy } from "@/modules/content/legal-documents/components/refund-policy";
import { Container } from "@medusajs/ui";

type Props = {
  params: { countryCode: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.countryCode,
    namespace: "metadata",
  });

  return {
    title: t("legal.refund_policy.title"),
    description: t("legal.refund_policy.description"),
  };
}

/** İade Politikası */
export default function RefundPolicyPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-4xl  min-h-[60vh]">
        <div className="max-w-none">
          <RefundPolicy />
        </div>
      </div>
    </Container>
  );
}
