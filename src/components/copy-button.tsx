"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type CopyButtonProps = {
  textToCopy: string;
  label?: string;
};

const CopyButton = ({ textToCopy, label }: CopyButtonProps) => {

  const copyToClipboard = (text: string, l: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(l ? `${l} kopyalandı` : "Kopyalandı", {
          description: `${text}`,
        });
      })
      .catch((err) => {
        toast.error(`Kopyalama hatası: ${err}`, {
          description: "Lütfen manuel olarak kopyalayınız.",
        });
      });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6"
      onClick={() => copyToClipboard(textToCopy, label ?? "")}
    >
      <Copy />
      <span className="sr-only">{label} kopyala</span>
    </Button>
  );
};

export default CopyButton;
