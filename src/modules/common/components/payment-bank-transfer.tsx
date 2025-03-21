import { Badge } from "@/components/ui/badge";
import CopyButton from "@/components/copy-button";
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import OrderNumber from "./order-number";

const bankTransferInfo = {
  iban: "TR81 0011 1000 0000 0152 2937 06",
  accountHolder: "WISHFUL GENERAL TRADING İTHALAT İHRACAT TİC. LTD. ŞTİ.",
  bankName: "QNB Finansbank",
};

const PaymentBankTransfer = ({
  className = "mt-4",
  orderNumber,
}: {
  className?: string;
  orderNumber?: string;
}) => {
  return (
    <div className={cn("space-y-3 text-sm", className)}>
      <div className="space-y-2">
        <div className="flex flex-col">
          <span className="text-muted-foreground">IBAN Numarası:</span>
          <div className="flex items-center gap-2">
            <span className="font-medium">{bankTransferInfo.iban}</span>
            <CopyButton textToCopy={bankTransferInfo.iban} label="IBAN" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">Hesap Sahibi Adı:</span>
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {bankTransferInfo.accountHolder}
            </span>
            <CopyButton
              textToCopy={bankTransferInfo.accountHolder}
              label="Hesap sahibi"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">Banka Adı:</span>
          <span className="font-medium">{bankTransferInfo.bankName}</span>
        </div>
        {orderNumber && <OrderNumber id={orderNumber} className="text-sm" />}
        <div className="mt-4">
          <Alert variant="warning">
            <AlertCircleIcon className="h-4 w-4" />
            {!orderNumber && (
              <AlertTitle>
                Şipariş numaranız işlemler tamamlandığında görüntülenecektir.
              </AlertTitle>
            )}
            <AlertDescription>
              Lütfen Havale/EFT yaparken sipariş numaranızı açıklama kısmına
              ekleyiniz.{" "}
              {orderNumber && (
                <span className="text-muted-foreground font-normal">
                  Havale/EFT işlemi tamamlandıktan sonra siparişiniz
                  gönderilecektir.
                </span>
              )}
            </AlertDescription>
          </Alert>
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
