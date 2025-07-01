import { Metadata } from "next";
import { Container } from "@medusajs/ui";
import { PreliminaryInformationForm } from "@/modules/content/legal-documents/components/preliminary-information-form";

export const metadata: Metadata = {
  title: "Ön Bilgilendirme Formu",
  description: "Satış öncesi bilgilendirme formu ve müşteri hakları hakkında detaylı bilgi.",
};

export default function PreliminaryInformationFormPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-4xl min-h-[60vh]">
        <div className="max-w-none">
          <PreliminaryInformationForm />
        </div>
      </div>
    </Container>
  );
} 