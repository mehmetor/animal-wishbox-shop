import { Metadata } from "next";
import { Container } from "@medusajs/ui";
import { ReturnCancellationPolicy } from "@/modules/content/legal-documents/components/return-cancellation-policy";

export const metadata: Metadata = {
  title: "İade – İptal – Değişim Politikası",
  description: "İade, iptal ve değişim süreçlerimiz ve koşullarımız hakkında detaylı bilgi.",
};

export default function ReturnCancellationPolicyPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-4xl min-h-[60vh]">
        <div className="max-w-none">
          <ReturnCancellationPolicy />
        </div>
      </div>
    </Container>
  );
} 