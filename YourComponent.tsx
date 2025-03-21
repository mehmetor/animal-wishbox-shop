"use client";

import { useState } from "react";
import { 
  LegalDocumentModal, 
  LegalDocumentLink, 
  LegalDocumentType 
} from "@/modules/content/legal-documents/components/legal-document-modal";

export default function YourComponent() {
  const [open, setOpen] = useState(false);
  const [activeDocument, setActiveDocument] = useState<LegalDocumentType | null>(null);

  const handleOpenDocument = (documentType: LegalDocumentType) => {
    setActiveDocument(documentType);
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <LegalDocumentLink
          documentType="privacy-policy"
          text="Gizlilik Politikası"
          onClick={handleOpenDocument}
        />
        <LegalDocumentLink
          documentType="terms-of-use"
          text="Kullanım Şartları"
          onClick={handleOpenDocument}
        />
      </div>
      
      <LegalDocumentModal
        open={open}
        onOpenChange={setOpen}
        documentType={activeDocument}
      />
    </div>
  );
} 