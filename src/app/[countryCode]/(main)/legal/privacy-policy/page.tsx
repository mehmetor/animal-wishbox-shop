import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PrivacyPolicy } from "@/modules/content/legal-documents/components/privacy-policy";
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
    title: t("legal.privacy_policy.title"),
    description: t("legal.privacy_policy.description"),
  };
}

/** Gizlilik Politikası */
export default function PrivacyPolicyPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-4xl min-h-[60vh]">
        <div className="max-w-none">
          <PrivacyPolicy />
        </div>
      </div>
    </Container>
  );
}
