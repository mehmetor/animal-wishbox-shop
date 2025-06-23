"use client";

import { useState } from "react";
import { 
  LegalDocumentModal, 
  LegalDocumentLink, 
  LegalDocumentType 
} from "../components/legal-document-modal";

interface LegalDocumentsProps {
  variant?: "inline" | "button" | "footer";
}

const LegalDocuments = ({ variant = "inline" }: LegalDocumentsProps) => {
  const [open, setOpen] = useState(false);
  const [activeDocument, setActiveDocument] = useState<LegalDocumentType | null>(null);

  const handleOpenDocument = (documentType: LegalDocumentType) => {
    setActiveDocument(documentType);
    setOpen(true);
  };

  if (variant === "footer") {
    return (
      <div className="flex flex-wrap gap-2 text-sm">
        <LegalDocumentLink documentType="return-cancellation-policy" text="İade, İptal, Değişim Politikası" onClick={handleOpenDocument} />
        <span>•</span>
        <LegalDocumentLink documentType="kvkk-disclosure" text="KVKK Aydınlatma Metni" onClick={handleOpenDocument} />
        <span>•</span>
        <LegalDocumentLink documentType="distance-sales-contract" text="Mesafeli Satış Sözleşmesi" onClick={handleOpenDocument} />
        <span>•</span>
        <LegalDocumentLink documentType="preliminary-information-form" text="Ön Bilgilendirme Formu" onClick={handleOpenDocument} />
        <span>•</span>
        <LegalDocumentLink documentType="consent-document" text="Açık Rıza Metni" onClick={handleOpenDocument} />
        <LegalDocumentModal open={open} onOpenChange={setOpen} documentType={activeDocument} />
      </div>
    );
  }

  return (
    <>
      <span className="text-base">
        &nbsp;
        <LegalDocumentLink
          documentType="return-cancellation-policy"
          text="İade – İptal – Değişim Politikası"
          onClick={handleOpenDocument}
        />
        <span>,&nbsp;</span>
        <LegalDocumentLink
          documentType="kvkk-disclosure"
          text="KVKK Aydınlatma Metni"
          onClick={handleOpenDocument}
        />
        <span>,&nbsp;</span>
        <LegalDocumentLink
          documentType="distance-sales-contract"
          text="Mesafeli Satış Sözleşmesi"
          onClick={handleOpenDocument}
        />
        <span>&nbsp;ve&nbsp;</span>
        <LegalDocumentLink
          documentType="preliminary-information-form"
          text="Ön Bilgilendirme Formu"
          onClick={handleOpenDocument}
        />
        <span>,&nbsp;</span>
        <LegalDocumentLink
          documentType="consent-document"
          text="Açık Rıza Metni"
          onClick={handleOpenDocument}
        />
        &nbsp;
      </span>
      <LegalDocumentModal
        open={open}
        onOpenChange={setOpen}
        documentType={activeDocument}
      />
    </>
  );
};

export default LegalDocuments; 