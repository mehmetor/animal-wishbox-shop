"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PrivacyPolicy } from "./privacy-policy";
import { TermsOfUse } from "./terms-of-use";
import { TermsOfSale } from "./terms-of-sale";
import { RefundPolicy } from "./refund-policy";

export type LegalDocumentType =
  | "terms-of-use"
  | "terms-of-sale"
  | "refund-policy"
  | "privacy-policy";

interface LegalDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentType: LegalDocumentType | null;
}

const renderDocument = (documentType: LegalDocumentType | null) => {
  switch (documentType) {
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

const getDocumentTitle = (documentType: LegalDocumentType | null) => {
  switch (documentType) {
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
