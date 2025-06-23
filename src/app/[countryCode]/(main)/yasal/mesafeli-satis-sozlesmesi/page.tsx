import { Metadata } from "next";
import { Container } from "@medusajs/ui";
import { DistanceSalesContract } from "@/modules/content/legal-documents/components/distance-sales-contract";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi",
  description: "Mesafeli satış sözleşmesi ve tarafların hakları hakkında detaylı bilgi.",
};

export default function DistanceSalesContractPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-4xl min-h-[60vh]">
        <div className="max-w-none">
          <DistanceSalesContract />
        </div>
      </div>
    </Container>
  );
} 