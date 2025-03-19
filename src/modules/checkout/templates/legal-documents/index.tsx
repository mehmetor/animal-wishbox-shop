"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PrivacyPolicy } from "./privacy-policy";
import { TermsOfUse } from "./terms-of-use";
import { TermsOfSale } from "./terms-of-sale";
import { RefundPolicy } from "./refund-policy";
import { ScrollArea } from "@/components/ui/scroll-area";

type LegalDocumentType =
  | "terms-of-use"
  | "terms-of-sale"
  | "refund-policy"
  | "privacy-policy";

interface LegalDocumentsProps {
  variant?: "inline" | "button";
}

const renderDocument = (activeDocument: LegalDocumentType | null) => {
  switch (activeDocument) {
    case "terms-of-use":
      return <TermsOfUse />;
    case "terms-of-sale":
      return <TermsOfSale />;
    case "refund-policy":
      return <RefundPolicy />;
    case "privacy-policy":
      return <PrivacyPolicy />;
    default:
      return null;
  }
};

const renderDialogTitle = (activeDocument: LegalDocumentType | null) => {
  switch (activeDocument) {
    case "terms-of-use":
      return "Kullanım Şartları";
    case "terms-of-sale":
      return "Satış Şartları";
    case "refund-policy":
      return "İade Politikası";
    case "privacy-policy":
      return "Gizlilik Politikası";
    default:
      return "";
  }
};

const renderLink = (
  documentType: LegalDocumentType,
  text: string,
  handleOpenDocument: (documentType: LegalDocumentType) => void,
) => {
  return (
    <Button
      variant="link"
      className="px-0 text-base"
      onClick={() => handleOpenDocument(documentType)}
    >
      {text}
    </Button>
  );
};

const LegalDocuments = ({ variant = "inline" }: LegalDocumentsProps) => {
  const [open, setOpen] = useState(false);
  const [activeDocument, setActiveDocument] =
    useState<LegalDocumentType | null>(null);

  const handleOpenDocument = (documentType: LegalDocumentType) => {
    setActiveDocument(documentType);
    setOpen(true);
  };

  return (
    <>
      <span className="text-base">
        &nbsp;
        {renderLink("terms-of-use", "Kullanım Şartları", handleOpenDocument)}
        <span>,&nbsp;</span>
        {renderLink("terms-of-sale", "Satış Şartları", handleOpenDocument)}
        <span>,&nbsp;</span>
        {renderLink("refund-policy", "İade Politikası", handleOpenDocument)}
        <span>&nbsp;ve&nbsp;</span>
        {renderLink(
          "privacy-policy",
          "Gizlilik Politikası",
          handleOpenDocument,
        )}
        &nbsp;
      </span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle>{renderDialogTitle(activeDocument)}</DialogTitle>
          <DialogDescription className="sr-only">
            {renderDialogTitle(activeDocument)}
          </DialogDescription>
          <ScrollArea className="max-h-[60vh] p-4 text-sm">
            {renderDocument(activeDocument)}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LegalDocuments;
