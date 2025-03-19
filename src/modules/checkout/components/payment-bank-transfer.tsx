import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Check, CheckCheck, CheckCircle, Copy } from "lucide-react";

const bankTransferInfo = {
  iban: "TR81 0011 1000 0000 0152 2937 06",
  accountHolder: "WISHFUL GENERAL TRADING İTHALAT İHRACAT TİC. LTD. ŞTİ.",
  bankName: "QNB Finansbank",
};

const PaymentBankTransfer = ({ className }: { className?: string }) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${label} kopyalandı`, {
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
    <div className="mt-4 space-y-3 text-sm">
      <div className="space-y-2">
        <div className="flex flex-col">
          <span className="text-muted-foreground">IBAN Numarası:</span>
          <div className="flex items-center gap-2">
            <span className="font-medium">{bankTransferInfo.iban}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(bankTransferInfo.iban, "IBAN")}
            >
              <Copy />
              <span className="sr-only">IBAN kopyala</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">Hesap Sahibi Adı:</span>
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {bankTransferInfo.accountHolder}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() =>
                copyToClipboard(bankTransferInfo.accountHolder, "Hesap sahibi")
              }
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Hesap sahibi adını kopyala</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">Banka Adı:</span>
          <span className="font-medium">{bankTransferInfo.bankName}</span>
        </div>
      </div>
    </div>
  );

  return (
    <Badge variant="outline" className={className}>
      <span className="font-semibold">Attention:</span> For testing purposes
      only.
    </Badge>
  );
};

export default PaymentBankTransfer;
