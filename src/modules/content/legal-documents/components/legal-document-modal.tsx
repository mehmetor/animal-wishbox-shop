"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReturnCancellationPolicy } from "./return-cancellation-policy";
import { KvkkDisclosure } from "./kvkk-disclosure";
import { ConsentDocument } from "./consent-document";
import { DistanceSalesContract } from "./distance-sales-contract";
import { PreliminaryInformationForm } from "./preliminary-information-form";

export type LegalDocumentType =
  | "return-cancellation-policy"
  | "kvkk-disclosure"
  | "distance-sales-contract"
  | "preliminary-information-form"
  | "consent-document";

interface LegalDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentType: LegalDocumentType | null;
}

const renderDocument = (documentType: LegalDocumentType | null) => {
  switch (documentType) {
    case "return-cancellation-policy":
      return <ReturnCancellationPolicy />;
    case "kvkk-disclosure":
      return <KvkkDisclosure />;
    case "distance-sales-contract":
      return <DistanceSalesContract />;
    case "preliminary-information-form":
      return <PreliminaryInformationForm />;
    case "consent-document":
      return <ConsentDocument />;
    default:
      return null;
  }
};

const getDocumentTitle = (documentType: LegalDocumentType | null) => {
  switch (documentType) {
    case "return-cancellation-policy":
      return "İade – İptal – Değişim Politikası";
    case "kvkk-disclosure":
      return "KVKK Aydınlatma Metni";
    case "distance-sales-contract":
      return "Mesafeli Satış Sözleşmesi";
    case "preliminary-information-form":
      return "Ön Bilgilendirme Formu";
    case "consent-document":
      return "Açık Rıza Metni";
    default:
      return "";
  }
};

export const LegalDocumentModal = ({
  open,
  onOpenChange,
  documentType,
}: LegalDocumentModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle>{getDocumentTitle(documentType)}</DialogTitle>
        <DialogDescription className="sr-only">
          {getDocumentTitle(documentType)}
        </DialogDescription>
        <ScrollArea className="max-h-[60vh] p-4 text-sm">
          {renderDocument(documentType)}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export const LegalDocumentLink = ({
  documentType,
  text,
  onClick,
}: {
  documentType: LegalDocumentType;
  text: string;
  onClick: (type: LegalDocumentType) => void;
}) => {
  return (
    <Button
      variant="link"
      className="p-0 text-base h-4"
      onClick={() => onClick(documentType)}
    >
      {text}
    </Button>
  );
};
