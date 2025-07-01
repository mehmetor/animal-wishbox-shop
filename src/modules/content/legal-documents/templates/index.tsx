"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  LegalDocumentModal, 
  LegalDocumentLink, 
  LegalDocumentType 
} from "../components/legal-document-modal";

interface LegalDocumentsProps {
  variant?: "inline" | "button" | "footer" | "checkout";
  onAllCheckedChange?: (isChecked: boolean) => void;
}

const legalDocumentsList: { type: LegalDocumentType; text: string }[] = [
  {
    type: "return-cancellation-policy",
    text: "İade, İptal, Değişim Politikası",
  },
  // { type: "kvkk-disclosure", text: "KVKK Aydınlatma Metni" },
  {
    type: "distance-sales-contract",
    text: "Mesafeli Satış Sözleşmesi",
  },
  {
    type: "preliminary-information-form",
    text: "Ön Bilgilendirme Formu",
  },
  { type: "consent-document", text: "Açık Rıza Metni" },
];

const LegalDocuments = ({
  variant = "inline",
  onAllCheckedChange,
}: LegalDocumentsProps) => {
  const [open, setOpen] = useState(false);
  const [activeDocument, setActiveDocument] = useState<LegalDocumentType | null>(null);

  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(
    legalDocumentsList.reduce((acc, doc) => ({ ...acc, [doc.type]: false }), {}),
  );

  useEffect(() => {
    if (variant === "checkout" && onAllCheckedChange) {
      const allChecked = Object.values(checkedState).every(Boolean);
      onAllCheckedChange(allChecked);
    }
  }, [checkedState, variant, onAllCheckedChange]);

  const handleOpenDocument = (documentType: LegalDocumentType) => {
    setActiveDocument(documentType);
    setOpen(true);
  };

  const handleCheckboxChange = (documentType: LegalDocumentType) => {
    setCheckedState((prev) => ({ ...prev, [documentType]: !prev[documentType] }));
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

  if (variant === "checkout") {
    return (
      <div className="flex flex-col gap-y-3">
        {legalDocumentsList.map((doc) => (
          <div key={doc.type} className="flex items-center gap-x-2 text-sm">
            <Checkbox
              id={doc.type}
              checked={checkedState[doc.type]}
              onCheckedChange={() => handleCheckboxChange(doc.type)}
            />
            <label htmlFor={doc.type} className="pl-4">
              <LegalDocumentLink
                documentType={doc.type}
                text={doc.text}
                onClick={handleOpenDocument}
              />
              'ni okudum, anladım ve kabul ediyorum.
            </label>
          </div>
        ))}
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