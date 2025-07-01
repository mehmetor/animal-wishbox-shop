import { Metadata } from "next";
import { Container } from "@medusajs/ui";
import { KvkkDisclosure } from "@/modules/content/legal-documents/components/kvkk-disclosure";

export const metadata: Metadata = {
  title: "KVKK Kapsamında Aydınlatma Metni",
  description: "Kişisel verilerin korunması ve aydınlatma metni hakkında detaylı bilgi.",
};

export default function KvkkDisclosurePage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-4xl min-h-[60vh]">
        <div className="max-w-none">
          <KvkkDisclosure />
        </div>
      </div>
    </Container>
  );
} 