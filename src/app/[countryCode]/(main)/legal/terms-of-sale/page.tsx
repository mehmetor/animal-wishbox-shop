import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { TermsOfSale } from "@/modules/content/legal-documents/components/terms-of-sale";
import { Container } from "@medusajs/ui";

type Props = {
  params: Promise<{ countryCode: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  
  const t = await getTranslations({
    locale: resolvedParams.countryCode,
    namespace: "metadata",
  });

  return {
    title: t("legal.terms_of_sale.title"),
    description: t("legal.terms_of_sale.description"),
  };
}

/** Satış Şartları */
export default function TermsOfSalePage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-4xl min-h-[60vh]">
        <div className="max-w-none">
          <TermsOfSale />
        </div>
      </div>
    </Container>
  );
}
