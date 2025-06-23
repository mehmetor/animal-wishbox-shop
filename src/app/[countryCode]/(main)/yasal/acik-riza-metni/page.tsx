import { Metadata } from "next";
import { Container } from "@medusajs/ui";
import { ConsentDocument } from "@/modules/content/legal-documents/components/consent-document";

export const metadata: Metadata = {
  title: "Açık Rıza Metni",
  description: "Kişisel verilerin işlenmesine ilişkin açık rıza metni.",
};

export default function ConsentDocumentPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-4xl min-h-[60vh]">
        <div className="max-w-none">
          <ConsentDocument />
        </div>
      </div>
    </Container>
  );
} 