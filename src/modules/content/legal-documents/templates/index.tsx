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
        <LegalDocumentLink
          documentType="privacy-policy"
          text="Gizlilik Politikası"
          onClick={handleOpenDocument}
        />
        <span>•</span>
        <LegalDocumentLink
          documentType="terms-of-use"
          text="Kullanım Şartları"
          onClick={handleOpenDocument}
        />
        <span>•</span>
        <LegalDocumentLink
          documentType="terms-of-sale"
          text="Satış Şartları"
          onClick={handleOpenDocument}
        />
        <span>•</span>
        <LegalDocumentLink
          documentType="refund-policy"
          text="İade Politikası"
          onClick={handleOpenDocument}
        />
        <LegalDocumentModal
          open={open}
          onOpenChange={setOpen}
          documentType={activeDocument}
        />
      </div>
    );
  }

  return (
    <>
      <span className="text-base">
        &nbsp;
        <LegalDocumentLink
          documentType="terms-of-use"
          text="Kullanım Şartları"
          onClick={handleOpenDocument}
        />
        <span>,&nbsp;</span>
        <LegalDocumentLink
          documentType="terms-of-sale"
          text="Satış Şartları"
          onClick={handleOpenDocument}
        />
        <span>,&nbsp;</span>
        <LegalDocumentLink
          documentType="refund-policy"
          text="İade Politikası"
          onClick={handleOpenDocument}
        />
        <span>&nbsp;ve&nbsp;</span>
        <LegalDocumentLink
          documentType="privacy-policy"
          text="Gizlilik Politikası"
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